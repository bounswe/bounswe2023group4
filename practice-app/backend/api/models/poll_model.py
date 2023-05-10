from django.db import models
# Create your models here.

class Poll(models.Model):
    question = models.CharField(max_length=255)
    firstOption = models.CharField(max_length = 255)
    secondOption = models.CharField(max_length = 255)
    thirdOption = models.CharField(max_length=255, null= True)
    fourthOption = models.CharField(max_length=255, null= True)