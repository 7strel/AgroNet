from rest_framework import serializers
from .models import SaveCourse

class SaveCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaveCourse
        fields = "__all__"