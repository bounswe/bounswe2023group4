from api.viewsets.exchange_rate_viewset import ExchangeRateViewSet
from rest_framework import routers

exchange_rate_router = routers.DefaultRouter()
exchange_rate_router.register('exchange_rates', ExchangeRateViewSet)