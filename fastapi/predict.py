from tensorflow import keras
from keras.applications.efficientnet_v2 import decode_predictions
from keras.applications.efficientnet_v2 import  preprocess_input
import numpy as np
from PIL import Image

def predict_img(img_path):
    # 모델 불러오기 
    load_model = keras.models.load_model('model/model_class3_9.h5')
    # 이미지 불러오기 
    img = Image.open(img_path)
    # 이미지 리사이즈
    image = img.resize((384,384), Image.LANCZOS)
    # 이미지 전처리 
    x = preprocess_input(image)
    x = np.expand_dims(x, 0)
    # 이미지 예측
    y = load_model.predict(x)

    return y
