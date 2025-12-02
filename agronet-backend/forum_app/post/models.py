# from django.db import models
# from agronet_auth.models import User


# # Create your models here.
# class Post(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='puser')
#     title = models.CharField(max_length=200, default="",blank=False)
#     post_image = models.ImageField(upload_to='storage/posts/images')
#     text = models.TextField(blank=True, null=True)
#     views = models.PositiveBigIntegerField(default=0, blank=True)
#     created = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'{self.text[:30]}'

#     def get_count(self):
#         return self.lpost.count()
    
# class Vote(models.Model):
#     profile = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lruser')
#     post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='lpost')
#     created = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'{self.profile} liked {self.post}'
    
# class Follow(models.Model):
#     follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower_account')
#     followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed_account')
#     created = models.DateTimeField(auto_now_add=True, blank=True, null=True)

#     def __str__(self):
#         return f'{self.follower} follow {self.followed}'
    
# class Comment(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='com_account')
#     post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='com_post')
#     reply = models.ForeignKey('self', on_delete=models.CASCADE, related_name='com_comment', blank=True, null=True)
#     is_reply = models.BooleanField(default=False)
#     text = models.CharField(max_length=300)
#     created = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'{self.text[:15]}'

from django.db import models
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import hashlib
import time
from django.utils import timezone
from django.urls import reverse
from django.conf import settings
from .managers import PostManager
from agronet_auth.models import User



def post_image_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    hash = hashlib.md5(str(time.time()).encode()).hexdigest()
    return f"storage/posts/images/{instance.creator.id}/{hash}.{ext}"


# --- POST MODEL ---
class Post(models.Model):
    creator = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to=post_image_upload_path, null=True, blank=True)
    title = models.CharField(max_length=100, default="",blank=False)
    content = models.TextField(blank=True, null=True)
    likes = models.ManyToManyField(User, related_name="liked_posts", blank=True)
    saves = models.ManyToManyField(User, related_name="saved_posts", blank=True)
    views = models.PositiveBigIntegerField(default=0)
    is_edited = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = PostManager()

    def __str__(self):
        return f'{self.creator} - {self.content[:30]}'


# --- COMMENT MODEL ---
class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    creator = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE, null=True)
    content = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.creator} - {self.content[:30]}'


# --- REPLY TO COMMENTS ---
class CommentReply(models.Model):
    comment = models.ForeignKey(Comment, related_name='replies', on_delete=models.CASCADE)
    creator = models.ForeignKey(User, related_name='replies', on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.creator} replied - {self.content[:30]}'
    

class CommentReplyLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # The user who liked the comment reply
    comment_reply = models.ForeignKey(CommentReply, on_delete=models.CASCADE, related_name='likes')  # The comment reply that was liked
    created_at = models.DateTimeField(auto_now_add=True)  # The timestamp when the like was created

    class Meta:
        unique_together = ('user', 'comment_reply')  # A user can only like a comment reply once

    def __str__(self):
        return f"{self.user.username} liked {self.comment_reply}"  # String representation of the object```




class Message(models.Model):
    # the sender of the message
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    # the recipient of the message
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    # the content of the message
    content = models.TextField()
    image = models.ImageField(upload_to='storage/message_images/', null=True, blank=True)
    # the time the message was sent
    created_at = models.DateTimeField(auto_now_add=True)

    # class Meta:
    #     app_label = 'ReachOut2Me'

    def __str__(self):
        return self.content


# --- FOLLOW SYSTEM ---
class Follow(models.Model):
    follower = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    followed = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        unique_together = ('follower', 'followed')

    def __str__(self):
        return f'{self.follower} follows {self.followed}'


