from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, LikePostView, TotalLikesView, CreateUserView, UserProfileListView, UserProfileDetailView, FavoritePostView, ListFavoritePostsView
from . import views
router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', UserProfileListView.as_view(), name='user-list'),  # List all users
    path('users/create/', CreateUserView.as_view(), name='user-create'),  # Create a new user
    path('users/<int:pk>/', UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user

    # url links for comment creation and listing
    path('posts/<int:post_id>/comments/', views.PostCommentsListView.as_view(), name='post-comments'),  # List comments for a post
    path('posts/<int:post_id>/comments/create/', views.CommentCreateView.as_view(), name='comment-create'), # Create a new comment for a post
    path('posts/<int:post_id>/comments/<int:comment_id>/', views.CommentDetailView.as_view(), name='comment-detail'), # Retrieve, update, or delete a specific comment


    path('posts/<int:post_id>/favorite/', FavoritePostView.as_view(), name='post-favorite'), # Favorite/unfavorite a post
    path('favorite-posts/', ListFavoritePostsView.as_view(), name='favorite-posts'),    # list of favorite posts for a user

    path('posts/', PostViewSet.as_view, name="all-posts"),
    
    path('posts/<int:post_id>/like/', LikePostView.as_view(), name='like-post'), 
    path('profile/total-likes/', TotalLikesView.as_view(), name='total-likes'),
    path('liked-posts/', views.liked_posts_history, name='liked-posts'),
]

