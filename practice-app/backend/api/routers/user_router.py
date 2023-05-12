from api.viewsets.user_viewset import UserViewSet
from rest_framework import routers

user_router = routers.DefaultRouter()
user_router.register('users',UserViewSet)