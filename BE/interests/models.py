from django.db import models
from auths.models import User
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
    # base_color = models.CharField(max_length=30, default=0, choices=select_color) # 선호 색상
    # main_color = models.CharField(max_length=30, default=0, choices=select_color) # 선호 색상
    # point_color = models.CharField(max_length=30, default=0, choices=select_color) # 선호 색상
    
    REQUIRED_FIELDS = [
        'image_name',
        'image_url',
        'style',
        'color',
        # 'base_color',
        # 'main_color',
        # 'base_cpoint_colorolor',
    ]
    
    def __str__(self):
        return self.image_name
    
class UserStyle(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    style_name = models.CharField(max_length=30, default=0)
    style_cnt =  models.IntegerField()
    
    def __str__(self):
        return self.style_name
    
class UserColor(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    color_name = models.CharField(max_length=30, default=0)
    color_cnt =  models.IntegerField()
    
    def __str__(self):
        return self.color_name