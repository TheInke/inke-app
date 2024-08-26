from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone

class UserProfile(AbstractUser):
    """
    Custom user profile model extending AbstractUser.

    Attributes:
        pronouns (str): Pronouns of the user.
        pfp_image (ImageField): Profile picture of the user.
        links (str): Social media links of the user.
        bio (str): Bio of the user.
        city (str): City of the user.
        state (str): State of the user.
        country (str): Country of the user.
    """
    pronouns = models.CharField(max_length=50, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    pfp_image = models.ImageField(upload_to='profile_pics', null=True, blank=True)
    links = models.TextField(blank=True)
    bio = models.TextField(max_length=500, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    
    def total_likes_on_posts(self):
        return Like.objects.filter(post__user=self).count()

class Post(models.Model):
    """
    Represents individual posts made by users.
    
    Attributes:
        user (ForeignKey): User who created the post.
        text_content (str): Content of the post.
        image (ImageField): Image attached to the post.
        created_at (DateTimeField): Timestamp when the post was created.
        updated_at (DateTimeField): Timestamp when the post was last updated.
    """
    title = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title


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
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.text[:20]}'
    
class Like(models.Model):
    """
    Represents likes given by users to posts.
    
    Attributes:
        user (ForeignKey): User who liked the post.
        post (ForeignKey): Post being liked.
        created_at (DateTimeField): Timestamp when the like was created.
    """
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='liked_posts')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f'{self.user.username} likes {self.post.title}'

class Connection(models.Model):
    """
    Represents connections between users.
    
    Attributes:
        from_user (ForeignKey): User sending the connection request.
        to_user (ForeignKey): User receiving the connection request.
        status (str): Status of the connection request (pending, accepted, rejected).
        created_at (DateTimeField): Timestamp when the connection was created.
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]

    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sent_connections', on_delete=models.CASCADE)
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='received_connections', on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'to_user')

    def __str__(self):
        return f'{self.from_user} to {self.to_user} ({self.status})'

class SocialCircles(models.Model):
    """
    Represents social circles or groups.
    
    Attributes:
        group_id (AutoField): Unique identifier for the social circle.
        group_name (str): Name of the social circle.
        group_pic (ImageField): Profile picture of the social circle.
        description (str): Brief description of the social circle.
        members (ManyToManyField): Users who are members of the social circle.
        created_by (ForeignKey): The user who created the social circle.
        created_at (DateTimeField): Timestamp when the social circle was created.
        updated_at (DateTimeField): Timestamp when the social circle was last updated.
    """
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=255, unique=True)
    group_pic = models.ImageField(upload_to='group_pics', null=True, blank=True)
    desc = models.CharField(max_length=500, blank=True)
    members = models.ManyToManyField(UserProfile, related_name='social_circles')
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, default=None, related_name='created_social_circles')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

class Favorites(models.Model):
    """
    Represents user favorites for posts.

    Attributes:
        user (ForeignKey): User who favorited the post.
        post (ForeignKey): Post that was favorited by the user.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="favorited")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

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
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='journal_entries')
    title = models.CharField(max_length=255, default="Untitled")
    text_content = models.TextField(blank=True)
    image = models.ImageField(upload_to='journal_images/', blank=True, null=True)
    video = models.FileField(upload_to='journal_videos/', blank=True, null=True)
    audio = models.FileField(upload_to='journal_audios/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)