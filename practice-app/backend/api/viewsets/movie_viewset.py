from api.serializers.movie_serializer import MovieSerializer
from api.models.movie_model import Movie
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filterset_fields = ('Title' , 'imdbID')

    @action(methods=['get'],detail=False)
    def data(self,request):
        movies = Movie.objects.all()
        serializer = self.get_serializer_class()(movies, many=True)
        return Response(serializer.data)
