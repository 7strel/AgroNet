# Crop Disease Detection API

A comprehensive REST API for detecting and managing crop diseases using machine learning and image analysis.

## Features

- **Crop Management**: Add and manage different types of crops
- **Disease Database**: Comprehensive database of crop diseases with symptoms, causes, and treatments
- **Image-based Detection**: Upload crop images for automatic disease detection
- **Confidence Scoring**: Get confidence levels for detection results
- **Treatment Recommendations**: Receive treatment and prevention recommendations
- **Detection History**: Track detection history and statistics
- **Analytics**: Get insights into detection patterns and disease prevalence

## API Endpoints

### Crops

#### Get All Crops
```
GET /api/v1/crops/
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Tomato",
    "scientific_name": "Solanum lycopersicum",
    "description": "A popular vegetable crop",
    "image": null,
    "diseases": [...],
    "disease_count": 3,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

#### Get Single Crop
```
GET /api/v1/crops/{id}/
```

#### Get Crop Diseases
```
GET /api/v1/crops/{id}/diseases/
```

#### Get Crop Statistics
```
GET /api/v1/crops/{id}/statistics/
```

**Response:**
```json
{
  "crop_id": 1,
  "crop_name": "Tomato",
  "total_detections": 150,
  "successful_detections": 142,
  "disease_distribution": {
    "Early Blight": 45,
    "Late Blight": 38,
    "Leaf Spot": 27
  },
  "most_common_disease": "Early Blight",
  "average_confidence": 0.87
}
```

### Diseases

#### Get All Diseases
```
GET /api/v1/diseases/
```

**Query Parameters:**
- `crop_id`: Filter diseases by crop ID

#### Get Single Disease
```
GET /api/v1/diseases/{id}/
```

#### Get Disease Symptoms
```
GET /api/v1/diseases/{id}/symptoms/
```

#### Filter Diseases by Severity
```
GET /api/v1/diseases/by_severity/?severity=high
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Early Blight",
    "crop": 1,
    "crop_name": "Tomato",
    "description": "A fungal disease affecting tomato plants",
    "symptoms": [
      {
        "id": 1,
        "symptom": "Brown spots on leaves",
        "description": "Circular brown lesions with concentric rings",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "causes": "Fungi, poor air circulation",
    "treatment": "Remove affected leaves, apply fungicide",
    "prevention": "Maintain good air circulation, avoid overhead watering",
    "severity": "medium",
    "image": null,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

### Disease Detection

#### Detect Disease (Main Endpoint)
```
POST /api/v1/detection-results/detect_disease/
```

**Authentication Required:** Yes

**Request Body (multipart/form-data):**
```json
{
  "crop_id": 1,
  "image": "file",
  "location": "Farm Location (optional)",
  "weather_conditions": "Current weather (optional)",
  "notes": "Additional notes (optional)"
}
```

**Response:**
```json
{
  "detection_id": 123,
  "status": "completed",
  "detected_diseases": [
    {
      "disease_name": "Early Blight",
      "confidence": 0.87,
      "severity": "medium",
      "description": "A fungal disease affecting tomato plants..."
    }
  ],
  "confidence_score": 0.87,
  "confidence_level": "high",
  "recommendations": [
    "Treatment for Early Blight: Remove affected leaves, apply fungicide",
    "Prevention for Early Blight: Maintain good air circulation, avoid overhead watering"
  ],
  "processing_time": 2.34
}
```

#### Get User's Detection History
```
GET /api/v1/detection-results/my_detections/
```

**Query Parameters:**
- `crop_id`: Filter by crop ID
- `status`: Filter by status (pending, processing, completed, failed)

#### Get User Statistics
```
GET /api/v1/detection-results/statistics/
```

**Response:**
```json
{
  "total_detections": 25,
  "successful_detections": 23,
  "success_rate": 92.0,
  "most_detected_crop": "Tomato",
  "most_common_disease": "Early Blight",
  "average_confidence": 0.85
}
```

### Detection Results

#### Get All Detection Results (User-specific)
```
GET /api/v1/detection-results/
```

#### Get Single Detection Result
```
GET /api/v1/detection-results/{id}/
```

#### Create Detection Result
```
POST /api/v1/detection-results/
```

### Detection History

#### Get Detection History
```
GET /api/v1/detection-history/
```

**Response:**
```json
[
  {
    "id": 1,
    "user": {
      "id": 1,
      "username": "farmer123",
      "email": "farmer@example.com",
      "first_name": "John",
      "last_name": "Doe"
    },
    "crop": 1,
    "crop_name": "Tomato",
    "total_detections": 25,
    "successful_detections": 23,
    "success_rate": 92.0,
    "most_common_disease": 1,
    "most_common_disease_name": "Early Blight",
    "last_detection_date": "2024-01-15T10:30:00Z",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

## Authentication

The API uses Django REST Framework's authentication system. Most endpoints require authentication except for:

- GET `/api/v1/crops/`
- GET `/api/v1/crops/{id}/`
- GET `/api/v1/crops/{id}/diseases/`
- GET `/api/v1/crops/{id}/statistics/`
- GET `/api/v1/diseases/`
- GET `/api/v1/diseases/{id}/`
- GET `/api/v1/diseases/{id}/symptoms/`
- GET `/api/v1/disease-symptoms/`

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Permission denied
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

**Error Response Format:**
```json
{
  "error": "Error message",
  "detail": "Detailed error information"
}
```

## File Upload

### Image Requirements

- **Supported Formats**: JPG, JPEG, PNG
- **Maximum Size**: 10MB
- **Content Type**: multipart/form-data

### Example Upload

```python
import requests

url = "http://localhost:8000/api/v1/detection-results/detect_disease/"
files = {
    'image': open('crop_image.jpg', 'rb'),
    'crop_id': (None, '1'),
    'location': (None, 'Farm Location'),
    'weather_conditions': (None, 'Sunny'),
    'notes': (None, 'Test detection')
}
headers = {
    'Authorization': 'Token your_auth_token_here'
}

response = requests.post(url, files=files, headers=headers)
print(response.json())
```

## Usage Examples

### JavaScript/Fetch API

```javascript
// Detect disease
const formData = new FormData();
formData.append('crop_id', '1');
formData.append('image', imageFile);
formData.append('location', 'My Farm');
formData.append('weather_conditions', 'Sunny');

fetch('/api/v1/detection-results/detect_disease/', {
    method: 'POST',
    headers: {
        'Authorization': 'Token your_auth_token_here'
    },
    body: formData
})
.then(response => response.json())
.then(data => {
    console.log('Detection result:', data);
});
```

### Python/Requests

```python
import requests

# Get all crops
response = requests.get('http://localhost:8000/api/v1/crops/')
crops = response.json()

# Get diseases for a specific crop
response = requests.get('http://localhost:8000/api/v1/crops/1/diseases/')
diseases = response.json()

# Detect disease
with open('crop_image.jpg', 'rb') as image_file:
    files = {'image': image_file}
    data = {
        'crop_id': '1',
        'location': 'My Farm',
        'weather_conditions': 'Sunny'
    }
    headers = {'Authorization': 'Token your_auth_token_here'}
    
    response = requests.post(
        'http://localhost:8000/api/v1/detection-results/detect_disease/',
        files=files,
        data=data,
        headers=headers
    )
    result = response.json()
```

## Models

### Crop
- `name`: Crop name
- `scientific_name`: Scientific name
- `description`: Crop description
- `image`: Crop image

### Disease
- `name`: Disease name
- `crop`: Associated crop
- `description`: Disease description
- `symptoms`: Disease symptoms
- `causes`: Disease causes
- `treatment`: Treatment methods
- `prevention`: Prevention methods
- `severity`: Disease severity (low, medium, high, critical)
- `image`: Disease image

### DetectionResult
- `user`: User who performed detection
- `crop`: Detected crop
- `disease`: Detected disease
- `input_image`: Uploaded image
- `confidence_score`: Detection confidence (0-1)
- `confidence_level`: Confidence level (low, medium, high, very_high)
- `detected_diseases`: JSON array of detected diseases
- `status`: Detection status (pending, processing, completed, failed)
- `notes`: User notes
- `location`: Detection location
- `weather_conditions`: Weather conditions

## Development

### Running Tests

```bash
python manage.py test crop_disease_detection
```

### Creating Sample Data

```python
# Create sample crops and diseases
from crop_disease_detection.models import Crop, Disease

# Create crops
tomato = Crop.objects.create(
    name='Tomato',
    scientific_name='Solanum lycopersicum',
    description='A popular vegetable crop'
)

# Create diseases
early_blight = Disease.objects.create(
    name='Early Blight',
    crop=tomato,
    description='A fungal disease affecting tomato plants',
    symptoms='Brown spots on leaves, yellowing',
    causes='Fungi, poor air circulation',
    treatment='Remove affected leaves, apply fungicide',
    severity='medium'
)
```

## Future Enhancements

- Integration with real ML models for disease detection
- Weather data integration for better predictions
- Mobile app support
- Real-time notifications
- Advanced analytics and reporting
- Multi-language support
- API rate limiting
- Caching for improved performance 