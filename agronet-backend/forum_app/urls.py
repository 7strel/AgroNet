from django.urls import include, path

urlpatterns = [
    path('forum/', include('forum_app.post.urls'))
]