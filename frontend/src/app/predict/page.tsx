"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Scan,
  History,
  Info,
  BarChart2,
  Settings,
  LogOut,
  Moon,
  User,
  ChevronDown,
  CheckCircle2,
  Volume2,
  Download,
  Image as ImageIcon,
  InfoIcon,
} from "lucide-react";

export default function PredictPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=800&auto=format&fit=crop"
  );

  // Dữ liệu Top 5 dự đoán mẫu
  const topPredictions = [
    { name: "Monarch Butterfly", scientific: "Danaus plexippus", percentage: 94.6 },
    { name: "Plain Tiger", scientific: "Danaus chrysippus", percentage: 3.2 },
    { name: "Painted Lady", scientific: "Vanessa cardui", percentage: 1.1 },
    { name: "Queen Butterfly", scientific: "Danaus gilippus", percentage: 0.6 },
    { name: "Gulf Fritillary", scientific: "Agraulis vanillae", percentage: 0.5 },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      {/* ================= 1. SIDEBAR (THANH ĐIỀU HƯỚNG BÊN TRÁI) ================= */}
      <aside className="w-64 bg-[#1e133e] text-white flex flex-col justify-between relative overflow-hidden shrink-0">
        {/* Background Họa Tiết Lá & Bướm Mờ */}
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
          {/* Logo System */}
          <div className="flex flex-col items-center text-center my-4">
            <svg
              width="50"
              height="50"
              viewBox="0 0 100 100"
              className="drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] mb-2"
            >
              <path d="M48 48 C30 10, 5 20, 12 48 C2 68, 28 88, 48 58 Z" fill="url(#predict-bf-left)" />
              <path d="M52 48 C70 10, 95 20, 88 48 C98 68, 72 88, 52 58 Z" fill="url(#predict-bf-right)" />
              <path d="M50 32 L50 62" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 34 Q 45 24 40 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <path d="M50 34 Q 55 24 60 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <defs>
                <linearGradient id="predict-bf-left" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
                <linearGradient id="predict-bf-right" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
              </defs>
            </svg>
            <h1 className="text-xs font-bold tracking-widest text-purple-100 uppercase leading-tight">
              NHẬN DIỆN<br />LOÀI BƯỚM
            </h1>
          </div>

          {/* Nav Items */}
          <nav className="mt-8 space-y-1.5 text-xs">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <Home size={18} />
              Trang chủ
            </Link>

            {/* Active Item: Nhận diện */}
            <Link
              href="/predict"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40"
            >
              <Scan size={18} />
              Nhận diện
            </Link>

            <Link
              href="/history"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <History size={18} />
              Lịch sử nhận diện
            </Link>

            <Link
              href="/species-info"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <Info size={18} />
              Thông tin loài bướm
            </Link>

            <Link
              href="/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <BarChart2 size={18} />
              Thống kê
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <Settings size={18} />
              Cài đặt
            </Link>
          </nav>
        </div>

        {/* Footer Sidebar - Nút Đăng xuất */}
        <div className="p-5 relative z-10">
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-900/40 border border-purple-500/20 text-xs text-purple-200 hover:bg-purple-800/50 hover:text-white transition-all"
          >
            <LogOut size={16} />
            Đăng xuất
          </Link>
        </div>
      </aside>

      {/* ================= 2. MAIN CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top Bar Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Nhận diện loài bướm
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Tải ảnh con bướm lên để hệ thống nhận diện và phân loại.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <Moon size={16} />
            </button>
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <User size={16} />
              </div>
              <span className="text-xs font-medium text-gray-700">
                Admin
              </span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* ================= GRID 2 CỘT CHÍNH ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* CỘT TRÁI: 1. TẢI CẢNH BƯỚM LÊN */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-sm font-bold text-gray-800">
                Tải ảnh bướm lên
              </h3>
            </div>

            {/* Khung chứa ảnh preview */}
            <div className="border-2 border-dashed border-purple-200 bg-[#faf8ff] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <div className="w-full h-64 rounded-xl overflow-hidden mb-4 shadow-sm">
                <img
                  src={previewUrl}
                  alt="Butterfly Predict"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="cursor-pointer border border-purple-300 hover:border-purple-500 bg-white hover:bg-purple-50 text-purple-700 text-xs font-medium px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-sm">
                <ImageIcon size={15} />
                <span>Chọn ảnh khác</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <p className="text-[10px] text-gray-400 mt-3">
                Hỗ trợ định dạng: JPG, JPEG, PNG (Tối đa 10MB)
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: 2. KẾT QUẢ NHẬN DIỆN */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-gray-800">
                  Kết quả nhận diện
                </h3>
              </div>

              {/* Khung kết quả chính màu xanh */}
              <div className="bg-[#f2fbf5] border border-green-200/80 rounded-2xl p-4 mb-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm">
                  <CheckCircle2 size={26} />
                </div>
                <div>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    Loài bướm được nhận diện
                  </p>
                  <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                    Monarch Butterfly
                  </h2>
                  <p className="text-xs text-emerald-700 italic font-medium">
                    Danaus plexippus
                  </p>
                </div>
              </div>

              {/* Thanh độ tin cậy */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium text-gray-600">Độ tin cậy</span>
                  <span className="text-xl font-extrabold text-emerald-600">94.6%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[94.6%]" />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">Rất cao</span>
              </div>

              {/* Thông tin chi tiết */}
              <div className="space-y-2 text-xs border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-800 mb-2">Thông tin chi tiết</h4>
                
                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-gray-500 flex items-center gap-1">
                    🦋 Họ
                  </span>
                  <span className="col-span-8 font-medium text-gray-800">Nymphalidae</span>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-gray-500 flex items-center gap-1">
                    📍 Môi trường sống
                  </span>
                  <span className="col-span-8 font-medium text-gray-800">Vườn hoa, đồng cỏ, rừng thưa</span>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-gray-500 flex items-center gap-1">
                    📍 Phân bố
                  </span>
                  <span className="col-span-8 font-medium text-gray-800">Bắc Mỹ, Nam Mỹ, Châu Á, Châu Úc</span>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <span className="col-span-4 text-gray-500 flex items-center gap-1">
                    ✨ Đặc điểm nổi bật
                  </span>
                  <span className="col-span-8 font-medium text-gray-800 leading-relaxed">
                    Bướm vua có màu cam đặc trưng với các đường gân đen và chấm trắng trên viền cánh.
                  </span>
                </div>
              </div>
            </div>

            {/* Hai nút thao tác ở đáy cột phải */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="py-2.5 border border-purple-300 text-purple-700 hover:bg-purple-50 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all">
                <Volume2 size={16} />
                <span>Đọc kết quả</span>
              </button>
              <button className="py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-200">
                <Download size={16} />
                <span>Lưu kết quả</span>
              </button>
            </div>
          </div>

        </div>

        {/* ================= HÀNG DƯỚI: TOP 5 DỰ ĐOÁN & LƯU Ý ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top 5 dự đoán */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Top 5 dự đoán</h3>
            
            <div className="space-y-3.5">
              {topPredictions.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                  <div className="w-1/2 flex items-center gap-1.5 truncate">
                    <span className="text-gray-700 font-medium truncate">
                      {idx + 1}. {item.name}
                    </span>
                    <span className="text-gray-400 italic text-[11px] truncate">
                      ({item.scientific})
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  <span className="w-12 text-right font-semibold text-gray-700">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Khối Lưu ý */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Lưu ý</h3>
            
            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 flex gap-3 text-xs text-blue-900 leading-relaxed flex-1">
              <InfoIcon size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p>
                Kết quả nhận diện chỉ mang tính tham khảo. Độ chính xác phụ thuộc vào chất lượng ảnh và góc chụp.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}