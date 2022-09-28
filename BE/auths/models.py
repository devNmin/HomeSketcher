from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,BaseUserManager
)
from util.choicesList import (
    select_color,
    select_style
)

# # 선호 스타일
# select_style = (
#     ( 'style1','style1'),
#     ( 'style2','style2'),
# )

# #선호 색상
# select_color = (
#     ( 'color1','color1'),
#     ( 'color2','color2'),
# )

class UserManager(BaseUserManager):
    def create_user(self, user_email, user_nickname,user_gender, user_birth, password=None):
        """
        주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
        """
        if not user_email:
            raise ValueError(('Users must have an email address'))
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
    user_email = models.CharField(max_length=100, unique=True) # 이메일
    # user_password = models.CharField(max_length=25) # 비밀번호 -> password로 저장됨
    user_name = models.CharField(max_length=25, null=True) # 이름
    user_nickname = models.CharField(max_length=30, null=True) # 닉네임
    user_gender = models.IntegerField(null=True) # 0 = 남 / 1 = 여
    user_birth = models.DateField(null=True) # 생년월일
    user_style = models.CharField(max_length=30, default='0', choices=select_style) # 선호 스타일
    user_color = models.CharField(max_length=30, default='0', choices=select_color) # 선호 색상
    is_dummy = models.IntegerField(null=True)
    
    USERNAME_FIELD = 'id' # 기본키

    REQUIRED_FIELDS = [
        'user_name',
        'user_nickname',
    ]
    
    objects = UserManager()
    
    def __str__(self):
        return self.user_email