from rest_framework.response import Response

def returnSuccessJson(message, successCode, status):
    dir ={}
    dir['message'] = message
    dir['successCode'] = successCode
    
    return Response(dir, status)

def returnErrorJson(error, errorCode, status):
    dir ={}
    dir['error'] = error
    dir['errorCode'] = errorCode
    
    return Response(dir, status)