import sys
import os

# Thêm thư mục backend hiện tại vào Python Path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles  
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, predict

app = FastAPI(title="ButterflyAI API")

# 1. Mount thư mục static cũ (nếu có)
app.mount("/static", StaticFiles(directory="static"), name="static")

# 2. Cấu hình đường dẫn tới thư mục dataset (điều chỉnh cho khớp với cấu trúc thư mục thực tế của bạn)
# Giả sử cấu trúc từ thư mục backend lùi ra ngoài 1 cấp là thư mục chứa 'train/dataset'
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "train", "dataset")

# Mount thư mục dataset để FastAPI có thể phục vụ file ảnh qua URL /dataset/...
if os.path.exists(DATASET_DIR):
    app.mount("/dataset", StaticFiles(directory=DATASET_DIR), name="dataset")

# 3. API lấy danh sách ảnh thực tế của loài bướm trong dataset (Hỗ trợ tìm không phân biệt chữ hoa/thường)
@app.get("/species-images/{species_name}")
def get_species_images(species_name: str):
    decoded_name = species_name.strip()
    
    # Tìm kiếm trong cả thư mục train và test
    for sub in ["test", "train"]:
        sub_dir = os.path.join(DATASET_DIR, sub)
        if not os.path.exists(sub_dir):
            continue
            
        # Duyệt qua các thư mục con để tìm tên loài khớp (không phân biệt hoa/thường)
        matched_species_dir = None
        for folder_name in os.listdir(sub_dir):
            if folder_name.strip().lower() == decoded_name.lower():
                matched_species_dir = os.path.join(sub_dir, folder_name)
                actual_folder_name = folder_name
                break
                
        if matched_species_dir and os.path.exists(matched_species_dir):
            # Lọc các file ảnh hợp lệ
            image_files = sorted([
                f for f in os.listdir(matched_species_dir) 
                if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))
            ])
            # Tạo danh sách URL trả về cho frontend (lấy tối đa 5 ảnh)
            image_urls = [f"http://localhost:8000/dataset/{sub}/{actual_folder_name}/{img}" for img in image_files[:5]]
            return {"images": image_urls}
            
    return {"images": []}

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(predict.router)

@app.get("/")
def root():
    return {"message": "ButterflyAI Backend is running!"}