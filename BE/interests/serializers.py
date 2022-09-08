from dataclasses import field
from rest_framework import serializers
from .models import Interest


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = [
            'id',
            'image_url',
        ]
        
# 취향 폼 작성 결과 swagger
class InterestFormResultSerialiizer(serializers.Serializer):
    img_list = serializers.ListField(
        child=serializers.IntegerField()
    )
    