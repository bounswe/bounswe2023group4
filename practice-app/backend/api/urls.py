from django.urls import path,include
from api.views import country_views, exchange_rate_views
from rest_framework import routers
from api.routers.country_router import country_router
from api.routers.exchange_rate_router import exchange_rate_router

router = routers.DefaultRouter()
router.registry.extend(country_router.registry)
router.registry.extend(exchange_rate_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path("countries_clearall/", country_views.ClearCountries.as_view()),
    path("countries_collect/", country_views.CollectData.as_view()),
    path("exchange_rate_collect/", exchange_rate_views.GetExchangeRate.as_view()),
    path("exchange_rate_clear/",exchange_rate_views.ClearExchangeRates.as_view()),
]