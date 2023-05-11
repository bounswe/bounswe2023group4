from django.urls import path,include
from api.views import movie_views
from api.routers.movie_router import Movie_router

urlpatterns = [
    path('', include(Movie_router.urls)),
    path("movies/find/", movie_views.searchMovie.as_view()),
]