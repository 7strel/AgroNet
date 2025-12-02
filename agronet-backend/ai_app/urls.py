from django.urls import include, path

urlpatterns = [
    path('ai/', include('ai_app.agronet_pilot.urls'))
]