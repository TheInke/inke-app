from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, LikePostView, TotalLikesView, CreateUserView, UserProfileListView, UserProfileDetailView
from . import views

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', UserProfileListView.as_view(), name='user-list'),           # List all users
    path('users/create/', CreateUserView.as_view(), name='user-create'),       # Create a new user
    path('users/<int:pk>/', UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user
    path('posts/', PostViewSet.as_view, name="all-posts"),
    path('posts/<int:post_id>/like/', LikePostView.as_view(), name='like-post'),
    path('profile/total-likes/', TotalLikesView.as_view(), name='total-likes'),
    path('liked-posts/', views.liked_posts_history, name='liked-posts'),
]

