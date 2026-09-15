import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException, status
from fastapi.staticfiles import StaticFiles # Dùng để cấu hình thư mục tĩnh nếu chưa có
from services.predict_service import predict_butterfly_image
import pymysql
from datetime import datetime

router = APIRouter(prefix="/predict", tags=["Prediction"])

# Đảm bảo thư mục lưu ảnh tồn tại
UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = ""
DB_NAME = "butterfly_history.db"

def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

@router.post("/")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File phải là hình ảnh!")
        
    image_bytes = await file.read()
    
    # 1. Lưu file ảnh vật lý vào thư mục static/uploads
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{int(datetime.now().timestamp())}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(image_bytes)
        
    # Tạo URL đường dẫn để Frontend có thể gọi hiển thị ảnh
    image_url = f"http://localhost:8000/static/uploads/{unique_filename}"

    # 2. Gọi dịch vụ dự đoán AI
    result = predict_butterfly_image(image_bytes)
    
    try:
        predicted_class = result.get("predicted_class", "Unknown")
        confidence_val = result.get("confidence", 0.0)
        conf_str = f"{confidence_val}%" if isinstance(confidence_val, (int, float)) else str(confidence_val)
        
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        user_id = 1

        # 3. Lưu đường dẫn URL hoàn chỉnh vào database
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                sql = """
                    INSERT INTO history (user_id, image_path, predicted_class, confidence, created_at) 
                    VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (user_id, image_url, predicted_class, conf_str, current_time))
                connection.commit()
        finally:
            connection.close()
            
    except Exception as e:
        print("Lỗi khi lưu lịch sử vào database:", e)

    # Trả về kết quả trực tiếp ở cấp độ ngoài cùng để localStorage và Frontend nhận diện đúng
    return {
        "predicted_class": result.get("predicted_class"),
        "confidence": result.get("confidence"),
        "family": result.get("family"),
        "habitat": result.get("habitat"),
        "distribution": result.get("distribution"),
        "features": result.get("features"),
        "similar_species": result.get("similar_species", [])
    }

@router.get("/")
def get_history():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM history ORDER BY id DESC")
            result = cursor.fetchall()
            return {"status": "success", "data": result}
    finally:
        connection.close()