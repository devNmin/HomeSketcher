from asyncio.windows_events import NULL
from operator import gt
from unittest import case
from furnitures.models import Furniture
from likes.models import UserLike
from auths.models import User
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
    FurnitureSerializer,
    FurnitureSwaggerSerializer,
    FurnitureInfoSwaggerSerializer
)


# 가구 검색 API(검색창 검색)
class FurnitureSearchAPIView(APIView):
    permission_classes=[IsAuthenticated]
    serializer_class = FurnitureSerializer

    @swagger_auto_schema(tags=['가구 검색 API(검색창 검색)'], responses={200: 'Success'})
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
    permission_classes=[IsAuthenticated]
    serializer_class = FurnitureSerializer

    @swagger_auto_schema(tags=['가구 대분류 반환 API'],  responses={200: 'Success'})
    def get(self,request):
        res = {}
        res['categories'] = category.keys()

        return Response(res,status=status.HTTP_200_OK)

#가구 대분류에 따른 소분류 반환 API
class FurnitureSubFilterAPIView(APIView):
    permission_classes=[IsAuthenticated]
    serializer_class = FurnitureSerializer

    @swagger_auto_schema(tags=['가구 소분류 반환(대분류 선택 시 요청하는 API)'],  responses={200: 'Success'})
    def get(self,request,category_name):
        res = {}
        res['subCategories'] = category[category_name]

        return Response(res,status=status.HTTP_200_OK)

#가구 label에 따른 가구 데이터를 5개씩 페이지 처리하여 반환하는 API
class FurnitureLabelAPIView(APIView):
    permission_classes=[IsAuthenticated]
    serializer_class = FurnitureInfoSwaggerSerializer

    @swagger_auto_schema(tags=['가구 label에 따른 데이터 반환(5개씩 페이징)'], responses={200: 'Success'})
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

#가구 리스트 받는 검색 20개씩 페이징 처리
class FurnitureListAPIView(APIView):
    permission_classes=[IsAuthenticated]
    serializer_class = FurnitureSerializer

    @swagger_auto_schema(tags=['Item Search Page 가구 필터링 검색'], request_body=FurnitureSwaggerSerializer, responses={200: 'Success'})
    def post(self,request):
        page =request.data.get('page') #페이지 번호
        main = request.data.get('main') #대분류
        sub = request.data.get('sub') #소분류
        minPrice = request.data.get('minPrice') #최소 가격 설정
        maxPrice = request.data.get('maxPrice') #최대 가격 설정
        width = request.data.get('width') #가로 길이 -> 최대값으로 이거 이하의 값만 반환
        length = request.data.get('length') #세로 길이 -> 최대값
        height = request.data.get('height') #높이 -> 최대값
        print(page,main,sub,minPrice,maxPrice, width, length, height)

        try:
            furnitures = Furniture.objects.filter(furniture_main = main,furniture_sub = sub).values()

            #각 값들이 요청 body로 들어왔을 때 조건 적용
            if(minPrice is not None):
                furnitures = furnitures.filter(furniture_price__gte = minPrice)
            if(maxPrice is not None):
                furnitures = furnitures.filter(furniture_price__lte = maxPrice)
            if(width is not None):
                furnitures = furnitures.filter(furniture_width__lte = width)
            if(length is not None):
                furnitures = furnitures.filter(furniture_length__lte = length)
            if(height is not None):
                furnitures = furnitures.filter(furniture_height__lte = height)
            
            furnitures = furnitures[page*20:page*20+20]

            res = {}
            res['count'] = furnitures.count(),
            res['furnitures'] = furnitures

            return Response(res, status=status.HTTP_200_OK)
        except:
            return Response(returnErrorJson("DB Error","500",status=status.HTTP_500_INTERNAL_SERVER_ERROR))
        

#좋아요 표시한 가구 리스트 전송
class FurnitureLikeAPIView(APIView):
    permission_classes=[IsAuthenticated]
    serializer_class = FurnitureSerializer

    @swagger_auto_schema(tags=['좋아요 표시한 가구 리스트 전송'],  responses={200: 'Success'})
    def get(self,request):
        id = request.user.id #사용자 pk 정보
        try:
            furnitures = Furniture.objects.filter(id__in= UserLike.objects.filter(user = id).values_list('furniture_id')).values()
            return Response(furnitures,status=status.HTTP_200_OK)
        
        except:
            return Response(returnErrorJson("DB Error","500",status=status.HTTP_500_INTERNAL_SERVER_ERROR))
        
