from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserProfileListView.as_view(), name='user-list'),           # List all users
    path('users/create/', views.CreateUserView.as_view(), name='user-create'),       # Create a new user
    path('users/<int:pk>/', views.UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user
    path('forgot-password/', views.ForgotPasswordView.as_view(), name='forgot-password')
]