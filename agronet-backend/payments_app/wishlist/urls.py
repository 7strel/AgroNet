from django.urls import path
from . import views


urlpatterns = [
    path('wishlist/add/', views.add_to_wishlist, name='add_to_wishlist'),
    path('wishlist/all/', views.get_wishlist, name='get_wishlist'),
    path('wishlist/<int:pk>/', views.delete_wishlist_item, name='delete-wishlist-item')
]