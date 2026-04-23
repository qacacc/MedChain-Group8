import { useState, useEffect, useRef } from "react";
/* ═══════════════════════════════════════════════════════
   MATERIAL ICONS HELPER
═══════════════════════════════════════════════════════ */
function MaterialIcon({ icon, size = 20, className = "", style = {}, fill = 0 }: { icon: string; size?: number; className?: string; style?: React.CSSProperties; fill?: number }) {
  return (
    <span 
      className={`material-symbols-rounded ${className}`} 
      style={{ 
        fontSize: size, 
        fontVariationSettings: `'OPSZ' 24, 'wght' 500, 'FILL' ${fill}, 'GRAD' 0`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style 
      }}
    >
      {icon}
    </span>
  );
}
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
export default function Hero({ onOpenSimulation }: { onOpenSimulation?: () => void }) {
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

  // Ref để force-play video trên mọi thiết bị (iOS, Android)
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Luôn áp dụng dark mode
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    // Fix iOS Safari: React does NOT always write `muted` to the HTML attribute.
    // We must set it via DOM directly. Same for `playsinline`.
    const video = videoRef.current;
    if (!video) return;

    // Bắt buộc set muted qua DOM attr (iOS Safari yêu cầu attribute, không chỉ property)
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.muted = true;
    video.volume = 0;

    const tryPlay = () => {
      video.play().catch(() => {
        // Fallback: thử lại sau khi user chạm màn hình (iOS Low Power Mode)
        const resume = () => { video.play(); };
        document.addEventListener('touchstart', resume, { once: true, passive: true });
        document.addEventListener('click', resume, { once: true });
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden) video.play();
        }, { once: true });
      });
    };

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
    }
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
      <style>{`
        @keyframes scanMove { 0% { transform: translateY(0); } 100% { transform: translateY(100vh); } }
        @keyframes dataStream { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes rotateHex { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes glitchText { 0%, 100% { opacity: 1; transform: translateX(0); } 30% { opacity: 0.8; transform: translateX(-2px); } 60% { opacity: 0.9; transform: translateX(2px); } }
        @keyframes pulseFast { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes glitchLoad { 0% { clip-path: inset(0 0 0 0); } 20% { clip-path: inset(10% 0 30% 0); } 40% { clip-path: inset(40% 0 10% 0); } 60% { clip-path: inset(10% 0 60% 0); } 80% { clip-path: inset(70% 0 10% 0); } 100% { clip-path: inset(0 0 0 0); } }
        @keyframes flicker { 0% { opacity: 0.8; } 5% { opacity: 0.9; } 10% { opacity: 0.8; } 15% { opacity: 1; } 20% { opacity: 0.8; } 25% { opacity: 0.9; } 30% { opacity: 0.8; } 100% { opacity: 1; } }
        .glitch-text-anim { animation: glitchText 0.4s infinite; }
        .flicker-anim { animation: flicker 3s infinite; }
      `}</style>

      {isMounted && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-[800ms] ease-in-out overflow-hidden ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
          style={{ background: 'radial-gradient(ellipse at center, #010d1a 0%, #000508 100%)' }}
        >
          {/* ── SCANLINES overlay ── */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,220,0.03) 3px, rgba(0,255,220,0.03) 4px)',
            backgroundSize: '100% 4px',
            animation: 'scanMove 8s linear infinite'
          }} />

          {/* ── GRID ── */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,255,200,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          {/* ── VERTICAL DATA STREAMS ── */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute top-0 bottom-0 w-px overflow-hidden pointer-events-none z-0"
              style={{ left: `${8 + i * 12}%`, opacity: 0.15 + (i % 3) * 0.05 }}
            >
              <div style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                color: '#00ffcc',
                lineBreak: 'anywhere',
                animation: `dataStream ${3 + i * 0.7}s linear infinite`,
                animationDelay: `${i * 0.4}s`
              }}>
                {'10110101001010001110100101000111010010010101010101001010011'.repeat(30)}
              </div>
            </div>
          ))}

          {/* ── AMBIENT GLOW ORBS ── */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDelay: '2s' }} />

          {/* ── CENTRAL HOLOGRAM CONTAINER ── */}
          <div className="relative z-20 flex flex-col items-center">
            
            {/* Rotating Hexagonal Ring (CSS Pseudo-3D) */}
            <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-emerald-500/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-blue-500/20 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border-[2px] border-double border-teal-500/40 animate-[spin_20s_linear_infinite]" />
              
              {/* Central Shield/Node Icon */}
              <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)] animate-pulse">
                <MaterialIcon icon="hub" size={40} className="text-emerald-400" />
              </div>

              {/* Orbital Data Points */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6]"
                  style={{
                    animation: `rotateHex ${4 + i}s linear infinite`,
                    transformOrigin: '96px 96px',
                    top: '0',
                    left: '96px'
                  }}
                />
              ))}
            </div>

            {/* BRANDING & STATUS */}
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-white uppercase glitch-text-anim"
                  style={{ fontFamily: "'Instrument Serif', serif", textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                MedChain
              </h1>
              <div className="bg-emerald-500/10 border border-emerald-500/30 px-4 py-1 rounded-full inline-block backdrop-blur-md">
                <p className="text-[9px] font-mono tracking-[0.4em] text-emerald-400 uppercase">
                  Blockchain Health Protocol
                </p>
              </div>
            </div>

            {/* BOTTOM PROGRESS BAR (TECH STYLE) */}
            <div className="mt-16 w-80">
              <div className="flex justify-between items-end mb-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    System Core Initializing
                  </span>
                  <span className="text-[8px] font-mono text-emerald-500/70 animate-pulse italic">
                    {loadingProgress < 40 ? ">> Establishing P2P Handshake..." : 
                     loadingProgress < 70 ? ">> Decrypting Ledger Shards..." : 
                     loadingProgress < 95 ? ">> Verifying Genesis Hash..." : ">> System Ready."}
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">{loadingProgress}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden p-[1px]">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-teal-500 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                  style={{ width: `${loadingProgress}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 flex gap-8 text-[9px] font-mono text-gray-600 tracking-widest uppercase">
            <span>[ Node: VH-891 ]</span>
            <span>[ Epoch: 2026.04 ]</span>
            <span>[ Status: Active ]</span>
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

          {/* Video Background - iOS Safari safe: dùng <source> tag + setAttribute fix */}
          <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
            <video
              ref={videoRef}
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
            >
              {/* Source tag giúp iOS Safari nhận dạng video đúng MIME type */}
              <source src="/introl.mp4" type="video/mp4" />
              {/* Fallback: dùng CDN nếu file local bị chặn */}
              <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1628-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          {/* Thanh Điều Hướng (Navigation Bar) */}
          <nav className="w-full flex justify-between items-center px-6 md:px-12 py-6 relative z-20 animate-fade-in-down">
            <div className="text-3xl tracking-tight text-white drop-shadow-md transition-colors animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>
              MedChain <span className="text-xs font-sans align-top opacity-50">Group 08</span>
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
                <MaterialIcon icon="info" size={20} />
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

            {/* Khu vực CTA */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10 sm:mt-12 w-full sm:w-auto px-4 sm:px-0 animate-fade-rise-delay-2 relative z-10">
              {/* Primary: Simulation */}
              <button
                onClick={onOpenSimulation}
                className="w-full sm:min-w-[280px] bg-[#059669] text-white font-bold rounded-2xl px-10 py-5 text-base sm:text-lg hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(5,150,105,0.3)] transition-all duration-300 shadow-2xl border border-[#059669] flex items-center justify-center gap-3"
              >
                <MaterialIcon icon="monitoring" size={24} />
                Xem Mô Phỏng Ứng Dụng
              </button>
              {/* Secondary: Download */}
              <a
                href="https://drive.google.com/file/d/1LFLy1a53nro5GG74CPu5l2fxZh4oX5bW/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:min-w-[220px] bg-transparent text-white font-bold rounded-2xl px-8 py-5 text-base sm:text-lg hover:scale-[1.05] hover:bg-white/10 transition-all duration-300 border border-white/30 flex items-center justify-center gap-3"
              >
                <MaterialIcon icon="assignment_turned_in" size={24} />
                Tải Báo Cáo
              </a>
            </div>

            {/* Trust Indicators (Chỉ số tín nhiệm: HIPAA, GDPR, ISO) */}
            <div className="flex flex-row flex-wrap justify-center items-center gap-6 sm:gap-12 mt-12 sm:mt-20 opacity-90 text-gray-300 animate-fade-rise-delay-2 text-xs sm:text-sm md:text-base font-light px-4 relative z-10">
              <div className="flex items-center gap-1.5 sm:gap-2 hover:text-[#059669] transition-all cursor-default">
                <MaterialIcon icon="verified_user" size={22} className="text-[#059669]" />
                <span className="font-medium tracking-wide">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 hover:text-[#059669] transition-all cursor-default">
                <MaterialIcon icon="lock" size={22} className="text-[#059669]" />
                <span className="font-medium tracking-wide">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 hover:text-[#059669] transition-all cursor-default">
                <MaterialIcon icon="assignment_turned_in" size={22} className="text-[#059669]" />
                <span className="font-medium tracking-wide">GDPR Ready</span>
              </div>
            </div>
          </main>

          {/* Khu vực Micro-interactions (Biểu tượng Tim / Blockchain / Bảo mật) */}
          <section className="max-w-6xl mx-auto w-full px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="liquid-glass rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in-up hover:-translate-y-2 transition-transform duration-500">
              <div className="bg-red-50 dark:bg-white/10 p-4 rounded-full mb-6 relative border border-transparent dark:border-white/5">
                <MaterialIcon icon="favorite" size={36} className="text-red-500 dark:text-white relative z-10" />
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
                <MaterialIcon icon="database" size={36} className="text-indigo-500 dark:text-white relative z-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Immutable Records</h3>
              <p className="text-sm text-gray-200 leading-relaxed text-center">
                Mỗi bản ghi bệnh án đều được băm hóa và lưu vĩnh viễn trên sổ cái phân tán. Chống sửa đổi hoàn toàn.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in-up hover:-translate-y-2 transition-transform duration-500" style={{ animationDelay: "200ms" }}>
              <div className="bg-black/5 dark:bg-white/10 p-4 rounded-full mb-6 relative">
                <MaterialIcon icon="shield" size={36} className="text-blue-500 dark:text-white" />
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
                  <MaterialIcon icon="monitoring" size={18} className="text-[#059669] animate-pulse hidden sm:block" />
                  <span className="text-xs sm:text-sm font-semibold text-[#059669] tracking-widest text-center uppercase">Trạng thái mạng (NODE 8)</span>
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
                  <MaterialIcon icon="close" size={24} />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#059669]/20 text-[#059669] rounded-lg">
                    <MaterialIcon icon="info" size={28} />
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
