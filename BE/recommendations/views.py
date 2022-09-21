from furnitures.models import Furniture
from auths.models import User
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import  IsAuthenticated
from rest_framework.response import Response
from util.returnDto import (
    returnSuccessJson,
    returnErrorJson,
)
from util.recom import return_recom_funr
from drf_yasg.utils import swagger_auto_schema
#가구 리스트 추천 상품
class RecomListAPIView(APIView):
    permission_classes=[IsAuthenticated]
    
    @swagger_auto_schema(tags=['가구 리스트 추천 상품'], responses={200: 'Success'})
    def get(self,request):

        fur_id = return_recom_funr(request.user.id)
        furnitures = Furniture.objects.filter(id__in=fur_id)
        # res = {}
        # #하트 많고 작은 순
        # res['furnitures'] = furnitures.values

        return Response(furnitures.values(), status=status.HTTP_200_OK) 