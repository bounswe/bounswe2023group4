from rest_framework import serializers
from api.models.poll_model import Poll


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = ('question', 'firstOption','secondOption','thirdOption', 'fourthOption')