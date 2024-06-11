import django.db.models.deletion
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from .models import *


class ArticleSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    category_name = serializers.SerializerMethodField()
    class Meta:
        model = Article
        fields = "__all__"


    def get_category_name(self, obj):
        return obj.cat.name if obj.cat else None

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


        # fields = ['title', 'description', 'image', 'user', 'category_name']     
    #   def to_representation(self, instance):
    #     # Call the original `to_representation` method to get the field data
    #     representation = super().to_representation(instance)
    #     # Remove specific fields
    #     representation.pop('user', None) # Remove 'slug' field
    #     return representation