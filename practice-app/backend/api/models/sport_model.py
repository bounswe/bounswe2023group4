from django.db import models


class League_Season(models.Model): 
    id = models.AutoField(primary_key= True)
    name = models.CharField(max_length=50,null=False)
    country = models.CharField(max_length=50,null=False)
    season = models.IntegerField(default= 0,null=False)
    
class Standing(models.Model):
    league_id = models.ForeignKey(League_Season,default=None,on_delete=models.CASCADE,null=False)
    rank = models.IntegerField(default=0,null=False)
    team = models.CharField(max_length=50,null=False)
    points = models.IntegerField(default=0,null=False)



