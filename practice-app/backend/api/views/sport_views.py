from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models.sport_model import League_Season,Standing
from api.serializers.sport_serializer import League_SeasonSerializer,StandingSerializer

import os
from dotenv import load_dotenv

import requests


class CollectData(APIView):

    def get(self,request):

        load_dotenv()

        LEAGUE_DATABASE_URL = os.getenv('LEAGUE_DATABASE_URL')
        STANDING_DATABASE_URL = os.getenv('STANDING_DATABASE_URL')
        DATABASE_KEY = os.getenv('SPORT_DATABASE_KEY')

        response = requests.get(LEAGUE_DATABASE_URL, headers={'x-apisports-key': DATABASE_KEY})

        if response.status_code == requests.codes.ok:
            data = response.json()

            league_seasons = data['response']
            for league_season in league_seasons:
                if league_season['league']['id'] in [39,135,203,78,61]:
                    _name = league_season['league']['name']
                    _country = league_season['country']['name']
                    _season = league_season['seasons'][0]['year']
                    new_league_s = League_Season.objects.create(name=_name,country=_country,season=_season)
                    response2 = requests.get(STANDING_DATABASE_URL,params={'league':league_season['league']['id'],"season":new_league_s.season},headers={'x-apisports-key': DATABASE_KEY})

                    if response2.status_code == requests.codes.ok:
                        data2 = response2.json()
                        standings = data2['response'][0]['league']['standings'][0]
                        for standing in standings:
                            _league_id = new_league_s.id
                            _rank = standing['rank']
                            _team = standing['team']['name']
                            _points = standing['points']
                            new_standing = Standing.objects.create(league_id = new_league_s,rank = _rank,team = _team,points = _points)
            
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=response.status_code)


