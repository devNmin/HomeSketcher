from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import permissions, status, generics
from .models import User
from drf_yasg.utils import swagger_auto_schema
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
)

from .serializers import (
    RegisterUserSerializer,
    SignupSwaggerSerializer,
    LoginSerializer,
    LoginSwaggerSerializer,
    RefreshTokenSerializer
    )

# Create your views here.
class RegistrationAPIView(APIView):
    permission_classes = [ AllowAny ] # 인증 여부 상관 없이 뷰 호출 허용
    
    @swagger_auto_schema(tags=['회원가입.'], request_body=SignupSwaggerSerializer, responses={200: 'Success'})
    def post(self, request):
        user_email = request.data.get('user_email') # 이메일
        user_password = request.data.get('password') # 비밀번호
        user_password2 = request.data.get('password2')
        
        if user_email is None:
            return returnErrorJson("아이디를 입력하세요.", "400", status.HTTP_400_BAD_REQUEST)
        if user_password is None:
            return returnErrorJson("비밀번호를 입력하세요.", "400", status.HTTP_400_BAD_REQUEST)
        if user_password2 is None:
            return returnErrorJson("비밀번호 확인을 입력하세요.", "400", status.HTTP_400_BAD_REQUEST)
        if user_password!=user_password2:
             return returnErrorJson("비밀번호와 비밀번호 확인이 틀립니다.", "400", status.HTTP_400_BAD_REQUEST)
         
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
        
        if user_email is None:
            return returnErrorJson("아이디를 입력하세요.", "400", status.HTTP_400_BAD_REQUEST)
        if user_password is None:
            return returnErrorJson("비밀번호를 입력하세요.", "400", status.HTTP_400_BAD_REQUEST)
                
        user1 = User.objects.get(user_email=user_email)

        user = authenticate(
            request, 
            id=user1.id,
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
  
# 로그아웃
class LogoutAPIView(generics.GenericAPIView):
    serializer_class = RefreshTokenSerializer
    permission_classes = (permissions.IsAuthenticated, )
    
    @swagger_auto_schema(tags=['로그아웃.'], responses={200: 'Success'})
    def post(self, request, *args):
        sz = self.get_serializer(data=request.data)
        sz.is_valid(raise_exception=True)
        sz.save()
        return returnSuccessJson("로그아웃 되었습니다.","204", status=status.HTTP_204_NO_CONTENT)
    
# 회원탈퇴
class DeleteUserView(APIView):
    permission_classes = [ IsAuthenticated ]

    @swagger_auto_schema(tags=['회원탈퇴.'], responses={200: 'Success'})
    def delete(self, request, **kwargs):
        if kwargs.get('pk') is None:
            return returnErrorJson("invalid request","400", status=status.HTTP_400_BAD_REQUEST)
        else:
            pk = kwargs.get('pk')
            user_object = User.objects.get(id=pk)
            user_object.delete()
            return returnSuccessJson("delete ok","200", status=status.HTTP_200_OK)