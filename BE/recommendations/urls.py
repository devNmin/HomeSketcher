from django.urls import path
from .views import(
    RecomListAPIView,

)

app_name = 'recom'

urlpatterns=[
    path('/',RecomListAPIView.as_view(), name = "recom-user"),
]