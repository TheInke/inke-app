from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

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
        members (ManyToManyField): Users who are members of the social circle.
    """
    group_id = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=255, unique=True)
    group_pic = models.ImageField(upload_to='group_pics', null=True, blank=True)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='social_circles')

class Favorites(models.Model):
    """
    Represents user favorites for posts.
    
    Attributes:
        user (ForeignKey): User who favorited the post.
        post (ForeignKey): Post that was favorited by the user.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="favorited")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class Like(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='liked_posts')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f'{self.user.username} likes {self.post.title}'

