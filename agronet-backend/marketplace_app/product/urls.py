from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .import views


urlpatterns = [
    path('products/', views.get_all_products,name='products'),
    path('product/<str:pk>/', views.get_by_id_product,name='get_by_id_product'),
    path('products/new/', views.new_product,name='new_product'),
    path('products/update/<str:pk>/', views.update_product,name='update_product'),
    path('products/delete/<str:pk>/', views.delete_product,name='delete_product'),
    path('<str:pk>/reviews/', views.create_review,name='create_review'),
    path('<str:pk>/reviews/delete', views.delete_review,name='delete_review'),

    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', views.CategoryDetailView.as_view(), name='category-detail')

]



