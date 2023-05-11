from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models.movie_model import Movie
from api.serializers.movie_serializer import MovieSerializer

import os
from dotenv import load_dotenv

import requests

class searchMovie(APIView):
    serializer_class = MovieSerializer
    def get(self,request,format=None):
        Movie_Key = Movie_Secret_Key
        url = 'http://www.omdbapi.com/?apikey=' + Movie + '&'


