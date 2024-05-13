
from django.urls import path

from mainPage import admin
from mainPage.views import Home, Aboutus, AddArticle, show_category, show_post


urlpatterns = [
    path('', Home, name= 'home'),
    path('aboutus/', Aboutus, name= 'aboutus'),
    path('add/', AddArticle, name= 'AddArticle'),
    path('post/<slug:post_slug>/', show_post, name ='post'),
    path('category/<int:cat_id>/', show_category, name ='category'),
]
