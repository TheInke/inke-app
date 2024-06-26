from django.urls import path
from . import views

# post imports 
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

urlpatterns = [
    path('users/', views.UserProfileListView.as_view(), name='user-list'),           # List all users
    path('users/create/', views.CreateUserView.as_view(), name='user-create'),       # Create a new user
    path('users/<int:pk>/', views.UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user
]


# post urls 
router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

