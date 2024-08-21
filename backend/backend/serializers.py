# serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        # Add user ID to the response data
        data['user_id'] = user.id
        return data
