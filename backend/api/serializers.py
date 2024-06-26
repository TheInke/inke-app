from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
from .models import UserProfile, Post, Comment, Like, Connection, SocialCircles, Favorites
from django.contrib.auth import get_user_model

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    # serializer for UserProfile model
    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email', 'username', 'password', 'pronouns', 'pfp_image', 
                  'links', 'bio', 'city', 'state', 'country']
        extra_kwargs = {
            'password': {'write_only': True},  # Password field is write only
        }

    def create(self, validated_data):
        # create method for UserProfile
        password = validated_data.pop('password', None)
        user = UserProfile.objects.create_user(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user
    
    def update(self, instance, validated_data):
        # update method for UserProfile
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
    def validate(self, data):
        # validate method for UserProfile
        email = data.get('email', None)
        phone_number = data.get('phone_number', None)
        if not email and not phone_number:
            raise serializers.ValidationError("Either email or phone number must be provided.")
        return data
    
# TEMPLATE SERIALIZER. NEED TO DEVELOP STILL
class PostSerializer(serializers.ModelSerializer):
    # Template Serializer for Post model.
    
    class Meta:
        model = Post
        fields = '__all__'

# TEMPLATE SERIALIZER. NEED TO DEVELOP STILL
class CommentSerializer(serializers.ModelSerializer):
    # Template Serializer for Comment model.
    class Meta:
        model = Comment
        fields = '__all__'

# TEMPLATE SERIALIZER. NEED TO DEVELOP STILL
class LikeSerializer(serializers.ModelSerializer):
    # Template Serializer for Like model.
    
    class Meta:
        model = Like
        fields = '__all__'

# TEMPLATE SERIALIZER. NEED TO DEVELOP STILL
class ConnectionSerializer(serializers.ModelSerializer):
    # Template Serializer for Connection model.
    
    class Meta:
        model = Connection
        fields = '__all__'

class SocialCirclesSerializer(serializers.ModelSerializer):
    # Serializer for SocialCircles model.

    # Read-only field for the username of the creator
    created_by = serializers.CharField(source='created_by.username', read_only=True)
    # SerializerMethodField to get the count of members
    members_count = serializers.SerializerMethodField()
    # Write-only field for member usernames, optional during updates
    members = serializers.ListField(child=serializers.CharField(), write_only=True, required=False, allow_null=True)

    class Meta:
        model = SocialCircles
        fields = ['group_id', 'group_name', 'group_pic', 'desc', 'members', 'created_by', 'created_at', 'updated_at', 'members_count']
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        # Method to create a new SocialCircles instance
        members_usernames = validated_data.pop('members', [])
        members = self.get_members_from_usernames(members_usernames)
        
        social_circle = SocialCircles.objects.create(**validated_data)
        social_circle.members.set(members)
        return social_circle
    
    def update(self, instance, validated_data):
        # Method to update an existing SocialCircles instance

        # Ensure only the creator can update the instance
        request = self.context.get('request')
        if request.user != instance.created_by:
            raise PermissionDenied("You do not have permission to perform this action.")
        
        # Allow optional updating of group_name
        group_name = validated_data.pop('group_name', None)
        if group_name is not None:
            instance.group_name = group_name
        
        # Handle members separately if provided
        if 'members' in validated_data:
            members_usernames = validated_data.pop('members', None)
            if members_usernames is not None:
                members = self.get_members_from_usernames(members_usernames)
                instance.members.set(members)
        
        instance.save()
        return instance

    def get_members_from_usernames(self, usernames):
        # Method to fetch UserProfile objects from usernames
        members = []
        errors = []
        for username in usernames:
            try:
                user = UserProfile.objects.get(username=username)
                members.append(user)
            except UserProfile.DoesNotExist:
                errors.append(f"User with username '{username}' does not exist.")
        
        if errors:
            raise serializers.ValidationError(errors)
        
        return members

    def get_members(self, obj):
        # Method to get the usernames of members
        return [member.username for member in obj.members.all()]

    def get_members_count(self, obj):
        # Method to get count of members
        return obj.members.count()
    
    def to_representation(self, instance):
        # Custom representation for SocialCircles
        representation = super().to_representation(instance)
        
        # Only include fields that are not None
        for field in self.Meta.fields:
            if field in representation and representation[field] is None:
                del representation[field]
        
        representation['members'] = self.get_members(instance)
        return representation
    
# TEMPLATE SERIALIZER. NEED TO DEVELOP STILL
class FavoritesSerializer(serializers.ModelSerializer):
    # Template Serializer for Favorites
    class Meta:
        model = Favorites
        fields = '__all__'