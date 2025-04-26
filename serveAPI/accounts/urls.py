from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .views import UserRegistration, UserLogin, UserProfileView, UserChangePasswordView, SendPasswordResetEmailView, ResetPasswordView, TestEmailView


urlpatterns = [
    path('register/', UserRegistration.as_view(), name='register_user'),
    path('login/', UserLogin.as_view(), name='login_user'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('change-password/', UserChangePasswordView.as_view(), name='change_password'),
    path('reset-password-link/', SendPasswordResetEmailView.as_view(), name='send-reset-link'),
    path('reset/<uid>/<token>/', ResetPasswordView.as_view(), name='reset-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('test/', TestEmailView.as_view()),

]

