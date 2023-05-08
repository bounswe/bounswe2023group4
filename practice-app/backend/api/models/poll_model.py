from django.db import models
# Create your models here.

class Poll(models.Model):
    question = models.CharField(max_length=1000)
    firstOption = models.CharField(max_length = 300)
    secondOption = models.CharField(max_length = 300)
    thirdOption = models.CharField(max_length=300, null= True)
    fourthOption = models.CharField(max_length=300, null= True)
