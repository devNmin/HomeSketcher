from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import update_last_login
from rest_framework.response import Response
from rest_framework import permissions, status, generics
from .models import User
from datetime import date
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

from django.db.models import Count
import datetime
from util.choicesList import style,color

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
        
        try:        
            user1 = User.objects.get(user_email=user_email)
        # last_login = date.today()
        # print(last_login.strftime("%Y-%m-%d"))
        except:
            return returnErrorJson("이메일 혹은 비밀번호가 다릅니다.", "400", status.HTTP_400_BAD_REQUEST)
        
        try:
            update_last_login(None, user1)   

            user = authenticate(
                request, 
                id=user1.id,
                password=user_password,
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
                
            else:
                return returnErrorJson("이메일 혹은 비밀번호가 다릅니다.", "400", status.HTTP_400_BAD_REQUEST)
            
        except:
            return returnErrorJson("로그인 중 오류가 발생했습니다.", "500", status.HTTP_500_INTERNAL_SERVER_ERROR)
  
# 로그아웃"
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

class UserTrendAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['스타일, 컬러 전체 정보/ 내 나이 기준, 성별 기준 정보'],response={200:'successs'})
    def get(self,request):
        # forAll = User.objects.values("user_style","user_color").annotate(Count("user_style"),Count("user_color"))
        res = {}

        # 전체 스타일, 컬러 통계 정보 start
        # allStyle = User.objects.values("user_style").annotate(Count("user_style"))
        # allColor = User.objects.values("user_color").annotate(Count("user_color"))
        # res['allStyle'] = allStyle
        # res['allColor'] = allColor
        # 전체 스타일, 컬러 통계 정보 end

        # 성별 기준 스타일, 컬러 통계 정보
        maleStyle = User.objects.filter(user_gender = 0).values("user_style").annotate(Count("user_style"))
        maleColor = User.objects.filter(user_gender=0).values("user_color").annotate(Count("user_color"))
        femaleStyle = User.objects.filter(user_gender = 1).values("user_style").annotate(Count("user_style"))
        femaleColor = User.objects.filter(user_gender = 1).values("user_color").annotate(Count("user_color"))
        
        maleData = makeStyleJson(maleStyle)
        print(maleData)

        res['maleStyle'] = makeStyleJson(maleStyle)
        res['maleColor'] = makeColorJson(maleColor)
        res['femaleStyle'] = makeStyleJson(femaleStyle)
        res['femaleColor'] = makeColorJson(femaleColor)

        #나이 기준 스타일, 컬러 통계 정보
        now = datetime.datetime.now()
        year = now.year
        # month = now.month
        # day = now.day

        
        age_group = [28,38,48,58,68,78]
        ageStyle = {}
        ageColor = {}

        left = datetime.datetime(year-18,1,1).strftime('%Y-%m-%d')
        right = datetime.datetime(year,12,31).strftime('%Y-%m-%d')
        ageStyle["0"] = makeStyleJson(User.objects.filter(user_birth__range=(left,right)).values("user_style").annotate(Count("user_style")))
        ageColor["0"] = makeColorJson(User.objects.filter(user_birth__range=(left,right)).values("user_color").annotate(Count("user_color")))
        # print(left)
        # print(right)
        # print("===")

        for i in age_group:
            left = datetime.datetime(year-i,1,1).strftime('%Y-%m-%d')
            right = datetime.datetime(year-i+9,12,31).strftime('%Y-%m-%d')
            ageStyle[str(i-8)] = makeStyleJson(User.objects.filter(user_birth__range=(left,right)).values("user_style").annotate(Count("user_style")))
            ageColor[str(i-8)] = makeColorJson(User.objects.filter(user_birth__range=(left,right)).values("user_color").annotate(Count("user_color")))
            # print(left)
            # print(right)
            # print("===")
        
        left = datetime.datetime(year-79,12,31).strftime('%Y-%m-%d')
        # right = datetime.datetime(year,12,31).strftime('%Y-%m-%d')
        ageStyle["old"] =makeStyleJson(User.objects.filter(user_birth__lte=left).values("user_style").annotate(Count("user_style")))
        ageColor["old"] = makeColorJson(User.objects.filter(user_birth__lte=left).values("user_color").annotate(Count("user_color")))
        # print(left)
        # print(ageStyle)
        # print(User.objects.filter(user_birth__gte=left).values("user_style").annotate(Count("user_style")).query)

        res['ageStyle'] = ageStyle
        res['ageColor'] = ageColor


        return Response(res,status=status.HTTP_200_OK)


def makeStyleJson(styleData):
    dataSet = {}
    for i in style:
        dataSet[i] = 0
    
    for m in styleData:
        print(m['user_style'])
        dataSet[m['user_style']] = m['user_style__count']
    
    return dataSet

def makeColorJson(styleData):
    dataSet = {}
    for i in color:
        dataSet[i] = 0
    
    for m in styleData:
        dataSet[m['user_color']] = m['user_color__count']

    return dataSet