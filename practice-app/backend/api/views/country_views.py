from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models.country_model import Country
from api.serializers.country_serializer import CountrySerializer

import os
from dotenv import load_dotenv

import requests

class CreateCountry(APIView):
    serializer_class = CountrySerializer

    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.query_params)
        print("Recieved Data : ", request.query_params)
        try:
            if serializer.is_valid():
                print("Recieved Name : ", serializer.data.get('name'))
                name = serializer.data.get('name')
                capital = serializer.data.get('capital')
                population = serializer.data.get('population')
                gdp = serializer.data.get('gdp')
                new_country = Country.objects.create(name=name,capital=capital,population=population,gdp=gdp)
                return Response(CountrySerializer(new_country).data,status.HTTP_201_CREATED)
            else:
                return Response(status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)

class ClearCountries(APIView):
    serializer_class = CountrySerializer

    def delete(self,request,id=None):
        countries = Country.objects.all()
        countries.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

# This view is an example for 3rd party API request and creating object in database
class CollectData(APIView):

    def get(self,request):

        load_dotenv()

        DATABASE_URL = os.getenv('COUNTRY_DATABASE_URL')
        DATABASE_KEY = os.getenv('COUNTRY_DATABASE_KEY')

        response = requests.get(DATABASE_URL, headers={'X-Api-Key': DATABASE_KEY})

        if response.status_code == requests.codes.ok:
            print(response.text)
            data = response.json()
            country_json = data
            for country in country_json:
                _name = country_json['name']
                _capital = country_json['capital']
                _population = country_json['population']
                _gdp = country_json['gdp']
                country = Country.objects.create(name=_name,capital=_capital,population=_population,gdp=_gdp)
            return Response(CountrySerializer(country).data,status=status.HTTP_201_CREATED)
        else:
            return Response(status=response.status_code)


