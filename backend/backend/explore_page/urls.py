# urls.py

from django.urls import path
from .views import explore_page

urlpatterns = [
    path('explore/', explore_page, name='explore_page'),
    # Add other URL patterns here
]
