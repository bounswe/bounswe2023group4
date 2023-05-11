from django.urls import path,include
from api.views import country_views
from api.routers.country_router import country_router

urlpatterns = [
    path('', include(country_router.urls)),
    path("countries_clearall/", country_views.ClearCountries.as_view()),
    path("countries_collect/", country_views.CollectData.as_view()),
]