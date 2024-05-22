import django.db.models.deletion
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"

    def create(self, validated_data):
        return Article.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.slug = validated_data.get("slug", instance.slug)
        instance.description = validated_data.get("description", instance.description)
        instance.image = validated_data.get("image", instance.image)
        instance.time_update = validated_data.get("time_update", instance.time_update)
        instance.published = validated_data.get("published", instance.published)
        instance.cat = validated_data.get("cat", instance.cat)
        instance.save()
        return instance