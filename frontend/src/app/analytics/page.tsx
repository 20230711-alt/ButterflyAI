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
  Calendar,
  Activity,
  Target,
  Users,
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7 ngày qua");

  // Top 5 loài nhận diện nhiều nhất
  const topSpecies = [
    { rank: 1, name: "Monarch Butterfly", count: 856, progress: 85 },
    { rank: 2, name: "Painted Lady", count: 621, progress: 65 },
    { rank: 3, name: "Queen Butterfly", count: 412, progress: 45 },
    { rank: 4, name: "Viceroy Butterfly", count: 308, progress: 35 },
    { rank: 5, name: "Tiger Butterfly", count: 255, progress: 28 },
  ];

  // Lịch sử nhận diện gần đây
  const recentHistory = [
    {
      time: "10:20 12/05/2024",
      image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=200&auto=format&fit=crop",
      name: "Monarch Butterfly",
      scientific: "Danaus plexippus",
      confidence: "98.6%",
      location: "Vườn quốc gia Cúc Phương",
    },
    {
      time: "10:15 12/05/2024",
      image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=200&auto=format&fit=crop",
      name: "Painted Lady",
      scientific: "Vanessa cardui",
      confidence: "96.3%",
      location: "Đà Lạt, Lâm Đồng",
    },
    {
      time: "10:12 12/05/2024",
      image: "https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?q=80&w=200&auto=format&fit=crop",
      name: "Queen Butterfly",
      scientific: "Danaus gilippus",
      confidence: "94.5%",
      location: "Cần Thơ",
    },
    {
      time: "09:55 12/05/2024",
      image: "https://images.unsplash.com/photo-1563281577-a7be47e20db9?q=80&w=200&auto=format&fit=crop",
      name: "Viceroy Butterfly",
      scientific: "Limenitis archippus",
      confidence: "91.2%",
      location: "Hà Nội",
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
              <path d="M48 48 C30 10, 5 20, 12 48 C2 68, 28 88, 48 58 Z" fill="url(#ana-bf-left)" />
              <path d="M52 48 C70 10, 95 20, 88 48 C98 68, 72 88, 52 58 Z" fill="url(#ana-bf-right)" />
              <path d="M50 32 L50 62" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 34 Q 45 24 40 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <path d="M50 34 Q 55 24 60 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <defs>
                <linearGradient id="ana-bf-left" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
                <linearGradient id="ana-bf-right" x1="0%" y1="0%" x2="100%" y2="100%">
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

            <Link
              href="/species-info"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <Info size={18} />
              Thông tin loài bướm
            </Link>

            {/* Active Item: Thống kê */}
            <Link
              href="/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40"
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
        {/* Top Header Navigation */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 mb-2 transition-colors font-medium"
            >
              <ArrowLeft size={14} />
              Quay lại
            </Link>
            <h1 className="text-xl font-bold text-gray-900">
              Thống kê nhận diện loài bướm
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Theo dõi hiệu suất nhận diện và dữ liệu các loài bướm
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Combo Chọn Thời Gian */}
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl pl-9 pr-8 py-2 text-xs font-medium text-gray-700 outline-none cursor-pointer shadow-sm"
              >
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
                <option>Tháng này</option>
              </select>
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Nút Xuất báo cáo */}
            <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-medium transition-colors shadow-sm">
              <Download size={14} />
              <span>Xuất báo cáo</span>
            </button>

            <button className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
              <Moon size={16} />
            </button>

            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <User size={16} />
              </div>
              <span className="text-xs font-medium text-gray-700">Admin</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* ================= 1. BỐN CARD CHỈ SỐ KPI CHÍNH ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1: Tổng lượt nhận diện */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-200">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Tổng lượt nhận diện</p>
              <h3 className="text-2xl font-extrabold text-gray-900">2,548</h3>
              <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
                ↑ 15% so với tuần trước
              </p>
            </div>
          </div>

          {/* Card 2: Loài đã nhận diện */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-100">
              <svg width="22" height="22" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 50 C40 20, 10 25, 20 50 C5 65, 30 90, 50 60 C70 90, 95 65, 80 50 C90 25, 60 20, 50 50 Z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Loài đã nhận diện</p>
              <h3 className="text-2xl font-extrabold text-gray-900">128</h3>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">/150 loài</p>
            </div>
          </div>

          {/* Card 3: Độ chính xác AI */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-100">
              <Target size={22} />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Độ chính xác AI</p>
              <h3 className="text-2xl font-extrabold text-gray-900">96.4%</h3>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Trung bình</p>
            </div>
          </div>

          {/* Card 4: Người dùng */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-200">
              <Users size={22} />
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Người dùng</p>
              <h3 className="text-2xl font-extrabold text-gray-900">382</h3>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Đang hoạt động</p>
            </div>
          </div>
        </div>

        {/* ================= 2. HÀNG BIỂU ĐỒ LỚN (ĐƯỜNG & DONUT) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Biểu đồ 1: Số lượt nhận diện theo thời gian */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-800">
                Số lượt nhận diện theo thời gian
              </h3>
              <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 outline-none">
                <option>Lượt</option>
              </select>
            </div>

            {/* SVG Area / Line Chart */}
            <div className="w-full h-56 relative">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Lưới đường ngang */}
                <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeDasharray="4" />
                <line x1="0" y1="60" x2="500" y2="60" stroke="#f1f5f9" strokeDasharray="4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeDasharray="4" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeDasharray="4" />
                <line x1="0" y1="180" x2="500" y2="180" stroke="#f1f5f9" strokeDasharray="4" />

                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Vùng mờ bên dưới đường */}
                <path
                  d="M 10 160 Q 80 130 160 90 T 310 70 T 420 30 L 490 15 L 490 180 L 10 180 Z"
                  fill="url(#chartGradient)"
                />

                {/* Đường biểu đồ tím */}
                <path
                  d="M 10 160 Q 80 130 160 90 T 310 70 T 420 30 L 490 15"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Các chấm tròn trên đường */}
                <circle cx="10" cy="160" r="4" fill="#7c3aed" />
                <circle cx="90" cy="130" r="4" fill="#7c3aed" />
                <circle cx="170" cy="90" r="4" fill="#7c3aed" />
                <circle cx="250" cy="70" r="4" fill="#7c3aed" />
                <circle cx="330" cy="75" r="4" fill="#7c3aed" />
                <circle cx="410" cy="35" r="4" fill="#7c3aed" />
                <circle cx="490" cy="15" r="4" fill="#7c3aed" />
              </svg>

              {/* Nhãn trục x */}
              <div className="flex justify-between text-[11px] text-gray-400 mt-2 px-1">
                <span>T2</span>
                <span>T3</span>
                <span>T4</span>
                <span>T5</span>
                <span>T6</span>
                <span>T7</span>
                <span>CN</span>
              </div>
            </div>
          </div>

          {/* Biểu đồ 2: Tỷ lệ các loài được nhận diện (Donut Chart) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-bold text-gray-800 mb-2">
              Tỷ lệ các loài được nhận diện
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-auto">
              {/* Donut SVG */}
              <div className="relative w-40 h-40 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  {/* Monarch 35% */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#7c3aed" strokeWidth="4.5" strokeDasharray="35 65" strokeDashoffset="0" />
                  {/* Painted 22% */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray="22 78" strokeDashoffset="-35" />
                  {/* Tiger 18% */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4.5" strokeDasharray="18 82" strokeDashoffset="-57" />
                  {/* Queen 15% */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray="15 85" strokeDashoffset="-75" />
                  {/* Khác 10% */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#cbd5e1" strokeWidth="4.5" strokeDasharray="10 90" strokeDashoffset="-90" />
                </svg>
              </div>

              {/* Chú thích Donut Chart */}
              <div className="space-y-2 text-xs text-gray-600 w-full">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    Monarch Butterfly
                  </span>
                  <span className="font-bold text-gray-800">35%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    Painted Lady
                  </span>
                  <span className="font-bold text-gray-800">22%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Tiger Butterfly
                  </span>
                  <span className="font-bold text-gray-800">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Queen Butterfly
                  </span>
                  <span className="font-bold text-gray-800">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    Khác
                  </span>
                  <span className="font-bold text-gray-800">10%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= 3. HÀNG 4 CỘT THỐNG KÊ CHI TIẾT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          {/* Cột 1: Top 5 loài nhận diện nhiều nhất */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <h3 className="text-xs font-bold text-gray-800 mb-3">
              Top 5 loài nhận diện nhiều nhất
            </h3>

            <div className="space-y-2.5">
              {topSpecies.map((sp) => (
                <div key={sp.rank} className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {sp.rank}
                    </span>
                    <span className="text-gray-700 font-medium truncate">
                      {sp.name}
                    </span>
                  </div>
                  <span className="font-bold text-gray-800 shrink-0">{sp.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cột 2: Nhận diện theo khu vực (Bar Chart) */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-bold text-gray-800 mb-3">
              Nhận diện theo khu vực
            </h3>

            <div className="flex items-end justify-around h-36 border-b border-gray-100 pb-2">
              {/* Miền Bắc */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-gray-600">620</span>
                <div className="w-8 bg-purple-600 rounded-t-lg h-20" />
                <span className="text-[10px] text-gray-500 mt-1">Miền Bắc</span>
              </div>
              {/* Miền Trung */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-gray-600">410</span>
                <div className="w-8 bg-blue-500 rounded-t-lg h-14" />
                <span className="text-[10px] text-gray-500 mt-1">Miền Trung</span>
              </div>
              {/* Miền Nam */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-gray-600">1,518</span>
                <div className="w-8 bg-emerald-500 rounded-t-lg h-28" />
                <span className="text-[10px] text-gray-500 mt-1">Miền Nam</span>
              </div>
            </div>
          </div>

          {/* Cột 3: Hiệu suất mô hình AI */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-bold text-gray-800 mb-3">
              Hiệu suất mô hình AI
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 font-medium">Accuracy</span>
                  <span className="font-bold text-gray-800">96.4%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full w-[96.4%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 font-medium">Precision</span>
                  <span className="font-bold text-gray-800">95.8%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full w-[95.8%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 font-medium">Recall</span>
                  <span className="font-bold text-gray-800">94.9%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full w-[94.9%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 font-medium">F1 Score</span>
                  <span className="font-bold text-gray-800">95.3%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full w-[95.3%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Cột 4: Phân bổ kết quả nhận diện */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-bold text-gray-800 mb-2">
              Phân bổ kết quả nhận diện
            </h3>

            <div className="flex items-center gap-3 my-auto">
              {/* Circle Gauge Chart */}
              <div className="relative w-24 h-24 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6 94" strokeDashoffset="-94" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="94 6" strokeDashoffset="0" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-gray-800">
                  94%
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] text-gray-600">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Thành công
                  </span>
                  <span className="font-bold text-gray-800">94%</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Không chắc chắn
                  </span>
                  <span className="font-bold text-gray-800">4%</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Thất bại
                  </span>
                  <span className="font-bold text-gray-800">2%</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= 4. HÀNG DƯỚI CÙNG: BẢN ĐỒ NHIỆT & BẢNG LỊCH SỬ GẦN ĐÂY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Phân bố dữ liệu nhận diện theo khu vực (Bản đồ nhiệt) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              Phân bố dữ liệu nhận diện theo khu vực (Bản đồ nhiệt)
            </h3>

            <div className="flex items-center gap-4">
              {/* Minh họa Bản đồ nhiệt Heatmap */}
              <div className="relative flex-1 h-44 rounded-xl overflow-hidden bg-[#e0f2fe] border border-blue-100">
                <svg viewBox="0 0 200 300" className="w-full h-full object-contain">
                  {/* Dải đất hình S đại diện Việt Nam */}
                  <path
                    d="M 60 20 Q 90 40 80 80 T 110 160 T 120 250 Q 80 270 60 250 Z"
                    fill="#bae6fd"
                  />
                  {/* Điểm nhiệt Miền Bắc (Đỏ/Cam) */}
                  <circle cx="75" cy="50" r="18" fill="#ef4444" opacity="0.6" />
                  <circle cx="75" cy="50" r="10" fill="#f97316" opacity="0.8" />

                  {/* Điểm nhiệt Miền Trung */}
                  <circle cx="100" cy="140" r="14" fill="#3b82f6" opacity="0.6" />

                  {/* Điểm nhiệt Miền Nam */}
                  <circle cx="105" cy="230" r="22" fill="#ef4444" opacity="0.7" />
                  <circle cx="105" cy="230" r="12" fill="#facc15" opacity="0.9" />
                </svg>
              </div>

              {/* Thông số bên phải bản đồ */}
              <div className="space-y-3 text-xs w-36">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-600 font-medium">Miền Bắc</span>
                  <span className="font-bold text-gray-800">620 lượt</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-600 font-medium">Miền Trung</span>
                  <span className="font-bold text-gray-800">410 lượt</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Miền Nam</span>
                  <span className="font-bold text-gray-800">1,518 lượt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lịch sử nhận diện gần đây */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              Lịch sử nhận diện gần đây
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] text-gray-400 font-medium">
                    <th className="pb-2">Thời gian</th>
                    <th className="pb-2">Hình ảnh</th>
                    <th className="pb-2">Loài bướm</th>
                    <th className="pb-2">Độ tin cậy</th>
                    <th className="pb-2">Địa điểm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentHistory.map((row, idx) => (
                    <tr key={idx} className="hover:bg-purple-50/20 transition-colors">
                      <td className="py-2 text-[11px] text-gray-500">{row.time}</td>
                      <td className="py-2">
                        <img
                          src={row.image}
                          alt="thumb"
                          className="w-10 h-8 rounded-md object-cover border border-gray-100"
                        />
                      </td>
                      <td className="py-2">
                        <div className="font-bold text-gray-800">{row.name}</div>
                        <div className="text-[10px] text-gray-400 italic">{row.scientific}</div>
                      </td>
                      <td className="py-2 font-bold text-emerald-600">{row.confidence}</td>
                      <td className="py-2 text-gray-600 text-[11px]">{row.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer Bản quyền */}
        <div className="text-center text-[11px] text-gray-400 pt-4 border-t border-gray-100">
          © 2024 Nhận diện loài bướm. Tất cả quyền được bảo lưu.
        </div>
      </main>
    </div>
  );
}