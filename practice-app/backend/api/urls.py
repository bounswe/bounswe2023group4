from django.urls import path,include
from api.views import country_views,user_views
from api.routers.country_router import country_router
from api.routers.user_router import user_router
from rest_framework import routers
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.registry.extend(country_router.registry)
router.registry.extend(user_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path('api_schema',get_schema_view(title = 'API Schema', description = 'API documentation'), name = 'api_schema'),
    path('docs/', TemplateView.as_view( template_name='docs.html', extra_context={'schema_url':'api_schema'}), name='swagger-ui'),
    path("countries_clearall/", country_views.ClearCountries.as_view()),
    path("countries_collect/", country_views.CollectData.as_view()),
    path("user-1_collect/",user_views.GetData.as_view()),
    path("user-1_clearall/", user_views.ClearUsers.as_view()),
]