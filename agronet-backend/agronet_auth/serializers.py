
from .models import User
from rest_framework import serializers
# from rest_framework.serializers import ModelSerializer

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # Ensures password is not returned
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)  # Extract password
        instance = User(**validated_data)  # Create user instance
        
        if password is not None:
            instance.set_password(password)  # Hash password
            
        instance.save()  # **Missing save statement - now added**
        return instance
