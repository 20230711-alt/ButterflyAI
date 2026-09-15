"use client";

import { useState, useEffect } from "react";
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
  X,
} from "lucide-react";

interface SimilarSpeciesItem {
  name: string;
  scientific: string;
  family: string;
  habitat: string;
  distribution: string;
  features: string;
}

interface SpeciesInfo {
  name: string;
  scientific: string;
  family: string;
  habitat: string;
  distribution: string;
  features: string;
  confidence: number;
  image: string;
  similar_species?: SimilarSpeciesItem[];
}

// Component con tự động fetch ảnh thật từ endpoint backend theo tên loài trong dataset
function SpeciesImageItem({ name }: { name: string }) {
  const [imgUrl, setImgUrl] = useState<string>("https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=100&auto=format&fit=crop");

  useEffect(() => {
    if (!name) return;
    fetch(`http://localhost:8000/species-images/${encodeURIComponent(name)}`)
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          setImgUrl(data.images[0]); // Lấy ảnh thật đầu tiên trong thư mục dataset của loài đó
        }
      })
      .catch(err => console.error("Lỗi tải ảnh dataset:", err));
  }, [name]);

  return (
    <img
      src={imgUrl}
      alt={name}
      className="w-full h-full object-cover"
    />
  );
}

export default function SpeciesDetailPage() {
  const [species, setSpecies] = useState<SpeciesInfo>({
    name: "Đang tải...",
    scientific: "...",
    family: "...",
    habitat: "...",
    distribution: "...",
    features: "Đang cập nhật thông tin chi tiết từ hệ thống...",
    confidence: 0,
    image: "", 
    similar_species: []
  });

  const [galleryThumbnails, setGalleryThumbnails] = useState<string[]>([]);
  const [selectedPopupSpecies, setSelectedPopupSpecies] = useState<SimilarSpeciesItem | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("latest_prediction_result");
    const savedImage = localStorage.getItem("latest_uploaded_image");

    if (savedResult) {
      try {
        const parsed = JSON.parse(savedResult);
        const speciesName = parsed.predicted_class;

        // Cập nhật state trực tiếp từ kết quả backend trả về (lấy dữ liệu thật 100%)
        setSpecies(prev => ({
          ...prev,
          name: speciesName || prev.name,
          scientific: speciesName || prev.scientific,
          family: parsed.family || prev.family,
          habitat: parsed.habitat || prev.habitat,
          distribution: parsed.distribution || prev.distribution,
          features: parsed.features || prev.features,
          confidence: parsed.confidence || prev.confidence,
          similar_species: parsed.similar_species || [],
        }));

        // Gọi API Backend lấy gallery ảnh thực tế của loài chính trong dataset
        fetch(`http://localhost:8000/species-images/${encodeURIComponent(speciesName)}`)
          .then(res => res.json())
          .then(data => {
            if (data.images && data.images.length > 0) {
              setGalleryThumbnails(data.images);
              if (!savedImage) {
                setActiveImage(data.images[0]);
              }
            }
          })
          .catch(err => console.error("Lỗi tải gallery ảnh dataset:", err));

      } catch (e) {
        console.error("Lỗi đọc kết quả từ localStorage:", e);
      }
    }

    if (savedImage) {
      setSpecies(prev => ({ ...prev, image: savedImage }));
      setActiveImage(savedImage);
    }
  }, []);

  const [activeImage, setActiveImage] = useState<string>(species.image);

  useEffect(() => {
    if (species.image) {
      setActiveImage(species.image);
    }
  }, [species.image]);

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

          <nav className="mt-8 space-y-1.5 text-xs">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all">
              <Home size={18} /> Trang chủ
            </Link>
            <Link href="/predict" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all">
              <Scan size={18} /> Nhận diện
            </Link>
            <Link href="/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-200/70 hover:bg-purple-900/30 hover:text-white transition-all">
              <History size={18} /> Lịch sử nhận diện
            </Link>
            <Link href="/species-info" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium shadow-md shadow-purple-900/40">
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

        <div className="p-5 relative z-10">
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-900/40 border border-purple-500/20 text-xs text-purple-200 hover:bg-purple-800/50 hover:text-white transition-all">
            <LogOut size={16} /> Đăng xuất
          </Link>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <Link href="/predict" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 mb-2 transition-colors font-medium">
              <ArrowLeft size={14} /> Quay lại
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Thông tin chi tiết loài bướm</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <User size={16} className="text-purple-600" />
              <span className="text-xs font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>

        {/* ================= KHỐI THÔNG TIN CHÍNH TỔNG QUAN ================= */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Cột trái: Ảnh chính + Thumbnails dataset + Các loài tương tự */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-sm flex items-center justify-center">
                  <img
                    src={activeImage}
                    alt="Butterfly Detail"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md">
                    {species.confidence}%
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-6">
                  {galleryThumbnails.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`h-14 rounded-xl overflow-hidden border-2 transition-all bg-gray-50 flex items-center justify-center ${
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

              {/* Các loài tương tự THẬT từ Dataset */}
              <div>
                <h3 className="text-xs font-bold text-gray-800 mb-3">Các loài tương tự</h3>
                <div className="grid grid-cols-2 gap-3">
                  {(species.similar_species || []).map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-2 border border-gray-100 shadow-sm flex items-center gap-2 hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0 flex items-center justify-center">
                        <SpeciesImageItem name={item.name} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[11px] font-bold text-gray-800 truncate" title={item.name}>
                          {item.name}
                        </h4>
                        <p className="text-[9px] text-gray-400 italic truncate mb-1">
                          Dataset Species
                        </p>
                        <button 
                          onClick={() => setSelectedPopupSpecies(item)}
                          className="text-[9px] font-medium text-purple-700 bg-purple-100/70 hover:bg-purple-200 px-2 py-0.5 rounded transition-colors cursor-pointer"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bảng thuộc tính sinh học */}
            <div className="lg:col-span-4 flex flex-col justify-between border-r border-gray-100 pr-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight uppercase">
                  {species.name}
                </h2>
                <p className="text-xs text-purple-600 font-medium italic mb-3">
                  {species.scientific}
                </p>

                <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-[11px] font-medium mb-4">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Khớp với kết quả nhận diện</span>
                </div>

                <div className="space-y-3 text-xs text-gray-600">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-gray-700">🦋 Họ sinh học:</span>
                    <span className="text-gray-800">{species.family}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-gray-700">📍 Môi trường sống:</span>
                    <span className="text-gray-800 leading-relaxed">{species.habitat}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-gray-700">📍 Phân bố địa lý:</span>
                    <span className="text-gray-800 leading-relaxed">{species.distribution}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Giới thiệu & Đặc điểm nổi bật bên phải */}
            <div className="lg:col-span-3 flex flex-col justify-between bg-purple-50/40 p-4 rounded-2xl border border-purple-100/50">
              <div>
                <h3 className="text-xs font-bold text-gray-800 mb-2">Giới thiệu đặc điểm</h3>
                <p className="text-[11px] text-gray-600 leading-relaxed mb-4">
                  {species.features}
                </p>
              </div>

              <button className="w-full mt-4 py-2 border border-purple-300 bg-white hover:bg-purple-50 text-purple-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                <BookOpen size={14} />
                <span>Xem thêm tài liệu</span>
              </button>
            </div>

          </div>
        </div>

        {/* ================= 3 THẺ CHUYÊN SÂU ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Đặc điểm nhận dạng</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{species.features}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">Môi trường sống</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{species.habitat}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">Phân bố địa lý</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{species.distribution}</p>
            </div>
          </div>
        </div>

      </main>

      {/* ================= POPUP XEM CHI TIẾT LOÀI TƯƠNG TỰ ================= */}
      {selectedPopupSpecies && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Nút đóng */}
            <button 
              onClick={() => setSelectedPopupSpecies(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              {/* Hình ảnh thật từ Dataset */}
              <div className="w-40 h-40 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center shadow-inner">
                <SpeciesImageItem name={selectedPopupSpecies.name} />
              </div>

              {/* Thông tin chi tiết */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                  {selectedPopupSpecies.name}
                </h2>
                <p className="text-xs text-purple-600 font-medium italic mb-3">
                  Dataset Reference Species
                </p>

                <div className="space-y-2 text-xs text-gray-700">
                  <p><strong>🦋 Họ sinh học:</strong> {selectedPopupSpecies.family}</p>
                  <p><strong>📍 Môi trường sống:</strong> {selectedPopupSpecies.habitat}</p>
                  <p><strong>📍 Phân bố địa lý:</strong> {selectedPopupSpecies.distribution}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800 mb-1">Giới thiệu đặc điểm</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {selectedPopupSpecies.features}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSelectedPopupSpecies(null)}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-200 transition-colors"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}