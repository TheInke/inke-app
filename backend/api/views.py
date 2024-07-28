from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.conf import settings
from .models import Post, Like, UserProfile, Connection
from .serializers import UserProfileSerializer, PostSerializer, LikeSerializer, ConnectionSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, action

class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

class UserProfileListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [] #[permissions.IsAuthenticated]

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
    
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if instance.user != request.user:
            raise PermissionDenied("You do not have permission to edit this post.")
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            raise PermissionDenied("You do not have permission to delete this post.")
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()
        
class LikePostView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        post_id = self.kwargs.get('post_id')
        post = Post.objects.get(id=post_id)
        user = request.user
        
        # Check if the post is already liked by the user
        like = Like.objects.filter(post=post, user=user).first()
        if like:
            # Unlike the post
            like.delete()
            return Response({'detail': 'Unliked the post.'}, status=status.HTTP_204_NO_CONTENT)
        
        # Like the post
        like = Like.objects.create(post=post, user=user)
        return Response(LikeSerializer(like).data, status=status.HTTP_201_CREATED)


class TotalLikesView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        total_likes = Like.objects.filter(user=user).count()
        return Response({'total_likes': total_likes}, status=status.HTTP_200_OK)

@api_view(['GET'])
def liked_posts_history(request):
    user = request.user
    liked_posts = Like.objects.filter(user=user).select_related('post')

    # Serialize the liked posts
    serializer = PostSerializer(liked_posts, many=True)

    return Response(serializer.data)



class ConnectionViewSet(viewsets.ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        from_user = request.user
        to_user_id = request.data.get('to_user')
        to_user = UserProfile.objects.get(id=to_user_id)
        connection, created = Connection.objects.get_or_create(from_user=from_user, to_user=to_user)
        if created:
            serializer = self.get_serializer(connection)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Connection request already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        connection = self.get_object()
        if connection.to_user == request.user and connection.status == 'pending':
            connection.status = 'accepted'
            connection.save()
            return Response({"detail": "Connection request accepted."}, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        connection = self.get_object()
        if connection.to_user == request.user and connection.status == 'pending':
            connection.status = 'rejected'
            connection.save()
            return Response({"detail": "Connection request rejected."}, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)