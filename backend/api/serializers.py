from rest_framework import serializers
from .models import UserProfile, Post, Comment, Like, Connection, SocialCircles, Favorites

class UserProfileSerializer(serializers.ModelSerializer):
    total_likes = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email', 'username', 'password', 'pronouns', 'pfp_image', 
                  'links', 'bio', 'city', 'state', 'country', 'total_likes']
        extra_kwargs = {
            'password': {'write_only': True},  # Password field is write only
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = UserProfile.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def validate(self, data):
        email = data.get('email', None)
        phone_number = data.get('phone_number', None)
        if not email and not phone_number:
            raise serializers.ValidationError("Either email or phone number must be provided.")
        return data

    def get_total_likes(self, obj):
        return obj.total_likes()

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'photo', 'created_at', 'updated_at', 'user', 'like_count']

    def get_like_count(self, obj):
        return obj.like_count()

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = '__all__'

class SocialCirclesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialCircles
        fields = '__all__'

class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = '__all__'
