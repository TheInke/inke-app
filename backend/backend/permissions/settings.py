# settings.py
INSTALLED_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'inke_app'
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}

# Add any other required configurations for JWT
