from django.urls import path
from . import views

urlpatterns = [
    # Users
    path('users/', views.UserProfileListView.as_view(), name='user-list'),           # List all users
    path('users/create/', views.CreateUserView.as_view(), name='user-create'),       # Create a new user
    path('users/<int:pk>/', views.UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user

    # Social Circles
    path('social-circles/', views.SocialCirclesListCreateView.as_view(), name='socialcircle-list-create'),  # List all social circles and create a new social circle
    path('social-circles/<int:pk>/', views.SocialCirclesDetailView.as_view(), name='socialcircle-detail'),    # Retrieve, update, delete a social circle

]