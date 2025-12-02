from rest_framework import serializers
from .models import Question, Answer
from agronet_auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']

class AnswerSerializer(serializers.ModelSerializer):
    responder = UserSerializer(read_only=True)
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())

    class Meta:
        model = Answer
        fields = ['id', 'question', 'responder', 'body', 'created_at', 'updated_at', 'is_accepted']
        read_only_fields = ['created_at', 'updated_at', 'is_accepted']

class QuestionSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'author', 'title', 'body', 'tags', 'created_at', 'updated_at', 'is_answered', 'answers']
        read_only_fields = ['created_at', 'updated_at', 'is_answered']
