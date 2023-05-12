from django.db import models

class SportSuggestion(models.Model):
    id = models.AutoField(primary_key= True)
    suggestion = models.CharField(max_length = 255)