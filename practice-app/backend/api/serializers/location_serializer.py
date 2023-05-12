from rest_framework import serializers
from api.models.location_model import IPInfo

class IPInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPInfo
        fields = ('country_code','country_name')
