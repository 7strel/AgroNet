from django.shortcuts import get_object_or_404
from urllib.parse import urljoin
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes,action
from agronet_auth.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Post, Follow, Comment
from .serializers import PostSerializer, CommentSerializer
from agronet_auth.models import User


class IncrementPostView(APIView):
    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post.views += 1
        post.save()
        return Response({'views': post.views}, status=status.HTTP_200_OK)
    

class CreatePostView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # user = get_object_or_404(User, id=request.user)
        # self.check_object_permissions(request, user)
        print(request.data)
        ser_data = PostSerializer(data=request.data)
        if ser_data.is_valid():
            cd = ser_data.validated_data
            print(cd)
            Post.objects.create(
                creator=request.user,
                title=cd['title'],
                image=cd['image'],
                content=cd['content'],
            )
            return Response(ser_data.data)
        return Response(ser_data.errors)