from api.serializers.sport_serializer import League_SeasonSerializer,StandingSerializer
from api.models.sport_model import League_Season,Standing
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class League_SeasonViewSet(viewsets.ModelViewSet):
    queryset = League_Season.objects.all()
    serializer_class = League_SeasonSerializer
    filterset_fields = ('id' , 'name', 'season')

class StandingViewSet(viewsets.ModelViewSet):
    queryset = Standing.objects.all()
    serializer_class = StandingSerializer
    filterset_fields = ('league_id' , 'rank', 'team')

