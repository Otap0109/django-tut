from django.contrib import admin

from .models import *

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'time_create', 'published')
    list_display_links = ('id', 'title')
    search_fields = ('title', 'content')
    list_editable = ('published',)
    list_filter = ('time_create', 'published')
    prepopulated_fields = {'slug' : ('title',)}

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    prepopulated_fields = {'slug' : ('name',)}

admin.site.register(Article, ArticleAdmin)
admin.site.register(Category, CategoryAdmin)
