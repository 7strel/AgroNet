from django.urls import include, path

urlpatterns = [
    path('learn/', include('learn_app.course.urls')),
    path('learn/', include('learn_app.save_course.urls'))
]