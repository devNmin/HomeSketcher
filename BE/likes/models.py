from django.db import models
from auths.models import User
from furnitures.models import Furniture

# Create your models here.
class UserLike(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    furniture= models.ForeignKey(Furniture, on_delete=models.CASCADE,related_name="like")
    
    REQUIRED_FIELDS = [
        'user',
        'furniture',
    ]
    
    def __str__(self):
        return self.id