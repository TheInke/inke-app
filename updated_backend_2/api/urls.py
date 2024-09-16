from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
router = DefaultRouter()
router.register(r'posts', views.PostViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # UserProfile endpoints
    path('users/', views.UserProfileListView.as_view(), name='user-list'),  # List all users
    path('users/create/', views.CreateUserView.as_view(), name='user-create'),  # Create a new user
    path('users/<int:pk>/', views.UserProfileDetailView.as_view(), name='user-detail'), # Retrieve, update, delete user

    # SocialCircles endpoints
    path('social-circles/', views.SocialCirclesListCreateView.as_view(), name='socialcircle-list-create'),  # List all social circles and create a new social circle
    path('social-circles/<int:pk>/', views.SocialCirclesDetailView.as_view(), name='socialcircle-detail'),    # Retrieve, update, delete a social circle

    # Journals endpoints
    path('journals/', views.JournalEntryListCreateView.as_view(), name='journal-list-create'), #List and create journal entries
    path('journals/<int:pk>/', views.JournalEntryDetailView.as_view(), name='journal-detail'), #retrieve, update and delete journal entries

    # Comments endpoints
    path('posts/<int:post_id>/comments/', views.PostCommentsListView.as_view(), name='post-comments'),  # List comments for a post
    path('posts/<int:post_id>/comments/create/', views.CommentCreateView.as_view(), name='comment-create'), # Create a new comment for a post
    path('posts/<int:post_id>/comments/<int:comment_id>/', views.CommentDetailView.as_view(), name='comment-detail'), # Retrieve, update, or delete a specific comment

    # Favorites endpoints
    path('posts/<int:post_id>/favorite/', views.FavoritePostView.as_view(), name='post-favorite'), # Favorite/unfavorite a post
    path('favorite-posts/', views.ListFavoritePostsView.as_view(), name='favorite-posts'),    # list of favorite posts for a user

    # Posts endpoints
    path('posts/', views.PostViewSet.as_view, name="all-posts"),
    
    # Likes endpoints
    path('posts/<int:post_id>/like/', views.LikePostView.as_view(), name='like-post'), 
    path('profile/total-likes/', views.TotalLikesView.as_view(), name='total-likes'),
    path('liked-posts/', views.liked_posts_history, name='liked-posts'),

    # Connections endpoints

    path('connections/create/', views.CreateConnectionView.as_view(), name='create-connection'),  # creates a new connection
    path('connections/update-status/<int:pk>/', views.UpdateConnectionStatusView.as_view(), name='update-connection-status'), # updates status of connection between request user and user_id
    path('connections/invites/', views.UserInvitesView.as_view(), name='user-invites'), # lists the connections the user is invited to
    path('connections/requests/', views.UserRequestsView.as_view(), name='user-requests'), # lists the connections the user has sent out
    path('connections/connected-users/', views.ConnectedUsersView.as_view(), name='connected-users'), # lists all of the accepted connections of the user

    #notification settings endpoints
    path('notification-settings/', views.notification_settings_view, name='notification-settings'),
]

