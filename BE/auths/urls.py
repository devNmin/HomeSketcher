from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import (
    RegistrationAPIView,
    LoginAPIView,
)

app_name = 'auths'

urlpatterns = [
    path('signup/', RegistrationAPIView.as_view(), name="signup"),
    path('login/', LoginAPIView.as_view(), name="login"),
]