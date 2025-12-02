import email
# from lib2to3.pgen2 import token
import token
from os import access
import string
from django.shortcuts import render
import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import exceptions
import random
from rest_framework.authentication import get_authorization_header

from .authentication import create_access_token, create_refresh_token, JWTAuthentication, decode_refresh_token

from .serializers import UserSerializer

from .models import Reset, User, UserToken
from django.contrib.auth import get_user_model

from django.core.mail import send_mail

# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('passwords do not match')

        data.pop('password_confirm')
        
        user = UserSerializer(data=data)
        user.is_valid(raise_exception=True)
        # UserModel = get_user_model()
        # UserModel.objects.create(**user.validated_data) 
        user.save()

        return Response(user.data)


class LoginView(APIView):
    def post(self, request):
        username = request.data['email']
        password = request.data['password']

        UserModel = get_user_model()

        user = UserModel.objects.get(email=username)
        print(user)

        if user is None:
            raise exceptions.APIException('Invalid credentials')

        if not user.check_password(password):
            raise exceptions.APIException(
                'Invalid credentials check the password')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        access_token_str = str(access_token)
        refresh_token_str = str(refresh_token)
        print(refresh_token_str)

        UserToken.objects.create(
            user_id=user.id,
            token=refresh_token_str,
            expired_at=datetime.datetime.utcnow() + datetime.timedelta(days=7)
        )

        response = Response()
        print(refresh_token_str)
        response.set_cookie(key='refresh_token',
                            value=refresh_token_str, httponly=True)

        response.set_cookie(key='acess_token',
                            value=access_token_str, httponly=True)
        response.data = {
            'token': access_token
        }

        return response


class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class RefreshAPIView(APIView):
    def post(self, request):
        refresh_token = (request.COOKIES.get('refresh_token'))
        print(refresh_token)
        id = decode_refresh_token(refresh_token)

        if not UserToken.objects.filter(
            user_id=id,
            token=refresh_token,
            expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
        ).exists():
            raise exceptions.AuthenticationFailed('unaunthenticated')

        access_token = create_access_token(id)

        return Response({'token': access_token})


class LogoutAPIView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        UserToken.objects.filter(token=refresh_token).delete()
        response = Response()
        response.delete_cookie(key='refresh_token')
        response.data = {
            'message': 'success'
        }

        return response


class ForgotAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        token = ''.join(random.choice(string.ascii_lowercase +
                        string.digits) for _ in range(10))

        Reset.objects.create(
            email=email,
            token=token
        )

        url = 'http://localhost:3000/reset/' + token

        send_mail(
            subject='Reset your password!',
            message='Click <a href="%s">here</a> to reset your password!' % url,
            from_email='agronet@agronet.io',
            recipient_list=[email]
        )

        return Response({
            'message': 'success'
        })


class ResetAPIView(APIView):
    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match!')

        reset_password = Reset.objects.filter(token=data['token']).first()

        if not reset_password:
            raise exceptions.APIException('Invalid link!')

        user = User.objects.filter(email=reset_password.email).first()

        if not user:
            raise exceptions.APIException('user not found')

        user.set_password(data['password'])
        user.save()

        return Response({
            "message": "success"
        })
