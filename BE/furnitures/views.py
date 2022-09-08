from furnitures.models import Furniture
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
    Furniture
)

#가구 검색 API
# class FurnitureSearchAPIView(APIView):
#     def get(self,request,search_name):
#         if search_name is None:
#             return returnErrorJson("잘못된 요청 방식입니다. 알맞은 데이터를 보내주세요","400", status=status.HTTP_400_BAD_REQUEST)
#         else:
#             try:
#                 furniture_datas = Furniture.objects.filter(furniture_name=search_name)
                
#                 return Response(furniture_datas, status=status.HTTP_200_OK)
#             except:
#                 return returnSuccessJson("사용가능한 이메일 입니다","200",status=status.HTTP_200_OK)
                