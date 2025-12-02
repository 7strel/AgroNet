from django.urls import include, path

urlpatterns = [
    path('payments/', include('payments_app.order.urls')),
    path('payments/', include('payments_app.transaction.urls')),
    path('payments/', include('payments_app.cart.urls')),
    path('payments/', include('payments_app.wishlist.urls'))
]
