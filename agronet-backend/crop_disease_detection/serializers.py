from rest_framework import serializers
from .models import Crop, Disease, DiseaseSymptom, DetectionResult, DetectionHistory
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class DiseaseSymptomSerializer(serializers.ModelSerializer):
    """Serializer for DiseaseSymptom model"""
    class Meta:
        model = DiseaseSymptom
        fields = ['id', 'symptom', 'description', 'created_at']

class DiseaseSerializer(serializers.ModelSerializer):
    """Serializer for Disease model"""
    symptoms = DiseaseSymptomSerializer(many=True, read_only=True)
    crop_name = serializers.CharField(source='crop.name', read_only=True)
    
    class Meta:
        model = Disease
        fields = [
            'id', 'name', 'crop', 'crop_name', 'description', 'symptoms', 
            'causes', 'treatment', 'prevention', 'severity', 'image', 
            'created_at', 'updated_at'
        ]

class CropSerializer(serializers.ModelSerializer):
    """Serializer for Crop model"""
    diseases = DiseaseSerializer(many=True, read_only=True)
    disease_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Crop
        fields = [
            'id', 'name', 'scientific_name', 'description', 'image', 
            'diseases', 'disease_count', 'created_at', 'updated_at'
        ]
    
    def get_disease_count(self, obj):
        return obj.diseases.count()

class DetectionResultSerializer(serializers.ModelSerializer):
    """Serializer for DetectionResult model"""
    user = UserSerializer(read_only=True)
    crop_name = serializers.CharField(source='crop.name', read_only=True)
    disease_name = serializers.CharField(source='disease.name', read_only=True)
    confidence_percentage = serializers.SerializerMethodField()
    
    class Meta:
        model = DetectionResult
        fields = [
            'id', 'user', 'crop', 'crop_name', 'disease', 'disease_name',
            'input_image', 'confidence_score', 'confidence_level', 
            'confidence_percentage', 'detected_diseases', 'status',
            'notes', 'location', 'weather_conditions', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'confidence_score', 'confidence_level', 'detected_diseases', 'status']
    
    def get_confidence_percentage(self, obj):
        return obj.get_confidence_percentage()

class DetectionResultCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new detection results"""
    class Meta:
        model = DetectionResult
        fields = [
            'crop', 'input_image', 'notes', 'location', 'weather_conditions'
        ]
    
    def validate_input_image(self, value):
        """Validate image file"""
        if value.size > 10 * 1024 * 1024:  # 10MB limit
            raise serializers.ValidationError("Image file size must be less than 10MB")
        return value

class DetectionHistorySerializer(serializers.ModelSerializer):
    """Serializer for DetectionHistory model"""
    user = UserSerializer(read_only=True)
    crop_name = serializers.CharField(source='crop.name', read_only=True)
    most_common_disease_name = serializers.CharField(source='most_common_disease.name', read_only=True)
    success_rate = serializers.SerializerMethodField()
    
    class Meta:
        model = DetectionHistory
        fields = [
            'id', 'user', 'crop', 'crop_name', 'total_detections', 
            'successful_detections', 'success_rate', 'most_common_disease',
            'most_common_disease_name', 'last_detection_date', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'total_detections', 'successful_detections', 
                           'most_common_disease', 'last_detection_date']
    
    def get_success_rate(self, obj):
        if obj.total_detections > 0:
            return round((obj.successful_detections / obj.total_detections) * 100, 2)
        return 0

class DiseaseDetectionRequestSerializer(serializers.Serializer):
    """Serializer for disease detection API requests"""
    crop_id = serializers.IntegerField(required=True)
    image = serializers.ImageField(required=True)
    location = serializers.CharField(max_length=200, required=False, allow_blank=True)
    weather_conditions = serializers.CharField(max_length=200, required=False, allow_blank=True)
    notes = serializers.CharField(required=False, allow_blank=True)
    
    def validate_crop_id(self, value):
        """Validate that crop exists"""
        try:
            Crop.objects.get(id=value)
        except Crop.DoesNotExist:
            raise serializers.ValidationError("Crop with this ID does not exist")
        return value
    
    def validate_image(self, value):
        """Validate image file"""
        if value.size > 10 * 1024 * 1024:  # 10MB limit
            raise serializers.ValidationError("Image file size must be less than 10MB")
        return value

class DiseaseDetectionResponseSerializer(serializers.Serializer):
    """Serializer for disease detection API responses"""
    detection_id = serializers.IntegerField()
    status = serializers.CharField()
    detected_diseases = serializers.ListField()
    confidence_score = serializers.DecimalField(max_digits=5, decimal_places=2, allow_null=True)
    confidence_level = serializers.CharField(allow_null=True)
    recommendations = serializers.ListField()
    processing_time = serializers.FloatField()

class CropDiseaseStatisticsSerializer(serializers.Serializer):
    """Serializer for crop disease statistics"""
    crop_id = serializers.IntegerField()
    crop_name = serializers.CharField()
    total_detections = serializers.IntegerField()
    disease_distribution = serializers.DictField()
    most_common_disease = serializers.CharField(allow_null=True)
    average_confidence = serializers.FloatField(allow_null=True) 