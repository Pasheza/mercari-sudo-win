from django import forms
from .models import Item

# Make Model for item, maybe use ImageField


class UploadPhotoForm(forms.Form):
    file = forms.FileField()


class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['image']
