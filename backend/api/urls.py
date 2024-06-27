from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserProfileListView.as_view(), name='user-list'),           # List all users
    path('users/create/', views.CreateUserView.as_view(), name='user-create'),       # Create a new user
    path('users/<int:pk>/', views.UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user

    path('posts/', views.PostListView.as_view(), name='post-list'),                  # List all posts
    path('posts/create/', views.PostCreateView.as_view(), name='post-create'),       # Create a new post
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),     # Retrieve a post by id
    
    path('posts/<int:post_id>/comments/', views.PostCommentsListView.as_view(), name='post-comments'), # List comments for a post
    path('posts/<int:post_id>/comments/create/', views.CommentCreateView.as_view(), name='comment-create'), # Create a new comment

]