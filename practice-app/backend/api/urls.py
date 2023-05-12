from django.urls import path,include
from rest_framework import routers
from api.routers.country_router import country_router
from api.routers.movie_router import Movie_router
from api.views import country_views, movie_views

router = routers.DefaultRouter()
router.registry.extend(Movie_router.registry)
router.registry.extend(country_router.registry)

urlpatterns = [
    path('', include(Movie_router.urls)),
    path("countries_clearall/", country_views.ClearCountries.as_view()),
    path("countries_collect/", country_views.CollectData.as_view()),  
    path("movies/find/", movie_views.searchMovie.as_view()),
]