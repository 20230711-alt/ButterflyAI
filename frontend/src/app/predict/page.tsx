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
  User,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

interface SimilarSpeciesItem {
  name: string;
  scientific: string;
  family: string;
  habitat: string;
  distribution: string;
  features: string;
}

interface PredictionResult {
  predicted_class: string;
  confidence: number;
  family?: string;
  habitat?: string;
  distribution?: string;
  features?: string;
  similar_species?: SimilarSpeciesItem[];
}

export default function PredictPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // Sử dụng Ref để khóa, tránh việc gọi API trùng lặp
  const isFetchingRef = useRef(false);

  // 1. Khôi phục lại cả ảnh và kết quả từ localStorage khi vào trang (KHÔNG gọi lại API)
  useEffect(() => {
    const savedImage = localStorage.getItem("latest_uploaded_image");
    const savedResult = localStorage.getItem("latest_prediction_result");

    if (savedImage) {
      setSelectedImage(savedImage);
    }
    if (savedResult) {
      try {
        setResult(JSON.parse(savedResult));
      } catch (e) {
        console.error("Lỗi đọc kết quả từ localStorage:", e);
      }
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

  // 3. Hàm gọi Backend FastAPI (Endpoint: http://localhost:8000/predict)
  const sendImageToBackend = async (base64Image: string) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    setLoading(true);
    setResult(null); 
    try {
      const imageBlob = base64ToBlob(base64Image);
      const formData = new FormData();
      formData.append("file", imageBlob, "butterfly.jpg");

      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const res = await response.json();
        const predictionData = res.data || res;

        const finalResult: PredictionResult = {
          predicted_class: predictionData.predicted_class,
          confidence: predictionData.confidence,
          family: predictionData.family,
          habitat: predictionData.habitat,
          distribution: predictionData.distribution,
          features: predictionData.features,
          similar_species: predictionData.similar_species || [],
        };

        setResult(finalResult);
        localStorage.setItem("latest_prediction_result", JSON.stringify(finalResult));
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
      isFetchingRef.current = false;
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
          setResult(null); // Xóa kết quả cũ trên màn hình chờ ảnh mới

          // Xóa và cập nhật lại localStorage cho ảnh mới
          localStorage.setItem("latest_uploaded_image", base64Str);
          localStorage.removeItem("latest_prediction_result"); 

          sendImageToBackend(base64Str);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      {/* ================= 1. SIDEBAR ================= */}
      <aside className="w-64 bg-[#1e133e] text-white flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none translate-y-10 -translate-x-10">
          <svg width="250" height="250" viewBox="0 0 200 200" fill="none">
            <path d="M10 200 C 30 140, 80 80, 150 20" stroke="#a855f7" strokeWidth="2" />
            <path d="M40 160 Q 15 140 10 125 Q 35 130 50 150 Z" fill="#9333ea" />
            <path d="M60 130 Q 80 110 95 115 Q 80 135 70 142 Z" fill="#9333ea" />
          </svg>
        </div>
        <div className="absolute right-2 bottom-20 opacity-15 pointer-events-none rotate-12">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="#a855f7">
            <path d="M50 50 C40 20, 10 25, 20 50 C5 65, 30 90, 50 60 C70 90, 95 65, 80 50 C90 25, 60 20, 50 50 Z" />
          </svg>
        </div>

        <div className="p-5 relative z-10">
          {/* Logo */}
          <div className="flex flex-col items-center text-center my-4">
            <svg
              width="50"
              height="50"
              viewBox="0 0 100 100"
              className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mb-2"
            >
              <path d="M48 48 C30 10, 5 20, 12 48 C2 68, 28 88, 48 58 Z" fill="url(#hist-bf-left)" />
              <path d="M52 48 C70 10, 95 20, 88 48 C98 68, 72 88, 52 58 Z" fill="url(#hist-bf-right)" />
              <path d="M50 32 L50 62" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 34 Q 45 24 40 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <path d="M50 34 Q 55 24 60 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <defs>
                <linearGradient id="hist-bf-left" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
                <linearGradient id="hist-bf-right" x1="0%" y1="0%" x2="100%" y2="100%">
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
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all">
              <Home size={18} /> Trang chủ
            </Link>
            <Link href="/predict" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40">
              <Scan size={18} /> Nhận diện
            </Link>
            <Link href="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all">
              <History size={18} /> Lịch sử nhận diện
            </Link>
            <Link href="/species-info" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all">
              <Info size={18} /> Thông tin loài bướm
            </Link>
            <Link href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all">
              <BarChart2 size={18} /> Thống kê
            </Link>
            <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all">
              <Settings size={18} /> Cài đặt
            </Link>
          </nav>
        </div>
      </aside>

      {/* ================= 2. MAIN CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Nhận diện loài bướm</h1>
            <p className="text-xs text-gray-500 mt-0.5">Tải ảnh con bướm lên để hệ thống nhận diện và phân loại.</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <User size={16} className="text-purple-600" />
            <span className="text-xs font-medium text-gray-700">Admin</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cột trái: Tải ảnh */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            {selectedImage ? (
              <div className="relative w-full h-80 rounded-xl overflow-hidden border border-gray-200 mb-4">
                <img src={selectedImage} alt="Uploaded butterfly" className="w-full h-full object-contain bg-gray-50" />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-xl w-full h-80 flex flex-col items-center justify-center text-gray-400 mb-4">
                <ImageIcon size={48} className="mb-2 text-purple-300" />
                <p className="text-xs">Chưa có ảnh được chọn</p>
              </div>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-medium hover:bg-purple-700 transition-colors shadow-sm"
            >
              Chọn ảnh khác
            </button>
          </div>

          {/* Cột phải: Kết quả */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4 border-b pb-2">Kết quả nhận diện</h3>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-purple-600">
                  <Loader2 size={32} className="animate-spin mb-2" />
                  <p className="text-xs">Đang phân tích và tra cứu thông tin AI...</p>
                </div>
              ) : result ? (
                <div className="space-y-4 text-xs">
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <span className="text-purple-600 font-semibold uppercase tracking-wider block mb-1">Loài bướm nhận diện:</span>
                    <h2 className="text-base font-bold text-gray-900">{result.predicted_class}</h2>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 font-medium">
                      <span className="text-gray-600">Độ tin cậy</span>
                      <span className="text-emerald-600 font-bold">{result.confidence}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${result.confidence}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-gray-400 block mb-0.5">Họ sinh học:</span>
                      <span className="font-medium text-gray-800">{result.family}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-0.5">Môi trường sống:</span>
                      <span className="font-medium text-gray-800">{result.habitat}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-gray-400 block mb-0.5">Phân bố:</span>
                    <span className="font-medium text-gray-800">{result.distribution}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-gray-400 block mb-1 font-semibold text-gray-700">Đặc điểm nổi bật:</span>
                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">{result.features}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center py-20">Hãy tải lên một ảnh để xem kết quả phân tích.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}