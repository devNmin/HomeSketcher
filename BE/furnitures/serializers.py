from furnitures.models import Furniture
from rest_framework import serializers

# 가구 정보 조회
class FurnitureSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Furniture,
        fields = (
            'furniture_name',
            'furniture_url',
            'furniture_image',
            'furniture_price',
            'furniture_rating',
            'furniture_review',
            'furniture_width',
            'furniture_length',
            'furniture_height',
            'furniture_style',
            'furniture_color',
            'furniture_main',
            'furniture_sub',
        )

#가구 검색 Swagger
class FurnitureSwaggerSerializer(serializers.Serializer):
    # furniture_name  = serializers.CharField(help_text='가구 이름', required=False)
    # furniture_url 	= serializers.CharField(help_text='가구 판매처 url', required=False)
    # furniture_image = serializers.CharField(help_text='가구 이미지 url', required=False)
    # furniture_price = serializers.CharField(help_text='가구 가격', required=False)
    # furniture_rating = serializers.FloatField(help_text='가구 평점', required=False)
    # furniture_review = serializers.IntegerField(help_text="가구 리뷰 수",required=False)
    page = serializers.IntegerField(help_text = "페이지 번호 0부터 줘야함",required = True)
    main = serializers.CharField(help_text="가구 대분류",required=True)
    sub = serializers.CharField(help_text="가구 소분류",required=True)
    minPrice = serializers.FloatField(help_text="가구 최소 가격. 없으면 null",required=False)
    maxPrice = serializers.FloatField(help_text="가구 최대 가격. 없으면 null",required=False)
    width = serializers.FloatField(help_text="가구 가로 길이",required=False)
    length = serializers.FloatField(help_text="가구 세로 길이",required=False)
    height = serializers.FloatField(help_text="가구 높이",required=False)
    # furniture_style = serializers.CharField(help_text="가구 스타일",required=False)
    # furniture_color = serializers.CharField(help_text="가구 색상",required=False)
    # furniture_condition = serializers.CharField(help_text = "이 항목은 추가 예정",required=False)

#가구 정보 swagger
class FurnitureInfoSwaggerSerializer(serializers.Serializer):
    furniture_name  = serializers.CharField(help_text='가구 이름', required=False)
    furniture_url 	= serializers.CharField(help_text='가구 판매처 url', required=False)
    furniture_image = serializers.CharField(help_text='가구 이미지 url', required=False)
    furniture_price = serializers.CharField(help_text='가구 가격', required=False)
    furniture_rating = serializers.FloatField(help_text='가구 평점', required=False)
    furniture_review = serializers.IntegerField(help_text="가구 리뷰 수",required=False)
    furniture_main = serializers.CharField(help_text="가구 대분류",required=True)
    furniture_sub = serializers.CharField(help_text="가구 소분류",required=True)
    furniture_width = serializers.FloatField(help_text="가구 가로 길이",required=False)
    furniture_length = serializers.FloatField(help_text="가구 세로 길이",required=False)
    furniture_height = serializers.FloatField(help_text="가구 높이",required=False)
    furniture_style = serializers.CharField(help_text="가구 스타일",required=False)
    furniture_color = serializers.CharField(help_text="가구 색상",required=False)
    furniture_condition = serializers.CharField(help_text = "이 항목은 추가 예정",required=False)