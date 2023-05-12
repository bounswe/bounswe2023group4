from rest_framework import serializers
from api.models.sport_suggestion_model import SportSuggestion

class SportSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SportSuggestion
        fields = ('id','suggestion')
