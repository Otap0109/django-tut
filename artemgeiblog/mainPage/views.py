from django.db.models.query import QuerySet
from django.forms import model_to_dict
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView
import time
from django.http import Http404, HttpResponse, HttpResponseNotFound
from django.shortcuts import get_object_or_404, redirect, render
import rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ArticleSerializer

from mainPage.forms import *
from mainPage.models import *
# Create your views here.

class BlogApiView(APIView):
    def get(self, request):
        lst = Article.objects.all()
        return Response({'posts': ArticleSerializer(lst, many=True).data})
    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post_new = Article.objects.create(
            title =request.data['title'],
            description =request.data['description'],
            cat =request.data['cat']
        )
        return Response({'post':ArticleSerializer(post_new).data})


# class BlogApiView(generics.ListAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer




class MainHome(ListView):
    model = Article
    template_name = 'mainPage/index.html'
    context_object_name = 'posts'
    
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title']= 'Home page'
        context['cat_selected'] = 0
        return context
    def get_queryset(self):
        return Article.objects.filter(published=True)



class ShowPost(DetailView):
    model = Article
    template_name = 'mainPage/post.html'
    slug_url_kwarg = 'post_slug'
    context_object_name = 'post'    
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title']= context['post']
        return context






class ShowCategory(ListView):
    model = Article
    template_name = 'mainPage/index.html'
    context_object_name = 'posts'
    allow_empty = False
    
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title']= 'Category ' + str(context['posts'][0].cat)
        context['cat_selected'] = context['posts'][0].cat_id
        return context
    def get_queryset(self):
        return Article.objects.filter(cat__slug=self.kwargs['cat_slug'], published=True)







def Aboutus(request):
    return render(request, 'mainPage/aboutus.html', {'title': 'About us'})





class AddArticle(CreateView):
    form_class = AddArticleForm
    template_name = 'mainPage/addArticle.html'
    success_url = reverse_lazy('home')
    
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title']= 'Add your article' 
        return context




# def AddArticle(request):
#     if request.method == 'POST':
#         form = AddArticleForm(request.POST, request.FILES)
#         if form.is_valid():
#             form.save()
#             return redirect('home')
           
#     else:       
#         form = AddArticleForm()
#     return render(request, 'mainPage/addArticle.html',{'title': 'Add your article', 'form': form})






def PageNotFound(request, exception):
    return HttpResponseNotFound('<h1>Page not found<h1/>')