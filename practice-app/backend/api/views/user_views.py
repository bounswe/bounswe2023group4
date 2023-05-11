from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models.user_model import User
from api.serializers.user_serializer import UserSerializer

import os
from dotenv import load_dotenv

import requests

class ClearUsers(APIView):
    serializer_class = UserSerializer

    def delete(self,request,id=None):
        users = User.objects.all()
        users.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

# This view is an example for 3rd party API request and creating object in database
class GetData(APIView):

    def get(self,request):

        load_dotenv()

        DATABASE_URL = os.getenv('USER_DATABASE_URL')

        response = requests.get(DATABASE_URL, params={'page':1})

        if response.status_code == requests.codes.ok:
            print(response.text)
            data = response.json()
            user_json = data

            _user_id = user_json['data'][0]['id']
            _email = user_json['data'][0]['email']
            _first_name = user_json['data'][0]['first_name']
            _last_name = user_json['data'][0]['last_name']
            _avatar = user_json['data'][0]['avatar']

            user = User.objects.create(user_id=_user_id,email=_email,first_name=_first_name,last_name=_last_name,avatar=_avatar)
            return Response(UserSerializer(user).data,status=status.HTTP_201_CREATED)
        else:
            return Response(status=response.status_code)


