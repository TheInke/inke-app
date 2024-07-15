from rest_framework import serializers
from .models import UserProfile, Post, Comment, Like, Connection, SocialCircles, Favorites, JournalEntry

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
