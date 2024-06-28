from django.contrib import admin
from .models import UserProfile, Post, Comment,Favorites
admin.site.register(Post)
admin.site.register(UserProfile)
admin.site.register(Comment)
admin.site.register(Favorites)
