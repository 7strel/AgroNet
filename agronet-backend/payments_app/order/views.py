import json
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated ,IsAdminUser
from agronet_auth.authentication import JWTAuthentication
from rest_framework import status

from marketplace_app.product.models import Product   
from .serializers import OrderSerializer
from .models import Order,OrderItem


# Create your views here.
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response({'orders':serializer.data})


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_order(request,pk):
    order =get_object_or_404(Order, id=pk)

    serializer = OrderSerializer(order,many=False)
    return Response({'order':serializer.data})

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated,IsAdminUser])
def process_order(request,pk):
    order =get_object_or_404(Order, id=pk)
    order.status = request.data['status']
    order.save()
     
    serializer = OrderSerializer(order,many=False)
    return Response({'order':serializer.data})

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_order(request,pk):
    order =get_object_or_404(Order, id=pk) 
    order.delete()
      
    return Response({'details': "order is deleted"})


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def new_order(request):
    user = request.user 
    data = request.data
    order_items = data['order_items']
    print(order_items)

    if order_items and len(order_items) == 0:
       return Response({'error': 'No order recieved'},status=status.HTTP_400_BAD_REQUEST)
    else:
        #total_amount = sum( float(item['price'])* int(item['quantity']) for item in order_items)
        order = Order.objects.create(
            user = user,
            city = data['city'],
            zip_code = data['zip_code'],
            street = data['street'],
            country = data['country'],
            phone_no = data['phone_no'],
            total_amount = float(data['total_amount']),
        )
        for i in order_items:
            print(i)
            product_id = int(i['product'])
            product = Product.objects.get(id=product_id)
            item = OrderItem.objects.create(
                product= product,
                order = order,
                name = product.name,
                quantity = int(i['quantity']),
                price = float(i['price'])
            )
            product.stock -= int(item.quantity)
            product.save()
        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)