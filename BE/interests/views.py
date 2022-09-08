from tkinter import image_names
from django.shortcuts import render
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import permissions, status, generics
from .models import Interest
from rest_framework.response import Response
import random
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
)
from util.choicesList import(
    style
)
from .serializers import(
    InterestSerializer,
    InterestFormResultSerialiizer,
)

# Create your views here.
# 사용자 취향 정보 분석을 위한 데이터 리스트 전송
class UserInterestsFormAPIView(APIView):
    permission_classes = [ IsAuthenticated ]
    @swagger_auto_schema(tags=['취향 폼 데이터 전송.'], responses={200: 'Success'})
    def get(self, request):
        responseList = []
        
        styles = Interest.objects.all().values('style').distinct()
        
        for style in styles:
            data = Interest.objects.filter(style=style['style']).order_by("?")[:5]
            styleList = list(data)
            if len(styleList) >= 5:
                responseList = responseList + styleList[0:5]
            else: 
                print(style['style'], '은 5개 이하의 데이터를 가진 스타일 입니다')
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
        currentUser = request.user
        img_list=request.data
        totalLen = len(img_list)
        
        
        
        for img_id in img_list['img_list']:
            interest = Interest.objects.get(id=img_id)
            print("+++++++++++++++++++")
            print(type(interest))
            print(interest.image_name)
            print(interest.image_url)
            print(interest.style)
            print(interest.color)
            print("+++++++++++++++++++")
        
        return returnErrorJson("폼 데이터 전송 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 
    
    @swagger_auto_schema(tags=['취향 결과 업데이트.'], request_body=InterestFormResultSerialiizer, responses={200: 'Success'})
    def put(self, request):
        img_list=request.data
        return