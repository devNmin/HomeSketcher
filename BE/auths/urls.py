from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import (
    RegistrationAPIView,
)

app_name = 'auths'

urlpatterns = [
    path('signup/', RegistrationAPIView.as_view()),
]