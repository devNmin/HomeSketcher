from django.shortcuts import render
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import permissions, status, generics
from .models import Interest
from rest_framework.response import Response
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
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
        list = Interest.objects.all()    
        serializer = InterestSerializer(list, many=True)        
        if serializer is not None:
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return returnErrorJson("폼 데이터 전송 실패", "500", status.HTTP_500_INTERNAL_SERVER_ERROR) 

# 사용자 취향 정보 결과 수신
class UserInterestResult(APIView):
    permission_classes = [ IsAuthenticated ]
    @swagger_auto_schema(tags=['취향 결과 생성.'], request_body=InterestFormResultSerialiizer, responses={200: 'Success'})
    def post(self, request):
        return
    @swagger_auto_schema(tags=['취향 결과 업데이트.'], request_body=InterestFormResultSerialiizer, responses={200: 'Success'})
    def put(self, request):
        return