from django.shortcuts import get_object_or_404
from urllib.parse import urljoin
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes,action
from agronet_auth.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Post, Vote, Follow, Comment
from .serializers import PostSerializer, CommentSerializer
from agronet_auth.models import User
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveUpdateAPIView,
    RetrieveAPIView,
    RetrieveDestroyAPIView
)

# Create your views here.
class HomeView(APIView):

    def get(self, request):
        instance = Post.objects.all()
        ser_ins = PostSerializer(instance=instance, many=True)
        base_url = request.build_absolute_uri('/')
        for post in ser_ins.data:
            post["post_image"] = urljoin(base_url, post["post_image"]) 
        return Response(ser_ins.data)
    
    
class ShowPost(APIView):
    """
    the authenticated users just can watch the post
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = get_object_or_404(User, pk=request.user_id)
        posts = user.all_post()
        ser_ins = PostSerializer(instance=posts, many=True)
        return Response(ser_ins.data)
    
    
class CreatePostView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # user = get_object_or_404(User, id=request.user)
        # self.check_object_permissions(request, user)
        ser_data = PostSerializer(data=request.data)
        if ser_data.is_valid():
            cd = ser_data.validated_data
            Post.objects.create(
                user=request.user,
                title=cd['title'],
                post_image=cd['post_image'],
                text=cd['text'],
            )
            return Response(ser_data.data)
        return Response(ser_data.errors)
    

class ChangePostView(APIView):
    """
    change their post value with put method
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        # self.check_object_permissions(request, post)
        ser_data = PostSerializer(instance=post, data=request.data, partial=True)
        if ser_data.is_valid():
            ser_data.save()
            return Response(ser_data.data)
        return Response(ser_data.errors)
    

class DeletePostView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        # self.check_object_permissions(request, post)
        post.delete()
        return Response('you delete your post successfully')
    

class GetLikeView(APIView):
    """
    Authenticated user can like posts
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        user = get_object_or_404(User, id=request.user_id)
        # self.check_object_permissions(request, account)
        post = get_object_or_404(Post, pk=post_id)
        vote = Vote.objects.filter(post=post, profile=user)
        if vote.exists():
            return Response({
                'vote': 'you liked this post before cant like again'
            })
        Vote.objects.create(
            profile=user,
            post=post,
        )
        return Response({
            'like': 'you liked this post with {} account'.format(user.email)
        })
    
class DeleteLike(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id):
        user = get_object_or_404(User, id=request.user_id)
        # self.check_object_permissions(request, account)
        post = get_object_or_404(Post, id=post_id)
        vote = Vote.objects.filter(profile=user, post=post)
        if vote.exists():
            vote.delete()
            return Response({
                'success': 'you take back your like'
            })
        return Response({
            'error': 'you dont like this post before. you cant take back your like'
        })
    


class FollowView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, account_id):
        follower = get_object_or_404(User, id=request.user_id)
        # self.check_object_permissions(request, follower)
        followed = get_object_or_404(User, id=account_id)
        follow_check = Follow.objects.filter(follower=follower, followed=followed)
        if follower == followed or follow_check.exists():
            return Response({
                'error': 'you follow this page before cant do it again'
            })
        Follow.objects.create(
            follower=follower,
            followed=followed
        )
        return Response({
            'success': f'you follow {followed.email} account successfully'
        })
    

# @api_view(['PATCH'])
# def increment_post_view(request, pk):
#     try:
#         post = Post.objects.get(pk=pk)
#         post.views += 1
#         post.save()
#         serializer = PostSerializer(post)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except Post.DoesNotExist:
#         return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)


# class PostViewSet(viewsets.ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

#     @action(detail=True, methods=['post'])
#     def increment_view(self, request, pk=None):
#         post = self.get_object()
#         post.views += 1
#         post.save()
#         return Response({'views': post.views})


class IncrementPostView(APIView):
    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post.views += 1
        post.save()
        return Response({'views': post.views}, status=status.HTTP_200_OK)
    


class PostCommentsListAPIView(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs.get('pk')
        return Comment.objects.filter(post__id=post_id).order_by("-created")


class CommentsListAPIView(ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        user = self.request.user
        return Comment.objects.filter(creator=user.id).order_by("-created")


class CommentCreateApiView(CreateAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["post_id"] = self.kwargs.get('pk')
        return ctx


class CommentDestroyApiView(RetrieveDestroyAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_queryset(self):
        return self.model.objects.filter(creator=self.request.user)


class CommentUpdateApiView(RetrieveUpdateAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_queryset(self):
        return self.model.objects.filter(creator=self.request.user)


class CommentRetrieveAPIView(RetrieveAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_queryset(self):
        return self.model.objects.filter(creator=self.request.user)