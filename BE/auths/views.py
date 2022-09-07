from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import User
from drf_yasg.utils import swagger_auto_schema
from .returnDto import (
    returnSuccessJson,
    returnErrorJson,
)
from .serializers import (
    RegisterUserSerializer,
    SignupSwaggerSerializer,
    LoginSerializer,
    LoginSwaggerSerializer
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
                return returnSuccessJson("회원가입 성공","200", status.HTTP_201_CREATED) 
        return returnErrorJson("회원가입 실패", "400", status.HTTP_400_BAD_REQUEST) 
        
    
class LoginAPIView(APIView):
    permission_classes = [ AllowAny ]  # 인증 여부 상관 없이 뷰 호출 허용
    
    @swagger_auto_schema(tags=['로그인'], request_body=LoginSwaggerSerializer, responses={200: 'Success'})
    def post(self, request):
        user_email = request.data.get('user_email') # 이메일
        user_password = request.data.get('user_password') # 비밀번호
        user_password2 = request.data.get('user_password2') # 비밀번호 확인
        
        if user_email is None:
            return returnErrorJson("아이디를 입력하세요.", "400", status.HTTP_400_BAD_REQUEST)
        if user_password is None:
            return returnErrorJson("비밀번호를 입력하세요.", "400", status.HTTP_400_BAD_REQUEST)
        if user_password2 is None:
            return returnErrorJson("비밀번호 확인을 입력하세요.", "400", status.HTTP_400_BAD_REQUEST)
        if user_password!=user_password2:
             return returnErrorJson("비밀번호와 비밀번호 확인이 틀립니다.", "400", status.HTTP_400_BAD_REQUEST)
                
        user1 = User.objects.get(user_email=user_email)

        user = authenticate(
            request, 
            user_pk=user1.user_pk,
            password=user_password
        )
    
        if user:
            login_serializer = LoginSerializer(user)
            
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            response = Response(
                {
                    "user": login_serializer.data,
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            return response
        
        if user is None:
            return returnErrorJson("로그인에 실패하였습니다.", "400", status.HTTP_400_BAD_REQUEST)