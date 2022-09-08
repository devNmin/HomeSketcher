from django.urls import path
from .views import(
    UserInterestsFormAPIView,
    UserInterestResult,
)

app_name = 'interests'

urlpatterns = [
    path('data/', UserInterestsFormAPIView.as_view(), name="data"),
    path('user/', UserInterestResult.as_view(), name="user"),
]