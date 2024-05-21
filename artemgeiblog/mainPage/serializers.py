from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from .models import Article



# class ArticleModel:
#     def __init__(self, title, description):
#         self.title = title
#         self.description = description





class ArticleSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    slug = serializers.SlugField()
    description = serializers.CharField()
    image = serializers.ImageField()
    time_create = serializers.DateTimeField(read_only=True)
    time_update = serializers.DateTimeField(read_only=True)
    published = serializers.BooleanField(default=False)
    cat = serializers.CharField()

# def encode():
#     model = ArticleModel('xuj', 'description : xujdesc')
#     model_sr = ArticleSerializer(model)
#     print(model_sr.data, type(model_sr.data))
#     json = JSONRenderer().render(model_sr.data)
#     print(json)
