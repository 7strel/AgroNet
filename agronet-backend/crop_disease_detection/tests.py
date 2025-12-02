from django.test import TestCase
from agronet_auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
import json

from .models import Crop, Disease, DiseaseSymptom, DetectionResult, DetectionHistory


class CropDiseaseDetectionModelsTest(TestCase):
    """Test cases for models"""
    
    def setUp(self):
        """Set up test data"""
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        
        self.crop = Crop.objects.create(
            name='Tomato',
            scientific_name='Solanum lycopersicum',
            description='A popular vegetable crop'
        )
        
        self.disease = Disease.objects.create(
            name='Early Blight',
            crop=self.crop,
            description='A fungal disease affecting tomato plants',
            symptoms='Brown spots on leaves, yellowing',
            causes='Fungi, poor air circulation',
            treatment='Remove affected leaves, apply fungicide',
            severity='medium'
        )
    
    def test_crop_creation(self):
        """Test crop model creation"""
        self.assertEqual(self.crop.name, 'Tomato')
        self.assertEqual(self.crop.scientific_name, 'Solanum lycopersicum')
    
    def test_disease_creation(self):
        """Test disease model creation"""
        self.assertEqual(self.disease.name, 'Early Blight')
        self.assertEqual(self.disease.crop, self.crop)
        self.assertEqual(self.disease.severity, 'medium')
    
    def test_detection_result_creation(self):
        """Test detection result model creation"""
        detection = DetectionResult.objects.create(
            user=self.user,
            crop=self.crop,
            disease=self.disease,
            confidence_score=0.85,
            confidence_level='high',
            status='completed'
        )
        
        self.assertEqual(detection.user, self.user)
        self.assertEqual(detection.crop, self.crop)
        self.assertEqual(detection.confidence_score, 0.85)
        self.assertEqual(detection.get_confidence_percentage(), 85.0)

class CropDiseaseDetectionAPITest(APITestCase):
    """Test cases for API endpoints"""
    
    def setUp(self):
        """Set up test data"""
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        
        self.crop = Crop.objects.create(
            name='Tomato',
            scientific_name='Solanum lycopersicum',
            description='A popular vegetable crop'
        )
        
        self.disease = Disease.objects.create(
            name='Early Blight',
            crop=self.crop,
            description='A fungal disease affecting tomato plants',
            symptoms='Brown spots on leaves, yellowing',
            causes='Fungi, poor air circulation',
            treatment='Remove affected leaves, apply fungicide',
            severity='medium'
        )
    
    def test_crop_list_api(self):
        """Test crop list API endpoint"""
        url = reverse('crop_disease_detection:crop-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Tomato')
    
    def test_disease_list_api(self):
        """Test disease list API endpoint"""
        url = reverse('crop_disease_detection:disease-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Early Blight')
    
    def test_disease_filter_by_crop(self):
        """Test disease filtering by crop"""
        url = reverse('crop_disease_detection:disease-list')
        response = self.client.get(url, {'crop_id': self.crop.id})
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['crop_name'], 'Tomato')
    
    def test_crop_diseases_endpoint(self):
        """Test crop diseases endpoint"""
        url = reverse('crop_disease_detection:crop-diseases', kwargs={'pk': self.crop.id})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Early Blight')
    
    def test_disease_detection_requires_authentication(self):
        """Test that disease detection requires authentication"""
        url = reverse('crop_disease_detection:detection-result-detect-disease')
        
        # Create a simple test image
        image_data = b'fake-image-data'
        image = SimpleUploadedFile('test.jpg', image_data, content_type='image/jpeg')
        
        data = {
            'crop_id': self.crop.id,
            'image': image,
        }
        
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_disease_detection_with_authentication(self):
        """Test disease detection with authentication"""
        self.client.force_authenticate(user=self.user)
        url = reverse('crop_disease_detection:detection-result-detect-disease')
        
        # Create a simple test image
        image_data = b'fake-image-data'
        image = SimpleUploadedFile('test.jpg', image_data, content_type='image/jpeg')
        
        data = {
            'crop_id': self.crop.id,
            'image': image,
            'location': 'Test Farm',
            'weather_conditions': 'Sunny',
            'notes': 'Test detection'
        }
        
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Check response structure
        self.assertIn('detection_id', response.data)
        self.assertIn('status', response.data)
        self.assertIn('detected_diseases', response.data)
        self.assertIn('confidence_score', response.data)
        self.assertIn('recommendations', response.data)
    
    def test_user_detection_history(self):
        """Test user detection history endpoint"""
        self.client.force_authenticate(user=self.user)
        url = reverse('crop_disease_detection:detection-result-my-detections')
        
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # No detections yet
    
    def test_user_statistics(self):
        """Test user statistics endpoint"""
        self.client.force_authenticate(user=self.user)
        url = reverse('crop_disease_detection:detection-result-statistics')
        
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_detections'], 0)
        self.assertEqual(response.data['successful_detections'], 0)
    
    def test_crop_statistics(self):
        """Test crop statistics endpoint"""
        url = reverse('crop_disease_detection:crop-statistics', kwargs={'pk': self.crop.id})
        
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['crop_name'], 'Tomato')
        self.assertEqual(response.data['total_detections'], 0)

