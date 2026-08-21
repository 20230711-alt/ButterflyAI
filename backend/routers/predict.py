from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from services.predict_service import predict_butterfly_image

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File phải là hình ảnh!")
        
    image_bytes = await file.read()
    result = predict_butterfly_image(image_bytes)
    
    return {
        "status": "success",
        "data": result
    }