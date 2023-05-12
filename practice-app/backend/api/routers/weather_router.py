from api.viewsets.weather_viewset import WeatherViewSet
from rest_framework import routers

weather_router = routers.DefaultRouter()
weather_router.register('weathers',WeatherViewSet) 