import imp
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from likes.models import UserLike
from serializers import UserLikeSerializer
from rest_framework import status
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
)
# Create your views here.

class UserLikeAPIView():
    permission_classes=[IsAuthenticated]
    @swagger_auto_schema(tags=['가구 좋아요'], responses={200: 'Success'})
    def get(self, request, user_pk, furniture_pk):
        data = {
            'user_pk':user_pk,
            'furniture_pk':furniture_pk,
        }
        try:
            serializer = UserLikeSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return returnSuccessJson("가구 좋아요 성공.", "200", status.HTTP_200_OK)
            else:
                return returnErrorJson("유효하지 않은 데이터", "400", status.HTTP_400_BAD_REQUEST) 
        except:            
            return returnErrorJson("좋아요 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 

class UserDislikeAPIView():
    permission_classes=[IsAuthenticated]
    @swagger_auto_schema(tags=['가구 좋아요 취소'], responses={200: 'Success'})
    def get(self, request, user_pk, furniture_pk):
        data = {
            'user_pk':user_pk,
            'furniture_pk':furniture_pk,
        }
        try:
            data = UserLike.objects.get(user_id=user_pk, furniture_id=furniture_pk)
            data.delete()
            return returnSuccessJson("가구 좋아요 취소 성공.", "200", status.HTTP_200_OK)
        except:            
            return returnErrorJson("좋아요 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 
