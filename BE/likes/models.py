from django.db import models
from auths.models import User
# from Furnitures.models import Furniture

# Create your models here.
class UserLike(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    furniture_id = models.ForeignKey(User, on_delete=models.CASCADE)
    # furniture_id = models.ForeignKey(Furniture, on_delete=models.CASCADE)
    
    REQUIRED_FIELDS = [
        'user_id',
        'furniture_id',
    ]
    
    def __str__(self):
        return self.id