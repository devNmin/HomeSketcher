import datetime
from furnitures.models import Furniture
from auths.models import User
from likes.models import UserLike
from threedimensions.models import GlbObject
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
from util.choicesList import category

# 스타일 우선순위 가구 리스트 n개만큼 가져온다
def FurnitureWithStyle(style,color,birth,gender):
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

# 색 우선순위 가구 리스트. n개만큼 가져온다
def FurnitureWithColor(style,color,birth,gender):
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

# 나이 우선순위 가구 리스트, n개만큼 가져온다
def FurnitureWithAge(style,color,birth,gender):
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

# 성별 우선순위 가구 리스트, n개만큼 가져온다.
def FurnitureWithGender(style,color,birth,gender):
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
    user = User.objects.get(id = user_id)
    
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

    furnitures = FurnitureListWithPk(pk_list,user_id)
    
    return furnitures

# pk 리스트로 가구 리스트 뽑아오는 함수
def FurnitureListWithPk(pk_list,user_id):
    furnitures =[]
    for i in pk_list:
        furniture = Furniture.objects.get(id=i)
        like = UserLike.objects.filter(user_id=user_id, furniture_id=i)
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
        res['furniture_real'] = furniture.furniture_real
        try:
            like[0]
            res['like']=True
        except:
            res['like']=False
        furnitures.append(res)

    return furnitures

def FurnitureRandomList(user_id):
    datas = Furniture.objects.all().order_by('?')[:20]
    print(datas.count())
    furnitures = []
    for data in datas:
        like = UserLike.objects.filter(user_id=user_id, furniture_id = data.id)
        res={}
        res['id'] = data.id
        res['furniture_name'] = data.furniture_name
        res['furniture_url'] = data.furniture_url
        res['furniture_image'] = data.furniture_image
        res['furniture_price'] = data.furniture_image
        res['furniture_rating'] = data.furniture_rating
        res['furniture_review'] = data.furniture_review
        res['furniture_width'] = data.furniture_width
        res['furniture_length'] = data.furniture_length
        res['furniture_height'] = data.furniture_height
        res['furniture_style'] = data.furniture_style
        res['furniture_color'] = data.furniture_color
        res['furniture_main'] = data.furniture_main
        res['furniture_sub'] = data.furniture_sub
        res['furniture_real'] = data.furniture_real
        try:
            like[0]
            res['like']=True
        except:
            res['like']=False
        furnitures.append(res)
    return furnitures

# 가구 추천 API
class FurnitureRecommendAPIView(APIView):
    permission_classes=[IsAuthenticated]

    @swagger_auto_schema(tags=['사용자별 추천 가구 리스트 전송(4의 배수로 전송)(Recommend)'],  responses={200: 'Success'})
    def get(self,request):
        user_id = request.user.id
        
        try:
            furnitures = FurnitureRecommend(user_id)
        except:
            return returnErrorJson(error="DB ERROR",errorCode="500",status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(furnitures)

#실시간 인기 아이템
class FurnitureHotItemAPIView(APIView):
    permission_classes=[IsAuthenticated]
    
    @swagger_auto_schema(tags=['시간대별 인기 가구 리스트(Popular)'],  responses={200: 'Success'})
    def get(self,request):
        furniture_pks = read_hot_furnitures() #시간대별 인기 가구 pk 리스트
        shuffle(furniture_pks) # 항상 다른 리스트가 보이게 무작위로 섞어줌
        furniture_pks = furniture_pks[:20] # 그 중 20개를 추출
        data_length = len(furniture_pks) # 혹시 20개가 안될 수도 있기 때문에 전체 길이를 구하고
        data_length = data_length - data_length%4 #프론트에서 보기 좋게 4의 배수로 맞춰줌

        furniture_pks = furniture_pks[:data_length]

        
        try:
            furnitures = FurnitureListWithPk(furniture_pks,request.user.id) # 가구 리스트 추출  
        except:
            return returnErrorJson(error="DB ERROR",errorCode="500",status=status.HTTP_500_INTERNAL_SERVER_ERROR)  

        if furnitures :
            return Response(furnitures,status=status.HTTP_200_OK)
        else:
            randomFurnitures = FurnitureRandomList(request.user.id)
            return Response(randomFurnitures,status=status.HTTP_200_OK)


#3d 모델링 페이지 카테고리별 가구 추천 데이터. 스타일 + 컬러로만 최대한 적용
class FurnitureForThreeAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(tags=['3d 페이지 카테고리별 추천 데이터'],  responses={200: 'Success'})
    def get(self,request):
        try:
            user = User.objects.get(id = request.user.id)
            
            furniture_styles = Furniture.objects.filter(furniture_style = user.user_style)
            furniture_colors = Furniture.objects.filter(furniture_color = user.user_color)
            glbs = GlbObject.objects.all().values_list("furniture_sub","glb_url", "glb_width", "glb_length", "glb_height")
            
            url_data = {}
            # 뽑아쓰기 쉽게 키(소분류), 밸류(url)로 생성
            for g in glbs:
                url_data[g[0]] = [g[1], g[2], g[3], g[4]]

            category_main = category.keys()
            res = {}
            for c in category_main:
                res[c] = (furniture_styles.filter(furniture_main = c).order_by('?')[:7].union(furniture_colors.filter(furniture_main=c).order_by('?')[:3])).order_by('?').values()
                for furniture in res[c]:
                    furniture['glb_url']=url_data.get(furniture['furniture_sub'])[0]
                    furniture['glb_width']=url_data.get(furniture['furniture_sub'])[1]
                    furniture['glb_length']=url_data.get(furniture['furniture_sub'])[2]
                    furniture['glb_height']=url_data.get(furniture['furniture_sub'])[3]
                    
            if res:
                return Response(res,status=status.HTTP_200_OK)
            else:
                randomFurnitures = FurnitureRandomList(request.user.id)
                return Response(randomFurnitures,status=status.HTTP_200_OK)
                    
        except:
            return returnErrorJson(error="DB ERROR",errorCode="500",status=status.HTTP_500_INTERNAL_SERVER_ERROR)
