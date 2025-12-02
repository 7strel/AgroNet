from django.urls import path
from . import views
from .users import *
from .posts import PostListCreateView, PostDetailView, PostLikeView, CreateGetComment, UpdateDeleteComment, CommentLike, UpdateDeleteCommentReply, ListCreateCommentReply, CommentReplyLikeView, NewestAndRecentPostsView
from .message import send_message, message_list, message_detail
from .followers import follow_user, unfollow_user,followers_list, following_list
from .notification import list_notifications, delete_notification

app_name = 'home'

urlpatterns = [
    # path('', views.HomeView.as_view()),
    # # post urls
    # path('post/<int:post_id>/', views.ShowPost.as_view()),
    path('create-post/', views.CreatePostView.as_view()),
    # path('update-post/<int:post_id>/', views.ChangePostView.as_view()),
    # path('delete-post/<int:post_id>/', views.DeletePostView.as_view()),
    # # like urls
    # path('like-post/<int:post_id>/', views.GetLikeView.as_view()),
    # # follow urls
    # path('follow-account/<int:account_id>/', views.FollowView.as_view()),
    # path('forum/post/<int:pk>/increment-view/', views.increment_post_view, name='increment_post_view'),
    path('post/<int:pk>/increment-view/', views.IncrementPostView.as_view(), name='increment-post-view'),
    # # The comments section
    # path("<int:pk>/comments/", views.PostCommentsListAPIView.as_view()),
    # path("<int:pk>/comments/create/", views.CommentCreateApiView.as_view()),
    # path("comments/delete/<int:pk>/", views.CommentDestroyApiView.as_view()),
    # path("comments/update/<int:pk>/", views.CommentUpdateApiView.as_view()),
    # path("comments/<int:pk>/", views.CommentRetrieveAPIView.as_view()),
    # path("comments/all/", views.CommentsListAPIView.as_view()),




    # get all users
    path('users/', GetAllUsers.as_view(), name='get_all_users'),
    # register a user
    # path('register/', RegisterUser.as_view(), name='register_user'),
    # view user profile
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    # path('avatar/<str:first_name>/<str:last_name>/', UploadAvatarView.as_view(), name='user_avatar'),
    path('avatar/', UploadAvatarView.as_view(), name='user_avatar'),
    # path('avatar/<string:first_name>/<string:last_name>/', UploadAvatarView.as_view(), name='user_avatar'),
    # retrieve a list of posts or create a new post by sending a POST request with the required data in the request body
    path('posts/', PostListCreateView.as_view(), name='post_list_create'),
    # allows users to retrieve a single post using the GET method and update using PUT method
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post_detail'),
    # allows users to retrieve a single post and like/unlike post using POST method
    path('posts/<int:pk>/like/', PostLikeView.as_view(), name='post_like'),
    # allows users to create and retrieve comment by ID
    path('posts/<int:post_id>/comments/', CreateGetComment.as_view(), name='create-comment'),
    # allows users to update and delete comment by ID
    path('posts/<int:post_id>/comments/<int:comment_id>/', UpdateDeleteComment.as_view(), name='update-comment'),
    # allows users to like/unlike comment by ID
    path('comments/<int:comment_id>/like/', CommentLike.as_view(), name='comment_like'),
    # allows users to reply a comment and view all comment replies
    path('comments/<int:comment_id>/replies/', ListCreateCommentReply.as_view(), name='create_get_comment_reply'),
    # allows users to update and delete reply
    path('comments/<int:comment_id>/replies/<int:reply_id>/', UpdateDeleteCommentReply.as_view(), name='update_delete_comment_reply'),
    # allows users to login
    # path('login/', LoginView.as_view(), name='login_user'),
    # get current user
    path('my_account/', GetUserProfile.as_view(), name='get_user_profile'),
    # logout user
    # path('logout/', LogoutView.as_view(), name='logout_user'),
    # search for user by username
    path('search/<slug:username>/', SearchUserView.as_view(), name='search_user'),
    # allow users to view all messages
    path('messages/', message_list, name='message_list'),
    # allow users to create message and get message
    path('message/', send_message, name='send_message'),
    # allow users to view message by id
    path('messages/<int:pk>/detail/', message_detail, name='message_detail'),
    # follow user
    path('user/<int:user_id>/follow/', follow_user, name='follow_user'),
    # unfollow user
    path('user/<int:user_id>/unfollow/', unfollow_user, name='unfollow_user'),
    # list followers
    path('users/<int:user_id>/followers/', followers_list, name='followers_list'),
    # list following
    path('user/<int:user_id>/following/', following_list, name='following_list'),
    # like and unlike a comment reply
    path('comment-replies/<int:comment_reply_id>/like/', CommentReplyLikeView.as_view(), name='comment_reply_like'),
    # list notifications
    path('notifications/', list_notifications, name='notification_list'),
    # delete notifications
    path('notifications/<int:pk>/delete/', delete_notification, name='notification_delete'),

    path('posts/newest-recent/', NewestAndRecentPostsView.as_view(), name='newest-recent-posts'),
]
