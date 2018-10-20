from django.http import HttpResponse
from django.shortcuts import render
import os

from .forms import UploadPhotoForm



def home(request):
    return render(request, 'home.html')


def new_item(request):
    if request.method == 'POST':
        file = request.FILES['file']
        newpath = '~/toSave/'
        if not os.path.exists(newpath):
            os.makedirs(newpath, 0o777)
        saveFile = open('~/toSave/' + file.name, 'w+')
        saveFile.write(str(file.read()))
        saveFile.close()
        return HttpResponse("""{"status":"OK"}""", status=200)
    else:
        form = UploadPhotoForm()
    return render(request, 'sell-page/index.html', {'form': form})
