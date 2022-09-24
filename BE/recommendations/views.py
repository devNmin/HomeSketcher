from furnitures.models import Furniture
from auths.models import User
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import  IsAuthenticated
from rest_framework.response import Response
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
)
from util.furnitureAddLike import addLike
from util.recom import return_recom_funr
from drf_yasg.utils import swagger_auto_schema
from django_redis import get_redis_connection
#가구 리스트 추천 상품
class RecomListAPIView(APIView):
    permission_classes=[IsAuthenticated]
    
    @swagger_auto_schema(tags=['가구 리스트 추천 상품'], responses={200: 'Success'})
    def get(self,request):

        fur_id = return_recom_funr(request.user.id)
        furnitures = Furniture.objects.filter(id__in=fur_id)
        # res = {}
        # #하트 많고 작은 순
        # res['furnitures'] = furnitures.values
        data = addLike(furnitures.values(), request.user.id)
        return Response(data, status=status.HTTP_200_OK) 
    
class RecomUserRecentSeeAPIView(APIView):
    @swagger_auto_schema(tags=['최근 본 가구 목록 (최대 10개)'], responses={200: 'Success'})
    def get(self, request):
        con = get_redis_connection("default")
        furnitureIds = con.zrange(request.user.id, 0, -1) # 해당 유저의 최신 5개 (오래된거 부터 나옴)
        strData = []
        for item in furnitureIds:
            furniture = Furniture.objects.filter(id=item.decode())
            data = addLike(furniture, request.user.id)
            strData.append(data)
        return Response(strData[::-1], status=status.HTTP_200_OK) 