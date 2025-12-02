from django.shortcuts import render
from urllib.parse import urljoin
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .filter import ProductsFilter
from .models import Product, Review, Category
from rest_framework import status, generics
from .serializers import ProductSerializer,CategorySerializer, CategoryDetailSerializer
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from django.db.models import Avg
from .authentication import decode_refresh_token
from agronet_auth.models import User
from agronet_auth.authentication import JWTAuthentication


# Create your views here.
@api_view(['GET']) 
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def get_all_products(request):
    filterset = ProductsFilter(request.GET, queryset=Product.objects.all().order_by('id'))
    count = filterset.qs.count()
    resPage = 8
    paginator = PageNumberPagination()
    paginator.page_size = resPage
    queryset = paginator.paginate_queryset(filterset.qs, request)
    serializer = ProductSerializer(queryset,many=True)
    #products = Product.objects.all()
    #serializer = ProductSerializer(filterset.qs,many=True)
    print(filterset)
    base_url = request.build_absolute_uri('/')
    for product in serializer.data:
        product["images"] = urljoin(base_url, product["images"]) 
    return Response({"products":serializer.data})


@api_view(['GET'])
def get_by_id_product(request,pk):
    products = get_object_or_404(Product,id=pk)
    serializer = ProductSerializer(products,many=False)
    print(products)
    return Response({"product":serializer.data})


@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def new_product(request): 
    data = request.data
    serializer = ProductSerializer(data = data)
    if serializer.is_valid():
        product = Product.objects.create(**data,user=request.user)
        res = ProductSerializer(product,many=False)
        
        return Response({"product":res.data})
    else:
        return Response(serializer.errors)
    


@api_view(['PUT'])
@permission_classes([IsAuthenticated]) 
def update_product(request,pk): 
    product = get_by_id_product(Product,id=pk)
    
    
    if product.user != request.user:
        return Response({"error":"you can't update this product"}, status=status.HTTP_403_FORBIDDEN) 
    
    product.name = request.data['name']
    product.description = request.data['description']
    product.price = request.data['price']
    product.brand = request.data['brand']
    product.category = request.data['category']
    product.ratings = request.data['ratings']
    product.stock = request.data['stock']
    
    product.save()
    serializer = ProductSerializer(product,many=False)
    return Response({"product":serializer.data})



@api_view(['DELETE'])
@permission_classes([IsAuthenticated]) 
def delete_product(request,pk):
    product = get_by_id_product(Product,id=pk)
    

    if product.user != request.user:
        return Response({"error":"you can't update this product"}, status=status.HTTP_403_FORBIDDEN)
    
    product.save()
    
    return Response({"data":"Delete is done"},status=status.HTTP_200_OK)




@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def create_review(request,pk): 
    user = request.user 
    product = get_object_or_404(Product,id=pk)
    data = request.data 
    review = product.reviews.filter(user=user)
   
    if data['rating'] <=0 or data['rating'] > 5:
        return Response({"error":'Please select between 1 to 5 only'}, status=status.HTTP_400_BAD_REQUEST)
    elif review.exists():
        new_review = {'rating': data['rating'], 'comment':data['comment']}
        review.update(**new_review) 
        
        rating = product.reviews.aggregate(avg_ratings = Avg('rating'))
        product.ratings = rating['avg_ratings'] 
        product.save()
        
        return Response({'details':'Product review updated'})
    
    else:
        Review.objects.create(
            user = user,
            product = product,
            rating = data['rating'],
            comment = data['comment']
        )
        rating = product.reviews.aggregate(avg_ratings = Avg('rating'))
        product.ratings = rating['avg_ratings']
        return Response({'details':'Product review created'})
    



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_review(request,pk):
    user = request.user
    product = get_object_or_404(Product, id=pk)
    
    
    review = product.reviews.aggregation(avg_ratings = Avg('rating'))
    
    if review.exists():
        review.delete()
        rating = product.reviews.aggregate(avg_ratings = Avg('rating'))
        if rating['avg_ratings'] is None:
            
           rating['avg_ratings'] = 0
           product.ratings = rating['avg_ratings']
           product.save()
           return Response({'details':'Product review deleted'})
    else:
           return Response({'error':'Review not found'},status=status.HTTP_404_NOT_FOUND)
    


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CategorySerializer
        return CategoryDetailSerializer
    


class CategoryDetailView(generics.RetrieveUpdateAPIView):
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return CategorySerializer
        return CategoryDetailSerializer