from fastapi import FastAPI , File, UploadFile
from predict import predict_img
import numpy as np
app = FastAPI()

@app.get("/fastapi/")
def read_root():
    return {"Hello": "World"}
    
@app.post("/fastapi/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    
    return {"filenames": [file.filename for file in files]}

# @app.get("/fastapi/predict")
# def read_root():
#     res = []
#     img_path = 'img/ttt.jpg'
#     return_value = predict_img(img_path)
#     print(type(return_value))
#     arr = np.array(return_value)
#     print('-------------')
#     print(arr)
#     print(type(arr.tolist()))
#     print('-------------')
#     print(arr)

#     res.append(float(arr[0][0]))
#     return res
    