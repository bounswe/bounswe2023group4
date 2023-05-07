from django.db import models


class Country(models.Model):
    name = models.CharField(max_length=50)
    capital = models.CharField(max_length=50)
    population = models.IntegerField(default= 0)
    gdp = models.IntegerField(default= 0)



