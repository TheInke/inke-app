from rest_framework import serializers
from .models import UserProfile, Post, Comment, Like, Connection, SocialCircles, Favorites, JournalEntry

#USER-PROFILE SERIALIZER
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'email', 'username', 'password', 'pronouns', 'pfp_image', 
                  'links', 'bio', 'city', 'state', 'country']
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
    
    def total_likes_on_posts(self):
        return Like.objects.filter(user=self).count()
    
class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'photo', 'created_at', 'updated_at', 'user']
    
# COMMENT SERIALIZER
class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Comment model.

    This serializer handles the conversion between Comment model instances and their
    JSON representations, and includes validation for the comment text.
    """
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'text', 'created_at']
        read_only_fields = ['id', 'user', 'post', 'created_at']

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

        fields = '__all__'

#LIKE SERIALIZER
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'created_at']

# TEMPLATE SERIALIZER. NEED TO DEVELOP STILL
class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = '__all__'

# TEMPLATE SERIALIZER. NEED TO DEVELOP STILL
class SocialCirclesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialCircles
        fields = '__all__'

# FAVORITE SERIALIZER
class FavoriteSerializer(serializers.ModelSerializer):
    """
    Serializer for the Favorites model.

    Serializes Favorites objects to and from JSON.
    """
    class Meta:
        model = Favorites
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
        model = JournalEntry
        fields = ['id', 'user', 'title', 'text_content', 'image', 'video', 'audio', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']