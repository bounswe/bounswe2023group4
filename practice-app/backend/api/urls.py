from django.urls import path,include
from api.views import country_views, weather_views
from rest_framework import routers
from api.routers.country_router import country_router
from api.routers.weather_router import weather_router

router = routers.DefaultRouter()
router.registry.extend(country_router.registry)
router.registry.extend(weather_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path("countries_new/", country_views.CreateCountry.as_view()),
    path("countries_clearall/", country_views.ClearCountries.as_view()),
    path("countries_collect/", country_views.CollectData.as_view()),
    path("weather_collect/", weather_views.GETWeather.as_view()),
    path("weather_new/", weather_views.POSTWeather.as_view()),
    path("weather_clearall/", weather_views.CLEARWeather.as_view())
]