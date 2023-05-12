from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from api.models.sport_model import League_Season,Standing
from api.serializers.sport_serializer import League_SeasonSerializer,StandingSerializer

import os
from dotenv import load_dotenv

import requests


class ClearLeagueSeasons(APIView):
    serializer_class = League_SeasonSerializer

    def delete(self,request,id=None):
        league_seasons = League_Season.objects.all()
        league_seasons.delete()
        
        ClearStandings.delete(self,request)
        return Response(status=status.HTTP_204_NO_CONTENT)

class ClearStandings(APIView):
    serializer_class = StandingSerializer

    def delete(self,request):
        standings = Standing.objects.all()
        standings.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)


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
                if league_season['league']['id'] not in [39,135,203,78,61]:
                    continue

                new_league_s = create_LeagueSeason(league_season)
                response2 = requests.get(STANDING_DATABASE_URL,params={'league':league_season['league']['id'],"season":new_league_s.season},headers={'x-apisports-key': DATABASE_KEY})

                if response2.status_code != requests.codes.ok:
                    continue
                    
                data2 = response2.json()
                standings = data2['response'][0]['league']['standings'][0]
                for standing in standings:
                    create_Standing(standing,new_league_s)
            
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=response.status_code)

# Creates league season object from a dictionary and puts it in database
def create_LeagueSeason(league_season_dict):
    _name = league_season_dict['league']['name']
    _country = league_season_dict['country']['name']
    _season = league_season_dict['seasons'][0]['year']
    return League_Season.objects.create(name=_name,country=_country,season=_season)

# Creates league season object from a dictionary and puts it in database
def create_Standing(standing_dict,league_season):
    _rank = standing_dict['rank']
    _team = standing_dict['team']['name']
    _points = standing_dict['points']
    return Standing.objects.create(league_id = league_season,rank = _rank,team = _team,points = _points)


