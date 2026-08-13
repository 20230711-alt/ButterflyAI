import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader
import kagglehub
import os

# 1. Tải và lấy đường dẫn dữ liệu tự động từ kagglehub
print("Đang kiểm tra dữ liệu...")
data_path = kagglehub.dataset_download("gpiosenka/butterfly-images40-species")
print("Đường dẫn dữ liệu:", data_path)

# 2. Thiết lập thiết bị chạy (Sử dụng GPU nếu có, ngược lại dùng CPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Đang chạy huấn luyện trên thiết bị: {device}")

# 3. Tiền xử lý dữ liệu
data_transforms = {
    'train': transforms.Compose([
        transforms.RandomResizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ]),
    'valid': transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ]),
}

# 4. Đọc tập dữ liệu
image_datasets = {
    x: datasets.ImageFolder(os.path.join(data_path, x), data_transforms[x]) 
    for x in ['train', 'valid']
}
dataloaders = {
    x: DataLoader(image_datasets[x], batch_size=16, shuffle=True) 
    for x in ['train', 'valid']
}

class_names = image_datasets['train'].classes
num_classes = len(class_names)
print(f"Tổng số loài bướm nhận diện: {num_classes}")

# 5. Khởi tạo mô hình ResNet50
model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)

# Đóng băng các lớp trích xuất đặc trưng ban đầu
for param in model.parameters():
    param.requires_grad = False

# Thay thế lớp classifier cuối cùng phù hợp với số loài bướm
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, num_classes)
model = model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.fc.parameters(), lr=0.001)

# 6. Bắt đầu huấn luyện (Thử nghiệm 3 vòng - Epochs)
EPOCHS = 3
print("\n--- BẮT ĐẦU HUẤN LUYỆN ---")

for epoch in range(EPOCHS):
    print(f"\nEpoch {epoch+1}/{EPOCHS}")
    for phase in ['train', 'valid']:
        if phase == 'train':
            model.train()
        else:
            model.eval()

        running_loss = 0.0
        running_corrects = 0

        for inputs, labels in dataloaders[phase]:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()

            with torch.set_grad_enabled(phase == 'train'):
                outputs = model(inputs)
                _, preds = torch.max(outputs, 1)
                loss = criterion(outputs, labels)

                if phase == 'train':
                    loss.backward()
                    optimizer.step()

            running_loss += loss.item() * inputs.size(0)
            running_corrects += torch.sum(preds == labels.data)

        epoch_loss = running_loss / len(image_datasets[phase])
        epoch_acc = running_corrects.double() / len(image_datasets[phase])
        print(f"{phase.capitalize()} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}")

# 7. Lưu file mô hình vào ngay thư mục dự án VS Code của bạn
torch.save(model.state_dict(), "butterfly_resnet50.pth")
print("\n=> Đã lưu mô hình thành công thành file 'butterfly_resnet50.pth' trong VS Code!")