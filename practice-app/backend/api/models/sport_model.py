from django.db import models


class League_Season(models.Model): 
    id = models.AutoField(primary_key= True)
    name = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    season = models.IntegerField(default= 0)
    
class Standing(models.Model):
    league_id = models.ForeignKey(League_Season,default=None,on_delete=models.CASCADE)
    rank = models.IntegerField(default=0)
    team = models.CharField(max_length=50)
    points = models.IntegerField(default=-1)



