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
  Calendar,
  Search,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("Tất cả loài");

  // Dữ liệu mẫu danh sách lịch sử nhận diện
  const historyData = [
    {
      id: "01",
      name: "Monarch Butterfly",
      scientific: "Danaus plexippus",
      confidence: 94.6,
      time: "12/05/2024",
      subTime: "10:23:45",
      image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "02",
      name: "Swallowtail Butterfly",
      scientific: "Papilio machaon",
      confidence: 92.1,
      time: "12/05/2024",
      subTime: "09:58:12",
      image: "https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "03",
      name: "Painted Lady",
      scientific: "Vanessa cardui",
      confidence: 88.7,
      time: "11/05/2024",
      subTime: "16:31:07",
      image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "04",
      name: "Peacock Butterfly",
      scientific: "Aglais io",
      confidence: 91.3,
      time: "11/05/2024",
      subTime: "14:22:33",
      image: "https://images.unsplash.com/photo-1563281577-a7be47e20db9?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "05",
      name: "Common Blue",
      scientific: "Polyommatus icarus",
      confidence: 89.5,
      time: "10/05/2024",
      subTime: "11:05:21",
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "06",
      name: "Plain Tiger",
      scientific: "Danaus chrysippus",
      confidence: 90.2,
      time: "09/05/2024",
      subTime: "18:45:09",
      image: "https://images.unsplash.com/photo-1500320821405-8fc1732359ee?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: "07",
      name: "Great Eggfly",
      scientific: "Hypolimnas bolina",
      confidence: 85.4,
      time: "08/05/2024",
      subTime: "15:17:48",
      image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?q=80&w=400&auto=format&fit=crop",
    },
  ];

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

            {/* Active Item: Lịch sử nhận diện */}
            <Link
              href="/history"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40"
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
        {/* Top Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Lịch sử nhận diện
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Danh sách các lần nhận diện bướm của bạn.
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

        {/* ================= BỘ LỌC VÀ TÌM KIẾM ================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Chọn Khoảng Thời Gian */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 shadow-sm">
              <span>01/05/2024</span>
              <span className="text-gray-300">→</span>
              <span>12/05/2024</span>
              <Calendar size={14} className="text-gray-400 ml-2 cursor-pointer" />
            </div>

            {/* Select Loại Bướm */}
            <div className="relative">
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-8 text-xs text-gray-700 font-medium outline-none cursor-pointer shadow-sm"
              >
                <option>Tất cả loài</option>
                <option>Monarch Butterfly</option>
                <option>Swallowtail Butterfly</option>
                <option>Painted Lady</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Ô Tìm Kiếm */}
            <div className="relative w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-700 outline-none placeholder-gray-400 shadow-sm"
              />
            </div>
          </div>

          {/* Nút Xóa Tất Cả */}
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white hover:bg-red-50 hover:border-red-200 text-gray-600 hover:text-red-600 rounded-xl text-xs font-medium transition-colors shadow-sm">
            <Trash2 size={14} />
            <span>Xóa tất cả</span>
          </button>
        </div>

        {/* ================= BẢNG DỮ LIỆU LỊCH SỬ ================= */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4 w-28">Ảnh bướm</th>
                  <th className="py-3.5 px-4">Kết quả nhận diện</th>
                  <th className="py-3.5 px-4 w-56">Độ tin cậy</th>
                  <th className="py-3.5 px-4 w-36">Thời gian</th>
                  <th className="py-3.5 px-4 w-28 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {historyData.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/30 transition-colors">
                    {/* ID */}
                    <td className="py-3 px-4 text-center font-medium text-gray-500">
                      {item.id}
                    </td>

                    {/* Ảnh Bướm */}
                    <td className="py-3 px-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Kết quả nhận diện */}
                    <td className="py-3 px-4">
                      <h4 className="font-bold text-gray-800">{item.name}</h4>
                      <p className="text-[11px] text-gray-400 italic mt-0.5">
                        {item.scientific}
                      </p>
                    </td>

                    {/* Độ tin cậy */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-emerald-600 w-11">
                          {item.confidence}%
                        </span>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-600 rounded-full"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Thời gian */}
                    <td className="py-3 px-4 text-gray-600">
                      <div className="font-medium">{item.time}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{item.subTime}</div>
                    </td>

                    {/* Thao tác */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-purple-600 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= PHÂN TRANG (PAGINATION) ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
          <span>Hiển thị 1 - 7 trong 23 kết quả</span>

          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-purple-600 text-white font-medium flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors">
              3
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors">
              4
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-7 text-xs text-gray-600 outline-none cursor-pointer shadow-sm">
              <option>7 / trang</option>
              <option>10 / trang</option>
              <option>20 / trang</option>
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </main>
    </div>
  );
}