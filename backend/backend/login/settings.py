# settings.py

INSTALLED_APPS = [
    # Other installed apps
    'rest_framework',
    'rest_framework_simplejwt',
    'inke_app',
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}


# Add other necessary settings like database configuration
