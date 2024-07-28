from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# post 
from rest_framework.routers import DefaultRouter
from api import views
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'connections', views.ConnectionViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/", include("api.urls")),
    path('users/', views.UserProfileListView.as_view(), name='user-list'),           # List all users
    path('users/create/', views.CreateUserView.as_view(), name='user-create'),       # Create a new user
    path('users/<int:pk>/', views.UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user
    path('', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


