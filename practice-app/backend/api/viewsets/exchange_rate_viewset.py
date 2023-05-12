from api.serializers.exchange_rate_serializer import ExchangeRateSerializer
from api.models.exchange_rate_model import ExchangeRate
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class ExchangeRateViewSet(viewsets.ModelViewSet):
    queryset = ExchangeRate.objects.all()
    serializer_class = ExchangeRateSerializer
    filterset_fields = ('from_currency' , 'to_currency', 'date', 'amount')

    @action(methods=['get'],detail=False)
    def data(self,request):
        exchange_rates = ExchangeRate.objects.all()
        serializer = self.get_serializer_class()(exchange_rates, many=True)
        return Response(serializer.data)
