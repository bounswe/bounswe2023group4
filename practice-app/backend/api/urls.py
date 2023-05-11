from django.urls import path,include
from api.views import poll_views
from rest_framework import routers
from api.routers.poll_router import poll_router
from rest_framework.schemas import get_schema_view 
from django.views.generic import TemplateView
from api.views import country_views
from api.routers.country_router import country_router


router = routers.DefaultRouter()
router.registry.extend(poll_router.registry)
router.registry.extend(country_router.registry)

urlpatterns = [
    path('api_schema',get_schema_view(title = 'API Schema', description = 'API documentation'), name = 'api_schema'),
    path('docs/', TemplateView.as_view( template_name='docs.html', extra_context={'schema_url':'api_schema'}), name='swagger-ui'),
    path('', include(router.urls)),
    path('polls_createPoll/', poll_views.createPoll.as_view()),
    path('polls_viewPoll/', poll_views.viewPoll.as_view())
]