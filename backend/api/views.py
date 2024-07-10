from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import UserProfile, Favorites, Post
from .serializers import UserProfileSerializer, PostSerializer, FavoriteSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

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
    
class FavoritePostView(APIView):
    """
    API view for favoriting and unfavoriting posts.

    This view handles favoriting and unfavoriting posts by authenticated users.

    Attributes:
        permission_classes (list): The list of permissions required to access this view.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id, format=None):
        """
        Handle POST request to favorite a post.

        Args:
            request (Request): The request object containing user data.
            post_id (int): The ID of the post to be favorited.
            format (str, optional): The format of the response.

        Returns:
            Response: The response object with success or error message.

        Raises:
            HTTP_404_NOT_FOUND: If the requested post does not exist.
            HTTP_400_BAD_REQUEST: If the post is already favorited.
        """
        user = request.user
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the post is already favorited
        if Favorites.objects.filter(user=user, post=post).exists():
            return Response({'error': 'Post already favorited'}, status=status.HTTP_400_BAD_REQUEST)
        
        favorite = Favorites.objects.create(user=user, post=post)
        return Response({'message': 'Post favorited successfully'}, status=status.HTTP_201_CREATED)
    
    def delete(self, request, post_id):
        """
        Handle DELETE request to remove a post from favorites.

        Args:
            request (Request): The request object containing user data.
            post_id (int): The ID of the post to be removed from favorites.

        Returns:
            Response: The response object with success or error message.

        Raises:
            HTTP_404_NOT_FOUND: If the requested post or favorite does not exist.
        """
        user = request.user
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        favorite = Favorites.objects.filter(user=user, post=post)
        if favorite.exists():
            favorite.delete()
            return Response({"status": "Favorite removed."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Favorite not found."}, status=status.HTTP_404_NOT_FOUND)


# listing favorites for a user
class ListFavoritePostsView(generics.ListAPIView):
    """
    API view for listing favorite posts of a user.

    This view retrieves and lists all posts favorited by the authenticated user.

    Attributes:
        serializer_class (Serializer): The serializer class used for serializing Post objects.
        permission_classes (list): The list of permissions required to access this view.
    """
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retrieve the queryset of favorite posts for the authenticated user.

        Returns:
            QuerySet: The queryset of Post objects favorited by the user.
        """
        user = self.request.user    #get user
        # get all the favorited post ids for a user
        favorite_posts_ids = Favorites.objects.filter(user=user).values_list('post_id', flat=True) 
        return Post.objects.filter(id__in=favorite_posts_ids)