from django.urls import path
from .views import(
    RecomListAPIView,
    RecomUserRecentSeeAPIView,
)

app_name = 'recommendations'

urlpatterns=[
    path('recomUser/',RecomListAPIView.as_view(), name = "recom-user"),
    path('recomUserRecentSee/',RecomUserRecentSeeAPIView.as_view(), name = "recom-user-recent-see"),
]