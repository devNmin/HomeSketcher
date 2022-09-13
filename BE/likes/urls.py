from django.urls import path
from .views import(
    UserLikeAPIView,
    UserDislikeAPIView,
)

app_name = 'likes'

urlpatterns=[
    path('like/<int:user_pk>/<int:furniture_pk>/',UserLikeAPIView.as_view(), name = "user-update"),
    path('dislike/<int:user_pk>/<int:furniture_pk>',UserDislikeAPIView.as_view(), name = "user-detail"),
]
