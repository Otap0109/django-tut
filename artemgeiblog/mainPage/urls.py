
from django.urls import include, path

from mainPage import admin
from mainPage.views import *

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'article', ArticleViewSet, basename = 'article')

urlpatterns = [
    path('', MainHome.as_view(), name= 'home'),
    path('aboutus/', Aboutus, name= 'aboutus'),
    path('addArticle/', AddArticle.as_view(), name= 'addArticle'),
    path('post/<slug:post_slug>/', ShowPost.as_view(), name ='post'),
    path('category/<slug:cat_slug>/', ShowCategory.as_view(), name ='category'),
    path('api/v1/', include(router.urls)),
    ]
