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
        url = 'http://www.omdbapi.com/?apikey=' + Movie_Key + '&'
        imdbID = request.GET.get("imdbID")
        Title = request.GET.get("Title")
        Year = request.GET.get("Year")
        payload = {}
        if (imdbID != ''):
            payload.update({'i':imdbID})
        if (Title != ''):
            payload.update({'t': Title})        
        if (Year != ''):
            payload.update({'y': Year})
        
        response = requests.get(url, params=payload)
        if (response.status_code == 200):
            data = response.json
            response_title = data['Title']
            response_year = data['Year']
            response_imdb = data['imdbID']
            response_type = data['Type']
            new_movie= Movie.objects.create(Title = response_title, Year = response_year, imdbID = response_imdb, Type = response_type)
            return Response(MovieSerializer(new_movie).data,status=status.HTTP_201_CREATED)
        else:
            Response(status.HTTP_406_NOT_ACCEPTABLE)

