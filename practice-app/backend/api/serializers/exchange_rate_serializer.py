from rest_framework import serializers
from api.models.exchange_rate_model import ExchangeRate

class ExchangeRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExchangeRate
        fields = ('from_currency','to_currency','date','amount','rate')