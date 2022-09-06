from django.shortcuts import render

from .models import User
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth import authenticate

from .serializers import(
    UserSerializer
)

# 회원정보 수정
class UserUpdateAPIView(APIView):
    serializer_class = UserSerializer
    
    def put(self,request,*args,**kwargs):
        # 변경할 데이터들
        serializer_data = request.data

        user = User.objects.get(id=3)
        
        serializer = self.serializer_class(
            user, data=serializer_data, partial=True
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response("invalid request", status=status.HTTP_400_BAD_REQUEST)

#회원 상세 정보 조회
class UserRetrieveAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# 회원 전체 조회
class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

#이메일(ID) 중복 검사
class EmailCheckAPIView(APIView):
    def get(self,request,email):
        #pk 값이 url로 들어오지 않으면 잘못된 접근 처리
        if email is None:
            return Response("invalid request", status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                user_object = User.objects.get(user_email=email)
                res={
                    "message": "중복된 이메일 입니다",
                }
                return Response(res, status=status.HTTP_400_BAD_REQUEST)
            except:
                res = {
                    "message": "사용가능한 이메일 입니다",
                }
                return Response(res,status=status.HTTP_200_OK)
                