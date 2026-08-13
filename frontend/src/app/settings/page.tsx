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
  Bell,
  Shield,
  Database,
  Info as InfoIcon,
} from "lucide-react";

export default function SettingsPage() {
  // State quản lý các tùy chọn
  const [themeMode, setThemeMode] = useState("Sáng");
  const [language, setLanguage] = useState("Tiếng Việt");
  const [notifySuccess, setNotifySuccess] = useState(true);
  const [notifyError, setNotifyError] = useState(true);

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
              <path d="M48 48 C30 10, 5 20, 12 48 C2 68, 28 88, 48 58 Z" fill="url(#sett-bf-left)" />
              <path d="M52 48 C70 10, 95 20, 88 48 C98 68, 72 88, 52 58 Z" fill="url(#sett-bf-right)" />
              <path d="M50 32 L50 62" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M50 34 Q 45 24 40 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <path d="M50 34 Q 55 24 60 22" stroke="#e9d5ff" strokeWidth="1.5" fill="none" />
              <defs>
                <linearGradient id="sett-bf-left" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </linearGradient>
                <linearGradient id="sett-bf-right" x1="0%" y1="0%" x2="100%" y2="100%">
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

            <Link
              href="/analytics"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <BarChart2 size={18} />
              Thống kê
            </Link>

            {/* Active Item: Cài đặt */}
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40"
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
        {/* Header Trang */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Cài đặt hệ thống
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Quản lý các thiết lập của hệ thống
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
              <span className="text-xs font-medium text-gray-700">Admin</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* ================= DANH SÁCH KHỐI CÀI ĐẶT ================= */}
        <div className="space-y-4 max-w-5xl">
          
          {/* KHỐI 1: GIAO DIỆN */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Settings size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Giao diện</h3>
                <p className="text-xs text-gray-400 mt-0.5">Tùy chỉnh giao diện hiển thị</p>
              </div>
            </div>

            <div className="space-y-3.5 w-full md:w-80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Chế độ giao diện</span>
                <div className="relative w-44">
                  <select
                    value={themeMode}
                    onChange={(e) => setThemeMode(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 outline-none cursor-pointer shadow-sm pr-8"
                  >
                    <option>Sáng</option>
                    <option>Tối</option>
                    <option>Theo hệ thống</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Ngôn ngữ</span>
                <div className="relative w-44">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 outline-none cursor-pointer shadow-sm pr-8"
                  >
                    <option>Tiếng Việt</option>
                    <option>English</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* KHỐI 2: THÔNG BÁO */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Bell size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Thông báo</h3>
                <p className="text-xs text-gray-400 mt-0.5">Quản lý thông báo hệ thống</p>
              </div>
            </div>

            <div className="space-y-4 w-full md:w-80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Thông báo khi nhận diện thành công</span>
                <button
                  onClick={() => setNotifySuccess(!notifySuccess)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    notifySuccess ? "bg-purple-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      notifySuccess ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Thông báo khi có lỗi</span>
                <button
                  onClick={() => setNotifyError(!notifyError)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    notifyError ? "bg-purple-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      notifyError ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* KHỐI 3: BẢO MẬT */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Shield size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Bảo mật</h3>
                <p className="text-xs text-gray-400 mt-0.5">Quản lý bảo mật tài khoản</p>
              </div>
            </div>

            <div className="space-y-3.5 w-full md:w-80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Đổi mật khẩu</span>
                <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors shadow-sm">
                  Đổi mật khẩu
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Đăng xuất khỏi tất cả thiết bị</span>
                <button className="px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl font-medium transition-colors shadow-sm">
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>

          {/* KHỐI 4: DỮ LIỆU */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Database size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Dữ liệu</h3>
                <p className="text-xs text-gray-400 mt-0.5">Quản lý dữ liệu hệ thống</p>
              </div>
            </div>

            <div className="space-y-3.5 w-full md:w-80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Xuất dữ liệu</span>
                <button className="px-5 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors shadow-sm">
                  Xuất
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Xóa dữ liệu lịch sử</span>
                <button className="px-5 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-xl font-medium transition-colors shadow-sm">
                  Xóa
                </button>
              </div>
            </div>
          </div>

          {/* KHỐI 5: THÔNG TIN HỆ THỐNG */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <InfoIcon size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Thông tin hệ thống</h3>
                <p className="text-xs text-gray-400 mt-0.5">Thông tin phiên bản và hỗ trợ</p>
              </div>
            </div>

            <div className="space-y-3.5 w-full md:w-80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Phiên bản</span>
                <span className="text-gray-800 font-semibold pr-2">1.0.0</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Hỗ trợ</span>
                <button className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors shadow-sm">
                  Liên hệ hỗ trợ
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}