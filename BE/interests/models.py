from django.db import models
from util.choicesList import (
    select_color,
    select_style
)

# Create your models here.
class Interest(models.Model):
    image_name = models.CharField(max_length=255, null=True) #이미지 이름
    image_url = models.CharField(max_length=255, null=True) # 이미지 url
    style = models.CharField(max_length=30, default=0, choices=select_style) # 선호 스타일
    color = models.CharField(max_length=30, default=0, choices=select_color) # 선호 색상
    
    REQUIRED_FIELDS = [
        'image_name',
        'image_url',
        'style',
        'color',
    ]
    
    def __str__(self):
        return self.image_name