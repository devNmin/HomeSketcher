from django.db import models
from auths.models import User
from util.choicesList import (
    select_color,
    select_style,
    select_color_sub
)

# Create your models here.
class Interest(models.Model):
    image_name = models.CharField(max_length=255, null=True) #이미지 이름
    image_url = models.TextField(null=True) # 이미지 url
    style = models.CharField(max_length=30, default=0, choices=select_style) # 선호 스타일
    main_color = models.CharField(max_length=30, default=0, choices=select_color_sub) # main color (light, normal, dark)
    main_color2 = models.CharField(max_length=30, default=0, choices=select_color) # main color
    sub_color = models.CharField(max_length=30, default=0, choices=select_color_sub) # sub_color (light, normal, dark)
    sub_color2 = models.CharField(max_length=30, default=0, choices=select_color) # sub_color
    point_color = models.CharField(max_length=30, default=0, choices=select_color_sub) # point color (light, normal, dark)
    point_color2 = models.CharField(max_length=30, default=0, choices=select_color) # point color
    
    REQUIRED_FIELDS = [
        'image_name',
        'image_url',
        'style',
        'main_color',
        'main_color2',
        'sub_color',
        'sub_color2',
        'point_color',
        'point_color2',
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