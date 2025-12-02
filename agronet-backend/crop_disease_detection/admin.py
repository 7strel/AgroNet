from django.contrib import admin
from .models import Crop, Disease, DiseaseSymptom, DetectionResult, DetectionHistory

class DiseaseSymptomInline(admin.TabularInline):
    """Inline admin for DiseaseSymptom"""
    model = DiseaseSymptom
    extra = 1

@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    """Admin interface for Crop model"""
    list_display = ['name', 'scientific_name', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['name', 'scientific_name', 'description']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['name']

@admin.register(Disease)
class DiseaseAdmin(admin.ModelAdmin):
    """Admin interface for Disease model"""
    list_display = ['name', 'crop', 'severity', 'created_at', 'updated_at']
    list_filter = ['severity', 'crop', 'created_at', 'updated_at']
    search_fields = ['name', 'description', 'symptoms', 'causes', 'treatment']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['crop__name', 'name']
    inlines = [DiseaseSymptomInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'crop', 'description', 'severity')
        }),
        ('Disease Details', {
            'fields': ('symptoms', 'causes', 'treatment', 'prevention')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )

@admin.register(DiseaseSymptom)
class DiseaseSymptomAdmin(admin.ModelAdmin):
    """Admin interface for DiseaseSymptom model"""
    list_display = ['symptom', 'disease', 'created_at']
    list_filter = ['disease', 'created_at']
    search_fields = ['symptom', 'description', 'disease__name']
    readonly_fields = ['created_at']
    ordering = ['disease__name', 'symptom']

@admin.register(DetectionResult)
class DetectionResultAdmin(admin.ModelAdmin):
    """Admin interface for DetectionResult model"""
    list_display = [
        'id', 'user', 'crop', 'disease', 'confidence_level', 
        'status', 'created_at'
    ]
    list_filter = [
        'status', 'confidence_level', 'crop', 'created_at', 'updated_at'
    ]
    search_fields = [
        'user__username', 'user__email', 'crop__name', 
        'disease__name', 'notes', 'location'
    ]
    readonly_fields = [
        'user', 'crop', 'disease', 'input_image', 'confidence_score',
        'confidence_level', 'detected_diseases', 'status', 
        'created_at', 'updated_at'
    ]
    ordering = ['-created_at']
    
    fieldsets = (
        ('Detection Information', {
            'fields': ('user', 'crop', 'disease', 'status')
        }),
        ('Results', {
            'fields': ('confidence_score', 'confidence_level', 'detected_diseases')
        }),
        ('Input Data', {
            'fields': ('input_image', 'notes', 'location', 'weather_conditions')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def has_add_permission(self, request):
        """Prevent manual creation of detection results"""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Allow viewing but not editing"""
        return False

@admin.register(DetectionHistory)
class DetectionHistoryAdmin(admin.ModelAdmin):
    """Admin interface for DetectionHistory model"""
    list_display = [
        'user', 'crop', 'total_detections', 'successful_detections',
        'most_common_disease', 'last_detection_date'
    ]
    list_filter = ['crop', 'last_detection_date', 'created_at', 'updated_at']
    search_fields = ['user__username', 'user__email', 'crop__name']
    readonly_fields = [
        'user', 'crop', 'total_detections', 'successful_detections',
        'most_common_disease', 'last_detection_date', 'created_at', 'updated_at'
    ]
    ordering = ['-last_detection_date']
    
    def has_add_permission(self, request):
        """Prevent manual creation of detection history"""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Allow viewing but not editing"""
        return False
