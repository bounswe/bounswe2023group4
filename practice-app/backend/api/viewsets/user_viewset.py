from api.serializers.user_serializer import UserSerializer
from api.models.user_model import User
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class CountryViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_fields = ('user_id')

    @action(methods=['get'],detail=False)
    def data(self,request):
        users = User.objects.all()
        serializer = self.get_serializer_class()(users, many=True)
        return Response(serializer.data)
