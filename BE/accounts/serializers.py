from accounts.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

# 회원정보 조회 / 수정
class UserSerializer(serializers.ModelSerializer):

    # password = serializers.CharField(
    #     max_length=16,
    #     min_length=9,
    #     write_only=True
    # )

    
    class Meta:
        model = User
        fields = (
            'user_email',
            'user_nickname',
            'user_gender',
            'user_birth',
            'user_name',
            'user_style',
            'user_color',
        )
        
        read_only_fields = ('token', )
        

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        
        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)
        return instance

# 전체 회원 조회
class Test(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'user_email',
            'user_nickname',
            'user_gender',
            'user_birth',
            'user_name',
            'user_style',
            'user_color',
        ]