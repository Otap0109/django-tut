from django import forms
from .models import *

class AddArticleForm(forms.Form):
    title = forms.CharField(max_length=255)
    slug = forms.SlugField(max_length=255, label="URL")
    description = forms.CharField(widget=forms.Textarea(attrs={'cols': 60, 'rows': 10}))
    published = forms.BooleanField(required=False)
    cat = forms.ModelChoiceField(queryset=Category.objects.all(), empty_label='choose category')