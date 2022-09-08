from asyncio.windows_events import NULL
from unittest import case
from furnitures.models import Furniture
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
)
from util.choicesList import category

from .serializers import(
    Furniture
)


# 가구 검색 API(검색창 검색)
class FurnitureSearchAPIView(APIView):
    permission_classes=[AllowAny]
    def get(self,request,search_name,page_num):
        if search_name is None:
            return returnErrorJson("잘못된 요청 방식입니다. 알맞은 데이터를 보내주세요","400", status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                furniture_datas =  Furniture.objects.filter(furniture_name__icontains=search_name).values()
                # print(furniture_datas.count())
                res ={}
                res['count'] = furniture_datas.count()
                res['datas'] = furniture_datas[page_num*20:page_num*20+20]
                # print(furniture_datas[page_num*20:page_num*20+20].count())
                return Response(res, status=status.HTTP_200_OK)
            except:
                return returnSuccessJson("DB 에러","500",status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#가구 대분류 반환 API
class FurnitureMainFilterAPIView(APIView):
    permission_classes=[AllowAny]
    def get(self,request):
        res = {}
        res['categories'] = category.keys()

        return Response(res,status=status.HTTP_200_OK)

#가구 대분류에 따른 소분류 반환 API
class FurnitureSubFilterAPIView(APIView):
    permission_classes=[AllowAny]
    def get(self,request,category_name):
        res = {}
        res['subCategories'] = category[category_name]

        return Response(res,status=status.HTTP_200_OK)

#가구 label에 따른 가구 데이터를 5개씩 페이지 처리하여 반환하는 API
class FurnitureLabelAPIView(APIView):
    permission_classes=[AllowAny]
    def get(self,request,label,page_num):
        furnitures = Furniture.objects.all().values()
        count = furnitures.count() #전체 개수
        res ={} #응답 데이터
        res['count'] = count
        try:
            #가장 높은 평점을 가진 가구 정보 제공
            if label == "rate":
                #furniture-rating 별로 내림차순 정렬
                res['furnitures'] = furnitures.order_by('-furniture_rating')[page_num*5:page_num*5+5]

            #가장 리뷰수가 많은 가구 정보 제공
            elif label == "review":
                res['furnitures'] = furnitures.order_by('furniture_review')[page_num*5:page_num*5+5]

        except:
            return returnErrorJson("DB Error","500",status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        return Response(res,status=status.HTTP_200_OK)