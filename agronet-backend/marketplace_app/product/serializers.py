from rest_framework import serializers
from .models import Product, Review, Category

class ProductSerializer(serializers.ModelSerializer):
    #data that we want to make it in the form of JSON
    class Meta: 
        model = Product
        fields = "__all__"
        # fields = ('name', 'price') spécifier dans JSON what we want to return


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
    


        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
          model = Review
          fields = "__all__"
          