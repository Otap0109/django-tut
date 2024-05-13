import time
from django.http import Http404, HttpResponse, HttpResponseNotFound
from django.shortcuts import get_object_or_404, render

from mainPage.models import *


# Create your views here.

def Home(request):
    posts = Article.objects.all()
    cats = Category.objects.all()
    context ={
        'posts' : posts,
        'cats' : cats,
        'title': 'Articles',
        'cat_selected' : 0,
        }
    return render(request, 'mainPage/index.html', context=context)
def Aboutus(request):
    return render(request, 'mainPage/aboutus.html', {'title': 'About us'})
def AddArticle(request):
    return HttpResponse('Add your article')
def show_post(request, post_slug):
    post = get_object_or_404(Article, slug=post_slug)
    context ={
        'post' : post,
        'title': post.title,
        'cat_selected' : post.cat_id,
        }
    
    return render(request, 'mainPage/post.html', context=context)

def show_category(request, cat_id):
    posts = Article.objects.filter(cat_id=cat_id)
    cats = Category.objects.all()


    context={
        'posts' : posts,
        'cats' : cats,
        'title': 'Articles',
        'cat_selected' : cat_id,
    }

    return render(request, 'mainPage/index.html', context= context)


def PageNotFound(request, exception):
    return HttpResponseNotFound('<h1>Page not found<h1/>')