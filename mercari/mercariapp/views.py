from django.http import HttpResponse
from django.shortcuts import render
from .forms import UploadPhotoForm
from .handler import photo_handler
import os

from .forms import UploadPhotoForm



def home(request):
    return render(request, 'home.html')


def new_item(request):
    if request.method == 'POST':
        form = UploadPhotoForm(request.POST, request.FILES)
        if form.is_valid():
            photo_handler(request.FILES['file'])
            return HttpResponse("""{"status":"OK"}""", status=200)
    else:
        form = UploadPhotoForm()
    return render(request, 'sell-page/index.html', {'form': form})
