from django.urls import path
from .views import(
    UserLikeAPIView,
    UserDislikeAPIView
)

app_name = 'likes'

urlpatterns=[
    path('like/<int:furniture_pk>/', UserLikeAPIView.as_view(), name = "like"),
    path('dislike/<int:furniture_pk>', UserDislikeAPIView.as_view(), name = "dislike"),
]