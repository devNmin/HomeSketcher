import datetime
from furnitures.models import Furniture
from auths.models import User
from likes.models import UserLike
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
)

from .serializers import(
    FurnitureSerializer,
    FurnitureSwaggerSerializer,
    FurnitureInfoSwaggerSerializer
)

from random import shuffle
from util.recom import read_hot_furnitures

# 스타일 우선순위 가구 리스트 n개만큼 가져온다
def FurnitureWithStyle(style,color,birth,gender):
    try:
        #스타일 기반 가구 데이터
        styles = Furniture.objects.filter(furniture_style = style)
        # print(styles.count())
        #스타일 기반에서 색상 필터링
        colors = styles.filter(furniture_color = color)
        # print(colors.count())
        #colors 추출한 것이 없다면 styles 기반으로만 리턴
        if not colors.exists():
            return styles.values_list('pk',flat=True)

        #스타일 색상 기반에서 나이 필터링
        ages = colors.filter(id__in = birth)
        # print(ages.count())
        #나이 추출한 것이 없다면 colors 리턴
        if not ages.exists():
            return colors.values_list('pk',flat=True)
            
        #나이 기반에서 성별 필터링
        genders = ages.filter(id__in = gender)
        # print(genders.count())
        #성별추출한 것이 없다면 colors 리턴
        if not genders.exists():
            return ages.values_list('pk',flat=True)
        
        #모든 과정을 거치면 필터링이 전부 된 데이터 리턴
        return genders.values_list('pk',flat=True)
    except:
        return "error"

# 색 우선순위 가구 리스트. n개만큼 가져온다
def FurnitureWithColor(style,color,birth,gender):
    try:
        #색상 기반 가구 데이터
        colors = Furniture.objects.filter(furniture_color = color)
        
        #색상 기반에서 스타일 필터링
        styles = colors.filter(furniture_style = style)
        
        #styles 추출한 것이 없다면 colors 기반으로만 리턴
        if not styles.exists():
            return colors.values_list('pk',flat=True)
        
        #색상 스타일 기반에서 나이 필터링
        ages = styles.filter(id__in = birth)
        
        #나이 추출한 것이 없다면 styles 리턴
        if not ages.exists():
            return styles.values_list('pk',flat=True)
            
        #나이 기반에서 성별 필터링
        genders = ages.filter(id__in = gender)
        
        #성별추출한 것이 없다면 ages 리턴
        if not genders.exists():
            return ages.values_list('pk',flat=True)
        
        #모든 과정을 거치면 필터링이 전부 된 데이터 리턴
        return genders.values_list('pk',flat=True)
    except:
        return "error"

# 나이 우선순위 가구 리스트, n개만큼 가져온다
def FurnitureWithAge(style,color,birth,gender):
    try:
        #나이 기반 가구 데이터
        ages = Furniture.objects.filter(id__in = birth)
        
        #나이 기반에서 스타일 필터링
        styles = ages.filter(furniture_style = style)
        
        #styles 추출한 것이 없다면 gebders 기반으로만 리턴
        if not styles.exists():
            return ages.values_list('pk',flat=True)
        
        #나이 스타일 기반에서 색상 필터링
        colors = styles.filter(furniture_color = color)
        
        #색상 추출한 것이 없다면 styles 리턴
        if not colors.exists():
            return styles.values_list('pk',flat=True)
        
        #색상 기반에서 성별 필터링
        genders = colors.filter(id__in = gender)
        
        #나이추출한 것이 없다면 colors 리턴
        if not genders.exists():
            return colors.values_list('pk',flat=True)
    
        #모든 과정을 거치면 필터링이 전부 된 데이터 리턴
        return genders.values_list('pk',flat=True)
    except:
        return "error"

# 성별 우선순위 가구 리스트, n개만큼 가져온다.
def FurnitureWithGender(style,color,birth,gender):
    try:
        #성별 기반 가구 데이터
        genders = Furniture.objects.filter(id__in = gender)
        
        #성별 기반에서 스타일 필터링
        styles = genders.filter(furniture_style = style)
        
        #styles 추출한 것이 없다면 gebders 기반으로만 리턴
        if not styles.exists():
            return genders.values_list('pk',flat=True)
        
        #성별 스타일 기반에서 색상 필터링
        colors = styles.filter(furniture_color = color)
        
        #색상 추출한 것이 없다면 styles 리턴
        if not colors.exists():
            return styles.values_list('pk',flat=True)

        #색상 기반에서 나이 필터링
        ages = colors.filter(id__in = birth)
        
        #나이추출한 것이 없다면 colors 리턴
        if not ages.exists():
            return colors.values_list('pk',flat=True)
        
        #모든 과정을 거치면 필터링이 전부 된 데이터 리턴
        return ages.values_list('pk',flat=True)
    except:
        return "error"

