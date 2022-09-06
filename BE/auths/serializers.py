from dataclasses import field
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from auths.models import User

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length = 25,
        min_length = 8,
        write_only = True
    )
    
    class Meta:
        model = User
        field = [
            'user_pk',
            'user_email',
            'user_password',
            'user_name',
            'user_nickname',
            'user_gender',
            'user_birth',
        ]
    
    # 회원가입
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    # 이메일 중복 체크
    def validate(self, attrs):
        user_email = attrs['user_email']
        if User.objects.filter(user_email=user_email).exists():
            raise serializers.ValidationError("user_email is already exists")
        return attrs
        
# query param 
class SignupSwaggerSerializer(serializers.Serializer):
    user_email  = serializers.CharField(help_text='유저 이메일', required=True)
    user_password = serializers.CharField(help_text='유저 비밀번호', required=True)
    user_name  = serializers.CharField(help_text='유저 이름', required=True)
    user_nickname 	= serializers.CharField(help_text='유저 닉네임', required=True)
    user_gender 	= serializers.IntegerField(help_text='유저 성별', required=True)
    user_birth 	= serializers.IntegerField(help_text='유저 생년월일', required=True)