from django.db import models
from django.contrib.auth.models import(
    AbstractBaseUser

)

select_style = (
    ( 'style1','style1'),
    ( 'style2','style2'),
)

select_color = (
    ( 'color1','color1'),
    ( 'color2','color2'),
)

class User(models.Model):
    user_email = models.CharField(max_length=100, unique=True)
    user_password = models.CharField(max_length=255)
    user_nickname = models.CharField(max_length=30 , null = True)
    user_gender = models.IntegerField(null=True)
    user_birth = models.DateField(null=True)
    user_name = models.CharField(max_length=30)
    user_style = models.CharField(max_length=30, choices=select_style)
    user_color = models.CharField(max_length=30, choices=select_color)

    REQUIRED_FIELDS = [
        'user_email',
        'user_password',
    ]

    
    def __str__(self):
        return self.user_email