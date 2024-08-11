from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from .models import Post, Comment, Like, Favorite
from .serializers import PostSerializer, CommentSerializer, LikeSerializer, FavoriteSerializer


class PostPagination(PageNumberPagination):
    page_size = 10  # Number of posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['GET'])
def homepage(request):
    """
    Endpoint to retrieve paginated posts with comments, likes, and save status.
    """
    user = request.user
    paginator = PostPagination()
    posts = Post.objects.all()
    paginated_posts = paginator.paginate_queryset(posts, request)

    data = []
    for post in paginated_posts:
        post_data = PostSerializer(post).data
        post_data['comments'] = CommentSerializer(
            post.comments.all(), many=True).data
        post_data['is_liked'] = Like.objects.filter(
            post=post, user=user).exists()
        post_data['is_saved'] = Favorite.objects.filter(
            post=post, user=user).exists()
        data.append(post_data)

    return paginator.get_paginated_response(data)
