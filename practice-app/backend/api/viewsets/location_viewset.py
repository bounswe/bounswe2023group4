from rest_framework import viewsets, status
from rest_framework.response import Response
from api.models.location_model import IPInfo
from api.serializers.location_serializer import IPInfoSerializer

class IPInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = IPInfo.objects.all()
    serializer_class = IPInfoSerializer

    def clear(self, request):
        """
        Clear all IPInfo objects in the database
        """
        IPInfo.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)