from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import GlbObject
from furnitures.models import Furniture
from rest_framework.response import Response
from rest_framework import status
from util.returnDto import returnErrorJson

# Create your views here.
class getobjectAPIView(APIView):
    permission_classes=[IsAuthenticated]
    @swagger_auto_schema(tags=['1개의 gbl url 반환'], responses={200: 'Success'})
    def get(self, request, fur_id):
        try: 
            furniture = Furniture.objects.get(id=fur_id)
        except:
            return returnErrorJson("없는 가구 입니다.", "400", status.HTTP_400_BAD_REQUEST)
        glb = GlbObject.objects.get(furniture_sub=furniture.furniture_sub)
        
        try: 
            res = {}
            res['glb_url'] = glb.glb_url
            return Response(res, status=status.HTTP_200_OK)
        except:
            return returnErrorJson("gbl 파일이 없습니다.", "500", status.HTTP_500_INTERNAL_SERVER_ERROR)
