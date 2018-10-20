
# coding: utf-8

# In[1]:


import numpy as np
import cv2 as ocv
import image_slicer
import os


# In[2]:


def variance_of_laplacian(image):
    return ocv.Laplacian(image, ocv.CV_64F).var() 


# In[3]:


def get_slices(image_path):
    image_slicer.slice(image_path, 9)
    slices = []
    row = []
    for i in range(3):
        for j in range(3):
            slice_path = image_path.split('.')[0] + '_0' + str(i+1) + '_0' +str(j+1) + '.png'
            slices.append(ocv.imread(slice_path))
            os.remove(slice_path)
    return slices


# In[4]:


# 0 = размытое изображение, 1 = чёткое изображение
def blur_detection(image_path):
    image = ocv.imread(image_path)
    if image.shape[0] > image.shape[1]:
        center = [1, 4, 7]
    else:
        center = [3, 4, 5]
        
    slices = get_slices(image_path)
    slices = [ocv.cvtColor(img, ocv.COLOR_BGR2GRAY) for img in slices]
    slices = [variance_of_laplacian(img) for img in slices]
    
    res = [val for i,val in enumerate(slices) if i in center]
    res = (res[0]*0.5 + res[1]*2 + res[2]*0.5) / 3
    
    if res > 100:
        return(1)
    else:
        return(0)


# In[5]:


# 0 = норма, -1 = недоэкспонированное, 1 = переэкспонированное
def expose(image_path):
    bright_thres = 0.3
    dark_thres = 0.4
    
    image = ocv.imread(image_path)
    gray = ocv.cvtColor(image, ocv.COLOR_BGR2GRAY)
    dark_part = ocv.inRange(gray, 0, 30)
    bright_part = ocv.inRange(gray, 220, 255)
    total_pixel = np.size(gray)
    dark_pixel = np.sum(dark_part > 0)
    bright_pixel = np.sum(bright_part > 0)
    if dark_pixel/total_pixel > bright_thres:
        return(-1)
    elif bright_pixel/total_pixel > dark_thres:
        return(1)
    else:
        return(0)


# In[6]:


def image_quality(image_path):
    return([expose(image_path), blur_detection(image_path)])

