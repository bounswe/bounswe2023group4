from django.urls import path,include
from api.views import country_views
from api.routers.country_router import country_router

urlpatterns = [
    path('', include(country_router.urls)),
    path("countries/new/", country_views.CreateCountry.as_view()),
    path("countries/clearall/", country_views.ClearCountries.as_view()),
    path("countries/collect/", country_views.CollectData.as_view()),
]