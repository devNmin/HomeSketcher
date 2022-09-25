import pandas as pd 
from django_redis import get_redis_connection
import json

def redisExport():
    con = get_redis_connection("default")
    strData = []
    test = con.lrange("clickList", 0, -1)
    for item in test:
        te = item.decode().replace("'", "\"")
        strData.append(json.loads(te)) 
    deleteRedisData()
    return strData

def deleteRedisData():
    con = get_redis_connection("default")
    con.delete('clickList')
    return 