
import { Database, ShieldCheck, Lock, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BlockchainAnimation() {
  return (
    <div className="relative w-full py-12 flex flex-col items-center justify-center bg-gradient-to-r from-transparent via-[#0B1F3A]/5 dark:via-white/5 to-transparent rounded-2xl my-10 overflow-hidden">
      
      {/* Scope CSS cho các animation đặc thù của riêng Blockchain */}
      <style>{`
        @keyframes flowData {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100px); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(15, 184, 143, 0.2); }
          50% { box-shadow: 0 0 30px rgba(15, 184, 143, 0.6); }
        }
        @keyframes newBlockVerify {
          0% { opacity: 0.3; transform: scale(0.95); border-color: rgba(255,255,255,0.2); }
          50% { opacity: 1; transform: scale(1.02); border-color: #0fb88f; }
          100% { opacity: 1; transform: scale(1); border-color: #0E8A6E; }
        }
        .data-particle {
          animation: flowData 3s linear infinite;
        }
        .block-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
        .block-verify {
          animation: newBlockVerify 4s ease-in-out infinite;
        }
      `}</style>

      <div className="text-center mb-10 z-10">
        <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Cơ chế mã hoá và Lưu trữ Bệnh án
        </h3>
        <p className="text-xs text-[#4a5568] dark:text-gray-400 max-w-md mx-auto">
          Mỗi hồ sơ sau khi được bác sĩ cập nhật sẽ được đóng gói thành một Block, băm mật mã học (Hash) và nối vào chuỗi bất biến.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 relative w-full px-4">
        
        {/* Đường dây liên kết nền chạy ngang qua các block */}
        <div className="absolute top-1/2 left-10 right-10 h-1 bg-gray-200 dark:bg-white/10 -translate-y-1/2 z-0 hidden sm:block rounded-full"></div>

        {/* BLOCK 1: Đã xác thực */}
        <div className="relative z-10 block-glow bg-white dark:bg-[#0B1F3A] border-2 border-[#0E8A6E] rounded-xl p-4 w-44 sm:w-48 shadow-lg flex flex-col items-center">
          <div className="absolute -top-3 bg-[#0E8A6E] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={12} /> Block #1042
          </div>
          <Database size={28} className="text-[#0E8A6E] mb-3 mt-2" />
          <div className="w-full bg-gray-100 dark:bg-black/30 rounded p-2 mb-2">
            <div className="flex justify-between items-center mb-1">
              <FileText size={12} className="text-gray-500" />
              <span className="text-[9px] font-mono text-gray-500">Hash: 0x8F2a...</span>
            </div>
            <div className="h-1 w-full bg-[#0E8A6E]/30 rounded-full mb-1"></div>
            <div className="h-1 w-2/3 bg-[#0E8A6E]/30 rounded-full"></div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold mb-1">
            <Lock size={12} className="text-gray-400" /> Đã mã hoá
          </div>
        </div>

        {/* Mũi tên và data packet (Trái tim của animation) */}
        <div className="relative w-8 sm:w-16 h-8 sm:h-12 flex items-center justify-center rotate-90 sm:rotate-0">
          <ArrowRight size={20} className="text-gray-300 dark:text-gray-600 z-0" />
          <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full blur-[2px] data-particle shadow-[0_0_8px_#3b82f6]"></div>
        </div>

        {/* BLOCK 2: Đã xác thực */}
        <div className="relative z-10 block-glow bg-white dark:bg-[#0B1F3A] border-2 border-[#0E8A6E] rounded-xl p-4 w-44 sm:w-48 shadow-lg flex flex-col items-center">
          <div className="absolute -top-3 bg-[#0E8A6E] text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 size={12} /> Block #1043
          </div>
          <Database size={28} className="text-[#0E8A6E] mb-3 mt-2" />
          <div className="w-full bg-gray-100 dark:bg-black/30 rounded p-2 mb-2">
            <div className="flex justify-between items-center mb-1">
              <FileText size={12} className="text-gray-500" />
              <span className="text-[9px] font-mono text-gray-500">Hash: 0x3E1b...</span>
            </div>
            <div className="h-1 w-full bg-[#0E8A6E]/30 rounded-full mb-1"></div>
            <div className="h-1 w-3/4 bg-[#0E8A6E]/30 rounded-full"></div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold mb-1">
            <ShieldCheck size={12} className="text-gray-400" /> Đã xác minh
          </div>
        </div>

        {/* Mũi tên và data packet 2 */}
        <div className="relative w-8 sm:w-16 h-8 sm:h-12 flex items-center justify-center rotate-90 sm:rotate-0">
          <ArrowRight size={20} className="text-gray-300 dark:text-gray-600 z-0" />
          <div className="absolute left-0 w-3 h-3 bg-amber-400 rounded-full blur-[2px] data-particle shadow-[0_0_8px_#fbbf24]" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* BLOCK 3: Đang xác thực (Animation Pulse/Verify) */}
        <div className="relative z-10 block-verify bg-white dark:bg-[#0B1F3A] border-2 border-dashed border-[#0fb88f] rounded-xl p-4 w-44 sm:w-48 shadow-2xl flex flex-col items-center">
          {/* Lớp lưới background mờ cho khối đang tạo */}
          <div className="absolute inset-0 rounded-xl bg-[radial-gradient(#0fb88f_1px,transparent_1px)] [background-size:8px_8px] opacity-[0.05]"></div>
          
          <div className="absolute -top-3 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md z-20">
             <span className="w-2 h-2 bg-white rounded-full animate-ping"></span> Đang tạo Block...
          </div>
          <Database size={28} className="text-[#0fb88f] mb-3 mt-2" />
          <div className="w-full bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-500/20 rounded p-2 mb-2 relative z-10">
            <div className="flex justify-between items-center mb-1">
              <FileText size={12} className="text-amber-600 dark:text-amber-400" />
              <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400">Gen Hash...</span>
            </div>
            <div className="h-1 w-full bg-[#0fb88f]/30 rounded-full mb-1"></div>
            <div className="h-1 w-1/2 bg-[#0fb88f]/30 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[#C47D0E] font-semibold mb-1 relative z-10">
             Smart Contract (Consensus)
          </div>
        </div>

      </div>
    </div>
  );
}
