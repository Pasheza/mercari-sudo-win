import os


path = './mercariapp/static/toSave'

def photo_handler(f):
    # Insert some shit here
    if not os.path.exists(path):
        os.makedirs(path, 0o777)
    with open(path + '/' + f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
