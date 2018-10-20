from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from .forms import ItemForm, UploadPhotoForm
from .handler import photo_handler


def home(request):
    return render(request, 'home.html')


def new_item(request):
    if request.method == 'POST':
        form = UploadPhotoForm(request.POST, request.FILES)
        if form.is_valid():
            print('Success')
            return render(request, 'success_upload.html', {'filename': photo_handler(request.FILES['file'])})
        print('Fuck you!')

    else:
        form = UploadPhotoForm()
    return render(request, 'sell-page/index.html', {'form': form})
