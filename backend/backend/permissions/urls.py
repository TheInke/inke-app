from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, UserListView, AdminOnlyView, SuperAdminOnlyView, PostViewSet, CommentViewSet, LikeViewSet, ConnectionViewSet, SocialCircleViewSet, FavoriteViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'connections', ConnectionViewSet)
router.register(r'social-circles', SocialCircleViewSet)
router.register(r'favorites', FavoriteViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('admin-only/', AdminOnlyView.as_view(), name='admin-only'),
    path('superadmin-only/', SuperAdminOnlyView.as_view(), name='superadmin-only'),
    path('', include(router.urls)),
]
