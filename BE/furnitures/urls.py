from django.urls import path
from .views import(
    FurnitureSearchAPIView
)

app_name = 'furnitures'

urlpatterns=[
    path('search/<str:search_name>/page/<int:page_num>/',FurnitureSearchAPIView.as_view(), name = "furniture-search"),
]