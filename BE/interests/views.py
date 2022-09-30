from urllib import response
from xmlrpc.client import ResponseError
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import permissions, status, generics
from accounts.serializers import UserSerializer
from .models import Interest, UserStyle, UserColor
from django.http import JsonResponse
from auths.models import User
from rest_framework.response import Response
import random, datetime
from django.db.models import Subquery
from django.db.models import Max
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
)
from util.choicesList import(
    style, color
)
from util.recom import(
    add_new_member,
)
from .serializers import(
    InterestSerializer,
    InterestFormResultSerialiizer,
    InterestStyleInputSerializer,
    InterestColorInputSerializer,   
    UserInterestDataSerializer, 
    UserInterestInputSerializer,
    styleChangeSerialiizer,
    UserStyleDataSerializer,
)

# Create your views here.
# 사용자 취향 정보 분석을 위한 데이터 리스트 전송
class UserInterestsFormAPIView(APIView):
    permission_classes = [ IsAuthenticated ]
    @swagger_auto_schema(tags=['취향 폼 데이터 전송.'], responses={200: 'Success'})
    def get(self, request):
        responseList = []
        sendImgLen = 3
        styles = Interest.objects.all().values('style').distinct()
        
        for style in styles:
            data = Interest.objects.filter(style=style['style']).order_by("?")[:sendImgLen]
            styleList = list(data)
        
            if len(styleList) >= sendImgLen:
                print(responseList)
                responseList = responseList + styleList[0:5]
            else: 
                print(style['style'], f'은 {sendImgLen}개 이하의 데이터를 가진 스타일 입니다')
        random.shuffle(responseList)
        serializer = InterestSerializer(responseList, many=True)
        if serializer is not None:
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return returnErrorJson("폼 데이터 전송 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 

# 사용자 취향 정보 결과 수신
class UserInterestResult(APIView):
    permission_classes = [ IsAuthenticated ]
    @swagger_auto_schema(tags=['취향 결과 생성.'], request_body=InterestFormResultSerialiizer, responses={200: 'Success'})
    def post(self, request):       
        currentUser = User.objects.get(id=request.user.id)
        currentUserId = request.user.id
        img_list=request.data

        userStyleData = [0 for i in range(len(style))]
        userColorData = [0 for i in range(len(color))]
        
        for img_id in img_list['img_list']:
            interest = Interest.objects.get(id=img_id)
            styleIndex = style.index(interest.style)
            colorIndex = color.index(interest.sub_color2)
            userStyleData[styleIndex] = userStyleData[styleIndex] + 1
            userColorData[colorIndex] = userColorData[colorIndex] + 1
        
        UserStyle.objects.filter(user_id=currentUserId).delete()
        UserColor.objects.filter(user_id=currentUserId).delete()

        for i in range(len(userStyleData)):             
            styleData = {                    
                'style_name' : style[i],
                'style_cnt' : userStyleData[i]
            }         
            styleSerializer = InterestStyleInputSerializer(data=styleData)         
            if styleSerializer.is_valid():
                styleSerializer.save(user_id=currentUser)
            else:
                return returnErrorJson("스타일 저장 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
        for i in range(len(userColorData)):              
            colorData = {              
                'color_name' : color[i],
                'color_cnt' : userColorData[i]
            }              
            colorSerializer = InterestColorInputSerializer(data=colorData)            
            if colorSerializer.is_valid():         
                colorSerializer.save(user_id=currentUser) 
            else:
                return returnErrorJson("컬러 저장 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
        user_style = UserStyle.objects.filter(user_id=request.user)
        max_style_cnt = user_style.aggregate(style_cnt=Max('style_cnt'))['style_cnt']
        selected_style = user_style.filter(style_cnt=max_style_cnt).order_by("?")[:1]
        
        user_color = UserColor.objects.filter(user_id=request.user)
        max_color_cnt = user_color.aggregate(color_cnt=Max('color_cnt'))['color_cnt']
        selected_color = user_color.filter(color_cnt=max_color_cnt).order_by("?")[:1]
        userStyle=selected_style[0]
        userColor=selected_color[0]
        response = {
            'style': userStyle,
            'color': userColor,
        }
        userdata = {
            'user_style': userStyle,
            'user_color': userColor,
        }
        UserSerializer = UserInterestInputSerializer(request.user, data=userdata)
        if UserSerializer.is_valid():
            UserSerializer.save()
        serializer = UserInterestDataSerializer(response)

        # pk, style, color, age, gender, category
        # currentUser
        age = datetime.datetime.today().year - currentUser.user_birth.year
        age = (age//10)*10

        user_new = [currentUser.id,userdata['user_style'],userdata['user_color'],str(age),1,'X']
        # print(user_new)
        # add_new_member(user_new)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    
    @swagger_auto_schema(tags=['취향 결과 업데이트.'], request_body=InterestFormResultSerialiizer, responses={200: 'Success'})
    def put(self, request):
        currentUser = User.objects.get(id=request.user.id)
        currentUserId = request.user.id
        img_list=request.data
    
        userStyleData = [0 for i in range(len(style))]
        userColorData = [0 for i in range(len(color))]
        
        for img_id in img_list['img_list']:
            interest = Interest.objects.get(id=img_id)
            styleIndex = style.index(interest.style)
            colorIndex = color.index(interest.sub_color2)
            userStyleData[styleIndex] = userStyleData[styleIndex] + 1
            userColorData[colorIndex] = userColorData[colorIndex] + 1
        
        UserStyle.objects.filter(user_id=currentUserId).delete()
        UserColor.objects.filter(user_id=currentUserId).delete()
          
  
        for i in range(len(userStyleData)):             
            styleData = {                    
                'style_name' : style[i],
                'style_cnt' : userStyleData[i]
            }         
            styleSerializer = InterestStyleInputSerializer(data=styleData)          
            if styleSerializer.is_valid():
                styleSerializer.save(user_id=currentUser)
            else:
                return returnErrorJson("스타일 저장 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 

        for i in range(len(userColorData)):              
            colorData = {              
                'color_name' : color[i],
                'color_cnt' : userColorData[i]
            }              
            colorSerializer = InterestColorInputSerializer(data=colorData)            
            if colorSerializer.is_valid():                
                colorSerializer.save(user_id=currentUser) 
            else:
                return returnErrorJson("컬러 저장 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 

        user_style = UserStyle.objects.filter(user_id=request.user)
        max_style_cnt = user_style.aggregate(style_cnt=Max('style_cnt'))['style_cnt']
        selected_style = user_style.filter(style_cnt=max_style_cnt).order_by("?")[:1]
        
        user_color = UserColor.objects.filter(user_id=request.user)
        max_color_cnt = user_color.aggregate(color_cnt=Max('color_cnt'))['color_cnt']
        selected_color = user_color.filter(color_cnt=max_color_cnt).order_by("?")[:1]
        userStyle=selected_style[0]
        userColor=selected_color[0]
        response = {
            'style': userStyle,
            'color': userColor,
        }
        userdata = {
            'user_style': userStyle,
            'user_color': userColor,
        }
        UserSerializer = UserInterestInputSerializer(request.user, data=userdata)
        if UserSerializer.is_valid():
            UserSerializer.save()
        serializer = UserInterestDataSerializer(response)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SendUserInterestResult(APIView):
    permission_classes = [ IsAuthenticated ]
    @swagger_auto_schema(tags=['취향 결과.'], responses={200: 'Success'})
    def get(self, request, user_pk):
        if user_pk is None:
            return returnErrorJson("잘못된 요청 방식입니다. 알맞은 데이터를 보내주세요","400", status=status.HTTP_400_BAD_REQUEST)
        else:
            try: 
                user_style = UserStyle.objects.filter(user_id=user_pk)
                max_style_cnt = user_style.aggregate(style_cnt=Max('style_cnt'))['style_cnt']
                style = user_style.filter(style_cnt=max_style_cnt).order_by("?")[:1]
                
                user_color = UserColor.objects.filter(user_id=user_pk)
                max_color_cnt = user_color.aggregate(color_cnt=Max('color_cnt'))['color_cnt']
                color = user_color.filter(color_cnt=max_color_cnt).order_by("?")[:1]
                response = {
                    'style': style[0],
                    'color': color[0],
                }
                serializer = UserInterestDataSerializer(response)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return returnErrorJson("취향 결과 데이터 전송 실패","500",status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SendRandomUserInterestResult(APIView):
    permission_classes = [ IsAuthenticated ]
    @swagger_auto_schema(tags=['랜덤 취향 생성'], responses={200: 'Success'})
    def get(self, request, user_pk):
        currentUser = User.objects.get(id=user_pk)
        randomColor = random.choice(color)
        randomStyle = random.choice(style)
        UserStyle.objects.filter(user_id=user_pk).delete()
        UserColor.objects.filter(user_id=user_pk).delete()
        styleData = {                    
            'style_name' : randomStyle,
            'style_cnt' : 0
        }
        
        styleSerializer = InterestStyleInputSerializer(data=styleData) 
                
        if styleSerializer.is_valid():
            styleSerializer.save(user_id=currentUser)
        else:
            return returnErrorJson("스타일 저장 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
        colorData = {              
            'color_name' : randomColor,
            'color_cnt' : 0
        }              
        colorSerializer = InterestColorInputSerializer(data=colorData)            
        if colorSerializer.is_valid():                
            colorSerializer.save(user_id=currentUser) 
        else:
            return returnErrorJson("컬러 저장 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        userdata = {
            'user_style': randomStyle,
            'user_color': randomColor,
        }
        UserSerializer = UserInterestInputSerializer(currentUser, data=userdata)
        if UserSerializer.is_valid():
            UserSerializer.save()
        response = {
            'style': randomStyle,
            'color': randomColor,
        }
        serializer = UserInterestDataSerializer(response)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SetUserStyleAPIView(APIView):
    @swagger_auto_schema(tags=['스타일 변경'], request_body=styleChangeSerialiizer,responses={200: 'Success'})
    def put(self, request):
        currentUser = User.objects.get(id=request.user.id)
        newStyle = {
            'user_style' : request.data['style']
        }
        UserStyle.objects.filter(user_id=request.user.id).delete()
        userStyleDataSerializer = UserStyleDataSerializer(currentUser, data=newStyle)
        if userStyleDataSerializer.is_valid():
            userStyleDataSerializer.save()
        else:
            return returnErrorJson("유효하지 않은 잘못된 스타일입니다.", "400", status.HTTP_400_BAD_REQUEST)
        return returnSuccessJson("스타일이 변경되었습니다. style: " + newStyle['user_style'], "200", status.HTTP_200_OK)