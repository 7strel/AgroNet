from django.urls import path
from . import views

urlpatterns = [
    # Question routes
    path('questions/', views.question_list_create, name='question-list-create'),
    path('questions/<int:pk>/', views.question_detail, name='question-detail'),

    # Answer routes
    path('questions/<int:question_id>/answers/', views.answer_list_create, name='answer-list-create'),
    path('answers/<int:pk>/', views.answer_detail, name='answer-detail'),
]
