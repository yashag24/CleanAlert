from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import io
import tensorflow as tf
import os
from pydantic import BaseModel

class PredictionResponse(BaseModel):
    class_name: str
    confidence: float

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = tf.keras.models.load_model(os.getenv("MODEL_PATH", "models/model_deep.keras"))

@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        prediction = model.predict(img_array)
        class_idx = np.argmax(prediction[0])
        
        return {
            "class_name": "Garbage" if class_idx == 1 else "Clean",
            "confidence": float(prediction[0][class_idx])
        }
    except Exception as e:
        raise HTTPException(500, detail=str(e))
