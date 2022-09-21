from tkinter import FALSE
from furnitures.models import Furniture
from likes.models import UserLike
from auths.models import User
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django_redis import get_redis_connection
from datetime import datetime
import json
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
import time
import pandas as pd 

from django.db.models import Subquery,Count
from likes.models import UserLike

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
                count = furniture_datas.count()
                furniture_datas = furniture_datas[page_num*20:page_num*20+20].values()
                
                # 좋아요 여부 가져오기
                userId = request.user.id
                furnitureValuses = furniture_datas.values()
                for furniture in furnitureValuses:
                    pk = furniture['id']
                    like = UserLike.objects.filter(user_id=userId, furniture_id=pk)
                    try:
                        like[0]
                        furniture['like']=True
                    except:
                        furniture['like']=False


                res ={}
                res['count'] = count
                res['datas'] = furnitureValuses
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

    @swagger_auto_schema(tags=['가구 label에 따른 데이터 반환(20개만 전송)'], responses={200: 'Success'})
    def get(self,request,label):
        furnitures = Furniture.objects.all().values()
        # count = furnitures.count() #전체 개수
        res ={} #응답 데이터
        # res['count'] = count
        try:
            #가장 높은 평점을 가진 가구 정보 제공
            if label == "rate":
                #furniture-rating 별로 내림차순 정렬
                # 좋아요 여부 가져오기
                furniture_datas = furnitures.order_by('-furniture_rating')[:20]
                userId = request.user.id
                furnitureValuses = furniture_datas.values()
                for furniture in furnitureValuses:
                    pk = furniture['id']
                    like = UserLike.objects.filter(user_id=userId, furniture_id=pk)
                    try:
                        like[0]
                        furniture['like']=True
                    except:
                        furniture['like']=False
                res['furnitures'] = furnitureValuses

            #가장 리뷰수가 많은 가구 정보 제공
            elif label == "review":
                furniture_datas =  furnitures.order_by('furniture_review')[:20]
                userId = request.user.id
                furnitureValuses = furniture_datas.values()
                for furniture in furnitureValuses:
                    pk = furniture['id']
                    like = UserLike.objects.filter(user_id=userId, furniture_id=pk)
                    try:
                        like[0]
                        furniture['like']=True
                    except:
                        furniture['like']=False
                res['furnitures'] = furnitureValuses

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
        style = request.data.get('style') #스타일 
        byPrice = request.data.get('byPrice') #가격 높낮이 순. 높은순 high, 낮은순 low, 없으면 null
        byLike = request.data.get('like') #좋아요 많고 작은 순. 높은순 high, 낮은순 low, 없으면 null

        #하트 많고 작은 순

        print(page,main,sub,minPrice,maxPrice, width, length, height)

        try:
            furnitures = Furniture.objects.filter(furniture_main = main).values()
            if sub is not None:
                furnitures = Furniture.objects.filter(furniture_sub = sub).values()
            #각 값들이 요청 body로 들어왔을 때 조건 적용
            if(minPrice is not None):
                furnitures = furnitures.filter(furniture_price__gte = minPrice).values()
            if(maxPrice is not None):
                furnitures = furnitures.filter(furniture_price__lte = maxPrice).values()
            if(width is not None):
                furnitures = furnitures.filter(furniture_width__lte = width).values()
            if(length is not None):
                furnitures = furnitures.filter(furniture_length__lte = length).values()
            if(height is not None):
                furnitures = furnitures.filter(furniture_height__lte = height).values()
            if(style is not None):
                furnitures = furnitures.filter(furniture_style = style).values()
            if byPrice is not None:
                if byPrice == 'high':
                    furnitures = furnitures.order_by('-furniture_price').values()
                else:
                    furnitures = furnitures.order_by('furniture_price').values()


            # 이런 쿼리문 만드려고 아래와 같이 ORM 작성
            # select furnitures_furniture.*, count(total_likes.furniture_id) from furnitures_furniture
            # inner join likes_userlike as total_likes
            # where furnitures_furniture.id = total_likes.furniture_id
            # group by furnitures_furniture.id;
            if byLike is not None:
                if like == 'high':
                    furnitures = furnitures.annotate(cnt=Count('like__furniture_id')).order_by('-cnt')
                else:
                    furnitures = furnitures.annotate(cnt=Count('like__furniture_id')).order_by('cnt')  

            count = furnitures.count()
            furnitures = furnitures[page*20:page*20+20]

            furniture_datas = furnitures
            userId = request.user.id
            furnitureValuses = furniture_datas.values()
            for furniture in furnitureValuses:
                pk = furniture['id']
                like = UserLike.objects.filter(user_id=userId, furniture_id=pk)
                try:
                    like[0]
                    furniture['like']=True
                except:
                    furniture['like']=FALSE
            
            res = {}
            res['count'] = count,
            res['furnitures'] = furnitureValuses

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
        
class FurnitureClickAPIView(APIView):      
    @swagger_auto_schema(tags=['가구 클릭'],  responses={200: 'Success'})  
    def get(self, request, furniture_pk):   
        try:
            con = get_redis_connection("default")
            pk = con.llen("clickList")+1
            data = {
                'furniture_id':furniture_pk,
                'user_id' : request.user.id,
                'time' : datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            }
            con.lpush('clickList', str(data))
            
            # 최근 본 가구 5개 저장 - redis sorted sets
            now = int(time.time() * 60 * 60 * 24 * 30)
            dict = {}
            dict[furniture_pk] = now
            con.zadd(request.user.id, dict)
            con.zremrangebyrank(request.user.id, -6, -6)
            # print(con.zscore(request.user.id, furniture_pk)) // 해당 가구의 클릭 시간
            # print(con.zrange(request.user.id, 0, -1)) // 해당 유저의 최신 5개 (오래된거 부터 나옴)
            
           
            return returnSuccessJson("성공","200", status.HTTP_200_OK)
        except:
            return returnErrorJson("서버 오류","500",status.HTTP_500_INTERNAL_SERVER_ERROR)
