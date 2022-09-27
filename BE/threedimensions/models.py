from django.db import models

# Create your models here.
# Create your models here.
class GlbObject(models.Model):
    furniture_sub = models.CharField(max_length =255, null = False) #가구 소분류
    glb_url = models.TextField(max_length=255, null=False) # 가구 판매 페이지
    
    REQUIRED_FIELDS = [
        'furniture_sub',
        'glb_url',
    ]
    
    def __str__(self):
        return self.id