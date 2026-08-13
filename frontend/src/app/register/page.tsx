"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setError("Vui lòng điền đầy đủ các trường thông tin!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp!");
      return;
    }

    if (!agreed) {
      setError("Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/login";
      } else {
        setError(data.detail || "Đăng ký thất bại, vui lòng thử lại!");
      }
    } catch (err) {
      setError("Không thể kết nối tới Server Backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0d0720] overflow-hidden select-none font-sans px-4 py-8">
      
      {/* ================= BACKGROUND DECORATIONS (HOA VĂN & BƯỚM) ================= */}
      
      {/* Vệt sáng phát quang mờ phía sau */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-900/20 rounded-full blur-[130px] pointer-events-none" />

      {/* Cành lá góc dưới bên trái */}
      <div className="absolute left-0 bottom-0 opacity-20 pointer-events-none translate-y-10 -translate-x-10 hidden sm:block">
        <svg width="320" height="320" viewBox="0 0 200 200" fill="none">
          <path d="M10 200 C 30 140, 80 80, 150 20" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"/>
          <path d="M40 160 Q 15 140 10 125 Q 35 130 50 150 Z" fill="#9333ea" />
          <path d="M60 130 Q 80 110 95 115 Q 80 135 70 142 Z" fill="#9333ea" />
          <path d="M85 95 Q 60 80 55 65 Q 80 70 95 90 Z" fill="#9333ea" />
          <path d="M115 60 Q 135 40 150 48 Q 135 68 125 70 Z" fill="#9333ea" />
        </svg>
      </div>

      {/* Cành lá góc dưới bên phải */}
      <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none translate-y-10 translate-x-10 scale-x-[-1] hidden sm:block">
        <svg width="320" height="320" viewBox="0 0 200 200" fill="none">
          <path d="M10 200 C 30 140, 80 80, 150 20" stroke="#a855f7" strokeWidth="2" strokeLinecap="round"/>
          <path d="M40 160 Q 15 140 10 125 Q 35 130 50 150 Z" fill="#9333ea" />
          <path d="M60 130 Q 80 110 95 115 Q 80 135 70 142 Z" fill="#9333ea" />
          <path d="M85 95 Q 60 80 55 65 Q 80 70 95 90 Z" fill="#9333ea" />
          <path d="M115 60 Q 135 40 150 48 Q 135 68 125 70 Z" fill="#9333ea" />
        </svg>
      </div>

      {/* Bướm trang trí trái */}
      <div className="absolute left-[10%] top-[25%] opacity-30 pointer-events-none -rotate-12 hidden md:block">
        <svg width="70" height="70" viewBox="0 0 100 100" fill="#a855f7">
          <path d="M50 50 C40 20, 10 25, 20 50 C5 65, 30 90, 50 60 C70 90, 95 65, 80 50 C90 25, 60 20, 50 50 Z" />
        </svg>
      </div>
      <div className="absolute left-[18%] top-[48%] opacity-25 pointer-events-none rotate-45 hidden md:block">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="#c084fc">
          <path d="M50 50 C40 20, 10 25, 20 50 C5 65, 30 90, 50 60 C70 90, 95 65, 80 50 C90 25, 60 20, 50 50 Z" />
        </svg>
      </div>

      {/* Bướm trang trí phải */}
      <div className="absolute right-[12%] top-[28%] opacity-30 pointer-events-none rotate-12 hidden md:block">
        <svg width="65" height="65" viewBox="0 0 100 100" fill="#a855f7">
          <path d="M50 50 C40 20, 10 25, 20 50 C5 65, 30 90, 50 60 C70 90, 95 65, 80 50 C90 25, 60 20, 50 50 Z" />
        </svg>
      </div>

      {/* Hạt sao lấp lánh */}
      <div className="absolute top-[20%] left-[22%] w-1 h-1 bg-purple-300 rounded-full blur-[0.5px] opacity-60" />
      <div className="absolute top-[50%] right-[20%] w-1 h-1 bg-purple-300 rounded-full blur-[0.5px] opacity-60" />

      {/* ================= KHUNG FORM ĐĂNG KÝ ================= */}
      
      <div className="relative z-10 w-full max-w-[420px] bg-[#140d33]/80 border border-purple-500/20 backdrop-blur-xl rounded-[28px] p-7 sm:p-9 shadow-[0_0_50px_rgba(0,0,0,0.6)] text-center">
        
        {/* Icon Bướm Trung Tâm */}
        <div className="flex justify-center mb-3">
          <svg width="70" height="70" viewBox="0 0 100 100" className="drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
            <path d="M48 48 C30 10, 5 20, 12 48 C2 68, 28 88, 48 58 Z" fill="url(#reg-bf-left)" />
            <path d="M52 48 C70 10, 95 20, 88 48 C98 68, 72 88, 52 58 Z" fill="url(#reg-bf-right)" />
            <path d="M50 32 L50 62" stroke="#e9d5ff" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 34 Q 45 24 40 22" stroke="#e9d5ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M50 34 Q 55 24 60 22" stroke="#e9d5ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <defs>
              <linearGradient id="reg-bf-left" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="reg-bf-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-xl font-bold text-white tracking-widest uppercase mb-1">
          ĐĂNG KÝ
        </h1>
        <p className="text-xs text-purple-200/50 mb-6 font-light">
          Tạo tài khoản mới để bắt đầu
        </p>

        {error && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs text-left">
            ⚠️ {error}
          </div>
        )}

        {/* Form nhập liệu */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          
          {/* Input Họ và tên */}
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 flex items-center pointer-events-none z-10 text-purple-300/40">
              <User size={17} />
            </div>
            <input
              type="text"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-[#1c1346]/80 border border-purple-500/20 focus:border-purple-400/60 rounded-xl py-2.5 pl-11 pr-4 text-white text-xs placeholder-purple-200/30 outline-none transition-all"
            />
          </div>

          {/* Input Email */}
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 flex items-center pointer-events-none z-10 text-purple-300/40">
              <Mail size={17} />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#1c1346]/80 border border-purple-500/20 focus:border-purple-400/60 rounded-xl py-2.5 pl-11 pr-4 text-white text-xs placeholder-purple-200/30 outline-none transition-all"
            />
          </div>

          {/* Input Tên đăng nhập */}
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 flex items-center pointer-events-none z-10 text-purple-300/40">
              <User size={17} />
            </div>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-[#1c1346]/80 border border-purple-500/20 focus:border-purple-400/60 rounded-xl py-2.5 pl-11 pr-4 text-white text-xs placeholder-purple-200/30 outline-none transition-all"
            />
          </div>

          {/* Input Mật khẩu */}
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 flex items-center pointer-events-none z-10 text-purple-300/40">
              <Lock size={17} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-[#1c1346]/80 border border-purple-500/20 focus:border-purple-400/60 rounded-xl py-2.5 pl-11 pr-11 text-white text-xs placeholder-purple-200/30 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 z-10 text-purple-300/40 hover:text-purple-200 transition-colors flex items-center justify-center"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Input Xác nhận mật khẩu */}
          <div className="relative flex items-center w-full">
            <div className="absolute left-3.5 flex items-center pointer-events-none z-10 text-purple-300/40">
              <Lock size={17} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-[#1c1346]/80 border border-purple-500/20 focus:border-purple-400/60 rounded-xl py-2.5 pl-11 pr-11 text-white text-xs placeholder-purple-200/30 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 z-10 text-purple-300/40 hover:text-purple-200 transition-colors flex items-center justify-center"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Checkbox Đồng ý điều khoản */}
          <div className="flex items-center gap-2 mt-1 text-left">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-purple-500/30 bg-[#1c1346] accent-purple-600 cursor-pointer"
            />
            <label htmlFor="terms" className="text-[11px] text-purple-200/60 cursor-pointer select-none">
              Tôi đồng ý với{" "}
              <a href="#" className="text-purple-400 underline hover:text-purple-300">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-purple-400 underline hover:text-purple-300">
                Chính sách bảo mật
              </a>
            </label>
          </div>

          {/* Button Đăng ký */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] hover:from-[#6d28d9] hover:to-[#4c1d95] text-white font-medium rounded-xl text-xs shadow-lg shadow-purple-950/50 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        {/* Phân cách */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="border-t border-purple-500/15 w-full" />
          <span className="absolute bg-[#140d33] px-3 text-[11px] text-purple-300/40">
            hoặc
          </span>
        </div>

        {/* Link chuyển sang Đăng nhập */}
        <div className="text-[11px] text-purple-200/50">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-purple-400 font-medium hover:underline">
            Đăng nhập ngay
          </Link>
        </div>

      </div>
    </div>
  );
}