# 나이별 가구 pk 리스트 반환
def FurniturePkWithAge(birth):
    first_date = datetime.date(birth.year-5,birth.month,birth.day)
    last_date = datetime.date(birth.year+5,birth.month,birth.day)
    
    # 나와 비슷한 또래의 사용자들의 pk
    user_ids = User.objects.filter(user_birth__range = (first_date,last_date)).values_list('pk',flat=True)

    # 사용자 pk 기반으로 가구 pk 추출
    furniture_pks = UserLike.objects.filter(user_id__in = user_ids).values_list('pk',flat=True)

    return furniture_pks

#성별별 가구 pk 리스트 반환
def FurniturePkWithGender(gender):
    user_id = User.objects.filter(user_gender = gender).values_list('pk',flat=True)
    # print(User.objects.filter(id__in=user_id).values())
    furniture_pks = UserLike.objects.filter(user_id__in = user_id).values_list('pk',flat=True)
    
    return furniture_pks

# 최종 추천 가구 리스트 반환
def FurnitureRecommend(user_id):
    try:
        # print(request.user)
        user = User.objects.get(id = user_id)
    except:
        return returnErrorJson(error="DB ERROR",errorCode="500",status=status.HTTP_200_OK)
    user_birth = FurniturePkWithAge(user.user_birth)
    user_gender = FurniturePkWithGender(user.user_gender)
    furniture_styles = FurnitureWithStyle(user.user_style,user.user_color,user_birth,user_gender)
    furniture_colors = FurnitureWithColor(user.user_style,user.user_color,user_birth,user_gender)
    furniture_ages = FurnitureWithAge(user.user_style,user.user_color,user_birth,user_gender)
    furniture_gender = FurnitureWithGender(user.user_style,user.user_color,user_birth,user_gender)
    
    furniture_styles = list(furniture_styles)
    furniture_colors = list(furniture_colors)
    furniture_ages = list(furniture_ages)
    furniture_gender = list(furniture_gender)

    shuffle(furniture_styles)
    shuffle(furniture_colors)
    shuffle(furniture_ages)
    shuffle(furniture_gender)

    pk_list = []
    pk_list.extend(furniture_styles[:10])
    # print(pk_list)
    pk_list.extend(furniture_colors[:5])
    # print(pk_list)
    pk_list.extend(furniture_ages[:3])
    # print(pk_list)
    pk_list.extend(furniture_gender[:2])
    # print(pk_list)
    

    # 합집합으로 중복 제거한 가구 pk 값만 남긴다
    #union_pks = furniture_styles.union(furniture_colors,all=False).union(furniture_ages,all=False).union(furniture_gender,all=False)[:20]
    # print(union_pks)
    #union_pks = list(union_pks) # 셔플하기 위해 리스트로 변환
    #shuffle(union_pks) # 랜덤하게 셔플
    # print(union_pks)
    pk_list = list(set(pk_list))
    shuffle(pk_list)

    data_length = len(pk_list)
    data_length = data_length - data_length%4 #프론트에서 보기 좋게 4의 배수로 맞춰줌
    # print(data_length)
    # print(data_length%4)
    # print(data_length/4)
    
    pk_list = pk_list[:data_length]
    # print(pk_list) 
    # print(len(pk_list))

    furnitures = FurnitureListWithPk(pk_list)
    
    return furnitures

def FurnitureListWithPk(pk_list):
    furnitures =[]
    for i in pk_list:
        furniture = Furniture.objects.get(id=i)
        res={}
        res['id'] = furniture.id
        res['furniture_name'] = furniture.furniture_name
        res['furniture_url'] = furniture.furniture_url
        res['furniture_image'] = furniture.furniture_image
        res['furniture_price'] = furniture.furniture_image
        res['furniture_rating'] = furniture.furniture_rating
        res['furniture_review'] = furniture.furniture_review
        res['furniture_width'] = furniture.furniture_width
        res['furniture_length'] = furniture.furniture_length
        res['furniture_height'] = furniture.furniture_height
        res['furniture_style'] = furniture.furniture_style
        res['furniture_color'] = furniture.furniture_color
        res['furniture_main'] = furniture.furniture_main
        res['furniture_sub'] = furniture.furniture_sub
        res['furniture_condition'] = furniture.furniture_condition
        furnitures.append(res)

    return furnitures

# 가구 추천 API
class FurnitureRecommendAPIView(APIView):
    permission_classes=[IsAuthenticated]

    @swagger_auto_schema(tags=['사용자별 추천 가구 리스트 전송(4의 배수로 전송)'],  responses={200: 'Success'})
    def get(self,request):
        user_id = request.user.id
        furnitures = FurnitureRecommend(user_id)
        
        return Response(furnitures)

class FurnitureHotItemAPIView(APIView):
    permission_classes=[IsAuthenticated]
    
    @swagger_auto_schema(tags=['시간대별 인기 가구 리스트'],  responses={200: 'Success'})
    def get(self):
        furniture_pks = read_hot_furnitures() #시간대별 인기 가구 pk 리스트

        furnitures = FurnitureListWithPk(furniture_pks)        

        return Response("test")