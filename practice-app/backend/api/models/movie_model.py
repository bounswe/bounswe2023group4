from django.db import models


class Movie(models.Model):
    Title = models.CharField(max_length=250)
    Year = models.CharField(max_length=4)
    imdbID = models.CharField(max_length=250)
    Type = models.CharField(max_length=250)


