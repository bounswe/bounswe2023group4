from django.urls import path,include
from api.views import country_views,user_views
from api.routers.country_router import country_router
from api.routers.user_router import user_router
from rest_framework import routers


router = routers.DefaultRouter()
router.registry.extend(country_router.registry)
router.registry.extend(user_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path("countries_new/", country_views.CreateCountry.as_view()),
    path("countries_clearall/", country_views.ClearCountries.as_view()),
    path("countries_collect/", country_views.CollectData.as_view()),
    path("users_collect/",user_views.GetData.as_view()),
    path("users_new/",user_views.CreateUser.as_view()),
    path("users_clearall/", user_views.ClearUsers.as_view()),
]