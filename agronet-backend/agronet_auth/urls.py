from django.urls import path
from .views import (LoginView, RegisterView, UserAPIView,
                    RefreshAPIView, LogoutAPIView, ForgotAPIView, ResetAPIView)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserAPIView.as_view()),
    path('refresh/', RefreshAPIView.as_view()),
    path('logout/', LogoutAPIView.as_view()),
    path('forgot/', ForgotAPIView.as_view()),
    path('reset/', ResetAPIView.as_view())
]
