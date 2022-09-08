from django.urls import path
from .views import(
    FurnitureSearchAPIView,
    FurnitureMainFilterAPIView,
    FurnitureSubFilterAPIView,
    FurnitureLabelAPIView
)

app_name = 'furnitures'

urlpatterns=[
    path('search/<str:search_name>/page/<int:page_num>/',FurnitureSearchAPIView.as_view(), name = "furniture-search"),
    path('filter/main/',FurnitureMainFilterAPIView.as_view(),name="main-categories"),
    path('filter/main/<str:category_name>',FurnitureSubFilterAPIView.as_view(),name="sub-categories"),
    path('label/<str:label>/page/<int:page_num>/',FurnitureLabelAPIView.as_view(),name="labeling-data"),
]