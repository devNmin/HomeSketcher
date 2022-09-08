from django.db import models
from util.choicesList import (
    select_color,
    select_style
)

# Create your models here.
class Furniture(models.Model):
    furniture_name = models.CharField(max_length=100, null=False) #가구 제품명
    furniture_url = models.CharField(max_length=255, null=False) # 가구 판매 페이지
    furniture_image = models.CharField(max_length=255,null=False)#가구 이미지 URL
    furniture_price = models.IntegerField(null = False) #가구 가격
    furniture_rating = models.FloatField(null = False) #가구 평균 평점
    furniture_review = models.IntegerField(null = False) #가구 리뷰 수
    furniture_width = models.FloatField(null = False) #가구 가로 길이
    furniture_length = models.FloatField(null = False) #가구 세로 길이
    furniture_height = models.FloatField(null = False) #가구 높이
    furniture_style = models.CharField(max_length=30, default=0, choices=select_style, null = True) # 선호 스타일
    furniture_color = models.CharField(max_length=30, default=0, choices=select_color, null = True) # 선호 색상
    # furniture_material = models.CharField(null=True)
    furniture_main = models.CharField(max_length=20,null=False) #가구 대분류
    furniture_sub = models.CharField(max_length = 20, null = False) #가구 소분류
    furniture_condition = models.CharField(max_length=20, null = True) #가구 신제품 여부



    REQUIRED_FIELDS = [
        'furniture_name',
        'furniture_url',
        'furniture_image',
        'furniture_price',
        'furniture_rating',
        'furniture_review',
        'furniture_review',
        'furniture_width',
        'furniture_width',
        'furniture_length',
        'furniture_height',
        'furniture_main',
        'furniture_sub',
    ]
    
    def __str__(self):
        return self.furniture_name