from furnitures.models import Furniture
from rest_framework import serializers

# 가구 정보 조회
class UserSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Furniture
        fields = (
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
            'furniture_style',
            'furniture_color',
            'furniture_main',
            'furniture_sub',
        )
