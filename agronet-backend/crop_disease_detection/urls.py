from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'crops', views.CropViewSet)
router.register(r'diseases', views.DiseaseViewSet)
router.register(r'disease-symptoms', views.DiseaseSymptomViewSet)
router.register(r'detection-results', views.DetectionResultViewSet, basename='detection-result')
router.register(r'detection-history', views.DetectionHistoryViewSet, basename='detection-history')

app_name = 'crop_disease_detection'

urlpatterns = [
    path('', include(router.urls)),
] 