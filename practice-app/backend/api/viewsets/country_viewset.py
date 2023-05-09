from api.serializers.country_serializer import CountrySerializer
from api.models.country_model import Country
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    filterset_fields = ('name' , 'gdp')
