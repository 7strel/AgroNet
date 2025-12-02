from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from django.db.models import Count, Avg, Q
from django.utils import timezone
from django.contrib.auth import get_user_model
import time
import json

from .models import Crop, Disease, DiseaseSymptom, DetectionResult, DetectionHistory
from .serializers import (
    CropSerializer, DiseaseSerializer, DiseaseSymptomSerializer,
    DetectionResultSerializer, DetectionResultCreateSerializer,
    DetectionHistorySerializer, DiseaseDetectionRequestSerializer,
    DiseaseDetectionResponseSerializer, CropDiseaseStatisticsSerializer
)

User = get_user_model()

class CropViewSet(viewsets.ModelViewSet):
    """ViewSet for Crop model"""
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    @action(detail=True, methods=['get'])
    def diseases(self, request, pk=None):
        """Get all diseases for a specific crop"""
        crop = self.get_object()
        diseases = crop.diseases.all()
        serializer = DiseaseSerializer(diseases, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def statistics(self, request, pk=None):
        """Get detection statistics for a specific crop"""
        crop = self.get_object()
        
        # Get detection statistics
        total_detections = DetectionResult.objects.filter(crop=crop).count()
        successful_detections = DetectionResult.objects.filter(
            crop=crop, status='completed'
        ).count()
        
        # Get disease distribution
        disease_distribution = DetectionResult.objects.filter(
            crop=crop, status='completed'
        ).values('disease__name').annotate(
            count=Count('disease')
        ).order_by('-count')
        
        # Get most common disease
        most_common_disease = None
        if disease_distribution:
            most_common_disease = disease_distribution[0]['disease__name']
        
        # Get average confidence
        avg_confidence = DetectionResult.objects.filter(
            crop=crop, status='completed'
        ).aggregate(Avg('confidence_score'))['confidence_score__avg']
        
        data = {
            'crop_id': crop.id,
            'crop_name': crop.name,
            'total_detections': total_detections,
            'successful_detections': successful_detections,
            'disease_distribution': {item['disease__name']: item['count'] for item in disease_distribution},
            'most_common_disease': most_common_disease,
            'average_confidence': round(avg_confidence, 2) if avg_confidence else None
        }
        
        serializer = CropDiseaseStatisticsSerializer(data)
        return Response(serializer.data)

class DiseaseViewSet(viewsets.ModelViewSet):
    """ViewSet for Disease model"""
    queryset = Disease.objects.all()
    serializer_class = DiseaseSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        """Filter diseases by crop if crop_id is provided"""
        queryset = Disease.objects.all()
        crop_id = self.request.query_params.get('crop_id', None)
        if crop_id is not None:
            queryset = queryset.filter(crop_id=crop_id)
        return queryset
    
    @action(detail=True, methods=['get'])
    def symptoms(self, request, pk=None):
        """Get all symptoms for a specific disease"""
        disease = self.get_object()
        symptoms = disease.disease_symptoms.all()
        serializer = DiseaseSymptomSerializer(symptoms, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_severity(self, request):
        """Get diseases filtered by severity"""
        severity = request.query_params.get('severity', None)
        if severity:
            diseases = Disease.objects.filter(severity=severity)
        else:
            diseases = Disease.objects.all()
        
        serializer = self.get_serializer(diseases, many=True)
        return Response(serializer.data)

class DiseaseSymptomViewSet(viewsets.ModelViewSet):
    """ViewSet for DiseaseSymptom model"""
    queryset = DiseaseSymptom.objects.all()
    serializer_class = DiseaseSymptomSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        """Filter symptoms by disease if disease_id is provided"""
        queryset = DiseaseSymptom.objects.all()
        disease_id = self.request.query_params.get('disease_id', None)
        if disease_id is not None:
            queryset = queryset.filter(disease_id=disease_id)
        return queryset

class DetectionResultViewSet(viewsets.ModelViewSet):
    """ViewSet for DetectionResult model"""
    serializer_class = DetectionResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def get_queryset(self):
        """Return detection results for the current user"""
        return DetectionResult.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        """Use different serializer for creation"""
        if self.action == 'create':
            return DetectionResultCreateSerializer
        return DetectionResultSerializer
    
    def perform_create(self, serializer):
        """Set the user when creating a detection result"""
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['post'])
    def detect_disease(self, request):
        """Main endpoint for disease detection"""
        start_time = time.time()
        
        # Validate request data
        serializer = DiseaseDetectionRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Get crop
            crop = get_object_or_404(Crop, id=serializer.validated_data['crop_id'])
            
            # Create detection result
            detection_result = DetectionResult.objects.create(
                user=request.user,
                crop=crop,
                input_image=serializer.validated_data['image'],
                notes=serializer.validated_data.get('notes', ''),
                location=serializer.validated_data.get('location', ''),
                weather_conditions=serializer.validated_data.get('weather_conditions', ''),
                status='processing'
            )
            
            # Simulate disease detection (replace with actual ML model)
            detected_diseases, confidence_score = self._simulate_disease_detection(crop)
            
            # Update detection result
            detection_result.detected_diseases = detected_diseases
            detection_result.confidence_score = confidence_score
            
            # Set confidence level
            if confidence_score:
                if confidence_score < 0.5:
                    detection_result.confidence_level = 'low'
                elif confidence_score < 0.75:
                    detection_result.confidence_level = 'medium'
                elif confidence_score < 0.9:
                    detection_result.confidence_level = 'high'
                else:
                    detection_result.confidence_level = 'very_high'
            
            # Set primary disease if detected
            if detected_diseases:
                try:
                    primary_disease = Disease.objects.get(
                        name=detected_diseases[0]['disease_name'],
                        crop=crop
                    )
                    detection_result.disease = primary_disease
                except Disease.DoesNotExist:
                    pass
            
            detection_result.status = 'completed'
            detection_result.save()
            
            # Update detection history
            self._update_detection_history(request.user, crop, detection_result)
            
            # Calculate processing time
            processing_time = time.time() - start_time
            
            # Prepare response
            recommendations = self._generate_recommendations(detected_diseases, crop)
            
            response_data = {
                'detection_id': detection_result.id,
                'status': detection_result.status,
                'detected_diseases': detected_diseases,
                'confidence_score': confidence_score,
                'confidence_level': detection_result.confidence_level,
                'recommendations': recommendations,
                'processing_time': round(processing_time, 2)
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def my_detections(self, request):
        """Get user's detection history"""
        detections = self.get_queryset().order_by('-created_at')
        
        # Apply filters
        crop_id = request.query_params.get('crop_id')
        if crop_id:
            detections = detections.filter(crop_id=crop_id)
        
        status_filter = request.query_params.get('status')
        if status_filter:
            detections = detections.filter(status=status_filter)
        
        serializer = self.get_serializer(detections, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get user's detection statistics"""
        user_detections = self.get_queryset()
        
        total_detections = user_detections.count()
        successful_detections = user_detections.filter(status='completed').count()
        
        # Get most detected crop
        most_detected_crop = user_detections.values('crop__name').annotate(
            count=Count('crop')
        ).order_by('-count').first()
        
        # Get most common disease
        most_common_disease = user_detections.filter(
            status='completed'
        ).values('disease__name').annotate(
            count=Count('disease')
        ).order_by('-count').first()
        
        # Get average confidence
        avg_confidence = user_detections.filter(
            status='completed'
        ).aggregate(Avg('confidence_score'))['confidence_score__avg']
        
        data = {
            'total_detections': total_detections,
            'successful_detections': successful_detections,
            'success_rate': round((successful_detections / total_detections * 100), 2) if total_detections > 0 else 0,
            'most_detected_crop': most_detected_crop['crop__name'] if most_detected_crop else None,
            'most_common_disease': most_common_disease['disease__name'] if most_common_disease else None,
            'average_confidence': round(avg_confidence, 2) if avg_confidence else None
        }
        
        return Response(data)
    
    def _simulate_disease_detection(self, crop):
        """Simulate disease detection (replace with actual ML model)"""
        import random
        
        # Get diseases for this crop
        diseases = Disease.objects.filter(crop=crop)
        
        if not diseases.exists():
            return [], None
        
        # Simulate detection (random for demo purposes)
        detected_diseases = []
        confidence_score = random.uniform(0.6, 0.95)
        
        # Randomly select 1-2 diseases
        num_diseases = random.randint(1, min(2, diseases.count()))
        selected_diseases = random.sample(list(diseases), num_diseases)
        
        for disease in selected_diseases:
            disease_confidence = random.uniform(0.5, confidence_score)
            detected_diseases.append({
                'disease_name': disease.name,
                'confidence': round(disease_confidence, 3),
                'severity': disease.severity,
                'description': disease.description[:100] + '...' if len(disease.description) > 100 else disease.description
            })
        
        # Sort by confidence
        detected_diseases.sort(key=lambda x: x['confidence'], reverse=True)
        
        return detected_diseases, round(confidence_score, 3)
    
    def _generate_recommendations(self, detected_diseases, crop):
        """Generate recommendations based on detected diseases"""
        recommendations = []
        
        if not detected_diseases:
            recommendations.append("No diseases detected. Continue monitoring your crop health.")
            return recommendations
        
        for disease_data in detected_diseases:
            try:
                disease = Disease.objects.get(name=disease_data['disease_name'], crop=crop)
                
                if disease_data['severity'] in ['high', 'critical']:
                    recommendations.append(f"URGENT: {disease.name} detected with {disease_data['severity']} severity. Take immediate action.")
                
                recommendations.append(f"Treatment for {disease.name}: {disease.treatment}")
                
                if disease.prevention:
                    recommendations.append(f"Prevention for {disease.name}: {disease.prevention}")
                    
            except Disease.DoesNotExist:
                recommendations.append(f"Unknown disease detected: {disease_data['disease_name']}")
        
        return recommendations
    
    def _update_detection_history(self, user, crop, detection_result):
        """Update user's detection history"""
        history, created = DetectionHistory.objects.get_or_create(
            user=user,
            crop=crop,
            defaults={
                'total_detections': 0,
                'successful_detections': 0
            }
        )
        
        history.total_detections += 1
        
        if detection_result.status == 'completed':
            history.successful_detections += 1
        
        # Update most common disease
        if detection_result.disease:
            disease_counts = DetectionResult.objects.filter(
                user=user,
                crop=crop,
                status='completed'
            ).values('disease').annotate(count=Count('disease')).order_by('-count')
            
            if disease_counts:
                most_common_disease_id = disease_counts[0]['disease']
                history.most_common_disease_id = most_common_disease_id
        
        history.last_detection_date = timezone.now()
        history.save()

class DetectionHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for DetectionHistory model (read-only)"""
    serializer_class = DetectionHistorySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Return detection history for the current user"""
        return DetectionHistory.objects.filter(user=self.request.user)
