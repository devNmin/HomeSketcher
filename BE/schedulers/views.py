from django.shortcuts import render
from django.conf import settings
import datetime
from util.redisExport import redisExport
from util.recom import hot_furnitures,read_hot_furnitures
# Create your views here.

# redis 결과 보내기
def redisViewsDataExport():
    #날짜 셋팅
    now = datetime.datetime.now()

    viewsData = redisExport() # load views counts from redis 
    if len(viewsData) != 0:
        hot_furnitures(viewsData) # save hot item
    
    
    
    # print(res)
    # subject = str(now.year) + '년 ' + str(now.month) + '월 ' + str(now.day) + '일 ' + str(now.hour) + '조회수 데이터를 보냅니다.'
    # data = viewsData
    
    # print("result data ", subject)
    # print("result data ", data)