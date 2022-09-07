from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import (
    RegistrationAPIView,
    LoginAPIView,
    LogoutAPIView,
    DeleteUserView,
)

app_name = 'auths'

urlpatterns = [
    path('signup/', RegistrationAPIView.as_view(), name="signup"),
    path('login/', LoginAPIView.as_view(), name="login"),
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    path('delete/<int:pk>/', DeleteUserView.as_view() , name="delete"),
    path('token_refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token_verify/', TokenVerifyView.as_view(), name='token_verify'),
]