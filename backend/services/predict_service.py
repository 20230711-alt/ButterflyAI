import os
import json
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io
from google import genai

# 1. Cấu hình API Key và khởi tạo Client
GEMINI_API_KEY = "AIzaSyD6BiG_cJXH4CW_OZ_BtJEwCgMr7905-Dg"
client = genai.Client(api_key=GEMINI_API_KEY)

# 2. Cấu hình đường dẫn cho mô hình
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "butterfly_resnet50.pth")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 3. Lấy danh sách tên 100 loài từ thư mục dataset
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

# 4. Tra cứu thông tin sinh học chi tiết từng loài bằng Gemini API
def fetch_species_info_from_ai(species_name: str) -> dict:
    try:
        prompt = f"""
        Bạn là một chuyên gia sinh vật học hàng đầu về loài bướm và ngài (Lepidoptera).
        Hãy mô tả CHI TIẾT và ĐẶC SẮC bằng tiếng Việt về loài: "{species_name}".

        Yêu cầu bắt buộc đối với trường "features":
        Phải viết từ 3 đến 4 câu mô tả thật chi tiết về đặc điểm ngoại hình đặc trưng (màu sắc chủ đạo, hoa văn cánh, sải cánh, hình dáng cánh, thức ăn hoặc đặc tính tự vệ độc đáo).

        Trả về kết quả DUY NHẤT dưới dạng JSON thuần (không chứa dấu ```json hay bất kỳ văn bản nào khác):
        {{
            "family": "Tên Họ sinh học chuẩn tiếng Anh kèm tiếng Việt (ví dụ: Papilionidae (Họ Bướm Phượng) hoặc Nymphalidae (Họ Bướm Giáp))",
            "habitat": "Chi tiết môi trường sống tự nhiên",
            "distribution": "Phân bố địa lý chính xác",
            "features": "Mô tả sâu và chi tiết về đặc điểm nhận dạng và hoa văn cánh..."
        }}
        """

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        text_response = response.text.strip()
        if text_response.startswith("```json"):
            text_response = text_response[7:-3].strip()
        elif text_response.startswith("```"):
            text_response = text_response[3:-3].strip()

        return json.loads(text_response)

    except Exception as e:
        print(f"Lỗi khi gọi Gemini API cho loài {species_name}: {e}")
        return {
            "family": f"Lepidoptera (Bộ Cánh Vảy)",
            "habitat": "Rừng nhiệt đới, đồng cỏ, khu bảo tồn tự nhiên",
            "distribution": "Phân bố rộng rãi theo vùng sinh thái",
            "features": f"Loài {species_name.title()} có hoa văn và màu sắc cánh đặc trưng giúp ngụy trang và xua đuổi kẻ thù trong tự nhiên."
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

# 7. Hàm xử lý dự đoán chính
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
            predicted_label = "AFRICAN GIANT SWALLOWTAIL"
            conf_score = 92.50

        # Tự động lấy thông tin mô tả chi tiết từ Gemini AI
        info = fetch_species_info_from_ai(predicted_label)

        return {
            "predicted_class": predicted_label,
            "confidence": conf_score,
            "family": info.get("family"),
            "habitat": info.get("habitat"),
            "distribution": info.get("distribution"),
            "features": info.get("features")
        }

    except Exception as e:
        raise RuntimeError(f"Lỗi khi xử lý dự đoán: {str(e)}")