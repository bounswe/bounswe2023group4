from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models.location_model import IPInfo
from api.serializers.location_serializer import IPInfoSerializer

import os
from dotenv import load_dotenv

import requests
#3rd party API 
class GETLocation(APIView):

    def get(self,request):

        load_dotenv()

        DATABASE_URL = os.getenv('LOCATION_DATABASE_URL')
        DATABASE_KEY = os.getenv('LOCATION_KEY')
        LOC_IP= os.getenv('LOC_IP')
        
        response = requests.get("http://api.ipstack.com/134.201.250.155", params = {'access_key': DATABASE_KEY})

        if response.status_code == requests.codes.ok:
            print(response.text)
            data = response.json()
            location_json = data
            
            _country_code = location_json["country_code"]
            _country_name = location_json["country_name"]
            location = IPInfo.objects.create(country_code=_country_code,country_name =_country_name)
            return Response(IPInfoSerializer(location).data,status=status.HTTP_201_CREATED)
        else:
            return Response(status=response.status_code)
        

class POSTLocation(APIView):
    serializer_class = IPInfoSerializer

    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.query_params)
        print("Recieved Data : ", request.query_params)
        try:
            if serializer.is_valid():
                print("Recieved Name : ", serializer.data.get('name'))
                country_code = serializer.data.get('country_code')
                country_name = serializer.data.get('country_name')

                
                new_location = IPInfo.objects.create(country_code=country_code,country_name=country_name)
                return Response(IPInfoSerializer(new_location).data,status.HTTP_201_CREATED)
            else:
                return Response(status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)

class CLEARLocation(APIView):
    serializer_class = IPInfoSerializer

    def delete(self,request,id=None):
        location = IPInfo.objects.all()
        location.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)