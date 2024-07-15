from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class JournalEntry(models.Model):
    """
    Model representing a journal entry.

    Attributes:
        user (ForeignKey): The user who owns this journal entry.
        title (CharField): The title of the journal entry.
        text_content (TextField): The textual content of the journal entry.
        image (ImageField): An optional image attached to the journal entry.
        video (FileField): An optional video file attached to the journal entry.
        audio (FileField): An optional audio file attached to the journal entry.
        created_at (DateTimeField): The date and time when the journal entry was created.
        updated_at (DateTimeField): The date and time when the journal entry was last updated.
    """
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='journal_entries')
    title = models.CharField(max_length=255, default="Untitled")
    text_content = models.TextField(blank=True)
    image = models.ImageField(upload_to='journal_images/', blank=True, null=True)
    video = models.FileField(upload_to='journal_videos/', blank=True, null=True)
    audio = models.FileField(upload_to='journal_audios/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)