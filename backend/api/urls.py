from django.urls import path
from . import views

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, FavoritePostView, ListFavoritePostsView   


router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', views.UserProfileListView.as_view(), name='user-list'),           # List all users
    path('users/create/', views.CreateUserView.as_view(), name='user-create'),       # Create a new user
    path('users/<int:pk>/', views.UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user
    path('posts/<int:post_id>/favorite/', FavoritePostView.as_view(), name='post-favorite'), # Favorite a post
    path('favorite-posts/', ListFavoritePostsView.as_view(), name='favorite-posts'),# list of favorite post for a user
]