from django.urls import path, include
from rest_framework import routers
from api.viewsets.location_viewset import IPInfoViewSet

location_router = routers.DefaultRouter()
location_router.register('ipinfo', IPInfoViewSet)
