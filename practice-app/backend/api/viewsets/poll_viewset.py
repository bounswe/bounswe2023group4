from api.models.poll_model import Poll
from api.serializers.poll_serializer import PollSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class PollViewSet (viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    filterset_fields = ('question', 'firstChoice','secondChoice','thirdChoice','fourthChoice')

    @action(methods=['get'], detail=False)
    def data(self, request):
        poll = Poll.objects.all()
        serializer = self.get_serializer_class()(poll, many=True)
        return Response(serializer.data)
