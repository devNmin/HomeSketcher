from django.urls import path
from .views import(
    UserInterestsFormAPIView,
    UserInterestResult,
    SendUserInterestResult,
)

app_name = 'interests'

urlpatterns = [
    path('data/', UserInterestsFormAPIView.as_view(), name="data"),
    path('user/', UserInterestResult.as_view(), name="user"),
    path('user/<user_pk>', SendUserInterestResult.as_view(), name="user"),
]