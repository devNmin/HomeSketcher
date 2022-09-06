from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import permissions, status
from drf_yasg.utils import swagger_auto_schema

from .serializers import (
    RegisterUserSerializer,
    SignupSwaggerSerializer,
    )

# Create your views here.
class RegistrationAPIView(APIView):
    permission_classes = [ AllowAny ] # 인증 여부 상관 없이 뷰 호출 허용
    
    @swagger_auto_schema(tags=['회원가입.'], request_body=SignupSwaggerSerializer, responses={200: 'Success'})
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            if user:
                response = {
                    "message":"회원가입 성공",
                    "successCode":"200"
                }
                return Response(response,status=status.HTTP_201_CREATED) # 회원가입 성공
        response = {
                    "error":"회원가입 실패",
                    "errorCode":"400"
                }
        return Response(response, status=status.HTTP_400_BAD_REQUEST) # 회원가입 실패
    