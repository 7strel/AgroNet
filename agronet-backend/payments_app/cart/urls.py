from django.urls import path
from . import views


urlpatterns = [
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/all/', views.get_cart, name='get_cart'),
    path('cart/<int:pk>/', views.delete_cart_item, name='delete-cart-item')
]