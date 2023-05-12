from django.db import models


class ExchangeRate(models.Model):
    from_currency = models.CharField(max_length=50)
    to_currency = models.CharField(max_length=50)
    date = models.DateField()
    amount = models.IntegerField(default= 1)
    rate = models.IntegerField(default= 1)