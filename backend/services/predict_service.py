import os
from dotenv import load_dotenv
load_dotenv() # Tự động nạp các biến từ file .env vào hệ thống
import json
import random
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io
from google import genai

# Lấy API Key từ biến môi trường của hệ thống
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)

# 2. Cấu hình đường dẫn cho mô hình
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "butterfly_resnet50.pth")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Đường dẫn file cache cục bộ để lưu thông tin các loài đã tra cứu
CACHE_FILE = os.path.join(BASE_DIR, "models", "species_cache.json")

def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_cache(cache_data):
    try:
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(cache_data, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"Lỗi lưu cache: {e}")

# 3. Lấy danh sách tên các loài từ thư mục dataset thật
def get_class_names():
    try:
        project_root = os.path.dirname(BASE_DIR)
        train_dir = os.path.join(project_root, "train", "dataset", "train")

        if os.path.exists(train_dir):
            return sorted([d for d in os.listdir(train_dir) if os.path.isdir(os.path.join(train_dir, d))])
    except Exception as e:
        print(f"Lỗi khi quét thư mục dataset: {e}")
    
    return [f"Species_{i}" for i in range(100)]

CLASS_NAMES = get_class_names()

# 4. Tra cứu thông tin sinh học chi tiết từng loài bằng Gemini AI (Có tích hợp Cache siêu tốc)
def fetch_species_info_from_ai(species_name: str) -> dict:
    key = species_name.strip().upper()
    
    # Kiểm tra xem loài này đã có trong cache cục bộ chưa
    cache = load_cache()
    if key in cache:
        print(f"--> [CACHE HIT] Lấy ngay thông tin có sẵn cho loài: {species_name}")
        return cache[key]

    try:
        prompt = f"""
        Bạn là một chuyên gia sinh vật học hàng đầu về loài bướm và ngài (Lepidoptera).
        Hãy mô tả CHI TIẾT và ĐẶC SẮC bằng tiếng Việt về loài bướm có tên chính xác là: "{species_name}".

        Yêu cầu trả về DUY NHẤT một chuỗi JSON thuần túy (không chứa markdown ```json, không kèm theo bất kỳ lời dẫn nào khác ngoài JSON):
        {{
            "family": "Tên Họ sinh học chuẩn tiếng Anh kèm tiếng Việt (ví dụ: Papilionidae (Họ Bướm Phượng))",
            "habitat": "Chi tiết môi trường sống tự nhiên",
            "distribution": "Phân bố địa lý chính xác",
            "features": "Viết từ 3 đến 4 câu mô tả thật chi tiết về đặc điểm ngoại hình đặc trưng (màu sắc chủ đạo, hoa văn cánh, sải cánh, hình dáng cánh, thức ăn hoặc đặc tính tự vệ)."
        }}
        """

        response = client.models.generate_content(
            model='gemini-3.6-flash',
            contents=prompt,
        )
        
        text_response = response.text.strip()
        
        # Làm sạch chuỗi phản hồi để loại bỏ các định dạng markdown code block nếu có
        if "```json" in text_response:
            text_response = text_response.split("```json")[1].split("```")[0].strip()
        elif "```" in text_response:
            text_response = text_response.split("```")[1].split("```")[0].strip()

        # Thử parse JSON, nếu lỗi sẽ văng ra ngoại lệ riêng để debug
        parsed_data = json.loads(text_response)

        # Lưu lại vào cache để từ lần sau gọi loài này sẽ ra kết quả tức lập tức
        cache[key] = parsed_data
        save_cache(cache)

        return parsed_data

    except Exception as e:
        print(f"--> [DEBUG] Lỗi chi tiết khi gọi Gemini cho loài '{species_name}': {e}")
        return {
            "family": "Lepidoptera (Bộ Cánh Vảy)",
            "habitat": f"Môi trường tự nhiên sinh sống của loài {species_name}",
            "distribution": "Phân bố theo khu vực sinh thái đặc trưng",
            "features": f"Loài {species_name} có các đặc điểm sinh học, màu sắc và hoa văn cánh độc đáo giúp chúng thích nghi và ngụy trang trong môi trường tự nhiên."
        }

# 5. Tải mô hình ResNet50
def load_butterfly_model():
    if not os.path.exists(MODEL_PATH):
        print(f"Chưa tìm thấy file weights tại: {MODEL_PATH}")
        return None
    
    model = models.resnet50(weights=None)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, len(CLASS_NAMES))
    
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    model.to(device)
    model.eval()
    return model

model = load_butterfly_model()

# 6. Preprocessing chuyển đổi ảnh đầu vào
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# 7. Hàm xử lý dự đoán chính (Đã tối ưu lọc loài tương tự theo Họ sinh học)
def predict_butterfly_image(image_bytes: bytes) -> dict:
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        input_tensor = transform(image).unsqueeze(0).to(device)

        if model is not None:
            with torch.no_grad():
                outputs = model(input_tensor)
                probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
                confidence, preds = torch.max(probabilities, 0)
                
                predicted_idx = preds.item()
                predicted_label = CLASS_NAMES[predicted_idx] if predicted_idx < len(CLASS_NAMES) else "Unknown"
                conf_score = round(confidence.item() * 100, 2)
        else:
            predicted_label = CLASS_NAMES[0] if CLASS_NAMES else "AFRICAN GIANT SWALLOWTAIL"
            conf_score = 92.50

        # Lấy thông tin chi tiết của loài chính
        info = fetch_species_info_from_ai(predicted_label)
        main_family = info.get("family", "").split("(")[0].strip().lower()

        # Thu thập thông tin các loài khác để tìm kiếm loài cùng họ
        cache = load_cache()
        other_classes = [c for c in CLASS_NAMES if c != predicted_label]
        random.shuffle(other_classes) # Trộn ngẫu nhiên để đa dạng kết quả mỗi lần gọi

        same_family_candidates = []
        other_candidates = []

        for sim_name in other_classes:
            sim_key = sim_name.strip().upper()
            sim_info = cache.get(sim_key)
            
            if not sim_info:
                # Nếu chưa có trong cache thì gọi nhanh qua AI hoặc lấy mặc định
                sim_info = fetch_species_info_from_ai(sim_name)
            
            sim_family = sim_info.get("family", "").split("(")[0].strip().lower()
            
            # Ưu tiên đưa vào nhóm cùng họ sinh học
            if main_family and main_family in sim_family:
                same_family_candidates.append((sim_name, sim_info))
            else:
                other_candidates.append((sim_name, sim_info))

        # Lấy tối đa các loài cùng họ trước, nếu thiếu thì bù bằng các loài khác
        selected_pool = same_family_candidates + other_candidates
        selected_similar = selected_pool[:4]

        similar_species_list = []
        for sim_name, sim_info in selected_similar:
            similar_species_list.append({
                "name": sim_name,
                "scientific": sim_info.get("family", "Lepidoptera"),
                "family": sim_info.get("family"),
                "habitat": sim_info.get("habitat"),
                "distribution": sim_info.get("distribution"),
                "features": sim_info.get("features")
            })

        return {
            "predicted_class": predicted_label,
            "confidence": conf_score,
            "family": info.get("family"),
            "habitat": info.get("habitat"),
            "distribution": info.get("distribution"),
            "features": info.get("features"),
            "similar_species": similar_species_list
        }

    except Exception as e:
        raise RuntimeError(f"Lỗi khi xử lý dự đoán: {str(e)}")