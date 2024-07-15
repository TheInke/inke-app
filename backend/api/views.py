from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import UserProfile, JournalEntry
from .serializers import UserProfileSerializer, JournalEntrySerializer
    
class JournalEntryListCreateView(generics.ListCreateAPIView):
    """
    API view for listing and creating journal entries.

    This view allows authenticated users to list their own journal entries and create new ones.

    Attributes:
        serializer_class (Serializer): The serializer class used for JournalEntry objects.
        permission_classes (list): The list of permissions required to access this view.
    """
    serializer_class = JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Retrieve journal entries belonging to the authenticated user
        return JournalEntry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Save the journal entry with the authenticated user as the owner
        serializer.save(user=self.request.user)

class JournalEntryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting a journal entry.

    This view allows authenticated users to retrieve, update, and delete their own journal entries.

    Attributes:
        serializer_class (Serializer): The serializer class used for JournalEntry objects.
        permission_classes (list): The list of permissions required to access this view.
    """
    serializer_class = JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Retrieve journal entries belonging to the authenticated user
        return JournalEntry.objects.filter(user=self.request.user)