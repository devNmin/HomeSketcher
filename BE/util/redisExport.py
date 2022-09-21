import pandas as pd 
from django_redis import get_redis_connection

def redisExport():
    con = get_redis_connection("default")
    strData = "["
    test = con.lrange("clickList", 0, -1)
    for item in test:
        strData += item.decode() + ", "
        result = strData[:-2]
    result += "]" 
    # test1_df = pd.DataFrame(test)
    # test1_df.to_csv('test1_df.csv')
    return result