from api.viewsets.poll_viewset import PollViewSet
from rest_framework import routers

poll_router = routers.DefaultRouter()
poll_router.register('poll',PollViewSet)