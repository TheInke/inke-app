from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import JsonResponse


class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if not request.user.is_authenticated:
            try:
                jwt_auth = JWTAuthentication()
                validated_token = jwt_auth.get_validated_token(
                    jwt_auth.get_raw_token(request))
                request.user = jwt_auth.get_user(validated_token)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=401)


class RoleBasedAccessControlMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Authentication required'}, status=401)

        path = request.path_info
        if path.startswith('/admin-only/') and not request.user.is_admin():
            return JsonResponse({'error': 'Admin access required'}, status=403)

        if path.startswith('/superadmin-only/') and not request.user.is_superadmin():
            return JsonResponse({'error': 'Super Admin access required'}, status=403)

