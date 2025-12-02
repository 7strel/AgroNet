from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied, ValidationError

from .models import Category, Course, Module, Lesson, Assignment, Submission, Enrollment
from agronet_auth.serializers import UserSerializer
from agronet_auth.models import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'parent', 'title', 'avatar', 'created_time', 'updated_time')


class CategoryDetailSerializer(serializers.ModelSerializer):
    parent = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'parent', 'title', 'avatar', 'created_time', 'updated_time')

    def get_parent(self, obj):
        if obj.parent:
            return CategoryDetailSerializer(obj.parent).data
        return None
    

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('id', 'category', 'title', 'description', 'avatar', 'price', 'instructor', 'students')

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        if user.is_student:
            raise serializers.ValidationError({"instructor": "User is not an authorized instructor."})
        
        if 'instructor' not in validated_data:
            validated_data['instructor'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get('request')
        user = request.user
        instructor = instance.instructor

        if (user.is_student) or (user.email != instructor.email):
            raise PermissionDenied('You do not have permission to update this submission.')
        return super().update(instance, validated_data)
    


class CourseDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)
    instructor = UserSerializer()
    students = UserSerializer(many=True)

    class Meta:
        model = Course
        fields = ('id', 'category', 'title', 'description', 'avatar', 'price', 'instructor', 'students', 'created_time', 'updated_time')



class ModuleSerializer(serializers.ModelSerializer):
    lessons = serializers.SerializerMethodField()

    class Meta:
        model = Module
        fields = ('id', 'course', 'title', 'lessions', 'created_time', 'updated_time')

    def get_lessons(self, obj):
        serializer = LessonSerializer(obj.lessons.all(), many=True)
        data = serializer.data
        return [id_['id'] for id_ in data]
    
    def update(self, instance, validated_data):
        request = self.context.get('request')
        user = request.user
        course = instance.course
        instructor = course.instructor

        if (user.is_student) or (user.email != instructor.email):
            raise PermissionDenied('You do not have permission to update this submission.')
        return super().update(instance, validated_data)
    


class LessonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lesson
        fields = ('id', 'module', 'title', 'content', 'created_time', 'updated_time')

    def update(self, instance, validated_data):
        request = self.context.get('request')
        user = request.user
        module = instance.module
        course = module.course
        instructor = course.instructor

        if (user.is_student) or (user.email != instructor.email):
            raise PermissionDenied('You do not have permission to update this submission.')
        return super().update(instance, validated_data)
    



class AssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assignment
        fields = ('id', 'module', 'title', 'content', 'created_time', 'updated_time', 'due_time')

    def update(self, instance, validated_data):
        request = self.context.get('request')
        user = request.user
        module = instance.module
        course = module.course
        instructor = course.instructor

        if (user.is_student) or (user.email != instructor.email):
            raise PermissionDenied('You do not have permission to update this submission.')
        return super().update(instance, validated_data)
    


class SubmissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Submission
        fields = ('id', 'student', 'assignment', 'content', 'submitted_at')

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user

        if 'student' not in validated_data:
            validated_data['student'] = user
        
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        request = self.context.get('request')
        user = request.user
        student = instance.student

        if (student.email != user.email):
            raise PermissionDenied("You do not have permission to update this submission.")
        
        return super().update(instance, validated_data)
    


class EnrollSerializer(serializers.ModelSerializer):

    class Meta:
        model = Enrollment
        fields = ('course', 'user', 'enroll_time')

    def create(self, validated_data):
        user = self.context['request'].user
        user_to_enroll = validated_data['user']
        course_pk = validated_data['course'].id
        course = Course.objects.get(pk=course_pk)

        if user.email != user_to_enroll.email:
            raise PermissionDenied("You do not have permission to enroll.")

        if Enrollment.objects.filter(user=user, course=course).exists():
            raise ValidationError("You are already enrolled in this course.")
        
        course.students.add(user)

        return super().create(validated_data)