class CropDiseaseDetectionIntegrationTest(APITestCase):
    """Integration tests for the complete workflow"""
    
    def setUp(self):
        """Set up test data"""
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        
        # Create multiple crops and diseases
        self.tomato = Crop.objects.create(
            name='Tomato',
            scientific_name='Solanum lycopersicum',
            description='A popular vegetable crop'
        )
        
        self.potato = Crop.objects.create(
            name='Potato',
            scientific_name='Solanum tuberosum',
            description='A staple food crop'
        )
        
        self.tomato_blight = Disease.objects.create(
            name='Early Blight',
            crop=self.tomato,
            description='A fungal disease affecting tomato plants',
            symptoms='Brown spots on leaves, yellowing',
            causes='Fungi, poor air circulation',
            treatment='Remove affected leaves, apply fungicide',
            severity='medium'
        )
        
        self.potato_blight = Disease.objects.create(
            name='Late Blight',
            crop=self.potato,
            description='A serious disease affecting potato plants',
            symptoms='Dark lesions on leaves and stems',
            causes='Phytophthora infestans',
            treatment='Apply fungicide, improve drainage',
            severity='high'
        )
    
    def test_complete_detection_workflow(self):
        """Test the complete disease detection workflow"""
        self.client.force_authenticate(user=self.user)
        
        # Step 1: Get available crops
        crops_url = reverse('crop_disease_detection:crop-list')
        crops_response = self.client.get(crops_url)
        self.assertEqual(crops_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(crops_response.data), 2)
        
        # Step 2: Get diseases for a specific crop
        diseases_url = reverse('crop_disease_detection:crop-diseases', kwargs={'pk': self.tomato.id})
        diseases_response = self.client.get(diseases_url)
        self.assertEqual(diseases_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(diseases_response.data), 1)
        
        # Step 3: Perform disease detection
        detection_url = reverse('crop_disease_detection:detection-result-detect-disease')
        image_data = b'fake-image-data'
        image = SimpleUploadedFile('test.jpg', image_data, content_type='image/jpeg')
        
        detection_data = {
            'crop_id': self.tomato.id,
            'image': image,
            'location': 'Test Farm',
            'weather_conditions': 'Humid',
            'notes': 'Integration test'
        }
        
        detection_response = self.client.post(detection_url, detection_data, format='multipart')
        self.assertEqual(detection_response.status_code, status.HTTP_200_OK)
        
        # Step 4: Check detection history
        history_url = reverse('crop_disease_detection:detection-result-my-detections')
        history_response = self.client.get(history_url)
        self.assertEqual(history_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(history_response.data), 1)
        
        # Step 5: Check updated statistics
        stats_url = reverse('crop_disease_detection:detection-result-statistics')
        stats_response = self.client.get(stats_url)
        self.assertEqual(stats_response.status_code, status.HTTP_200_OK)
        self.assertEqual(stats_response.data['total_detections'], 1)
        self.assertEqual(stats_response.data['successful_detections'], 1)