# --- NOTIFICATION MODEL ---
class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ("follow", "Follow"),
        ("message", "Message"),
        ("post_like", "Post Like"),
        ("comment", "Comment"),
        ("comment_like", "Comment Like"),
        ("reply", "Reply"),
        ("reply_like", "Reply"),
    )
           
    user = models.ForeignKey(User, related_name='notifications', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name='sent_notifications', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    message = models.CharField(max_length=255)
    read = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification for {self.user} - {self.message[:30]}'

    def get_absolute_url(self):
        if self.verb == "follow":
            return reverse("user_detail", kwargs={"username": self.actor_object.username})
        elif self.verb == "message":
            return reverse("messages")
        elif self.verb == "post_like":
            return reverse("post_detail", kwargs={"pk": self.actor_object.pk})
        elif self.verb == "comment_like":
            return reverse("comment_detail", kwargs={"pk": self.actor_object.pk})
        elif self.verb == "comment":
            return reverse("post_detail", kwargs={"pk": self.actor_object.post.pk})
        elif self.verb == "reply":
            return reverse("post_detail", kwargs={"pk": self.actor_object.post.pk})
        elif self.verb == "reply_like":
            return reverse("comment_detail", kwargs={"pk": self.actor_object.parent_comment.pk})
        
    @classmethod
    def create_message_notification(cls, recipient, message):
        actor_content_type = ContentType.objects.get_for_model(message.sender)
        notification = cls.objects.create(
            recipient=recipient,
            actor_content_type=actor_content_type,
            actor_object_id=message.sender.id,
            verb='message'
        )
        return notification
    
    @classmethod
    def create_follow_notification(cls, recipient, actor):
        actor_content_type = ContentType.objects.get_for_model(actor)
        notification = cls.objects.create(
            recipient=recipient,
            actor_content_type=actor_content_type,
            actor_object_id=actor.id,
            verb='follow'
        )
        return notification
    
    @classmethod
    def create_post_like_notification(cls, recipient, post, actor):
        actor_content_type = ContentType.objects.get_for_model(actor)
        notification = cls.objects.create(
            recipient=recipient,
            actor_content_type=actor_content_type,
            actor_object_id=actor.id,
            verb='post_like',
            actor_object=post
        )
        return notification
    
    @classmethod
    def create_comment_notification(cls, recipient, comment, actor):
        actor_content_type = ContentType.objects.get_for_model(actor)
        notification = cls.objects.create(
            recipient=recipient,
            actor_content_type=actor_content_type,
            actor_object_id=actor.id,
            verb='comment',
            actor_object=comment
        )
        return notification
    
    @classmethod
    def create_comment_like_notification(cls, recipient, comment, actor):
        actor_content_type = ContentType.objects.get_for_model(actor)
        notification = cls.objects.create(
            recipient=recipient,
            actor_content_type=actor_content_type,
            actor_object_id=actor.id,
            verb='comment_like',
            actor_object=comment
        )
        return notification
    
    @classmethod
    def create_reply_notification(cls, recipient, reply, actor):
        actor_content_type = ContentType.objects.get_for_model(actor)
        notification = cls.objects.create(
            recipient=recipient,
            actor_content_type=actor_content_type,
            actor_object_id=actor.id,
            verb='reply',
            actor_object=reply.comment
        )
        return notification
    
    @classmethod
    def reply_like_notification(cls, recipient, reply_like):
        actor_content_type = ContentType.objects.get_for_model(reply_like.user)
        notification = cls.objects.create(
            recipient=recipient,
            actor_content_type=actor_content_type,
            actor_object_id=reply_like.user.id,
            verb='reply_like',
            actor_object=reply_like
        )
        return notification


# USER PROFILE (EXTENSION) 
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    following = models.ManyToManyField(User, related_name='followers_profile', blank=True)
    bio = models.TextField(blank=True)
    gender = models.CharField(max_length=10, null=True)
    profile_image = models.ImageField(upload_to='storage/profiles/', blank=True, null=True)
    date_of_birth = models.DateField(null=True)
    phone_number = models.CharField(max_length=20, null=True)
    followers = models.ManyToManyField(User, related_name='following_profiles', blank=True)

    def __str__(self):
        return f'{self.user.email} Profile'
