from django.http import Http404
from rest_framework import generics, permissions, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.db.models import Q
from . import models, serializers

User = get_user_model()


class CreateUserView(generics.CreateAPIView):
    queryset = models.UserProfile.objects.all()
    serializer_class = serializers.UserProfileSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileListView(generics.ListAPIView):
    queryset = models.UserProfile.objects.all()
    serializer_class = serializers.UserProfileSerializer
    permission_classes = []  # [permissions.IsAuthenticated]


# USER PROFILE
class UserProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.UserProfile.objects.all()
    serializer_class = serializers.UserProfileSerializer
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
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Save the file or perform your desired operation here
            # For example, saving it to a model instance
            return Response({"message": "Upload successful"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        if instance.user != request.user:
            raise PermissionDenied(
                "You do not have permission to edit this post.")
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            raise PermissionDenied(
                "You do not have permission to delete this post.")
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class LikePostView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        post_id = self.kwargs.get('post_id')
        post = models.Post.objects.get(id=post_id)
        user = request.user

        # Check if the post is already liked by the user
        like = models.Like.objects.filter(post=post, user=user).first()
        if like:
            # Unlike the post
            like.delete()
            return Response({'detail': 'Unliked the post.'}, status=status.HTTP_204_NO_CONTENT)

        # Like the post
        like = models.Like.objects.create(post=post, user=user)
        return Response(serializers.LikeSerializer(like).data, status=status.HTTP_201_CREATED)


class TotalLikesView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        total_likes = models.Like.objects.filter(user=user).count()
        return Response({'total_likes': total_likes}, status=status.HTTP_200_OK)


@api_view(['GET'])
def liked_posts_history(request):
    user = request.user
    liked_posts = models.Like.objects.filter(user=user).select_related('post')

    # Serialize the liked posts
    serializer = serializer.PostSerializer(liked_posts, many=True)

    return Response(serializer.data)


class FavoritePostView(APIView):
    """
    API view for favoriting and unfavoriting posts.


    This view handles favoriting and unfavoriting posts by authenticated users.


    Attributes:
        permission_classes (list): The list of permissions required to access this view.
    """
    permission_classes = [permissions.IsAuthenticated]

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
            post = models.Post.objects.get(id=post_id)
        except models.Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the post is already favorited
        if models.Favorites.objects.filter(user=user, post=post).exists():
            return Response({'error': 'Post already favorited'}, status=status.HTTP_400_BAD_REQUEST)

        favorite = models.Favorites.objects.create(user=user, post=post)
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
            post = models.Post.objects.get(id=post_id)
        except models.Post.DoesNotExist:
            return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        favorite = models.Favorites.objects.filter(user=user, post=post)
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
        serializer_class (Sserializers.erializer): The serializer class used for serializing Post objects.
        permission_classes (list): The list of permissions required to access this view.
    """
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Retrieve the queryset ofmodels. favorite posts for the authenticated user.


        Returns:
            QuerySet: The queryset ofmodels. Post objects favorited by the user.
        """
        user = self.request.user  # get user
        # get all the favorited post ids for a user
        favorite_posts_ids = models.Favorites.objects.filter(
            user=user).values_list('post_id', flat=True)
        return models.Post.objects.filter(id__in=favorite_posts_ids)


class CommentCreateView(generics.CreateAPIView):
    """
    API view for creating a new comment.


    This view allows authenticated users to create a new comment for a specified post.


    Attributes:
        serializer_class (Sserializers.erializer): The serializer class used for the comment.
        permission_classes (tuple): The tuple of permissions required to access this view.
    """
    serializer_class = serializers.CommentSerializer
    permission_classes = (permissions.IsAuthenticated,)

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
            post = models.Post.objects.get(id=post_id)
        except models.Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

        models.Comment.objects.create(
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
        serializer_class (Sserializers.erializer): The serializer class used for the comments.
        permission_classes (list): The list of permissions required to access this view.
    """
    serializer_class = serializers.CommentSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """
        Retrieve the queryset ofmodels. comments for the specified post.


        Returns:
            QuerySet: The queryset ofmodels. comments filtered by post ID.
        """
        post_id = self.kwargs['post_id']
        return models.Comment.objects.filter(post_id=post_id)


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting a comment.


    This view provides the following actions:
    - Retrieve a specific comment based on post ID and comment ID.
    - Update a specific comment.
    - Delete a specific comment.


    Attributes:
        queryset (Qmodels.uerySet): The queryset thmodels.at retrieves all comments.
        serializer_class (Sserializers.erializer): The serializer class used for the comment.
        permission_classes (list): The list of permissions required to access this view.
    """
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer
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
            return models.Comment.objects.get(post_id=post_id, id=comment_id)
        except models.Comment.DoesNotExist:
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


class JournalEntryListCreateView(generics.ListCreateAPIView):
    """
    API view for listing and creating journal entries.


    This view allows authenticated users to list their own journal entries and create new ones.


    Attributes:
        serializer_class (Sserializers.erializer): The serializer class used for JournalEntry objects.
        permission_classes (list): The list of permissions required to access this view.
    """
    serializer_class = serializers.JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Retrieve journal entries belonging to the authenticated user
        return models.JournalEntry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Save the journal entry with the authenticated user as the owner
        serializer.save(user=self.request.user)


class JournalEntryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting a journal entry.


    This view allows authenticated users to retrieve, update, and delete their own journal entries.


    Attributes:
        serializer_class (Sserializers.erializer): The serializer class used for JournalEntry objects.
        permission_classes (list): The list of permissions required to access this view.
    """
    serializer_class = serializers.JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Retrieve journal entries belonging to the authenticated user
        return models.JournalEntry.objects.filter(user=self.request.user)


# SOCIAL CIRCLE
class SocialCirclesListCreateView(generics.ListCreateAPIView):
    queryset = models.SocialCircles.objects.all()
    serializer_class = serializers.SocialCirclesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # serializes and saves

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class SocialCirclesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.SocialCircles.objects.all()
    serializer_class = serializers.SocialCirclesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check if the requesting user is the creator of the instance
        if request.user != instance.created_by:
            raise PermissionDenied(
                "You do not have permission to perform this action.")

        self.perform_destroy(instance)
        return self.get_response()

    def get_response(self):
        return Response(status=status.HTTP_204_NO_CONTENT)

# Connections:

# 1. Create a connection instance with a POST method
class CreateConnectionView(generics.CreateAPIView):
    serializer_class = serializers.ConnectionsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        from_user = self.request.user
        to_user_id = self.request.data.get('to_user')
        try:
            to_user = User.objects.get(id=to_user_id)
        except User.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save(from_user=from_user, to_user=to_user, status='pending')

# 2. Accept or reject a connection invite
class UpdateConnectionStatusView(generics.UpdateAPIView):
    serializer_class = serializers.ConnectionStatusUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return models.Connections.objects.filter(to_user=self.request.user, status='pending')

    def perform_update(self, serializer):
        connection = self.get_object()
        status_choice = self.request.data.get('status')
        if status_choice not in ['accepted', 'rejected']:
            return Response({"error": "Invalid status choice."}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()

# 3. Fetch a user's connections, invites (received), and requests (sent)

class UserInvitesView(generics.ListAPIView):
    serializer_class = serializers.ConnectionsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return models.Connections.objects.filter(to_user=user, status='pending')

class UserRequestsView(generics.ListAPIView):
    serializer_class = serializers.ConnectionsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return models.Connections.objects.filter(from_user=user, status='pending')


# Returns all connections that the user has (accepted, another term of "friends")
class ConnectedUsersView(generics.ListAPIView):
    serializer_class = serializers.ConnectedUsersSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        connections = models.Connections.objects.filter(
           Q(from_user=user) | Q(to_user=user),
            status='accepted'
        )
        
        connected_user_ids = set()
        for connection in connections:
            if connection.from_user == user:
                connected_user_ids.add(connection.to_user.id)
            else:
                connected_user_ids.add(connection.from_user.id)
        
        return models.UserProfile.objects.filter(id__in=connected_user_ids)
