import time
from django.http import Http404, HttpResponse, HttpResponseNotFound
from django.shortcuts import get_object_or_404, redirect, render

from mainPage.forms import *
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
    if request.method == 'POST':
        form = AddArticleForm(request.POST)
        if form.is_valid():
            try:
                Article.objects.create(**form.cleaned_data)
                return redirect('home')
            except:
                form.add_error(None, 'Can not add this post')
    else:       
        form = AddArticleForm()
    return render(request, 'mainPage/addArticle.html',{'title': 'Add your article', 'form': form})


def show_post(request, post_slug):
    post = get_object_or_404(Article, slug=post_slug)
    context ={
        'post' : post,
        'title': post.title,
        'cat' : post.cat,
        }
    
    return render(request, 'mainPage/post.html', context=context)

def show_category(request, cat_slug):
    posts = Article.objects.filter(slug=cat_slug)
    cats = Category.objects.all()


    context={
        'posts' : posts,
        'cats' : cats,
        'title': 'Articles',
        'cat_selected' : cat_slug,
    }

    return render(request, 'mainPage/index.html', context= context)


def PageNotFound(request, exception):
    return HttpResponseNotFound('<h1>Page not found<h1/>')