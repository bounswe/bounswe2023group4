from rest_framework import serializers
from api.models.user_model import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id','email','firstname','lastname','avatar')