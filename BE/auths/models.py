from django.db import models
from django.db.models.fields import BooleanField
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)

# 선호 스타일
select_style_class = (
    
) 
# 선호 색상
select_color_class =(
    
)

class UserManager(BaseUserManager):
    def create_user(self, user_email, user_nickname,user_gender, user_birth, password=None):
        """
        주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
        """
        if not user_email:
            raise ValueError(_('Users must have an email address'))

        user = self.model(
            user_email=self.normalize_email(user_email),
            user_nickname=user_nickname,
            user_gender=user_gender,
            user_birth=user_birth,
        )

        user.set_password(password)
        user.save()

# 유저 모델
class User(AbstractBaseUser):
    user_pk = models.AutoField(primary_key=True) # 기본키 인덱스
    user_email = models.CharField(max_length=100, unique=True) # 이메일
    # user_password = models.CharField(max_length=25) # 비밀번호
    user_name = models.CharField(max_length=25) # 이름
    user_nickname = models.CharField(max_length=30) # 닉네임
    user_gender = models.IntegerField(null=True) # 0 = 남 / 1 = 여
    user_birth = models.DateField() # 생년월일
    user_style = models.CharField(max_length=30, default=0, choices=select_style_class) # 선호 스타일
    user_color = models.CharField(max_length=30, default=0, choices=select_color_class) # 선호 색상
    
    USERNAME_FIELD = 'user_pk' # 기본키

    REQUIRED_FIELDS = [
    'user_name',
    'user_nickname',
    'user_gender',
    'user_birth',
    ]
    
    objects = UserManager()
    
    def __str__(self):
        return str(self.user_pk)