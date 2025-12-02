from django.db import models
from agronet_auth.models import User
from django.core.validators import FileExtensionValidator


class Crop(models.Model):
    """Model to store different types of crops"""
    name = models.CharField(max_length=100, unique=True)
    scientific_name = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='crops/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Disease(models.Model):
    """Model to store different crop diseases"""
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]

    name = models.CharField(max_length=200)
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='diseases')
    description = models.TextField()
    symptoms = models.TextField()
    causes = models.TextField(blank=True)
    treatment = models.TextField()
    prevention = models.TextField(blank=True)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default='medium')
    image = models.ImageField(upload_to='diseases/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['name', 'crop']
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - {self.crop.name}"

class DiseaseSymptom(models.Model):
    """Model to store specific symptoms of diseases"""
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE, related_name='disease_symptoms')
    symptom = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['disease', 'symptom']

    def __str__(self):
        return f"{self.disease.name} - {self.symptom}"

class DetectionResult(models.Model):
    """Model to store disease detection results"""
    CONFIDENCE_CHOICES = [
        ('low', 'Low (< 50%)'),
        ('medium', 'Medium (50-75%)'),
        ('high', 'High (75-90%)'),
        ('very_high', 'Very High (> 90%)'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='detection_results')
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='detection_results')
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE, related_name='detection_results', null=True, blank=True)
    
    # Input image
    input_image = models.ImageField(
        upload_to='detection_inputs/',
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])]
    )
    
    # Detection results
    confidence_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    confidence_level = models.CharField(max_length=20, choices=CONFIDENCE_CHOICES, null=True, blank=True)
    detected_diseases = models.JSONField(default=list, blank=True)  # Store multiple disease predictions
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Additional metadata
    notes = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    weather_conditions = models.CharField(max_length=200, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Detection {self.id} - {self.crop.name} - {self.status}"

    def get_confidence_percentage(self):
        """Convert confidence score to percentage"""
        if self.confidence_score:
            return float(self.confidence_score) * 100
        return None

class DetectionHistory(models.Model):
    """Model to store detection history for analytics"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='detection_history')
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, related_name='detection_history')
    total_detections = models.PositiveIntegerField(default=0)
    successful_detections = models.PositiveIntegerField(default=0)
    most_common_disease = models.ForeignKey(Disease, on_delete=models.SET_NULL, null=True, blank=True)
    last_detection_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'crop']
        verbose_name_plural = 'Detection Histories'

    def __str__(self):
        return f"{self.user.username} - {self.crop.name} History"
