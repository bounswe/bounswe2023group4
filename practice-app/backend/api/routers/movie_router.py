from api.viewsets.movie_viewset import MovieViewSet
from rest_framework import routers

Movie_router = routers.DefaultRouter()
Movie_router.register('movie',MovieViewSet)