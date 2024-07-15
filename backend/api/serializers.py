from rest_framework import serializers
from .models import UserProfile, Post, Comment, Like, Connection, SocialCircles, Favorites

# TEMPLATE SERIALIZER. NEED TO DEVELOP STILL
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
