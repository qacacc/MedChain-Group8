import React, { useState, useEffect, type JSX } from "react";
import { ShieldCheck, Lock, FileCheck, Heart, Shield, Activity, Database, X, Info, ChevronRight } from "lucide-react";
import ContentSections from "./ContentSections";

/**
 * Component Hero
 * 
 * Màn hình trang chủ ứng dụng MedChain. Bao gồm:
 * - Màn hình Loading mô phỏng khởi tạo Blockchain.
 * - Video Background kèm Overlay làm nổi bật text.
 * - Thanh điều hướng chuyên nghiệp.
 * - Cụm nút hành động rõ ràng theo Role (Bác sĩ / Bệnh nhân).
 * - Các Trust Indicators (HIPAA, ISO, GDPR).
 * - Trình giả lập Real-time Blockchain Transactions.
 * - Các Micro-interactions (Biểu tượng Tim, Não, Bảo mật).
 * - Footer tuân thủ pháp lý y tế.
 */
export default function Hero(): JSX.Element {
  // Trạng thái Loading ban đầu và Thanh quá trình
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  // Trạng thái mô phỏng các Block tạo liên tục
  const [currentBlock, setCurrentBlock] = useState(810);
  const [scrambledText, setScrambledText] = useState("Blockchain");

  // Trạng thái hiển thị giải thích (Modal Popup)
  const [modalContent, setModalContent] = useState<{title: string, desc: string} | null>(null);

  useEffect(() => {
    // Luôn áp dụng dark mode
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    let startTime = performance.now();
    const duration = 2500; // 2.5s
    let animationFrameId: number;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // Hàm gia tốc mượt (Ease in out cubic)
      const easeInOutCubic = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setLoadingProgress(Math.floor(easeInOutCubic * 100));

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsMounted(false);
          setIsLoading(false);
        }, 800); // Đợi 800ms cho fade-out hoàn chỉnh
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    // Cập nhật Block liên tục sau mỗi 3.5 giây khi màn hình đã load
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentBlock(prev => prev + 1);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
      const target = "Blockchain";
      
      const scrambleInterval = setInterval(() => {
        let iter = 0;
        const tick = setInterval(() => {
          setScrambledText(target.split("").map((_, i) => {
            if (i < iter) return target[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join(""));
          iter += 1/3;
          if (iter >= target.length) clearInterval(tick);
        }, 40);
      }, 4000);
      
      return () => clearInterval(scrambleInterval);
    }
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen: Có Animation Fade Out mượt mà */}
      {isMounted && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black text-white transition-opacity duration-[800ms] ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col items-center">
            {/* Logo hoặc Icon trung tâm trong lúc load */}
            <div className="relative mb-12">
               <Shield className="w-16 h-16 text-green-500 animate-pulse" />
               <div className="absolute inset-0 border-4 border-green-500/20 rounded-full animate-ping opacity-20"></div>
            </div>
            
            <div className="text-4xl md:text-5xl tracking-tight text-white mb-2 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>
              MedChain <sup className="text-sm font-sans align-top">ᴳʳᵒᵘᵖ ⁸</sup>
            </div>
            <h2 className="text-xl font-light tracking-[0.3em] uppercase mb-8 border-t border-white/10 pt-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Initializing <span className="text-green-500">Nodes</span>
            </h2>
            <p className="text-gray-500 text-xs tracking-widest uppercase mb-12 animate-pulse">
              Synchronizing Ledger Data...
            </p>

          </div>
          
          {/* Thanh Loading (Progress Bar) Full Width nằm ở Footer của Màn Hình Loading */}
          <div className="absolute bottom-0 left-0 w-full h-8 sm:h-10 bg-gray-900 border-t border-gray-800 flex items-center justify-center overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-green-500 transition-[width] duration-75 ease-out shadow-[0_0_15px_rgba(34,197,94,0.3)]"
              style={{ width: `${loadingProgress}%` }}
            ></div>
            <span className="relative z-10 text-xs sm:text-sm font-bold text-white tracking-widest drop-shadow-md">
              {loadingProgress}%
            </span>
          </div>
        </div>
      )}

      <div id="top" className="relative min-h-screen w-full bg-transparent overflow-x-hidden flex flex-col">
        {/* KHU VỰC HERO CÓ VIDEO BÊN TRONG CỐ ĐỊNH */}
        <div className="relative z-10 flex flex-col min-h-screen selection:bg-[#0fb88f]/30">
          
          {/* Background Blobs for depth (Translucent) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="bg-blob w-[600px] h-[600px] bg-emerald-500/20 top-[-20%] left-[-10%] opacity-10" />
            <div className="bg-blob w-[500px] h-[500px] bg-blue-600/20 bottom-[-10%] right-[-10%] opacity-10" style={{ animationDelay: '-5s' }} />
          </div>

          {/* Video Background bám dính toàn màn hình (Parallax) để chống vỡ khung và chống cutoff */}
          <div className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none">
            <video
              className="w-full h-full object-cover"
              autoPlay loop muted playsInline src="/introl.mp4"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          {/* Thanh Điều Hướng (Navigation Bar) */}
          <nav className="w-full flex justify-between items-center px-6 md:px-12 py-6 relative z-20 animate-fade-in-down">
            <div className="text-3xl tracking-tight text-white drop-shadow-md transition-colors animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>
              MedChain <sup className="text-xs font-sans align-top">ᴳʳᵒᵒᵖ ⁸</sup>
            </div>

            {/* Cụm liên kết Navigation Links */}
            <div className="hidden md:flex gap-10 text-base font-medium">
              <a href="#top" className="text-white cursor-pointer drop-shadow-lg transition-colors font-bold">Home</a>
              <a href="#solution" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Solution</a>
              <a href="#personas" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Personas</a>
              <a href="#architecture" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Architecture</a>
              <a href="#roadmap" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Roadmap</a>
              <a href="#conclusion" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Outcome</a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setModalContent({
                  title: "Về MedChain",
                  desc: "Hệ thống quản lý EHR phi tập trung phát triển bởi Nhóm 8 dự án Tư duy thiết kế."
                })}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors"
              >
                <Info size={20} />
              </button>
            </div>
          </nav>

          {/* Nội Dung Trung Tâm (Hero Section Content) */}
          <main className="flex-1 flex flex-col items-center text-center px-6 pt-24 pb-16">
            <h1
              className="text-4xl sm:text-6xl md:text-[5.5rem] leading-[1.1] sm:leading-[0.95] tracking-[-1px] sm:tracking-[-2px] max-w-5xl animate-fade-rise text-white drop-shadow-2xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Nơi niềm tin được <em className="not-italic text-gray-300 transition-all duration-300 hover:text-blue-400 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] cursor-pointer">bảo mật</em> bằng
              <br className="hidden sm:block" /> sức mạnh của <span className="font-mono text-amber-400 tracking-tight">{scrambledText}</span>.
            </h1>

            <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-3xl mt-6 sm:mt-8 leading-relaxed animate-fade-rise-delay drop-shadow-lg font-light px-2 sm:px-0">
              Tiểu luận Môn Tư duy Thiết kế: Ứng dụng Blockchain trong lưu trữ và bảo mật Hồ sơ Bệnh án Điện tử (EHR).
              Chuyển hóa hệ thống y tế sang mạng lưới chia sẻ dữ liệu an toàn, minh bạch, lấy bệnh nhân làm trung tâm.
            </p>

            {/* Team Members Chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-4xl animate-fade-rise-delay">
              {[
                "Huỳnh Tấn Đạt", "Lê Ngọc Như Ý", "Nguyễn Đăng Vinh", "Nguyễn Minh Đức",
                "Nguyễn Tấn Vũ", "Nguyễn Tấn Đạt", "Lê Quốc Vũ", "Nguyễn Đức Độ"
              ].map((name, idx) => (
                <span key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-[10px] sm:text-xs px-3 py-1 rounded-full">
                  {name}
                </span>
              ))}
            </div>

            {/* Khu vực CTA: Gôm lại thành 1 nút Download duy nhất */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10 sm:mt-12 w-full sm:w-auto px-4 sm:px-0 animate-fade-rise-delay-2 relative z-10">
              <button className="w-full sm:min-w-[320px] bg-[#0fb88f] text-white font-bold rounded-2xl px-12 py-5 text-base sm:text-lg hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(15,184,143,0.4)] transition-all duration-300 shadow-2xl border border-[#0fb88f] flex items-center justify-center gap-3">
                <FileCheck size={24} />
                Download Full báo cáo
              </button>
            </div>

            {/* Trust Indicators (Chỉ số tín nhiệm: HIPAA, GDPR, ISO) */}
            <div className="flex flex-row flex-wrap justify-center items-center gap-6 sm:gap-12 mt-12 sm:mt-20 opacity-90 text-gray-300 animate-fade-rise-delay-2 text-xs sm:text-sm md:text-base font-light px-4 relative z-10">
              <div className="flex items-center gap-1.5 sm:gap-2 hover:text-[#0fb88f] transition-all cursor-default">
                <ShieldCheck size={20} className="text-[#0fb88f]" />
                <span className="font-medium tracking-wide">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 hover:text-[#0fb88f] transition-all cursor-default">
                <Lock size={20} className="text-[#0fb88f]" />
                <span className="font-medium tracking-wide">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 hover:text-[#0fb88f] transition-all cursor-default">
                <FileCheck size={20} className="text-[#0fb88f]" />
                <span className="font-medium tracking-wide">GDPR Ready</span>
              </div>
            </div>
          </main>

          {/* Khu vực Micro-interactions (Biểu tượng Tim / Blockchain / Bảo mật) */}
          <section className="max-w-6xl mx-auto w-full px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="liquid-glass rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in-up hover:-translate-y-2 transition-transform duration-500">
              <div className="bg-red-50 dark:bg-white/10 p-4 rounded-full mb-6 relative border border-transparent dark:border-white/5">
                <Heart size={32} className="text-red-500 dark:text-white relative z-10" />
                {/* Hiệu ứng Pulse (Nhấp nháy Toả ra) */}
                <div className="absolute inset-0 bg-red-200 dark:bg-white/20 rounded-full animate-ping pointer-events-none opacity-50" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Healthcare First</h3>
              <p className="text-sm text-gray-200 leading-relaxed text-center">
                Thiết kế lấy sức khoẻ và trải nghiệm của bệnh nhân làm trọng tâm. Dữ liệu liền mạch giữa các bệnh viện.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in-up hover:-translate-y-2 transition-transform duration-500" style={{ animationDelay: "100ms" }}>
              <div className="bg-black/5 dark:bg-white/10 p-4 rounded-full mb-6 relative">
                <Database size={32} className="text-indigo-500 dark:text-white animate-pulse relative z-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Immutable Records</h3>
              <p className="text-sm text-gray-200 leading-relaxed text-center">
                Mỗi bản ghi bệnh án đều được băm hóa và lưu vĩnh viễn trên sổ cái phân tán. Chống sửa đổi hoàn toàn.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in-up hover:-translate-y-2 transition-transform duration-500" style={{ animationDelay: "200ms" }}>
              <div className="bg-black/5 dark:bg-white/10 p-4 rounded-full mb-6 relative">
                <Shield size={32} className="text-blue-500 dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Military-Grade Security</h3>
              <p className="text-sm text-gray-200 leading-relaxed text-center">
                Khóa công khai (Public Key) và khóa bí mật (Private Key) gắn chặt định danh duy nhất của người dùng.
              </p>
            </div>
          </section>
        </div>
        {/* KẾT THÚC KHU VỰC HERO CÓ VIDEO */}

        {/* CÁC SECTION NỘI DUNG TỪ BÀI TIỂU LUẬN (Tích hợp thêm) - NẰM TRONG VÙNG MÀU NỀN CỐ ĐỊNH */}
        <div className="relative z-10 flex flex-col w-full shadow-[0_-15px_30px_-5px_rgba(0,0,0,0.3)] bg-[#f8f9fc] dark:bg-[#0B1F3A]">
          <ContentSections />

          {/* Footer & Live Network Status */}
          <div id="footer" className="w-full bg-[#0B1F3A] text-white">
            <footer className="w-full border-t border-white/10 pt-12 pb-8 px-4 sm:px-8 flex flex-col items-center gap-10 sm:gap-12 text-sm text-gray-400 max-w-7xl mx-auto">
              
              {/* Giả lập Recent Transactions */}
              <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl animate-fade-in-up backdrop-blur-md">
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5 border-b border-white/10 pb-3 sm:pb-4">
                  <Activity size={18} className="text-[#0fb88f] animate-pulse hidden sm:block" />
                  <span className="text-xs sm:text-sm font-semibold text-[#0fb88f] tracking-widest text-center">LIVE NETWORK (NODE 8)</span>
                </div>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  { block: currentBlock, tx: "Thêm hồ sơ bệnh án thành công", time: "Vừa xong" },
                  { block: currentBlock - 1, tx: "Cấp quyền truy cập cho Bác sĩ #A12", time: "2 phút trước" },
                  { block: currentBlock - 2, tx: "Xác thực chữ ký mã hoá (RSA)", time: "18 phút trước" },
                  ].map((item, idx) => (
                    <div key={item.block} className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 relative animate-slide-left p-2 sm:p-0 rounded-lg sm:rounded-none bg-black/20 sm:bg-transparent" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <span className="text-[10px] sm:text-xs text-[#e0f5ef] font-mono tracking-wider sm:w-32 text-center sm:text-right">
                        Block #{item.block}
                      </span>
                      <span className="hidden sm:inline text-gray-600">•</span>
                      <span className="text-xs sm:text-sm text-white text-center sm:text-left font-medium sm:w-64 max-w-full truncate px-2 sm:px-0">
                        {item.tx}
                      </span>
                      <span className="hidden sm:inline text-gray-600">•</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 sm:w-24 text-center sm:text-left">
                        {item.time}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

              <div className="w-full flex flex-col md:flex-row justify-between items-center opacity-80 text-center md:text-left gap-4 md:gap-0">
                <div className="text-xs sm:text-sm text-gray-400">© {new Date().getFullYear()} MedChain Global - Nhóm 8. All rights reserved.</div>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
                  <a onClick={() => setModalContent({ title: "Báo cáo Y khoa", desc: "Chức năng kết xuất toàn bộ hồ sơ y tế liên tuyến từ tất cả các trạm trong mạng lưới DLT. Mọi thông tin đều được giải mã an toàn và có lịch sử đóng dấu chuẩn xác."})} className="hover:text-white transition-colors cursor-pointer text-gray-400">Báo cáo Y khoa</a>
                  <a onClick={() => setModalContent({ title: "Quyền riêng tư (Privacy)", desc: "Tại MedChain, mọi dữ liệu bệnh án đều mã hoá AES-256 nội tại. Người dùng nắm giữ cặp khoá bất đối xứng (Public/ Private Key) để quyết định chia sẻ cho bác sĩ nào."})} className="hover:text-white transition-colors cursor-pointer text-gray-400">Quyền riêng tư (Privacy)</a>
                  <a onClick={() => setModalContent({ title: "Điều khoản (Terms)", desc: "Hệ thống tuân thủ nghiêm ngặt tiêu chuẩn bảo mật y khoa HIPAA (Hoa Kỳ) và GDPR (Châu Âu). Một khi dữ liệu đã ký và lưu lên khối, tuyệt đối không ai kể cả admin có thể xóa bỏ sửa đổi."})} className="hover:text-white transition-colors cursor-pointer text-gray-400">Điều khoản (Terms)</a>
                </div>
              </div>
            </footer>
          </div>

          {/* MODAL GIẢI THÍCH */}
          {modalContent && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in-up">
              <div className="bg-[#0B1F3A] border border-[#0fb88f]/40 p-6 md:p-8 rounded-2xl shadow-[0_0_50px_rgba(15,184,143,0.15)] max-w-lg w-full relative transform transition-all duration-300">
                <button 
                  onClick={() => setModalContent(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  aria-label="Đóng"
                >
                  <X size={24} />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#0fb88f]/20 text-[#0fb88f] rounded-lg">
                    <Info size={28} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">{modalContent.title}</h3>
                </div>
                <div className="w-full h-px bg-white/10 mb-5"></div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {modalContent.desc}
                </p>
                <button 
                  onClick={() => setModalContent(null)}
                  className="mt-8 w-full bg-[#0E8A6E] hover:bg-[#0fb88f] text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Đã hiểu
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Global CSS Scope */}
        <style>{`
          .bg-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            z-index: 0;
            opacity: 0.15;
            animation: blob-float 20s infinite alternate cubic-bezier(0.45, 0, 0.55, 1);
          }

          @keyframes blob-float {
            0% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0, 0) scale(1); }
          }

          .animate-blur-in {
            animation: blurIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }

          @keyframes blurIn {
            from { opacity: 0; filter: blur(10px); transform: scale(0.95); }
            to { opacity: 1; filter: blur(0); transform: scale(1); }
          }

          .animate-fade-rise { animation: fade-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
          .animate-fade-rise-delay { animation: fade-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
          .animate-fade-rise-delay-2 { animation: fade-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }

          @keyframes fade-rise {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  );
}
