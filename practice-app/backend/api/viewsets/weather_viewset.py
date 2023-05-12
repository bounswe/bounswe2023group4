from api.serializers.weather_serializer import WeatherSerializer
from api.models.weather_model import Weather
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class WeatherViewSet(viewsets.ModelViewSet):
    queryset = Weather.objects.all()
    serializer_class = WeatherSerializer
    filterset_fields = ('country' , 'name')

    @action(methods=['get'],detail=False)
    def data(self,request):
        weathers = Weather.objects.all()
        serializer = self.get_serializer_class()(weathers, many=True)
        return Response(serializer.data)