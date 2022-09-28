from django.urls import path
from .views import(
    getobjectAPIView
)

app_name = 'threedimensions'

urlpatterns=[
    path('getobject/<int:fur_id>/', getobjectAPIView.as_view(), name = "getobject"),
]