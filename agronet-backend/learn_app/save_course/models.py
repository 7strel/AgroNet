from django.db import models
from agronet_auth.models import User
from learn_app.course.models import Course

# Create your models here.
class SaveCourse(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, null=True, on_delete=models.SET_NULL)
    created_time = models.DateTimeField(auto_now_add=True,blank=True, null=True)