from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import UserProfile, SocialCircles
from .serializers import UserProfileSerializer, SocialCirclesSerializer

class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

class UserProfileListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [] #[permissions.IsAuthenticated]

# USER PROFILE
class UserProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj != self.request.user:
            raise PermissionDenied('Please login to access your profile')
        
        return obj

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

# SOCIAL CIRCLE
class SocialCirclesListCreateView(generics.ListCreateAPIView):
    queryset = SocialCircles.objects.all()
    serializer_class = SocialCirclesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SocialCirclesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SocialCircles.objects.all()
    serializer_class = SocialCirclesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]