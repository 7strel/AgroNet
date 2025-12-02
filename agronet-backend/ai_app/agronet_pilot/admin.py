from django.contrib import admin
from .models import Question, Answer

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'is_answered', 'created_at')
    search_fields = ('title', 'body', 'tags', 'author__email')
    list_filter = ('is_answered', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'responder', 'is_accepted', 'created_at')
    search_fields = ('body', 'responder__email', 'question__title')
    list_filter = ('is_accepted', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
