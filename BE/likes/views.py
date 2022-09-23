import imp
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from auths.models import User
from likes.models import UserLike
from .serializers import UserLikeSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
)
# Create your views here.

class UserLikeAPIView(APIView):
    permission_classes=[IsAuthenticated]
    @swagger_auto_schema(tags=['가구 좋아요'], responses={200: 'Success'})
    def get(self, request, furniture_pk):
        user_pk = request.user.id
        data = {
            'user':user_pk,
            'furniture':furniture_pk,
        }
        try:
            existsCheck = UserLike.objects.filter(user_id=user_pk, furniture_id=furniture_pk)
            if existsCheck.exists():
                return returnSuccessJson("이미 좋아요한 가구 입니다..", "200", status.HTTP_200_OK)
            else:
                serializer = UserLikeSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    return returnSuccessJson("가구 좋아요 성공.", "200", status.HTTP_200_OK)
                else:
                    return returnErrorJson("유효하지 않은 데이터", "400", status.HTTP_400_BAD_REQUEST) 
        except:            
            return returnErrorJson("좋아요 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 

class UserDislikeAPIView(APIView):
    permission_classes=[IsAuthenticated]
    @swagger_auto_schema(tags=['가구 좋아요 취소'], responses={200: 'Success'})
    def delete(self, request, furniture_pk):
        user_pk = request.user.id
        data = {
            'user':user_pk,
            'furniture':furniture_pk,
        }
        try:
            data = UserLike.objects.get(user_id=user_pk, furniture_id=furniture_pk)
            data.delete()
            return returnSuccessJson("가구 좋아요 취소 성공.", "200", status.HTTP_200_OK)
        except:            
            return returnErrorJson("좋아요 취소 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 

class FurnitureLikeUsersAPIView(APIView):
    permission_classes=[IsAuthenticated]
    @swagger_auto_schema(tags=['가구 좋아요 유저 목록'], responses={200: 'Success'})
    def get(self, request, furniture_pk):
        likeUserPks = UserLike.objects.filter(furniture_id=furniture_pk)        
        result = []
        for userPK in likeUserPks:
            user = User.objects.get(id=userPK.user_id)
            userData = {"user_id":user.id, "user_name":user.user_name}           
            result.append(userData)
        return Response(data=result, status=status.HTTP_200_OK)