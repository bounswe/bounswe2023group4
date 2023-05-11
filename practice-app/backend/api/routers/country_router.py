from api.viewsets.country_viewset import CountryViewSet
from rest_framework import routers

country_router = routers.DefaultRouter()
country_router.register('countries',CountryViewSet)
