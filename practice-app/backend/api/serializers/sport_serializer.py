from rest_framework import serializers
from api.models.sport_model import League_Season,Standing

class League_SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = League_Season
        fields = ('id','name','country','season')

class StandingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Standing
        fields = ('league_id','rank','team','points')