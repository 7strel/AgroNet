from django.shortcuts import render, get_object_or_404
from .serializers import WishlistSerializer
from urllib.parse import urljoin
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from agronet_auth.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from marketplace_app.product.serializers import ProductSerializer
from learn_app.course.serializers import CourseSerializer
from .models import Wishlist

# Create your views here.
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def add_to_wishlist(request):
    serializer = WishlistSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the cart with the authenticated user
        wishlist = serializer.save(user=request.user)
        
        res = WishlistSerializer(wishlist)  # serialize the saved cart
        return Response({"product": res.data})
    
    return Response(serializer.errors, status=400)
    

@api_view(['GET'])
def get_wishlist(request):
    wishlists = Wishlist.objects.select_related('product', 'course').order_by('id')
    base_url = request.build_absolute_uri('/')

    wishlist_items = []

    for wishlist in wishlists:
        item_data = {
            "id": wishlist.id,
            "created_time": wishlist.created_time,
        }

        if wishlist.product:
            product_data = ProductSerializer(wishlist.product).data
            if "images" in product_data and product_data["images"]:
                product_data["images"] = urljoin(base_url, product_data["images"])
            item_data["type"] = "product"
            item_data["item"] = product_data

        elif wishlist.course:
            course_data = CourseSerializer(wishlist.course).data
            if "images" in course_data and course_data["images"]:
                course_data["images"] = urljoin(base_url, course_data["images"])
            item_data["type"] = "course"
            item_data["item"] = course_data

        wishlist_items.append(item_data)

    return Response({"wishlist": wishlist_items})


@api_view(['DELETE'])
def delete_wishlist_item(request, pk):
    item = get_object_or_404(Wishlist, pk=pk)
    item.delete()
    return Response({"detail": "Item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)