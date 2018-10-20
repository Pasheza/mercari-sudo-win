import os
from .Mercari_IP import image_quality

path = './mercariapp/static/toSave'


def photo_handler(f):
    # Insert some shit here
    if not os.path.exists(path):
        os.makedirs(path, 0o777)
    with open(path + '/' + f.name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)
    fullpath = path + '/' + f.name
    result = image_quality(fullpath)
    # [-1, 0] 100
    # [0, 0] 101
    # [1, 0] 102
    # [-1, 1] 103
    # [0, 1] 104
    # [1, 1] 105
    if result[0] == -1 and result[1] == 0:
        return 100
    elif result[0] == 0 and result[1] == 0:
        return 101
    elif result[0] == 1 and result[1] == 0:
        return 102
    elif result[0] == -1 and result[1] == 1:
        return 103
    elif result[0] == 0 and result[1] == 1:
        return 104
    elif result[0] == 1 and result[1] == 1:
        return 105
