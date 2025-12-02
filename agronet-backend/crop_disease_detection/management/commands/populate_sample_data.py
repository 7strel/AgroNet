from django.core.management.base import BaseCommand
from crop_disease_detection.models import Crop, Disease, DiseaseSymptom


class Command(BaseCommand):
    help = 'Populate the database with sample crops and diseases'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample crops and diseases...')

        # Create crops
        crops_data = [
            {
                'name': 'Tomato',
                'scientific_name': 'Solanum lycopersicum',
                'description': 'A popular vegetable crop grown worldwide for its edible fruits.'
            },
            {
                'name': 'Potato',
                'scientific_name': 'Solanum tuberosum',
                'description': 'A starchy tuber crop that is a staple food in many countries.'
            },
            {
                'name': 'Corn',
                'scientific_name': 'Zea mays',
                'description': 'A cereal grain that is a major food crop worldwide.'
            },
            {
                'name': 'Rice',
                'scientific_name': 'Oryza sativa',
                'description': 'A cereal grain that is the most important staple food for a large part of the world population.'
            },
            {
                'name': 'Wheat',
                'scientific_name': 'Triticum aestivum',
                'description': 'A cereal grain that is a major food crop worldwide.'
            }
        ]

        created_crops = {}
        for crop_data in crops_data:
            crop, created = Crop.objects.get_or_create(
                name=crop_data['name'],
                defaults=crop_data
            )
            created_crops[crop.name] = crop
            if created:
                self.stdout.write(f'Created crop: {crop.name}')
            else:
                self.stdout.write(f'Crop already exists: {crop.name}')

        # Create diseases for each crop
        diseases_data = {
            'Tomato': [
                {
                    'name': 'Early Blight',
                    'description': 'A fungal disease caused by Alternaria solani that affects tomato plants.',
                    'symptoms': 'Brown spots with concentric rings on leaves, yellowing of leaves, defoliation',
                    'causes': 'Fungi (Alternaria solani), poor air circulation, overhead watering',
                    'treatment': 'Remove affected leaves, apply fungicide, improve air circulation',
                    'prevention': 'Maintain good air circulation, avoid overhead watering, use resistant varieties',
                    'severity': 'medium'
                },
                {
                    'name': 'Late Blight',
                    'description': 'A serious disease caused by Phytophthora infestans that can destroy entire crops.',
                    'symptoms': 'Dark, water-soaked lesions on leaves and stems, white fungal growth',
                    'causes': 'Fungi (Phytophthora infestans), cool, wet weather conditions',
                    'treatment': 'Apply fungicide immediately, remove infected plants',
                    'prevention': 'Use resistant varieties, avoid overhead watering, maintain good spacing',
                    'severity': 'high'
                },
                {
                    'name': 'Leaf Spot',
                    'description': 'A fungal disease that causes spots on tomato leaves.',
                    'symptoms': 'Small, dark spots on leaves, yellowing around spots',
                    'causes': 'Fungi, poor air circulation, high humidity',
                    'treatment': 'Remove affected leaves, apply fungicide',
                    'prevention': 'Improve air circulation, avoid overhead watering',
                    'severity': 'low'
                }
            ],
            'Potato': [
                {
                    'name': 'Late Blight',
                    'description': 'A devastating disease caused by Phytophthora infestans that affects potato plants.',
                    'symptoms': 'Dark lesions on leaves and stems, white fungal growth, tuber rot',
                    'causes': 'Fungi (Phytophthora infestans), cool, wet weather',
                    'treatment': 'Apply fungicide, remove infected plants, harvest early',
                    'prevention': 'Use resistant varieties, avoid overhead watering, maintain good spacing',
                    'severity': 'critical'
                },
                {
                    'name': 'Early Blight',
                    'description': 'A fungal disease that affects potato leaves and stems.',
                    'symptoms': 'Brown spots with concentric rings, yellowing leaves',
                    'causes': 'Fungi (Alternaria solani), stress conditions',
                    'treatment': 'Remove affected leaves, apply fungicide',
                    'prevention': 'Maintain good nutrition, avoid stress conditions',
                    'severity': 'medium'
                }
            ],
            'Corn': [
                {
                    'name': 'Northern Corn Leaf Blight',
                    'description': 'A fungal disease that affects corn leaves.',
                    'symptoms': 'Long, elliptical lesions on leaves, gray to tan centers',
                    'causes': 'Fungi (Exserohilum turcicum), warm, humid weather',
                    'treatment': 'Apply fungicide, remove crop debris',
                    'prevention': 'Use resistant varieties, rotate crops, remove debris',
                    'severity': 'medium'
                },
                {
                    'name': 'Common Rust',
                    'description': 'A fungal disease that causes rust-colored pustules on corn leaves.',
                    'symptoms': 'Rust-colored pustules on leaves, yellowing',
                    'causes': 'Fungi (Puccinia sorghi), moderate temperatures',
                    'treatment': 'Apply fungicide if severe',
                    'prevention': 'Use resistant varieties, early planting',
                    'severity': 'low'
                }
            ],
            'Rice': [
                {
                    'name': 'Rice Blast',
                    'description': 'A serious fungal disease that affects rice plants.',
                    'symptoms': 'Diamond-shaped lesions on leaves, neck rot, panicle blanking',
                    'causes': 'Fungi (Magnaporthe oryzae), high humidity, high nitrogen',
                    'treatment': 'Apply fungicide, remove infected plants',
                    'prevention': 'Use resistant varieties, balanced fertilization, proper spacing',
                    'severity': 'high'
                },
                {
                    'name': 'Bacterial Leaf Blight',
                    'description': 'A bacterial disease that affects rice leaves.',
                    'symptoms': 'Yellow to white lesions on leaves, wilting',
                    'causes': 'Bacteria (Xanthomonas oryzae), high humidity',
                    'treatment': 'Remove infected plants, apply copper-based bactericide',
                    'prevention': 'Use resistant varieties, avoid overhead irrigation',
                    'severity': 'medium'
                }
            ],
            'Wheat': [
                {
                    'name': 'Stem Rust',
                    'description': 'A serious fungal disease that affects wheat stems and leaves.',
                    'symptoms': 'Reddish-brown pustules on stems and leaves, plant death',
                    'causes': 'Fungi (Puccinia graminis), warm temperatures',
                    'treatment': 'Apply fungicide, remove infected plants',
                    'prevention': 'Use resistant varieties, early planting, crop rotation',
                    'severity': 'high'
                },
                {
                    'name': 'Leaf Rust',
                    'description': 'A fungal disease that affects wheat leaves.',
                    'symptoms': 'Orange to reddish-brown pustules on leaves',
                    'causes': 'Fungi (Puccinia triticina), moderate temperatures',
                    'treatment': 'Apply fungicide if severe',
                    'prevention': 'Use resistant varieties, proper fertilization',
                    'severity': 'medium'
                }
            ]
        }

        for crop_name, diseases in diseases_data.items():
            crop = created_crops.get(crop_name)
            if crop:
                for disease_data in diseases:
                    disease, created = Disease.objects.get_or_create(
                        name=disease_data['name'],
                        crop=crop,
                        defaults=disease_data
                    )
                    if created:
                        self.stdout.write(f'Created disease: {disease.name} for {crop.name}')
                    else:
                        self.stdout.write(f'Disease already exists: {disease.name} for {crop.name}')

        self.stdout.write(
            self.style.SUCCESS('Successfully populated sample data!')
        ) 