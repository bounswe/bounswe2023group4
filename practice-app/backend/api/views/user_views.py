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

class POSTUser(APIView):
    serializer_class = UserSerializer

    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.query_params)
        try:
            if serializer.is_valid():
                user_id = serializer.data.get('user_id')
                email = serializer.data.get('email')
                first_name = serializer.data.get('first_name')
                last_name = serializer.data.get('last_name')
                avatar = serializer.data.get('avatar')
                
                new_user = User.objects.create(user_id=user_id,email=email,first_name=first_name,last_name=last_name,avatar=avatar)
                return Response(UserSerializer(new_user).data,status.HTTP_201_CREATED)
            else:
                return Response(status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)



