from django.urls import path
from . import views


urlpatterns = [
    path('save/course/add/', views.add_to_save_course, name='add_to_save_course'),
    path('save/course/all/', views.get_save_course, name='get_save_course'),
    path('save/course/<int:pk>/', views.delete_save_course_item, name='delete_save_course_item')
]