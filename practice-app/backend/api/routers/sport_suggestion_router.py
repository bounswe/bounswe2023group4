from api.viewsets.sport_suggestion_viewset import SportSuggestionViewSet
from rest_framework import routers

sport_suggestion_router = routers.DefaultRouter()
sport_suggestion_router.register('sport_suggestions',SportSuggestionViewSet)