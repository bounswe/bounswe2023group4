from django.urls import path,include
from api.views import country_views
from api.routers.country_router import router

urlpatterns = [
    path('', include(router.urls)),
    path("countries/post/", country_views.CreateCountry.as_view()),
    path("countries/clearall/", country_views.ClearCountries.as_view()),
    path("countries/collect/", country_views.CollectData.as_view()),
]