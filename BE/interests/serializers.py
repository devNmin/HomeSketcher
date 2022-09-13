from dataclasses import field
from statistics import mode
from rest_framework import serializers
from .models import Interest, UserStyle, UserColor


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = [
            'id',
            'image_url',
        ]
        
class InterestStyleInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStyle
        fields = [
            'style_name',
            'style_cnt'
        ]

class InterestColorInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserColor
        fields = [
            'color_name',
            'color_cnt'
        ]

class UserInterestDataSerializer(serializers.Serializer):
    style = serializers.CharField(max_length=30, default=0)
    color = serializers.CharField(max_length=30, default=0)
          
# 취향 폼 작성 결과 swagger
class InterestFormResultSerialiizer(serializers.Serializer):
    img_list = serializers.ListField(
        child=serializers.IntegerField()
    )