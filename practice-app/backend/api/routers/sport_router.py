from api.viewsets.sport_viewset import League_SeasonViewSet,StandingViewSet
from rest_framework import routers

league_season_router = routers.DefaultRouter()
league_season_router.register('league_seasons',League_SeasonViewSet)

standing_router = routers.DefaultRouter()
standing_router.register('standings',StandingViewSet)