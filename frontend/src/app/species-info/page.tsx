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
  ArrowLeft,
  Download,
  CheckCircle2,
  BookOpen,
  Check,
  ChevronRight,
} from "lucide-react";

export default function SpeciesDetailPage() {
  // Ảnh lớn chính
  const [activeImage, setActiveImage] = useState(
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=800&auto=format&fit=crop"
  );

  // Danh sách 5 thumbnail
  const galleryThumbnails = [
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500320821405-8fc1732359ee?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563281577-a7be47e20db9?q=80&w=300&auto=format&fit=crop",
  ];

  // Các loài tương tự
  const similarSpecies = [
    {
      name: "Plain Tiger",
      scientific: "Danaus chrysippus",
      image: "https://images.unsplash.com/photo-1500320821405-8fc1732359ee?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Painted Lady",
      scientific: "Vanessa cardui",
      image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Queen Butterfly",
      scientific: "Danaus gilippus",
      image: "https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "Viceroy Butterfly",
      scientific: "Limenitis archippus",
      image: "https://images.unsplash.com/photo-1563281577-a7be47e20db9?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans">
      {/* ================= 1. SIDEBAR (THANH ĐIỀU HƯỚNG BÊN TRÁI) ================= */}
      <aside className="w-64 bg-[#1e133e] text-white flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none translate-y-10 -translate-x-10">
          <svg width="250" height="250" viewBox="0 0 200 200" fill="none">
            <path d="M10 200 C 30 140, 80 80, 150 20" stroke="#a855f7" strokeWidth="2" />
            <path d="M40 160 Q 15 140 10 125 Q 35 130 50 150 Z" fill="#9333ea" />
            <path d="M60 130 Q 80 110 95 115 Q 80 135 70 142 Z" fill="#9333ea" />
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
              <path d="M48 48 C30 10, 5 20, 12 48 C2 68, 28 88, 48 58 Z" fill="url(#spec-bf-left)" />
              <path d="M52 48 C70 10, 95 20, 88 48 C98 68, 72 88, 52 58 Z" fill="url(#spec-bf-right)" />
              <path d="M50 32 L50 62" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 34 Q 45 24 40 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <path d="M50 34 Q 55 24 60 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <defs>
                <linearGradient id="spec-bf-left" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
                <linearGradient id="spec-bf-right" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
              </defs>
            </svg>
            <h1 className="text-xs font-bold tracking-widest text-purple-100 uppercase leading-tight">
              NHẬN DIỆN<br />LOÀI BƯỚM
            </h1>
          </div>

          {/* Navigation */}
          <nav className="mt-8 space-y-1.5 text-xs">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <Home size={18} />
              Trang chủ
            </Link>

            <Link
              href="/predict"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
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

            {/* Active Item: Thông tin loài bướm */}
            <Link
              href="/species-info"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40"
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

        {/* Logout */}
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
        {/* Top Navigation & User Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <Link
              href="/predict"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 mb-2 transition-colors font-medium"
            >
              <ArrowLeft size={14} />
              Quay lại
            </Link>
            <h1 className="text-xl font-bold text-gray-900">
              Thông tin chi tiết loài bướm
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <Moon size={16} />
            </button>

            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <User size={16} />
              </div>
              <span className="text-xs font-medium text-gray-700">Admin</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>

            <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium transition-colors shadow-sm">
              <Download size={14} />
              <span>Tải kết quả</span>
            </button>
          </div>
        </div>

        {/* ================= KHỐI THÔNG TIN CHÍNH TỔNG QUAN ================= */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Ảnh chính + Thumbnails */}
            <div className="lg:col-span-5">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-sm">
                <img
                  src={activeImage}
                  alt="Monarch Butterfly Detail"
                  className="w-full h-full object-cover"
                />
                {/* Badge phần trăm độ tin cậy */}
                <div className="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                  94.6%
                </div>
              </div>

              {/* 5 Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {galleryThumbnails.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img
                        ? "border-purple-600 ring-2 ring-purple-100"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bảng thuộc tính sinh học */}
            <div className="lg:col-span-4 flex flex-col justify-between border-r border-gray-100 pr-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  Monarch Butterfly
                </h2>
                <p className="text-xs text-purple-600 font-medium italic mb-3">
                  Danaus plexippus
                </p>

                {/* Badge Khớp kết quả */}
                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-[11px] font-medium mb-4">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Khớp với kết quả nhận diện</span>
                </div>

                {/* Danh sách thuộc tính */}
                <div className="space-y-2.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      🦋 Họ
                    </span>
                    <span className="text-gray-800">Nymphalidae</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      📍 Môi trường sống
                    </span>
                    <span className="text-gray-800">Vườn hoa, đồng cỏ, rừng thưa</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      📍 Phân bố
                    </span>
                    <span className="text-gray-800">Bắc Mỹ, Nam Mỹ, Châu Á, Châu Úc</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      🕒 Tuổi thọ
                    </span>
                    <span className="text-gray-800">2 – 6 tuần (trưởng thành)</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      📏 Kích thước
                    </span>
                    <span className="text-gray-800">Sải cánh 9 – 10 cm</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      🎨 Màu sắc
                    </span>
                    <span className="text-gray-800">Cam, đen, trắng</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      🛡️ Trạng thái bảo tồn (IUCN)
                    </span>
                    <span className="text-gray-800">Ít quan tâm (Least Concern)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Giới thiệu & Đặc điểm nổi bật bên phải */}
            <div className="lg:col-span-3 flex flex-col justify-between bg-purple-50/40 p-4 rounded-2xl border border-purple-100/50">
              <div>
                <h3 className="text-xs font-bold text-gray-800 mb-2">Giới thiệu</h3>
                <p className="text-[11px] text-gray-600 leading-relaxed mb-4">
                  Monarch Butterfly là một trong những loài bướm nổi tiếng nhất với màu cam và đen đặc trưng. Chúng thực hiện một trong những cuộc di cư dài nhất trong thế giới côn trùng, di chuyển hàng ngàn kilômét giữa các mùa.
                </p>

                <h3 className="text-xs font-bold text-gray-800 mb-2">Đặc điểm nổi bật</h3>
                <ul className="space-y-1.5 text-[11px] text-gray-600">
                  <li className="flex items-start gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} />
                    </div>
                    <span>Màu cam và đen nổi bật, dễ nhận biết</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} />
                    </div>
                    <span>Thường hút mật từ các loài hoa</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} />
                    </div>
                    <span>Ấu trùng ăn lá cây sữa (Milkweed)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} />
                    </div>
                    <span>Di cư hàng năm với quãng đường dài</span>
                  </li>
                </ul>
              </div>

              <button className="w-full mt-4 py-2 border border-purple-300 bg-white hover:bg-purple-50 text-purple-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                <BookOpen size={14} />
                <span>Xem thêm tài liệu</span>
              </button>
            </div>

          </div>
        </div>

        {/* ================= 3 THẺ CHUYÊN SÂU: NHẬN DẠNG, MÔI TRƯỜNG, PHÂN BỐ ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* 1. Đặc điểm nhận dạng */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Đặc điểm nhận dạng</h3>
              <ul className="space-y-1.5 text-xs text-gray-600 leading-relaxed mb-4 list-disc pl-4">
                <li>Cánh màu cam với viền đen và các đốm trắng.</li>
                <li>Đường gân cánh màu đen nổi rõ.</li>
                <li>Cánh trước dài và hẹp, cánh sau tròn hơn.</li>
                <li>Mặt dưới cánh nhạt màu hơn với đường gân rõ rệt.</li>
              </ul>
            </div>

            {/* Sơ đồ hình thể con bướm & Chú thích */}
            <div className="relative bg-[#faf8ff] rounded-xl p-3 border border-purple-100/60 flex items-center justify-center min-h-[140px]">
              <div className="relative w-44 h-28">
                <img
                  src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=300&auto=format&fit=crop"
                  alt="Diagram Butterfly"
                  className="w-full h-full object-contain"
                />
                {/* Pointer 1 */}
                <div className="absolute top-2 left-0 text-[9px] bg-white/90 backdrop-blur-sm border border-purple-200 rounded px-1 text-gray-700 shadow-sm">
                  Viền đen đốm trắng
                </div>
                {/* Pointer 2 */}
                <div className="absolute top-2 right-0 text-[9px] bg-white/90 backdrop-blur-sm border border-purple-200 rounded px-1 text-gray-700 shadow-sm">
                  Đường gân đen
                </div>
                {/* Pointer 3 */}
                <div className="absolute bottom-2 right-1 text-[9px] bg-white/90 backdrop-blur-sm border border-purple-200 rounded px-1 text-gray-700 shadow-sm">
                  Cánh sau tròn hơn
                </div>
              </div>
            </div>
          </div>

          {/* 2. Môi trường sống */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">Môi trường sống</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Thường xuất hiện ở các khu vườn, đồng cỏ, vùng hoa dại và rừng thưa. Chúng thích những khu vực có nhiều ánh nắng và nguồn hoa dồi dào.
              </p>
            </div>

            <div className="h-36 rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop"
                alt="Habitat Nature"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 3. Phân bố địa lý */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">Phân bố địa lý</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Phân bố rộng rãi ở Bắc Mỹ, Nam Mỹ, một phần Châu Á, Châu Úc và các đảo Thái Bình Dương.
              </p>
            </div>

            {/* Bản đồ phân bố */}
            <div className="h-36 rounded-xl overflow-hidden bg-[#f4f3fc] p-2 flex items-center justify-center border border-purple-100/50">
              <svg viewBox="0 0 800 400" className="w-full h-full opacity-80">
                {/* Lục địa cơ bản mờ */}
                <path d="M150,120 Q180,100 220,130 T250,220 T180,280 Z" fill="#d8d4f2" />
                <path d="M220,230 Q260,250 250,340 T210,380 Z" fill="#7e22ce" />
                <path d="M450,110 Q520,90 580,140 T500,240 Z" fill="#d8d4f2" />
                <path d="M600,100 Q720,80 750,180 T680,260 Z" fill="#7e22ce" />
                <path d="M650,280 Q720,270 730,340 T660,350 Z" fill="#7e22ce" />
                {/* Highlight Tím loài phân bố */}
                <circle cx="200" cy="180" r="25" fill="#a855f7" opacity="0.6" />
                <circle cx="230" cy="300" r="20" fill="#a855f7" opacity="0.6" />
                <circle cx="680" cy="160" r="18" fill="#a855f7" opacity="0.6" />
                <circle cx="690" cy="310" r="15" fill="#a855f7" opacity="0.6" />
              </svg>
            </div>
          </div>

        </div>

        {/* ================= 4. CÁC LOÀI TƯƠNG TỰ ================= */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Các loài tương tự</h3>
          </div>

          <div className="relative flex items-center gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {similarSpecies.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 italic truncate mb-2">
                      {item.scientific}
                    </p>
                    <button className="text-[10px] font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2.5 py-1 rounded-lg transition-colors">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Nút Next Slider */}
            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 shrink-0">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}