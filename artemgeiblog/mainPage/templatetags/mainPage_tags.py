from django import template
from mainPage.models import * 

register = template.Library()

@register.simple_tag()
def get_cats():
    return Category.objects.all()

@register.simple_tag()
def get_articles():
    return Article.objects.all()