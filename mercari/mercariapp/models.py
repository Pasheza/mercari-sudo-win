from django.db import models
from django.core.validators import FileExtensionValidator


class Item(models.Model):
    # title = models.CharField(max_length=100)
    image = models.FileField(upload_to='uploads/',
                             validators=[FileExtensionValidator(allowed_extensions=['jpg', 'pdf'])])
