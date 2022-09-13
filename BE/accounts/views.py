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

from .serializers import(
    UserSerializer,
    UserSwaggerSerializer
)

# 회원정보 수정
class UserUpdateAPIView(APIView):
    permission_classes=[IsAuthenticated]
    serializer_class = UserSerializer
    
    @swagger_auto_schema(tags=['회원 정보 수정'], request_body=UserSwaggerSerializer, responses={200: 'Success'})
    def put(self,request,*args,**kwargs):
        # 변경할 데이터들
        serializer_data = request.data

        print("=================")
        print(serializer_data)
        
        # user = User.objects.get(id=3)
        user = request.user
        print(user)
        print(user.user_name)
        print("=============")
        
        serializer = self.serializer_class(
            user, data=serializer_data, partial=True
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return returnErrorJson("잘못된 요청 방식입니다. 알맞은 데이터를 보내주세요","400", status=status.HTTP_400_BAD_REQUEST)

#회원 상세 정보 조회
class UserRetrieveAPIView(generics.RetrieveAPIView):
    permission_classes=[IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @swagger_auto_schema(tags=['회원 상세 정보 조회'], responses={200: 'Success'})
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

# 회원 전체 조회
class UserListAPIView(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @swagger_auto_schema(tags=['회원 전체 조회'], responses={200: 'Success'})
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

#이메일(ID) 중복 검사
class EmailCheckAPIView(APIView):
    permission_classes=[AllowAny]

    @swagger_auto_schema(tags=['이메일(ID) 중복 검사'], responses={200: 'Success'})
    def get(self,request,user_pk):
        #pk 값이 url로 들어오지 않으면 잘못된 접근 처리
        if user_pk is None:
            return returnErrorJson("잘못된 요청 방식입니다. 알맞은 데이터를 보내주세요","400", status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                user_object = User.objects.get(user_email=email)
                print(user_object)
                print(user_object.user_email)
                print(user_object.user_name)
                print(user_object.user_birth)
                
                return returnErrorJson("중복된 이메일 입니다","400", status=status.HTTP_400_BAD_REQUEST)
            except:
                return returnSuccessJson("사용가능한 이메일 입니다","200",status=status.HTTP_200_OK)
                
                
                