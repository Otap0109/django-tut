
from django.urls import path

from mainPage import admin
from mainPage.views import *


urlpatterns = [
    path('', MainHome.as_view(), name= 'home'),
    path('aboutus/', Aboutus, name= 'aboutus'),
    path('addArticle/', AddArticle.as_view(), name= 'addArticle'),
    path('post/<slug:post_slug>/', ShowPost.as_view(), name ='post'),
    path('category/<slug:cat_slug>/', ShowCategory.as_view(), name ='category'),
]
