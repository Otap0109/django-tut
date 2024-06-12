from rest_framework import serializers
from .models import Article, Category
from django.contrib.auth.models import User

class ArticleSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = "__all__"

    def get_category_name(self, obj):
        return obj.cat.name if obj.cat else None

    def create(self, validated_data):
        # Extract the user field from validated_data
        user = validated_data.pop('user', None)
        
        # Create the Article instance
        article = Article.objects.create(**validated_data)
        
        # If a user was provided, associate it with the article
        if user:
            article.user = user
            article.save()
        
        return article

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