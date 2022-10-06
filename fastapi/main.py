from fastapi import FastAPI , File, UploadFile
 
from fastapi.middleware.cors import CORSMiddleware
from predict import predict_img
import numpy as np
from PIL import Image
import shutil
from typing import Optional
from pydantic import BaseModel
import json

class Item(BaseModel):
    roomList: list
    threeInfo: list
    objList: list
    objBox: dict
    wallColor: dict 
    # floorColor: list

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/fastapi/")
def read_root():
    return {"Hello": "World"}



@app.post("/fastapi/myroom/test/{user_id}")
def roomtest(user_id:str ):

    return {user_id}

@app.post("/fastapi/myroom/save/{user_id}")
def save( user_id:str , save : Item):
    
    save_dict ={}
    save_dict['roomList'] = save.roomList
    save_dict['threeInfo'] = save.threeInfo
    save_dict['objList'] = save.objList
    save_dict['objBox'] = save.objBox
    save_dict['wallColor'] = save.wallColor
    # save_dict['floorColor'] = save.floorColor
    
    with open(f'roomInfo/{user_id}.json', 'w', encoding='utf-8') as make_file:
        json.dump(save_dict, make_file, indent="\t")


    return {"user_id":user_id , "file":save}

@app.get("/fastapi/myroom/load/{user_id}")
def load( user_id:str ):
    print("-----/fastapi/myroom/load/{user_id}--------")
    
    with open(f'roomInfo/{user_id}.json', 'r') as f:

        json_data = json.load(f)

    return json_data

@app.post("/fastapi/predict")
async def predict( image: UploadFile = File(...)):
    class_names = ['class_antique', 'class_mediterranean', 'class_natural']
    res = {}
    path = f'img/{image.filename}'

    with open(path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    # AI model 
    return_value = predict_img(path)

    arr = np.array(return_value)

    res = { }
    class_names = ['Antique', 'Mediterranean', 'Natural']
    for i in range(len(class_names)):
        res[class_names[i]] = round(arr[0][i]*100,2)
    result = dict(sorted(res.items(), key = lambda res: res[1],reverse=True))

    return {"predict":result}