"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Scan,
  History,
  Info,
  BarChart2,
  Settings,
  HelpCircle,
  Upload,
  User,
  ChevronDown,
  Image as ImageIcon,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Đường dẫn ảnh mặc định
  const DEFAULT_IMAGE = "/images/monarch.jpg";

  // Khởi tạo state: Ưu tiên lấy ảnh vừa chọn gần nhất từ localStorage
  const [previewUrl, setPreviewUrl] = useState<string>(DEFAULT_IMAGE);

  // Đọc ảnh gần nhất từ localStorage ngay khi trang chủ load
  useEffect(() => {
    const savedImage = localStorage.getItem("latest_uploaded_image");
    if (savedImage) {
      setPreviewUrl(savedImage);
    }
  }, []);

  // Danh sách các loài bướm mẫu hiển thị bên dưới
  const speciesList = [
    {
      name: "Monarch Butterfly",
      scientific: "Danaus plexippus",
      image: "/images/monarch.jpg",
    },
    {
      name: "Swallowtail Butterfly",
      scientific: "Papilio machaon",
      image: "/images/swallowtail.jpg",
    },
    {
      name: "Painted Lady",
      scientific: "Vanessa cardui",
      image: "/images/painted_lady.jpg",
    },
    {
      name: "Peacock Butterfly",
      scientific: "Aglais io",
      image: "/images/peacock.jpg",
    },
    {
      name: "Common Blue",
      scientific: "Polyommatus icarus",
      image: "/images/common_blue.jpg",
    },
  ];

  // Xử lý chung khi người dùng chọn/kéo thả File ảnh
  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file hình ảnh định dạng JPG, JPEG hoặc PNG!");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const base64Image = reader.result as string;

        // 1. Cập nhật preview tại chỗ
        setPreviewUrl(base64Image);

        // 2. Lưu vào localStorage để không bị mất khi chuyển trang hay quay lại
        localStorage.setItem("latest_uploaded_image", base64Image);

        // 3. Cho người dùng xem trước 1.5 giây ở trang chủ rồi tự động chuyển sang trang /predict
        setTimeout(() => {
          router.push("/predict");
        }, 1500);
      }
    };
    reader.readAsDataURL(file);
  };

  // Nút kích hoạt mở ô chọn file
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Sự kiện chọn file từ ổ đĩa
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Sự kiện Kéo - Thả file
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40"
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

            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all"
            >
              <Settings size={18} />
              Cài đặt
            </Link>
          </nav>
        </div>

        <div className="p-5 relative z-10 border-t border-purple-500/10">
          <Link
            href="/about"
            className="flex items-center gap-3 text-xs text-purple-200/60 hover:text-white transition-colors"
          >
            <HelpCircle size={18} />
            Giới thiệu
          </Link>
        </div>
      </aside>

      {/* ================= 2. MAIN CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Chào mừng bạn đến với hệ thống
            </h1>
            <h2 className="text-2xl font-bold text-purple-600">
              nhận diện và phân loại loài bướm
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Tải lên hình ảnh con bướm để hệ thống nhận diện và xác định loài bướm.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <User size={16} />
            </div>
            <span className="text-xs font-medium text-gray-700">
              Xin chào, Admin
            </span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>

        {/* ================= 3. UPLOAD BANNER SECTION ================= */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="bg-gradient-to-r from-[#f1eeff] via-[#f7f5ff] to-[#e8e3ff] rounded-2xl border-2 border-dashed border-purple-300/80 p-6 sm:p-8 mb-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[220px]"
        >
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
            <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-600 mb-3">
              <Upload size={28} />
            </div>

            <h3 className="text-base font-bold text-gray-800 mb-1">
              Tải ảnh con bướm lên
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Kéo thả ảnh vào đây hoặc chọn ảnh từ máy
            </p>

            {/* Input file bị ẩn */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Nút bấm kích hoạt upload */}
            <button
              type="button"
              onClick={handleButtonClick}
              className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-5 py-2.5 rounded-xl shadow-md shadow-purple-200 transition-all flex items-center gap-2"
            >
              <ImageIcon size={16} />
              <span>Chọn ảnh</span>
            </button>

            <p className="text-[10px] text-gray-400 mt-3">
              Hỗ trợ định dạng: JPG, JPEG, PNG (Tối đa 10MB)
            </p>
          </div>

          {/* Vùng xem trước ảnh (Preview) */}
          <div className="w-full md:w-1/2 h-48 md:h-full flex justify-end items-center mt-4 md:mt-0">
            <img
              src={previewUrl}
              alt="Butterfly Preview"
              className="h-44 md:h-52 w-full md:w-auto max-w-[280px] object-cover rounded-2xl shadow-md border-2 border-white/80 transition-all duration-300"
            />
          </div>
        </div>

        {/* ================= 4. SPECIES GALLERY ================= */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-bold text-gray-800">
              Một số loài bướm trong hệ thống
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {speciesList.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 group cursor-pointer"
              >
                <div className="h-36 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center">
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 italic line-clamp-1 mt-0.5">
                    {item.scientific}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}