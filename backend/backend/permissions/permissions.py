# permissions.py
# from rest_framework.permissions import BasePermission, SAFE_METHODS


# class IsOwnerOrReadOnly(BasePermission):
#     """
#     Custom permission to only allow owners of an object to edit or delete it.
#     """

#     def has_object_permission(self, request, view, obj):
#         # Read permissions are allowed to any request,
#         # so we'll always allow GET, HEAD or OPTIONS requests.
#         if request.method in SAFE_METHODS:
#             return True

#         # Write permissions are only allowed to the owner of the object.
#         return obj.author == request.user


# class IsAdminOrReadOnly(BasePermission):
#     """
#     Custom permission to only allow admins to edit or delete.
#     """

#     def has_permission(self, request, view):
#         # Write permissions are only allowed to the admin.
#         if request.method in SAFE_METHODS:
#             return True
#         return request.user and request.user.is_staff


from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_admin()


class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superadmin()
