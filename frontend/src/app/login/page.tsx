"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/";
      } else {
        setError(data.detail || "Tên đăng nhập hoặc mật khẩu không chính xác!");
      }
    } catch (err) {
      setError("Không thể kết nối tới Server Backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0d0720] overflow-hidden select-none font-sans px-4">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Con bướm trang trí trái */}
      <div className="absolute left-[12%] top-[28%] opacity-30 pointer-events-none -rotate-12 hidden md:block">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="#a855f7">
          <path d="M50 50 C40 20, 10 25, 20 50 C5 65, 30 90, 50 60 C70 90, 95 65, 80 50 C90 25, 60 20, 50 50 Z" />
        </svg>
      </div>

      {/* Con bướm trang trí phải */}
      <div className="absolute right-[15%] top-[28%] opacity-30 pointer-events-none rotate-12 hidden md:block">
        <svg width="55" height="55" viewBox="0 0 100 100" fill="#a855f7">
          <path d="M50 50 C40 20, 10 25, 20 50 C5 65, 30 90, 50 60 C70 90, 95 65, 80 50 C90 25, 60 20, 50 50 Z" />
        </svg>
      </div>

      {/* KHUNG FORM DẠNG GLASSMORPHISM */}
      <div className="relative z-10 w-full max-w-[400px] bg-[#140d33]/80 border border-purple-500/20 backdrop-blur-xl rounded-[28px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)] text-center">
        
        {/* Icon Bướm Trung Tâm */}
        <div className="flex justify-center mb-3">
          <svg width="70" height="70" viewBox="0 0 100 100" className="drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
            <path d="M48 48 C30 10, 5 20, 12 48 C2 68, 28 88, 48 58 Z" fill="url(#bf-left)" />
            <path d="M52 48 C70 10, 95 20, 88 48 C98 68, 72 88, 52 58 Z" fill="url(#bf-right)" />
            <path d="M50 32 L50 62" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 34 Q 45 24 40 22" stroke="#e9d5ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M50 34 Q 55 24 60 22" stroke="#e9d5ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <defs>
              <linearGradient id="bf-left" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="bf-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-xl font-bold text-white tracking-widest uppercase mb-1">
          ĐĂNG NHẬP
        </h1>
        <p className="text-xs text-purple-200/50 mb-6 font-light">
          Chào mừng bạn trở lại
        </p>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs text-left">
            ⚠️ {error}
          </div>
        )}

        {/* Form nhập liệu */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          
          {/* Input User */}
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 flex items-center pointer-events-none z-10 text-purple-300/40">
              <User size={18} />
            </div>
            <input
              type="text"
              placeholder="Tên đăng nhập hoặc email"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-[#1c1346]/80 border border-purple-500/20 focus:border-purple-400/60 rounded-xl py-3 pl-11 pr-4 text-white text-xs placeholder-purple-200/30 outline-none transition-all"
            />
          </div>

          {/* Input Password */}
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 flex items-center pointer-events-none z-10 text-purple-300/40">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-[#1c1346]/80 border border-purple-500/20 focus:border-purple-400/60 rounded-xl py-3 pl-11 pr-11 text-white text-xs placeholder-purple-200/30 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 z-10 text-purple-300/40 hover:text-purple-200 transition-colors flex items-center justify-center"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Button Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-3 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] hover:from-[#6d28d9] hover:to-[#4c1d95] text-white font-medium rounded-xl text-xs shadow-lg shadow-purple-950/50 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        {/* Phân cách */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="border-t border-purple-500/15 w-full" />
          <span className="absolute bg-[#140d33] px-3 text-[11px] text-purple-300/40">
            hoặc
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 text-[11px] text-purple-200/50">
          <Link href="/forgot-password" className="hover:text-purple-300 transition-colors">
            Quên mật khẩu?
          </Link>
          <div>
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-purple-400 font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}