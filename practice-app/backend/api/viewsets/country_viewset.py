from api.serializers.country_serializer import CountrySerializer
from api.models.country_model import Country
from rest_framework import viewsets


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    filterset_fields = ('name' ,'capital','population' ,'gdp')

