from django.urls import path
from .views import(
    FurnitureSearchAPIView,
    FurnitureMainFilterAPIView,
    FurnitureSubFilterAPIView,
    FurnitureLabelAPIView,
    FurnitureListAPIView,
    FurnitureLikeAPIView,
    FurnitureClickAPIView,
)

from .recommend import(
    FurnitureRecommendAPIView,
    FurnitureHotItemAPIView
)

app_name = 'furnitures'

urlpatterns=[
    path('search/<str:search_name>/page/<int:page_num>/',FurnitureSearchAPIView.as_view(), name = "furniture-search"),
    path('filter/main/',FurnitureMainFilterAPIView.as_view(),name="main-categories"),
    path('filter/main/<str:category_name>/',FurnitureSubFilterAPIView.as_view(),name="sub-categories"),
    path('label/<str:label>/',FurnitureLabelAPIView.as_view(),name="labeling-data"),
    path('search/',FurnitureListAPIView.as_view(),name="furniture-list"),
    path('like/',FurnitureLikeAPIView.as_view(),name="furniture-like-list"),
    path('click/<str:furniture_pk>/', FurnitureClickAPIView.as_view(), name="furniture-click"),
    path('recommend/furniture/', FurnitureRecommendAPIView.as_view(), name="furniture-recommend-list"),
    path('hot/furniture/', FurnitureHotItemAPIView.as_view(), name="furniture-hot-items"),
    
]