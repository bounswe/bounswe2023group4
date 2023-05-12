from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models.weather_model import Weather
from api.serializers.weather_serializer import WeatherSerializer

import os
from dotenv import load_dotenv

import requests
#3rd party API 
class GETWeather(APIView):

    def get(self,request):

        load_dotenv()

        DATABASE_URL = os.getenv('WEATHER_DATABASE_URL')
        DATABASE_KEY = os.getenv('WEATHER_KEY')

        
        response = requests.get(DATABASE_URL, params = {'q':'İstanbul, TR','lang':'tr', 'appid': DATABASE_KEY})

        if response.status_code == requests.codes.ok:
            print(response.text)
            data = response.json()
            weather_json = data
            
            _country = weather_json['sys']['country']
            _name = weather_json['name']
            _description = weather_json['weather'][0]['description']
            _main = weather_json['weather'][0]['main']
            _temp = weather_json['main']['temp']
            _windspeed = weather_json['wind']['speed']
            weather = Weather.objects.create(country=_country,name=_name,description=_description,main=_main,temp=_temp,windspeed=_windspeed)
            return Response(WeatherSerializer(weather).data,status=status.HTTP_201_CREATED)
        else:
            return Response(status=response.status_code)
        

class POSTWeather(APIView):
    serializer_class = WeatherSerializer

    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.query_params)
        print("Recieved Data : ", request.query_params)
        try:
            if serializer.is_valid():
                print("Recieved Name : ", serializer.data.get('name'))
                country = serializer.data.get('country')
                name = serializer.data.get('name')
                description = serializer.data.get('description')
                main = serializer.data.get('main')
                temp = serializer.data.get('temp')
                windspeed = serializer.data.get('windspeed')
                
                new_weather = Weather.objects.create(country=country,name=name,description=description,main=main,temp=temp,windspeed=windspeed)
                return Response(WeatherSerializer(new_weather).data,status.HTTP_201_CREATED)
            else:
                return Response(status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)

class CLEARWeather(APIView):
    serializer_class = WeatherSerializer

    def delete(self,request,id=None):
        weather = Weather.objects.all()
        weather.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)