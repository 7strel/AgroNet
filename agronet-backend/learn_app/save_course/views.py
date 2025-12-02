from django.shortcuts import render, get_object_or_404
from .serializers import SaveCourseSerializer
from urllib.parse import urljoin
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from agronet_auth.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from learn_app.course.serializers import CourseSerializer
from .models import SaveCourse

# Create your views here.
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated]) 
def add_to_save_course(request):
    serializer = SaveCourseSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the cart with the authenticated user
        save_course = serializer.save(user=request.user)
        
        res = SaveCourseSerializer(save_course)  # serialize the saved cart
        return Response({"course": res.data})
    
    return Response(serializer.errors, status=400)
    

@api_view(['GET'])
def get_save_course(request):
    save_courses = SaveCourse.objects.select_related('course').order_by('id')
    base_url = request.build_absolute_uri('/')

    save_course_items = []

    for save_course in save_courses:
        item_data = {
            "id": save_course.id,
            "created_time": save_course.created_time,
        }


        if save_course.course:
            course_data = CourseSerializer(save_course.course).data
            if "images" in course_data and course_data["images"]:
                course_data["images"] = urljoin(base_url, course_data["images"])
            item_data["type"] = "course"
            item_data["item"] = course_data

        save_course_items.append(item_data)

    return Response({"save_course": save_course_items})


@api_view(['DELETE'])
def delete_save_course_item(request, pk):
    item = get_object_or_404(SaveCourse, pk=pk)
    item.delete()
    return Response({"detail": "Item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)