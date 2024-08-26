from django.contrib import admin
from . import models
admin.site.register(models.UserProfile)
admin.site.register(models.Post)
admin.site.register(models.Comment)
admin.site.register(models.Like)
admin.site.register(models.Connection)
admin.site.register(models.SocialCircles)
admin.site.register(models.Favorites)
admin.site.register(models.JournalEntry)