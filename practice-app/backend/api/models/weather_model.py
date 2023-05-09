from django.db import models


class Weather(models.Model):
    country = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    
    
