
from django.urls import path

from mainPage import admin
from mainPage.views import Home, Aboutus, AddArticle, show_category, show_post


urlpatterns = [
    path('', Home, name= 'home'),
    path('aboutus/', Aboutus, name= 'aboutus'),
    path('add/', AddArticle, name= 'addArticle'),
    path('post/<slug:post_slug>/', show_post, name ='post'),
    path('category/<slug:cat_slug>/', show_category, name ='category'),
]
