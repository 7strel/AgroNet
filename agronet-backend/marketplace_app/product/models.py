import os
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db import models
from agronet_auth.models import User

# Create your models here.

# class Category(models.TextChoices):
#     VEGETABLES = 'Vegetables'
#     SEEDS = 'Seeds'
#     LIVESTOCK = 'Livestock'
#     FERTILIZER = 'Fertilizer'
#     GRAINS = 'Grains'
#     PESTICIDE = 'Pesticide'
#     FRESH = 'Fresh Produce'
#     EQUIPMENT = 'Farming Equipment'
#     FLOWERS = 'Flowers'

# Create your models here.
class Category(models.Model):
    parent = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, blank=False, null=False)
    avatar = models.ImageField(blank=True, upload_to='categories/')
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    class Meta:
        # db_table = 'categories'
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.title
    
    

def get_upload_to_products(instance, filename):

    return os.path.join('storage', 'products', 'images', filename)


class Product(models.Model):
    name = models.CharField(max_length=200, default="",blank=False)
    description = models.TextField(max_length=1000, default="",blank=False)
    price = models.DecimalField(max_digits=7, decimal_places=2,default=0)
    brand = models.CharField(max_length=50, null=True, blank=True)
    # category = models.CharField(max_length=40,choices=Category.choices, default="Vegetables")
    category = models.ManyToManyField(Category, blank=True, related_name='courses')
    ratings = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    stock = models.IntegerField(default=0)
    remaining_stock = models.IntegerField(default=0)
    # images = ArrayField(models.ImageField(blank=False,null=False, upload_to=get_upload_to_products))
    images = models.ImageField(blank=False,null=False, upload_to=get_upload_to_products)
    created_at=models.DateTimeField(auto_now_add=True)
    user = models.name = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)


    def __str__(self):
        return self.name
    


class Review(models.Model):
    product = models.ForeignKey(Product, null=True, on_delete=models.CASCADE,related_name='reviews')
    user = models.ForeignKey('agronet_auth.User', null=True, on_delete=models.SET_NULL)
    rating = models.IntegerField(default=0)
    comment = models.TextField(max_length=200)
    ceateAt=models.DateTimeField(auto_now_add=True)    

    def __str__(self):
        return self.comment