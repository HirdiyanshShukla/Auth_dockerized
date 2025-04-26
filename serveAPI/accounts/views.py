import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import *
# from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, DjangoUnicodeDecodeError, force_str
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import EmailSender

# demo@dem.com
# DEmochota1212@

# hirdiyanshshukla@gmail.com
# "Hello1212@Boi"

# sdb7824@gmail.com
# DomDom112@


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistration(APIView):
    def get(self, request, format=None):

        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        serialilzer = UserSerializer(data=request.data)
        if serialilzer.is_valid():
            user = serialilzer.save()
            token = get_tokens_for_user(user)
            return Response({'token': token, 'data': UserSerializer(user).data}, status=status.HTTP_201_CREATED)
        return Response(serialilzer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):

    def post(self, request, format=None):

        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = User.objects.filter(email=email).first()
            if user and user.check_password(password):
                token = get_tokens_for_user(user)
                return Response({'token': token, 'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):

        serializer = UserChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.update(request.user, serializer.validated_data)
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendPasswordResetEmailView(APIView):

    def post(self, request, format=None):

        serializer = SendPasswordResetEmailSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            link = f"http://localhost:5173/resetlink/{uid}/{token}/"
            # print("Password Reset Link: ", link)
            data = {
                'subject': 'Password Reset',
                'body': f'Click the link to reset your password: {link}',
                'to_email': [user.email]
            }
            EmailSender.send_email(data)
            return Response({'message': f'Password reset link sent to email'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):

    def post(self, request, uid, token, format=None):

        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=int(uid))
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is None:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        if PasswordResetTokenGenerator().check_token(user, token):
            serializer = ResetPasswordSerializer(data=request.data)
            if serializer.is_valid():
                serializer.update(user, serializer.validated_data)
                return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid or Expired token'}, status=status.HTTP_400_BAD_REQUEST)


class TestEmailView(APIView):

    def get(self, request, format=None):
        data = {
            'subject': 'TEST EMAIL',
            'body': f'Test Email Success with code: {random.randint(1, 100)}',
            'to_email': ['hirdiyanshshukla@gmail.com']
        }

        EmailSender.send_email(data)
        return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
