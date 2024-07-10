from django.http import Http404
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import UserProfile, Comment, Post
from .serializers import UserProfileSerializer, CommentSerializer, PostSerializer
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