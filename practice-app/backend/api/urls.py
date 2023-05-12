from django.urls import path, include
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView
from api.views import (
    country_views,
    sport_views,
    weather_views,
    poll_views,
    user_views,
    exchange_rate_views,
    movie_views,
    location_views,
)
from api.routers.country_router import country_router
from api.routers.sport_router import league_season_router, standing_router
from api.routers.weather_router import weather_router
from api.routers.poll_router import poll_router
from api.routers.user_router import user_router
from api.routers.location_router import location_router
from api.routers.exchange_rate_router import exchange_rate_router
from api.routers.movie_router import Movie_router
from api.routers.sport_suggestion_router import sport_suggestion_router
from rest_framework import routers

router = routers.DefaultRouter()
router.registry.extend(Movie_router.registry)
router.registry.extend(country_router.registry)
router.registry.extend(league_season_router.registry)
router.registry.extend(standing_router.registry)
router.registry.extend(weather_router.registry)
router.registry.extend(location_router.registry)
router.registry.extend(exchange_rate_router.registry)
router.registry.extend(poll_router.registry)
router.registry.extend(user_router.registry)
router.registry.extend(sport_suggestion_router.registry)

urlpatterns = [
    path('api_schema',get_schema_view(title = 'API Schema', description = 'API documentation'), name = 'api_schema'),
    path('docs/', TemplateView.as_view( template_name='docs.html', extra_context={'schema_url':'api_schema'}), name='swagger-ui'),
    path('', include(router.urls)),
    path("countries_clearall/", country_views.ClearCountries.as_view()),
    path("countries_collect/", country_views.CollectData.as_view()),  
    path('polls_createPoll/', poll_views.createPoll.as_view()),
    path('polls_viewPoll/', poll_views.viewPoll.as_view()),
    path("league_seasons_collect/",sport_views.CollectData.as_view()),
    path("league_seasons_clearall/",sport_views.ClearLeagueSeasons.as_view()),
    path("weather_collect/", weather_views.GETWeather.as_view()),
    path("weather_new/", weather_views.POSTWeather.as_view()),
    path("weather_clearall/", weather_views.CLEARWeather.as_view()),
    path("location_collect/", location_views.GETLocation.as_view()),
    path("location_new/", location_views.POSTLocation.as_view()),
    path("location_clearall/", location_views.CLEARLocation.as_view()),
    path("exchange_rate_collect/", exchange_rate_views.GetExchangeRate.as_view()),
    path("exchange_rate_new/", exchange_rate_views.POSTExchangeRate.as_view()),
    path("exchange_rate_clear/",exchange_rate_views.ClearExchangeRates.as_view()),
    path("user-1_collect/",user_views.GetData.as_view()),
    path("user-1_new/", user_views.POSTUser.as_view()),
    path("user-1_clearall/", user_views.ClearUsers.as_view()),
    path("movie_fetch/", movie_views.searchMovie.as_view())

]