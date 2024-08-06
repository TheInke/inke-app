# from django.db import models
# from django.contrib.auth.models import User


# class Post(models.Model):
#     title = models.CharField(max_length=100)
#     content = models.TextField()
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.title


# class Comment(models.Model):
#     post = models.ForeignKey(
#         Post, related_name='comments', on_delete=models.CASCADE)
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'Comment by {self.author} on {self.post}'


from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ('normal', 'Normal User'),
        ('admin', 'Admin'),
        ('superadmin', 'Super Admin'),
    )
    role = models.CharField(
        max_length=10, choices=ROLE_CHOICES, default='normal')

    def is_admin(self):
        return self.role == 'admin' or self.role == 'superadmin'

    def is_superadmin(self):
        return self.role == 'superadmin'
