from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models.weather_model import Weather
from api.serializers.weather_serializer import WeatherSerializer

import os
from dotenv import load_dotenv

import requests

class GETWeather(APIView):

    def get(self,request):

        load_dotenv()

        DATABASE_URL = os.getenv('WEATHER_DATABASE_URL')
        DATABASE_KEY = os.getenv('WEATHER_KEY')

        response = requests.get(DATABASE_URL)

        if response.status_code == requests.codes.ok:
            print(response.text)
            data = response.json()
            weather_json = data[0]

            _country = weather_json['sys']
            _name = weather_json['name']
            _description = weather_json['weather']
            #country = Country(name=_name, capital=_capital, population=_population, gdp=_gdp)
            weather = Weather.objects.create(_country=_country,name=_name,_description=_description)
            return Response(WeatherSerializer(weather).data,status=status.HTTP_201_CREATED)
        else:
            return Response(status=response.status_code)