from django.urls import path
from . import views
from .views import JournalEntryListCreateView, JournalEntryDetailView

urlpatterns = [
    path('users/', views.UserProfileListView.as_view(), name='user-list'),           # List all users
    path('users/create/', views.CreateUserView.as_view(), name='user-create'),       # Create a new user
    path('users/<int:pk>/', views.UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user
    path('journals/', JournalEntryListCreateView.as_view(), name='journal-list-create'), #List and create journal entries
    path('journals/<int:pk>/', JournalEntryDetailView.as_view(), name='journal-detail'), #retrieve, update and delete journal entries
]