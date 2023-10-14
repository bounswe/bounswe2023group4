from rest_framework import serializers
from api.models.country_model import Country

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('name','capital','population','gdp')