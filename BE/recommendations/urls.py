from django.urls import path
from .views import(
    RecomListAPIView,

)

app_name = 'recommendations'

urlpatterns=[
    path('recomUser/',RecomListAPIView.as_view(), name = "recom-user"),
]