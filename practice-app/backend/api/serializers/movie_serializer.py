from rest_framework import serializers
from api.models.movie_model import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('Title','Year','imdbID','Type')