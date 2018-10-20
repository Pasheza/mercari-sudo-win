# from keras.models import Sequential
# from keras.layers import Conv2D
# from keras.layers import MaxPooling2D
# from keras.layers import Flatten
# from keras.layers import Dense
import json
import requests
from PIL import Image
import io


f_name = 'phones-category.json'
def get_dataset():
    df = []
    cats = set()
    with open(f_name) as f:
        data = json.load(f)
        for category in data:
            category_id = int(category['categoryName'].split('/')[-2])
            category_name = category['categoryName'].split(' https')[0]
            cats.add(category_name)
            img_id = 0
            for img in category['imagesUrls']:
                df.append({'url': img, 'category': category_id, 'category_name': category_name})
                response = requests.get(img)
                img_pil = Image.open(io.BytesIO(response.content))
                img_pil.save('{cat_name}/{id}.png'.format(cat_name=category_name, id=str(img_id)), "PNG")
                img_id = img_id + 1
            print('{category} - {imgs}'.format(category=category_name, imgs=img_id - 1))

    print(cats)
    return df

print(get_dataset()[10])


# # Initialising the CNN
# classifier = Sequential()
#
# # Step 1 - Convolution
# classifier.add(Conv2D(32, (3, 3), input_shape=(64, 64, 3), activation='relu'))
#
# # Step 2 - Pooling
# classifier.add(MaxPooling2D(pool_size=(2, 2)))
#
# # Adding a second convolutional layer
# classifier.add(Conv2D(32, (3, 3), activation='relu'))
# classifier.add(MaxPooling2D(pool_size=(2, 2)))
#
# # Step 3 - Flattening
# classifier.add(Flatten())
#
# # Step 4 - Full connection
# classifier.add(Dense(units=128, activation='relu'))
# classifier.add(Dense(units=1, activation='sigmoid'))
#
# # Compiling the CNN
# classifier.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Part 2 - Fitting the CNN to the images

# from keras.preprocessing.image import ImageDataGenerator
#
# train_datagen = ImageDataGenerator(rescale=1./255,
#                                    shear_range=0.2,
#                                    zoom_range=0.2,
#                                    horizontal_flip=True)
#
# test_datagen = ImageDataGenerator(rescale=1./255)
#
# training_set = train_datagen.flow_from_directory('dataset/training_set',
#                                                  target_size=(64, 64),
#                                                  batch_size=32,
#                                                  class_mode='binary')
# 
# test_set = test_datagen.flow_from_directory('dataset/test_set',
#                                             target_size=(64, 64),
#                                             batch_size=32,
#                                             class_mode='binary')
#
# classifier.fit_generator(training_set,
#                          steps_per_epoch=8000,
#                          epochs=25,
#                          validation_data=test_set,
#                          validation_steps=2000)
#
