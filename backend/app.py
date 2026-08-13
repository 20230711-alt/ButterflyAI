from fastapi import FastAPI, UploadFile, File
import torch
import torch.nn as nn
from torchvision import models, transforms
import kagglehub
from PIL import Image
import io
import os

app = FastAPI()

# 1. Tải danh sách tên các loài bướm trực tiếp từ dataset
data_path = kagglehub.dataset_download("gpiosenka/butterfly-images40-species")
train_dir = os.path.join(data_path, "train")
CLASS_NAMES = sorted(os.listdir(train_dir))
NUM_CLASSES = len(CLASS_NAMES)

# 2. Khởi tạo mô hình và nạp weights từ Colab
model = models.resnet50()
model.fc = nn.Linear(model.fc.in_features, NUM_CLASSES)
model.load_state_dict(torch.load("butterfly_resnet50.pth", map_location=torch.device('cpu')))
model.eval()

# 3. Transform tiền xử lý ảnh
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        outputs = model(tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        confidence, predicted_idx = torch.max(probabilities, 0)

    return {
        "class": CLASS_NAMES[predicted_idx.item()],
        "confidence": float(confidence)
    }