from dataclasses import field
from statistics import mode
from rest_framework import serializers
from .models import UserLike


class UserLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLike
        fields = '__all__'
        