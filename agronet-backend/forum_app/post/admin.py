from django.contrib import admin
from .models import Post, Comment, Message, UserProfile,CommentReply,Notification, Follow

# admin.site.register(Post)

# @admin.register(Vote)
# class VoteAdmin(admin.ModelAdmin):
#     raw_id_fields = ('profile', )

# @admin.register(Follow)
# class FollowView(admin.ModelAdmin):
#     raw_id_fields = ('follower', 'followed')

# @admin.register(Comment)
# class CommentAdmin(admin.ModelAdmin):
#     list_display = ['id', 'post', ]
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Message)
admin.site.register(UserProfile)
admin.site.register(CommentReply)
admin.site.register(Notification)
admin.site.register(Follow)
