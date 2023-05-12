from rest_framework import serializers
from api.models.weather_model import Weather

class WeatherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weather
        fields = ('country','name','description', 'main', 'temp', 'windspeed')