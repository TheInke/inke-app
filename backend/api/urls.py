from django.urls import path
from views import *

urlpatterns = [
    path('users/', UserProfileListView.as_view(), name='user-list'),           # List all users
    path('users/create/', CreateUserView.as_view(), name='user-create'),       # Create a new user
    path('users/<int:pk>/', UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user
    path('forgot-password', ForgotPasswordRequestView.as_view(), name='forgot-password'),
    path('test', ForgotPasswordRequestView.as_view(), name="test")
]