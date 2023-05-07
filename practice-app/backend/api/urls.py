from django.urls import path,include
from api.views import country_views, poll_views
from api.routers.country_router import country_router
from api.routers.poll_router import PollRouter

urlpatterns = [
    path('', include(country_router.urls)),
    path("countries/new/", country_views.CreateCountry.as_view()),
    path("countries/clearall/", country_views.ClearCountries.as_view()),
    path("countries/collect/", country_views.CollectData.as_view()),
    path('', include(PollRouter.urls)),
    path('poll/create/', poll_views.createPoll.as_view())
]