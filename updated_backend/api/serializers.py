from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied
from . import models


# USER-PROFILE SERIALIZER
class UserProfileSerializer(serializers.ModelSerializer):
    # serializer for UserProfile model
    class Meta:
        model = models.UserProfile
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email', 'username', 'password', 'pronouns', 'pfp_image',
                  'links', 'bio', 'city', 'state', 'country']
        extra_kwargs = {
            'password': {'write_only': True},  # Password field is write only
        }

    def create(self, validated_data):
        # create method for UserProfile
        password = validated_data.pop('password', None)
        user = models.UserProfile.objects.create_user(**validated_data)
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
            raise serializers.ValidationError(
                "Either email or phone number must be provided.")
        return data

    def total_likes_on_posts(self):
        return models.Like.objects.filter(user=self).count()


class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    file = serializers.FileField()

    class Meta:
        model = models.Post
        fields = ['id', 'title', 'content', 'file',
                  'created_at', 'updated_at', 'user']

# COMMENT SERIALIZER


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Comment model.


    This serializer handles the conversion between Comment model instances and their
    JSON representations, and includes validation for the comment text.
    """
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = models.Comment
        fields = ['id', 'username', 'post', 'text', 'created_at']
        read_only_fields = ['id', 'username', 'post', 'created_at']

    def validate_text(self, value):
        """
        Validate the text of the comment.


        Args:
            value (str): The text of the comment.


        Returns:
            str: The validated text.


        Raises:
            serializers.ValidationError: If the comment text is empty or only contains whitespace.
        """
        if not value.strip():
            raise serializers.ValidationError("Comment text cannot be empty.")
        return value


# LIKE SERIALIZER
class LikeSerializer(serializers.ModelSerializer):
    # Template Serializer for Like model.

    class Meta:
        model = models.Like
        fields = ['id', 'user', 'post', 'created_at']

# TEMPLATE SERIALIZER. NEED TO DEVELOP STILL
class SocialCirclesSerializer(serializers.ModelSerializer):
    # Serializer for SocialCircles model.

    # Read-only field for the username of the creator
    created_by = serializers.CharField(
        source='created_by.username', read_only=True)
    # SerializerMethodField to get the count of members
    members_count = serializers.SerializerMethodField()
    # Write-only field for member usernames, optional during updates
    members = serializers.ListField(child=serializers.CharField(
    ), write_only=True, required=False, allow_null=True)

    class Meta:
        model = models.SocialCircles
        fields = ['group_id', 'group_name', 'group_pic', 'desc', 'members',
                  'created_by', 'created_at', 'updated_at', 'members_count']
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        # Method to create a new SocialCircles instance
        members_usernames = validated_data.pop('members', [])
        members = self.get_members_from_usernames(members_usernames)

        social_circle = models.SocialCircles.objects.create(**validated_data)
        social_circle.members.set(members)
        return social_circle

    def update(self, instance, validated_data):
        # Method to update an existing SocialCircles instance

        # Ensure only the creator can update the instance
        request = self.context.get('request')
        if request.user != instance.created_by:
            raise PermissionDenied(
                "You do not have permission to perform this action.")

        # Partial update: handle fields only if they are present in validated_data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

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
                user = models.UserProfile.objects.get(username=username)
                members.append(user)
            except models.UserProfile.DoesNotExist:
                errors.append(
                    f"User with username '{username}' does not exist.")

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
        representation['members'] = self.get_members(instance)
        return representation

# FAVORITE SERIALIZER


class FavoriteSerializer(serializers.ModelSerializer):
    # Template Serializer for Favorites
    """
    Serializer for the Favorites model.


    Serializes Favorites objects to and from JSON.
    """
    class Meta:
        model = models.Favorites
        fields = ['id', 'user', 'post']


# JOURNAL SERIALIZER
class JournalEntrySerializer(serializers.ModelSerializer):
    """
    Serializer for the JournalEntry model.


    Serializes JournalEntry objects to and from JSON.


    Attributes:
        model (Model): The JournalEntry model class.
        fields (list): The list of fields to include in the serialized representation.
        read_only_fields (list): The list of read-only fields that are serialized but not writable.
    """
    class Meta:
        model = models.JournalEntry
        fields = ['id', 'user', 'title', 'text_content', 'image',
                  'video', 'audio', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


# Connections serializers: 

class ConnectionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Connections
        fields = ['from_user', 'to_user', 'status', 'created_at']

class ConnectionStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Connections
        fields = ['status']
        extra_kwargs = {'status': {'required': True}}

class ConnectedUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ['id', 'username', 'first_name', 'last_name']