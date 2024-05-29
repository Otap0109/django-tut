from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from django.urls import include, path, re_path

from mainPage import admin
from mainPage.views import *

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'article', ArticleViewSet, basename = 'article')

urlpatterns = [
    path('', MainHome.as_view(), name= 'home'),
    path('aboutus/', Aboutus, name= 'aboutus'),
    # path('addArticle/', AddArticle.as_view(), name= 'addArticle'),
    # path('post/<slug:post_slug>/', ShowPost.as_view(), name ='post'),
    # path('category/<slug:cat_slug>/', ShowCategory.as_view(), name ='category'),
    path('api/v1/sesauth/', include('rest_framework.urls')),
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('api/v1/', include(router.urls)),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    ]
