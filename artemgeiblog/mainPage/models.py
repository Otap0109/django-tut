from django.contrib.auth.models import User
from django.db import models
from django.urls import reverse
    

class Article(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')
    description = models.TextField()
    image = models.ImageField(upload_to='photos/%Y/%m/%d/', null=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)
    cat = models.ForeignKey('Category', on_delete=models.PROTECT, verbose_name= 'Category', null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__ (self):
        return self.title
    def get_absolute_url(self):
        return reverse('post', kwargs={'post_slug': self.slug})
    class Meta:
        ordering=['time_create', 'title']


class Category(models.Model):
    name = models.CharField(max_length=10, db_index= True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, verbose_name='URL')
    def __str__ (self):
        return self.name
    def get_absolute_url(self):
        return reverse('category', kwargs={'cat_slug': self.slug})
    



