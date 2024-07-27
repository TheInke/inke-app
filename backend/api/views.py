from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import UserProfile
from .serializers import UserProfileSerializer, ForgotPasswordSerializer

from django.core.mail import EmailMessage

class ForgotPasswordView(generics.CreateAPIView):
    permission_classes = []
    serializer_class = ForgotPasswordSerializer

    def post(self, request):
        subject = "Password Reset"
        message = "Here's a link to reset your password."
        receipient = [request.data.get('email')]
        print(receipient)

        sender = "inketest8@gmail.com" 
        # this will be replaced with a company email and will be accessed securely. Same goes for the password which is currently stored on
        
        email = EmailMessage(
            subject = subject,
            body = message,
            from_email = sender,
            to = receipient,
        )
        email.content_subtype = 'html'
        email.encoding = 'utf-8'
        email.send()

        return Response({"message": "Email sent successfully"}, status=status.HTTP_200_OK)

class CreateUserView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

class UserProfileListView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [] #[permissions.IsAuthenticated]

class UserProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj != self.request.user:
            raise PermissionDenied('Please login to access your profile')
        
        return obj

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)