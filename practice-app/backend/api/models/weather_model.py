from django.db import models


class Weather(models.Model):
    country = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    main = models.CharField(max_length=50)
    temp = models.DecimalField(max_digits=15,decimal_places=5)
    windspeed = models.DecimalField(max_digits=15,decimal_places=5)
    
