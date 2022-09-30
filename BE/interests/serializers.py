from dataclasses import field
from statistics import mode
from rest_framework import serializers
from .models import Interest, UserStyle, UserColor
from auths.models import User


class InterestSerializer(serializers.ModelSerializer):
    selected = serializers.SerializerMethodField()
    def get_selected(self, obj):
        return False
    class Meta:
        model = Interest
        fields = (
            'id',
            'image_url',
            'selected'
        )
        
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

class UserInterestInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'user_style',
            'user_color'
        ]

class UserInterestDataSerializer(serializers.Serializer):
    style = serializers.CharField(max_length=30, default=0)
    color = serializers.CharField(max_length=30, default=0)

class UserStyleDataSerializer(serializers.Serializer):
    user_style = serializers.CharField(max_length=30, default=0)
   
    def update(self, instance, validated_data):
        instance.user_style = validated_data.get('user_style', instance.user_style)
        instance.save()
        return instance
          
# 취향 폼 작성 결과 swagger
class InterestFormResultSerialiizer(serializers.Serializer):
    img_list = serializers.ListField(
        child=serializers.IntegerField()
    )

# 스타일 변경 swagger
class styleChangeSerialiizer(serializers.Serializer):
    style = serializers.CharField(max_length=30, default=0)