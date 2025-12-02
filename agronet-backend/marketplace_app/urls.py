from django.urls import include, path

urlpatterns = [
    path('marketplace/', include('marketplace_app.product.urls'))
]