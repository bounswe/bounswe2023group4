from django.urls import path,include
from api.views import country_views, poll_views
from rest_framework import routers
from api.routers.country_router import country_router
from api.routers.poll_router import poll_router

router = routers.DefaultRouter()
router.registry.extend(country_router.registry)
router.registry.extend(poll_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path("countries_new/", country_views.CreateCountry.as_view()),
    path("countries_clearall/", country_views.ClearCountries.as_view()),
    path("countries_collect/", country_views.CollectData.as_view()),  
    path('polls_createPoll/', poll_views.createPoll.as_view()),
    path('polls_removePoll/', poll_views.deletePoll.as_view())
]