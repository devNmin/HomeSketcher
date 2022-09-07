from django.urls import path
from .views import(
    UserRetrieveAPIView,
    UserUpdateAPIView,
    UserListAPIView,
    EmailCheckAPIView
)

app_name = 'accounts'

urlpatterns=[
    path('update/',UserUpdateAPIView.as_view(), name = "user-update"),
    path('userdetail/<int:pk>/',UserRetrieveAPIView.as_view(), name = "user-detail"),
    path('allusers/',UserListAPIView.as_view(), name = "user-detail"),
    path('check/email/<str:email>/',EmailCheckAPIView.as_view(),name="user-check-email"),
]