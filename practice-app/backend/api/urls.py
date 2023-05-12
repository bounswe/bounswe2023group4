from django.urls import path,include

from api.views import country_views, sport_views, weather_views
from rest_framework import routers
from api.routers.poll_router import poll_router
from rest_framework.schemas import get_schema_view 
from django.views.generic import TemplateView



from api.views import country_views, sport_views, weather_views, poll_views, movie_views
from api.routers.country_router import country_router
from api.routers.sport_router import league_season_router,standing_router
from api.routers.weather_router import weather_router
from api.routers.movie_router import Movie_router
from rest_framework import routers
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.registry.extend(Movie_router.registry)
router.registry.extend(country_router.registry)
router.registry.extend(league_season_router.registry)
router.registry.extend(standing_router.registry)
router.registry.extend(weather_router.registry)


router = routers.DefaultRouter()
router.registry.extend(poll_router.registry)
router.registry.extend(country_router.registry)

urlpatterns = [
    path('api_schema',get_schema_view(title = 'API Schema', description = 'API documentation'), name = 'api_schema'),
    path('docs/', TemplateView.as_view( template_name='docs.html', extra_context={'schema_url':'api_schema'}), name='swagger-ui'),
    path('', include(router.urls)),
    path('api_schema',get_schema_view(title = 'API Schema', description = 'API documentation'), name = 'api_schema'),
    path('docs/', TemplateView.as_view( template_name='docs.html', extra_context={'schema_url':'api_schema'}), name='swagger-ui'),
    path("countries_clearall/", country_views.ClearCountries.as_view()),
    path("countries_collect/", country_views.CollectData.as_view()),  
    path('polls_createPoll/', poll_views.createPoll.as_view()),
    path('polls_viewPoll/', poll_views.viewPoll.as_view()),
    path("league_seasons_collect/",sport_views.CollectData.as_view()),
    path("weather_collect/", weather_views.GETWeather.as_view()),
    path("weather_new/", weather_views.POSTWeather.as_view()),
    path("weather_clearall/", weather_views.CLEARWeather.as_view())

]