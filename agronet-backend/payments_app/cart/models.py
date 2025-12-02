from django.db import models
from agronet_auth.models import User
from learn_app.course.models import Course
from marketplace_app.product.models import Product

# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    course = models.ForeignKey(Course, null=True, on_delete=models.SET_NULL)
    quantity = models.PositiveIntegerField(default=1)
    created_time = models.DateTimeField(auto_now_add=True,blank=True, null=True)