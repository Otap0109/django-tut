from django import forms
from .models import *

class AddArticleForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['cat'].empty_label = 'Choose category'
    class Meta:
        model = Article
        fields = ['title', 'slug', 'description', 'image','published', 'cat']

    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) > 200:
            raise forms.ValidationError('Title needs to be less than 200 characters')
        return title