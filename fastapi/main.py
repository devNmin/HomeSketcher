from fastapi import FastAPI , File, UploadFile
from util.predict import predict_img
import numpy as np
from PIL import Image
import shutil

app = FastAPI()

@app.get("/fastapi/")
def read_root():
    return {"Hello": "World"}

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