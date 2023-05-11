from django.db import models

class User(models.Model):
    user_id = models.IntegerField(primary_key=True)
    email = models.EmailField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    avatar = models.URLField()
