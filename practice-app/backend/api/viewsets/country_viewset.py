from api.serializers.country_serializer import CountrySerializer
from api.models.country_model import Country
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    #filter_backends = (DjangoFilterBackend,'django_filters.rest_framework.DjangoFilterBackend')
    filterset_fields = ('name' , 'gdp')

    @action(methods=['get'],detail=False)
    def data(self,request):
        countries = Country.objects.all()
        serializer = self.get_serializer_class()(countries, many=True)
        return Response(serializer.data)
