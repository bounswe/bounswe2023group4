from api.serializers.sport_suggestion_serializer import SportSuggestionSerializer
from api.models.sport_suggestion_model import SportSuggestion
from rest_framework import viewsets


class SportSuggestionViewSet(viewsets.ModelViewSet):
    queryset = SportSuggestion.objects.all()
    serializer_class = SportSuggestionSerializer
    filterset_fields = ('id' ,'suggestion')