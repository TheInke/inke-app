from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class Comment(models.Model):
    """
    Represents comments made by users on posts.
    
    Attributes:
        user (ForeignKey): User who made the comment.
        post (ForeignKey): Post being commented on.
        text (str): Content of the comment.
        created_at (DateTimeField): Timestamp when the comment was created.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.text[:20]}'
