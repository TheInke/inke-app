from django.http import HttpResponseRedirect
from django.urls import reverse
from django.http import Http404
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import UserProfile, Favorites, Post, Like, Comment, Post
from .serializers import UserProfileSerializer, PostSerializer, FavoriteSerializer, LikeSerializer
from django.conf import settings, CommentSerializer, PostSerializer
from rest_framework.permissions import IsAuthenticated

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
    
class CommentCreateView(generics.CreateAPIView):
    """
    API view for creating a new comment.

    This view allows authenticated users to create a new comment for a specified post.

    Attributes:
        serializer_class (Serializer): The serializer class used for the comment.
        permission_classes (tuple): The tuple of permissions required to access this view.
    """
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        """
        Handle POST request to create a new comment.

        Args:
            request (Request): The request object containing the data.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: The response object with the creation status and message.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post_id = kwargs.get('post_id')
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
        
        Comment.objects.create(
            post=post,
            user=request.user,
            text=serializer.validated_data['text']
        )
        return Response({"detail": "Comment added successfully."}, status=status.HTTP_201_CREATED)

class PostCommentsListView(generics.ListAPIView):
    """
    API view for listing comments for a specified post.

    This view allows anyone to view the comments associated with a specific post.

    Attributes:
        serializer_class (Serializer): The serializer class used for the comments.
        permission_classes (list): The list of permissions required to access this view.
    """
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """
        Retrieve the queryset of comments for the specified post.

        Returns:
            QuerySet: The queryset of comments filtered by post ID.
        """
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id)
    
class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting a comment.

    This view provides the following actions:
    - Retrieve a specific comment based on post ID and comment ID.
    - Update a specific comment.
    - Delete a specific comment.

    Attributes:
        queryset (QuerySet): The queryset that retrieves all comments.
        serializer_class (Serializer): The serializer class used for the comment.
        permission_classes (list): The list of permissions required to access this view.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Retrieve a specific comment based on the provided post ID and comment ID.

        Returns:
            Comment: The comment object if found.

        Raises:
            Http404: If the comment with the specified post ID and comment ID does not exist.
        """
        post_id = self.kwargs['post_id']
        comment_id = self.kwargs['comment_id']
        try:
            return Comment.objects.get(post_id=post_id, id=comment_id)
        except Comment.DoesNotExist:
            raise Http404("Comment not found.")
    
    def perform_update(self, serializer):
        """
        Save the changes to the comment.
        """
        serializer.save()

    def perform_destroy(self, instance):
        """
        Delete the specified comment instance.
        """
        instance.delete()