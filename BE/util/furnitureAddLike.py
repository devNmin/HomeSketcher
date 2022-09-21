from likes.models import UserLike

def addLike(furnitures, userId):
    furnitureValuses = furnitures.values()
    for furniture in furnitureValuses:
        pk = furniture['id']
        like = UserLike.objects.filter(user_id=userId, furniture_id=pk)
        try:
            like[0]
            furniture['like']=True
        except:
            furniture['like']=False
    return furnitureValuses