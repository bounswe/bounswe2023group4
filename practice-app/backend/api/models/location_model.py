from django.db import models

class IPInfo(models.Model):
    
    country_code = models.CharField(max_length=10)
    country_name = models.CharField(max_length=50)
    