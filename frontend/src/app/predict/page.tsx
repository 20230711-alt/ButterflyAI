"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Home,
  Scan,
  History,
  Info,
  BarChart2,
  Settings,
  HelpCircle,
  User,
  ChevronDown,
  Volume2,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface PredictionResult {
  predicted_class: string;
  confidence: number;
  family?: string;
  habitat?: string;
  distribution?: string;
  features?: string;
}

export default function PredictPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // 1. Tự động đọc dữ liệu ảnh từ localStorage khi vào trang và KHÔNG xóa sau khi đọc
  useEffect(() => {
    const savedImage = localStorage.getItem("latest_uploaded_image");
    if (savedImage) {
      setSelectedImage(savedImage);
      // Tự động gửi ảnh sang API Backend để nhận diện
      sendImageToBackend(savedImage);
    }
  }, []);

  // 2. Hàm chuyển đổi chuỗi Base64 thành Blob để gửi FormData sang API FastAPI
  const base64ToBlob = (base64Data: string) => {
    const parts = base64Data.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };

  // Hàm dịch văn bản từ Tiếng Anh sang Tiếng Việt
  const translateToVietnamese = async (text: string) => {
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.responseData && data.responseData.translatedText) {
          return data.responseData.translatedText;
        }
      }
    } catch (error) {
      console.error("Lỗi dịch sang Tiếng Việt:", error);
    }
    return text;
  };

  // Hàm tự động lấy thông tin từ Wikipedia API và DỊCH SANG TIẾNG VIỆT
  const fetchWikipediaInfo = async (speciesName: string) => {
    try {
      const formattedName = speciesName
        .trim()
        .toLowerCase()
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
        .replace(/\s+/g, "_");

      const queriesToTry = [
        formattedName,
        `${formattedName}_(moth)`,
        `${formattedName}_(butterfly)`,
        encodeURIComponent(speciesName.trim().replace(/\s+/g, "_")),
      ];

      for (const query of queriesToTry) {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`
        );

        if (res.ok) {
          const data = await res.json();
          if (data.extract) {
            // Tự động dịch đoạn văn bản từ Wikipedia sang tiếng Việt
            const translatedDescription = await translateToVietnamese(data.extract);
            return {
              description: translatedDescription,
              description_vietnamese:
                data.description || "Loài bướm trong họ Papilionidae.",
            };
          }
        }
      }
    } catch (error) {
      console.error("Lỗi tra cứu Wikipedia:", error);
    }
    return null;
  };

  // 3. Hàm gọi Backend FastAPI (Endpoint: http://localhost:8000/predict)
  const sendImageToBackend = async (base64Image: string) => {
    setLoading(true);
    setResult(null); // Reset kết quả cũ trước khi nhận diện mới
    try {
      const imageBlob = base64ToBlob(base64Image);
      const formData = new FormData();
      formData.append("file", imageBlob, "butterfly.jpg");

      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const res = await response.json();
        const predictionData = res.data || res;

        // Tra cứu Wikipedia
        const wikiInfo = await fetchWikipediaInfo(predictionData.predicted_class);

        setResult({
          predicted_class: predictionData.predicted_class,
          confidence: predictionData.confidence,
          family: predictionData.family || "Papilionidae (Họ Bướm phượng)",
          habitat: predictionData.habitat || "Rừng nhiệt đới, cánh đồng hoa",
          distribution: predictionData.distribution || "Toàn cầu / Bắc Mỹ",
          features:
            wikiInfo?.description ||
            predictionData.features ||
            "Chưa có thông tin đặc điểm.",
        });
      } else {
        throw new Error(
          "Server Backend trả về lỗi (mã status: " + response.status + ")"
        );
      }
    } catch (error) {
      console.error("Error predicting image:", error);
      alert(
        "Không thể kết nối đến máy chủ AI (http://localhost:8000/predict). Hãy chắc chắn bạn đã bật server Backend!"
      );
    } finally {
      setLoading(false);
    }
  };

  // 4. Chọn ảnh mới trực tiếp tại trang /predict
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const base64Str = reader.result as string;
          setSelectedImage(base64Str);
          // Cập nhật lại localStorage
          localStorage.setItem("latest_uploaded_image", base64Str);
          sendImageToBackend(base64Str);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      {/* ================= 1. SIDEBAR (THANH ĐIỀU HƯỚNG BÊN TRÁI) ================= */}
      <aside className="w-64 bg-[#1e133e] text-white flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="p-5 relative z-10">
          <div className="flex flex-col items-center text-center my-4">
            <svg
              width="50"
              height="50"
              viewBox="0 0 100 100"
              className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mb-2"
            >
              <path
                d="M48 48 C30 10, 5 20, 12 48 C2 68, 28 88, 48 58 Z"
                fill="url(#sb-bf-left)"
              />
              <path
                d="M52 48 C70 10, 95 20, 88 48 C98 68, 72 88, 52 58 Z"
                fill="url(#sb-bf-right)"
              />
              <path
                d="M50 32 L50 62"
                stroke="#e9d5ff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M50 34 Q 45 24 40 22"
                stroke="#e9d5ff"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M50 34 Q 55 24 60 22"
                stroke="#e9d5ff"
                strokeWidth="1.5"
                fill="none"
              />
              <defs>
                <linearGradient
                  id="sb-bf-left"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
                <linearGradient
                  id="sb-bf-right"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
              </defs>
            </svg>
            <h1 className="text-xs font-bold tracking-widest text-purple-100 uppercase leading-tight">
              NHẬN DIỆN<br />LOÀI BƯỚM
            </h1>
          </div>
          <nav className="mt-8 space-y-1.5 text-xs">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <Home size={18} /> Trang chủ
            </Link>
            <Link
              href="/predict"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40"
            >
              <Scan size={18} /> Nhận diện
            </Link>
            <Link
              href="/history"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <History size={18} /> Lịch sử nhận diện
            </Link>
            <Link
              href="/species-info"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <Info size={18} /> Thông tin loài bướm
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <BarChart2 size={18} /> Thống kê
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <Settings size={18} /> Cài đặt
            </Link>
          </nav>
        </div>
        <div className="p-5 border-t border-purple-500/10">
          <Link
            href="/about"
            className="flex items-center gap-3 text-xs text-purple-200/60 hover:text-white transition-colors"
          >
            <HelpCircle size={18} /> Giới thiệu
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Nhận diện loài bướm
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Tải ảnh con bướm lên để hệ thống nhận diện và phân loại.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm cursor-pointer">
            <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <User size={16} />
            </div>
            <span className="text-xs font-medium text-gray-700">Admin</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>

        {/* Grid 2 cột: Khung ảnh đã chọn & Khung kết quả AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CỘT 1: TẢI / HIỂN THỊ ẢNH ĐÃ CHỌN */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="text-sm font-bold text-gray-800">
                Tải ảnh bướm lên
              </h3>
            </div>

            <div className="relative border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[300px]">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Butterfly Preview"
                  className="max-h-[320px] w-auto object-contain rounded-xl shadow-sm"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <ImageIcon size={48} className="mx-auto mb-2 opacity-40" />
                  <p className="text-xs">Chưa có ảnh nào được chọn</p>
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-xs font-medium border border-purple-200 hover:bg-purple-100 transition-colors"
              >
                Chọn ảnh khác
              </button>
              <p className="text-[10px] text-gray-400 mt-2">
                Hỗ trợ định dạng: JPG, JPEG, PNG (Tối đa 10MB)
              </p>
            </div>
          </div>

          {/* CỘT 2: HIỂN THỊ KẾT QUẢ DỰ ĐOÁN AI */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-sm font-bold text-gray-800">
                Kết quả nhận diện
              </h3>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] text-purple-600">
                <Loader2 size={36} className="animate-spin mb-2" />
                <p className="text-xs font-medium text-gray-500">
                  Đang phân tích hình ảnh...
                </p>
              </div>
            ) : result ? (
              <div className="space-y-5">
                {/* Khung xanh lá hiển thị Tên loài nhận diện được */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
                  <CheckCircle2
                    size={32}
                    className="text-emerald-500 shrink-0"
                  />
                  <div>
                    <p className="text-[10px] text-emerald-600 font-medium">
                      Loài bướm được nhận diện
                    </p>
                    <h4 className="text-lg font-bold text-emerald-950">
                      {result.predicted_class}
                    </h4>
                  </div>
                </div>

                {/* Thanh hiển thị Độ tin cậy */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Độ tin cậy</span>
                    <span className="text-sm font-bold text-emerald-600">
                      {result.confidence}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Rất cao
                  </span>
                </div>

                {/* Thông tin chi tiết */}
<div className="space-y-2.5 text-xs">
  <h5 className="font-bold text-gray-800 border-b pb-1">
    Thông tin chi tiết
  </h5>

  {/* Grid 2 cột cho Họ và Môi trường sống */}
  <div className="grid grid-cols-2 gap-2 border-b pb-2">
    <div>
      <span className="text-gray-400 block text-[11px] font-medium mb-0.5">Họ:</span>
      <span className="font-semibold text-gray-800 leading-tight block">
        {result.family}
      </span>
    </div>
    <div>
      <span className="text-gray-400 block text-[11px] font-medium mb-0.5">Môi trường sống:</span>
      <span className="font-medium text-gray-700 leading-tight block line-clamp-2">
        {result.habitat}
      </span>
    </div>
  </div>

  {/* Phân bố */}
  <div className="border-b pb-2">
    <span className="text-gray-400 block text-[11px] font-medium mb-0.5">Phân bố:</span>
    <span className="font-medium text-gray-700 leading-tight block line-clamp-2">
      {result.distribution}
    </span>
  </div>

  {/* Đặc điểm nổi bật - Cố định chiều cao & Có thanh cuộn */}
  <div className="pt-0.5">
    <span className="text-gray-400 block text-[11px] font-medium mb-1">
      Đặc điểm nổi bật:
    </span>
    <div className="bg-gray-50/80 p-2.5 rounded-lg text-gray-700 text-[11px] leading-relaxed max-h-28 overflow-y-auto border border-gray-100 text-justify custom-scrollbar">
      {result.features}
    </div>
  </div>
</div>
</div>
) : (
<div className="flex-1 flex items-center justify-center min-h-[300px] text-gray-400 text-xs">
  Hãy chọn ảnh để hiển thị kết quả nhận diện.
</div>
)}

            {/* Thao tác kết quả */}
            <div className="flex gap-3 mt-6 pt-4 border-t">
              <button
                type="button"
                className="flex-1 py-2.5 border border-purple-200 text-purple-600 rounded-xl text-xs font-medium flex items-center justify-center gap-2 hover:bg-purple-50"
              >
                <Volume2 size={16} /> Đọc kết quả
              </button>
              <button
                type="button"
                className="flex-1 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 hover:bg-purple-700 shadow-md shadow-purple-200"
              >
                <Download size={16} /> Lưu kết quả
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}