from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models.exchange_rate_model import ExchangeRate
from api.serializers.exchange_rate_serializer import ExchangeRateSerializer

import os
from dotenv import load_dotenv

import requests

class ClearExchangeRates(APIView):
    serializer_class = ExchangeRateSerializer

    def delete(self,request,id=None):
        exchange_rates = ExchangeRate.objects.all()
        exchange_rates.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

# This view is an example for 3rd party API request and creating object in database
class GetExchangeRate(APIView):

    def get(self,request):

        load_dotenv()

        DATABASE_URL = os.getenv('EXCHANGE_RATE_DATABASE_URL')

        response = requests.get(DATABASE_URL, params={'from':'USD','to':'TRY','amount':1})

        if response.status_code == requests.codes.ok:
            print(response.text)
            data = response.json()
            exchange_rate_json = data

            _from_currency = exchange_rate_json['query']['from']
            _to_currency = exchange_rate_json['query']['to']
            _date = exchange_rate_json['date']
            _amount = exchange_rate_json['query']['amount']
            _rate = exchange_rate_json['info']['rate']

            exchange_rate = ExchangeRate.objects.create(from_currency = _from_currency, to_currency =_to_currency, date = _date, amount = _amount, rate = _rate)
            return Response(ExchangeRateSerializer(exchange_rate).data,status=status.HTTP_201_CREATED)
        else:
            return Response(status=response.status_code)

class POSTExchangeRate(APIView):
    serializer_class = ExchangeRateSerializer

    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.query_params)
        print("Recieved Data : ", request.query_params)
        try:
            if serializer.is_valid():
                from_currency = serializer.data.get('from_currency')
                to_currency = serializer.data.get('to_currency')
                date = serializer.data.get('date')
                amount = serializer.data.get('amount')
                rate = serializer.data.get('rate')
                
                new_exchange_rate = ExchangeRate.objects.create(from_currency=from_currency,to_currency=to_currency,date=date,amount=amount,rate=rate)
                return Response(ExchangeRateSerializer(new_exchange_rate).data,status.HTTP_201_CREATED)
            else:
                return Response(status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)

