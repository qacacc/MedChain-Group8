import React, { useState } from 'react';
import BlockchainAnimation from './BlockchainAnimation';
import { 
  AlertTriangle, 
  Layers, 
  Users, 
  Map, 
  BarChart, 
  CheckCircle2, 
  UserSquare2, 
  BriefcaseMedical, 
  Building2, 
  Building, 
  FileCheck2, 
  GraduationCap, 
  ChevronRight,
  Database,
  Lock,
  Globe,
  Milestone,
  HeartPulse,
  Network
} from 'lucide-react';

export default function ContentSections() {
  const [activePersona, setActivePersona] = useState(0);

  // Helper component for background decoration
  const DecorBlobs = ({ colors = ["bg-teal-500", "bg-blue-500"] }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className={`bg-blob w-[400px] h-[400px] ${colors[0]} top-[-10%] left-[-10%]`} />
      <div className={`bg-blob w-[500px] h-[500px] ${colors[1]} bottom-[-10%] right-[-10%]`} style={{ animationDelay: '-5s' }} />
    </div>
  );

  return (
    <div className="w-full flex justify-center items-center flex-col z-10 relative">
      
      {/* 1. VẤN ĐỀ VÀ CƠ HỘI */}
      <div className="w-full bg-gradient-to-b from-white to-red-50 dark:from-[#0B1F3A] dark:to-red-900/10 py-24 px-4 sm:px-8 border-b border-gray-100 dark:border-white/5 relative overflow-hidden">
        <DecorBlobs colors={["bg-red-400/20", "bg-orange-400/20"]} />
        <section className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-[#0E8A6E] dark:text-[#0fb88f] font-bold tracking-widest text-xs uppercase mb-2 animate-fade-in-up">Giai đoạn 1 · Thấu hiểu</div>
        <h2 className="text-4xl md:text-5xl text-[#1a1a2e] dark:text-white mb-6 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>Vấn đề & Cơ hội</h2>
        <p className="text-[#4a5568] dark:text-gray-300 max-w-2xl text-base md:text-lg mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Hệ thống hồ sơ bệnh án hiện tại tạo ra nhiều hệ quả nghiêm trọng cho bệnh nhân, bác sĩ và toàn hệ thống y tế.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Phân mảnh dữ liệu", desc: "Bác sĩ khó truy xuất bệnh sử đầy đủ khi bệnh nhân chuyển tuyến điều trị.", icon: <AlertTriangle size={24} /> },
            { title: "Rủi ro bảo mật", desc: "Dễ bị Ransomware/Hacker tấn công, dữ liệu bị mã hóa đòi tiền chuộc.", icon: <AlertTriangle size={24} /> },
            { title: "Mất quyền kiểm soát", desc: "Bệnh nhân không sở hữu hay kiểm soát dữ liệu sức khỏe của chính mình.", icon: <AlertTriangle size={24} /> },
            { title: "Gian lận bảo hiểm", desc: "Khó xác minh hồ sơ, chậm trễ bồi thường, dễ bị làm giả hồ sơ.", icon: <AlertTriangle size={24} /> },
            { title: "Chi phí lưu trữ", desc: "Bệnh viện tốn chi phí lớn cho hạ tầng lưu trữ tập trung rời rạc.", icon: <AlertTriangle size={24} /> }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="liquid-glass rounded-xl p-6 border-l-4 border-l-[#C0392B] hover:scale-[1.02] transition-transform animate-fade-in-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="text-[#C0392B] mb-3">{item.icon}</div>
              <h3 className="font-semibold text-[#1a1a2e] dark:text-white mb-2 text-base">{item.title}</h3>
              <p className="text-sm text-[#4a5568] dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
        </section>
      </div>

      {/* 2. GIẢI PHÁP BLOCKCHAIN */}
      <div className="w-full bg-[#0a0f18] py-24 px-4 sm:px-8 border-b border-white/5 relative overflow-hidden">
        <DecorBlobs colors={["bg-emerald-500/10", "bg-blue-500/10"]} />
        <section className="max-w-7xl mx-auto w-full relative z-10" id="solution">
          <div className="text-[#0fb88f] font-bold tracking-widest text-xs uppercase mb-2 animate-fade-in-up">Giải pháp · Blockchain EHR</div>
        <h2 className="text-4xl md:text-5xl text-white font-extrabold mb-6 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>Cơ chế mã hoá và Lưu trữ Bệnh án</h2>
        <p className="text-gray-300 max-w-2xl text-base md:text-lg mb-12 leading-relaxed font-bold animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Khám phá bốn đặc điểm cốt lõi giúp xây dựng hệ thống EHR an toàn tuyệt đối, minh bạch và lấy bệnh nhân làm trung tâm.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { icon: <Network size={28} />, title: "Tính Phân Tán", desc: "Dữ liệu EHR lưu đồng bộ trên mạng nhiều node. Hệ thống vận hành ngay cả khi một bệnh viện bị sự cố.", color: "text-blue-400", bg: "bg-blue-400/10" },
            { icon: <Lock size={28} />, title: "Bảo Mật & Bất Biến", desc: "Mọi thông tin y tế được mã hóa mật mã học. Gần như không thể chỉnh sửa hay xóa bỏ trái phép.", color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { icon: <HeartPulse size={28} />, title: "Lấy Bệnh Nhân Làm Trung Tâm", desc: "Bệnh nhân làm chủ dữ liệu qua Private Key. Cấp quyền cho bác sĩ qua Smart Contract.", color: "text-amber-400", bg: "bg-amber-400/10" },
            { icon: <CheckCircle2 size={28} />, title: "Truy Xuất & Minh Bạch", desc: "Mọi thao tác truy cập được ghi lịch sử rõ ràng, không thể xóa — ai truy cập lúc nào đều biết.", color: "text-red-400", bg: "bg-red-400/10" }
          ].map((pillar, idx) => (
            <div 
              key={idx} 
              className="liquid-glass rounded-xl p-8 flex flex-col items-center text-center border border-white/10 shadow-xl hover:shadow-[#0fb88f]/10 transition-all animate-fade-in-up"
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              <div className={`p-4 rounded-xl mb-4 ${pillar.bg} ${pillar.color}`}>
                {pillar.icon}
              </div>
              <h3 className="font-bold text-white mb-3 text-base">{pillar.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
        
        {/* BLOCK HASHING SIMULATION VISUAL */}
        <div className="mt-16 w-full animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Cơ chế mã hoá và Lưu trữ Bệnh án</h3>
            <p className="text-xs text-gray-400 max-w-xl mx-auto italic font-medium">Mỗi hồ sơ sau khi được bác sĩ cập nhật sẽ được đóng gói thành một Block, băm mật mã học (Hash) và nối vào chuỗi bất biến.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="liquid-glass border-[#0E8A6E]/30 p-4 rounded-xl w-40 text-center scale-95 opacity-80">
              <div className="text-[10px] font-mono text-gray-400 mb-1">Block #1041</div>
              <div className="text-[10px] font-mono text-[#0E8A6E] truncate">0x5C3d...</div>
              <div className="mt-2 text-[10px] py-1 bg-gray-100 rounded text-gray-500 uppercase font-bold">Immutable</div>
            </div>
            <div className="liquid-glass border-[#0E8A6E]/50 p-4 rounded-xl w-40 text-center animate-pulse">
              <div className="text-[10px] font-mono text-gray-400 mb-1">Block #1042</div>
              <div className="text-[10px] font-mono text-[#0E8A6E] truncate">0x8F2a...</div>
              <div className="mt-2 text-[10px] py-1 bg-[#e0f5ef] text-[#0E8A6E] rounded uppercase font-bold">Đã mã hoá</div>
            </div>
            <div className="liquid-glass border-teal-500 p-4 rounded-xl w-40 text-center shadow-lg border-2">
              <div className="text-[10px] font-mono text-gray-400 mb-1">Block #1043</div>
              <div className="text-[10px] font-mono text-[#0E8A6E] truncate">0x3E1b...</div>
              <div className="mt-2 text-[10px] py-1 bg-[#0E8A6E] text-white rounded uppercase font-bold">Đã xác minh</div>
            </div>
            <div className="liquid-glass border-dashed border-gray-300 p-4 rounded-xl w-40 text-center flex flex-col items-center justify-center min-h-[100px]">
              <div className="w-4 h-4 border-2 border-[#0fb88f] border-t-transparent rounded-full animate-spin mb-2"></div>
              <div className="text-[10px] text-gray-400 uppercase font-bold animate-pulse">Đang tạo Block...</div>
              <div className="text-[8px] font-mono text-gray-300 mt-1">Gen Hash...</div>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-2 text-[11px] font-bold text-[#0E8A6E]/60 uppercase tracking-widest bg-gray-50 py-3 rounded-full max-w-md mx-auto">
            <span>Proof of Stake</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E8A6E]"></span>
            <span>Smart Contract (Consensus)</span>
          </div>
        </div>

        <div className="mt-16 w-full animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <BlockchainAnimation />
        </div>

        </section>
      </div>

      {/* 3. BÊN LIÊN QUAN */}
      <div className="w-full bg-[#f8f9fc] py-24 px-4 sm:px-8 border-b border-gray-100 dark:border-white/5 relative overflow-hidden">
        <DecorBlobs colors={["bg-teal-500/10", "bg-emerald-500/10"]} />
        <section className="max-w-7xl mx-auto w-full animate-fade-in-up relative z-10" id="stakeholders">
          <div className="text-[#0E8A6E] font-bold tracking-widest text-xs uppercase mb-2 animate-fade-in-up">Bên liên quan · Stakeholders</div>
        <h2 className="text-4xl md:text-5xl text-black mb-6 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>Hệ sinh thái Blockchain EHR</h2>
        <p className="text-black max-w-2xl text-base md:text-lg mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Nhiều nhóm đối tượng với vai trò, quyền lợi và kỳ vọng khác nhau trong toàn hệ sinh thái.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <UserSquare2 size={24} />, name: "Bệnh nhân", role: "Chủ sở hữu dữ liệu — quản lý Private Key, cấp quyền truy cập EHR cá nhân", color: "text-[#0E8A6E]", bg: "bg-[#e0f5ef]" },
            { icon: <BriefcaseMedical size={24} />, name: "Y bác sĩ & Điều dưỡng", role: "Người dùng hàng ngày — truy xuất, cập nhật hồ sơ bệnh nhân theo chuẩn HL7", color: "text-[#0B1F3A]", bg: "bg-[#e8edf5]" },
            { icon: <Building2 size={24} />, name: "Ban quản lý BV", role: "Ra quyết định triển khai, giám sát chuyển đổi số, kỳ vọng giảm chi phí vận hành", color: "text-[#C47D0E]", bg: "bg-[#fef4e0]" },
            { icon: <FileCheck2 size={24} />, name: "Cơ quan Bảo hiểm", role: "Verifier — xác minh Claims tự động qua Smart Contract, chống gian lận", color: "text-[#C0392B]", bg: "bg-[#fdf0ef]" },
            { icon: <Building size={24} />, name: "Chính phủ / Bộ Y tế", role: "Cơ quan quản lý — ban hành chuẩn HL7/FHIR và luật bảo mật dữ liệu", color: "text-[#5B21B6]", bg: "bg-[#f0ecff]" },
            { icon: <GraduationCap size={24} />, name: "Nhà nghiên cứu", role: "Data consumer — khai thác Big Data ẩn danh phục vụ nghiên cứu dịch tễ học", color: "text-[#065F46]", bg: "bg-[#ecfdf5]" },
            { icon: <Database size={24} />, name: "Cộng đồng", role: "Hưởng lợi từ y tế minh bạch, giảm thời gian chờ & sai sót y khoa", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: <Globe size={24} />, name: "Môi trường", role: "Giảm hồ sơ giấy, sổ khám, phim X-quang nhựa — giảm rác thải y tế", color: "text-green-600", bg: "bg-green-50" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                  {item.icon}
                </div>
                <div className="font-bold text-[#1a1a2e]">{item.name}</div>
              </div>
              <div className="text-xs sm:text-sm text-[#4a5568] leading-relaxed">{item.role}</div>
            </div>
          ))}
        </div>
        </section>
      </div>

      {/* 5. RICH PICTURE - BỨC TRANH HỆ SINH THÁI */}
      <div className="w-full bg-[#f8fafe] dark:bg-[#0B1F3A] py-24 px-4 sm:px-8 border-b border-gray-100 dark:border-white/5 relative overflow-hidden">
        <DecorBlobs colors={["bg-blue-400/10", "bg-cyan-400/10"]} />
        <section className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-[#0E8A6E] dark:text-[#0fb88f] font-bold tracking-widest text-xs uppercase mb-2 animate-fade-in-up">Giai đoạn 2 · Rich Picture</div>
          <h2 className="text-4xl md:text-5xl text-[#1a1a2e] dark:text-white mb-6 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>V. Rich Picture - 9 Bước Vận Hành</h2>
          <p className="text-[#4a5568] dark:text-gray-400 max-w-2xl text-base md:text-lg mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Mô tả toàn bộ chu trình luồng dữ liệu từ lúc khởi tạo đến khi được ứng dụng thực tế.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "01", title: "Xây Dựng Nền Tảng", desc: "Thiết lập hạ tầng Blockchain và ứng dụng App Cấp Quyền chuẩn HL7/FHIR." },
              { id: "02", title: "Làm Chủ Dữ Liệu", desc: "Bệnh nhân nắm giữ Private Key và điều khiển quyền truy cập qua App." },
              { id: "03", title: "Ghi Nhận Bệnh Sử", desc: "Bác sĩ tại phòng khám ghi mới hồ sơ EHR chuẩn HL7 vào hệ thống." },
              { id: "04", title: "Đóng Gói & Mã Hóa", desc: "Chuỗi khối dữ liệu EHR được nối xích, phân tán và không thể sửa xóa." },
              { id: "05", title: "Truy Xuất Khẩn Cấp", desc: "Xe cấp cứu truy cập nhanh dữ liệu nhóm máu/dị ứng qua Smart Contract khẩn cấp." },
              { id: "06", title: "Vô Hiệu Rủi Ro", desc: "Hệ thống phân tán khiến Hacker không có điểm tập trung để tấn công." },
              { id: "07", title: "Đối Soát Bảo Hiểm", desc: "Cơ quan Bảo hiểm đối chiếu Claims tự động qua Smart Contract minh bạch." },
              { id: "08", title: "Khai Thác Big Data", desc: "Nhà nghiên cứu trích xuất dữ liệu lớn ẩn danh phục vụ dịch tễ học." },
              { id: "09", title: "Giám Sát Vĩ Mô", desc: "Bộ Y tế giám sát toàn bộ hệ thống qua hành lang pháp lý chuẩn hóa." }
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="liquid-glass rounded-xl p-6 border border-gray-100 dark:border-white/5 relative overflow-hidden group animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute -right-4 -bottom-4 text-8xl font-bold text-gray-100 dark:text-white/5 group-hover:text-teal/10 transition-colors pointer-events-none">
                  {step.id}
                </div>
                <h3 className="font-semibold text-[#1a1a2e] dark:text-white mb-2 text-base relative z-10">{step.title}</h3>
                <p className="text-sm text-[#4a5568] dark:text-gray-400 relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 6. PERSONA MAP */}
      <div className="w-full bg-gradient-to-br from-[#f8fafe] to-[#e8edf5] dark:from-indigo-950/20 dark:to-blue-950/20 py-24 px-4 sm:px-8 border-b border-gray-100 dark:border-white/5 relative overflow-hidden">
        <DecorBlobs colors={["bg-blue-400/10", "bg-indigo-400/10"]} />
        <section className="max-w-7xl mx-auto w-full relative z-10" id="personas">
          <div className="text-[#0E8A6E] dark:text-[#0fb88f] font-bold tracking-widest text-xs uppercase mb-2 animate-fade-in-up">Giai đoạn 3 · Persona Map</div>
        <h2 className="text-4xl md:text-5xl text-[#1a1a2e] dark:text-white mb-6 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>VI. Persona - Chân Dung Người Dùng</h2>
        <p className="text-[#4a5568] dark:text-gray-400 max-w-2xl text-base md:text-lg mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          3 Persona đại diện dựa trên phỏng vấn sâu và quan sát thực tế với 12 người dùng.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {["Bệnh nhân mãn tính", "Bác sĩ chuyên khoa", "Nhân viên bảo hiểm"].map((tab, idx) => (
            <button 
              key={idx}
              onClick={() => setActivePersona(idx)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePersona === idx 
                ? "bg-[#0B1F3A] text-white" 
                : "bg-white border border-gray-200 dark:bg-white/5 text-[#4a5568] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="liquid-glass rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
          {[
            {
              avatar: "VA",
              name: "Nguyễn Văn An",
              meta: "58 tuổi · Công nhân nghỉ hưu · Tiểu đường, Tăng huyết áp",
              quote: '"Tôi mệt mỏi lắm khi phải mang theo cả chồng hồ sơ mỗi lần khám. Tôi sợ nhất là bác sĩ mới không biết mình đang uống thuốc gì."',
              goals: ["Khám nhanh, không giải thích lại bệnh sử", "Xét nghiệm không bị làm lại nhiều lần", "Bảo mật thông tin nhạy cảm cá nhân", "Hồ sơ sẵn sàng khi cấp cứu"],
              pains: ["Sổ khám giấy dễ mất, dễ hỏng", "Bị yêu cầu xét nghiệm lại khi chuyển tuyến", "Sợ thông tin bị rò rỉ cho bên thứ 3", "Không biết ai đã truy cập hồ sơ mình"],
              tech: ["Smartphone cơ bản", "Dùng Zalo, Facebook thành thạo", "Chưa quen công nghệ phức tạp", "Cần giao diện rất đơn giản"]
            },
            {
              avatar: "TM",
              name: "BS. Trần Minh",
              meta: "42 tuổi · Bác sĩ Nội khoa · BV Chợ Rẫy, TP.HCM",
              quote: '"Nhiều lần tôi phải chẩn đoán \'mù\' vì không có lịch sử dùng thuốc của bệnh nhân từ bệnh viện khác. Rất nguy hiểm!"',
              goals: ["Truy xuất đầy đủ bệnh sử trong 30 giây", "Giảm sai sót do thiếu thông tin lịch sử", "Cập nhật hồ sơ nhanh, không nhập lại", "Đảm bảo an toàn y tế và pháp lý"],
              pains: ["Thiếu dữ liệu lịch sử bệnh nhân", "HIS cũ chậm, hay bị lỗi hệ thống", "Không liên thông với phòng khám tư", "Tốn thời gian hỏi bệnh sử từ đầu"],
              tech: ["Thành thạo hệ thống HIS bệnh viện", "Dùng tablet, laptop hàng ngày", "Sẵn sàng học công nghệ mới", "Ưu tiên tốc độ và độ chính xác"]
            },
            {
              avatar: "LM",
              name: "Lê Thị Mai",
              meta: "42 tuổi · Trưởng phòng xét duyệt Claims · BHYT, 15 năm KN",
              quote: '"Chúng tôi xử lý 500 hồ sơ BH mỗi tuần. Ít nhất 15–20% có dấu hiệu gian lận nhưng rất khó chứng minh vì hồ sơ có thể bị chỉnh sửa."',
              goals: ["Xác minh tự động, giảm tải thủ công", "Phát hiện gian lận sớm và chính xác", "Rút ngắn xử lý Claims: 30→3 ngày", "Dashboard tổng hợp KPI thời gian thực"],
              pains: ["Hồ sơ dễ bị giả mạo, không có cơ chế chống", "Xử lý thủ công tốn kém nhân lực", "Liên lạc với bệnh viện mất nhiều thời gian"],
              tech: ["Thành thạo Excel, phần mềm nghiệp vụ", "Mong dashboard tổng hợp dữ liệu", "Cần hệ thống tự động hóa cao", "Ưu tiên độ tin cậy dữ liệu"]
            }
          ].map((persona, idx) => (
            <div key={idx} className={`${activePersona === idx ? 'block' : 'hidden'} animate-fade-in-up`}>
              <div className="bg-[#0B1F3A] p-6 flex flex-col lg:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center text-white text-xl font-bold shrink-0 font-serif">
                  {persona.avatar}
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-white">{persona.name}</h3>
                  <p className="text-sm text-white/60 mt-1">{persona.meta}</p>
                </div>
                <div className="bg-white/5 border-l-2 border-teal2 p-4 rounded-r-lg max-w-sm mt-4 lg:mt-0">
                  <p className="text-sm text-white/70 italic">
                    {persona.quote}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-white/10 p-6 bg-white dark:bg-transparent">
                <div className="p-4 pt-0 md:pt-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Mục tiêu</h4>
                  <ul className="space-y-3">
                    {persona.goals.map((g, i) => (
                      <li key={i} className="text-sm text-[#4a5568] dark:text-gray-300 flex items-start gap-2">
                        <span className="text-[#0E8A6E] dark:text-[#0fb88f] mt-0.5">•</span> {g}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 pt-6 md:pt-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Nỗi đau</h4>
                  <ul className="space-y-3">
                    {persona.pains.map((p, i) => (
                      <li key={i} className="text-sm text-[#4a5568] dark:text-gray-300 flex items-start gap-2">
                        <span className="text-[#0E8A6E] dark:text-[#0fb88f] mt-0.5">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 pt-6 md:pt-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Mức độ công nghệ</h4>
                  <ul className="space-y-3">
                    {persona.tech.map((t, i) => (
                      <li key={i} className="text-sm text-[#4a5568] dark:text-gray-300 flex items-start gap-2">
                        <span className="text-[#0E8A6E] dark:text-[#0fb88f] mt-0.5">•</span> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>
      </div>

      {/* 7. EMPATHY MAP & 8. JOURNEY MAP */}
      <div className="w-full bg-white dark:bg-black/20 py-24 px-4 sm:px-8 border-b border-gray-100 dark:border-white/5 relative overflow-hidden">
        <DecorBlobs colors={["bg-teal-400/10", "bg-cyan-400/10"]} />
        <section className="max-w-7xl mx-auto w-full relative z-10" id="empathy">
          <div className="text-[#0E8A6E] dark:text-[#0fb88f] font-bold tracking-widest text-xs uppercase mb-2 animate-fade-in-up">Giai đoạn 3 · Thấu cảm</div>
          <h2 className="text-4xl md:text-5xl text-[#1a1a2e] dark:text-white mb-6 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>VII. Empathy Map - Bản Đồ Đồng Cảm</h2>
          
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
            {/* Bệnh nhân An */}
            <div className="liquid-glass rounded-2xl p-8 border border-gray-100 dark:border-white/5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-lg">VA</div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] dark:text-white">Nguyễn Văn An</h3>
                  <p className="text-xs text-gray-500">Bệnh nhân mãn tính</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Nói gì</h4>
                  <p className="text-xs italic text-gray-600 dark:text-gray-300">"Đi khám lại phải kể chuyện bệnh từ đầu mệt quá"</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Nghĩ gì</h4>
                  <p className="text-xs italic text-gray-600 dark:text-gray-300">"Lo lắng: Thông tin hồ sơ bị bán cho công ty quảng cáo?"</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Làm gì</h4>
                  <p className="text-xs italic text-gray-600 dark:text-gray-300">"Chụp ảnh xét nghiệm để lưu trong điện thoại"</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Cảm gì</h4>
                  <p className="text-xs italic text-gray-600 dark:text-gray-300">"Bất an khi bác sĩ mới không đủ dữ liệu chẩn đoán"</p>
                </div>
              </div>
            </div>

            {/* Bác sĩ Minh */}
            <div className="liquid-glass rounded-2xl p-8 border border-gray-100 dark:border-white/5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center font-bold text-teal-600 dark:text-teal-400 text-lg">TM</div>
                <div>
                  <h3 className="font-bold text-[#1a1a2e] dark:text-white">BS. Trần Minh</h3>
                  <p className="text-xs text-gray-500">Bác sĩ Nội khoa</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Nói gì</h4>
                  <p className="text-xs italic text-gray-600 dark:text-gray-300">"Cần dữ liệu từ BV khác nhưng phải chờ fax cả ngày"</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Nghĩ gì</h4>
                  <p className="text-xs italic text-gray-600 dark:text-gray-300">"Chẩn đoán thiếu thông tin có thể gây hại bệnh nhân"</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Làm gì</h4>
                  <p className="text-xs italic text-gray-600 dark:text-gray-300">"Gọi điện cho BV cũ của bệnh nhân xin hồ sơ"</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-2">Cảm gì</h4>
                  <p className="text-xs italic text-gray-600 dark:text-gray-300">"Áp lực khi phải ra quyết định thiếu dữ liệu lịch sử"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOMER JOURNEY MAP */}
        <section className="max-w-7xl mx-auto w-full animate-fade-in-up mt-32" id="journey">
          <div className="text-[#0E8A6E] dark:text-[#0fb88f] font-bold tracking-widest text-xs uppercase mb-2">Giai đoạn 3 · Hành trình</div>
          <h2 className="text-3xl md:text-4xl text-[#1a1a2e] dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>VIII. Customer Journey Map</h2>
          
          <div className="mt-12 overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/10 shadow-xl">
            <table className="w-full text-left border-collapse bg-white dark:bg-transparent min-w-[800px]">
              <thead>
                <tr className="bg-[#0B1F3A] text-white">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Giai Đoạn</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Đặt lịch</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Khám & Chẩn đoán</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Xét nghiệm</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Chuyển tuyến</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Thanh toán & BH</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                <tr className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <td className="p-4 font-bold text-gray-400 text-xs uppercase">Điểm đau (Cũ)</td>
                  <td className="p-4 text-xs text-red-500">Không có lịch sử khám để tham khảo</td>
                  <td className="p-4 text-xs text-red-500">Phải giải thích từ đầu, thiếu thông tin</td>
                  <td className="p-4 text-xs text-red-500">BV mới không nhận kết quả XN từ BV cũ</td>
                  <td className="p-4 text-xs text-red-500">Hồ sơ giấy dễ mất, không liên thông</td>
                  <td className="p-4 text-xs text-red-500">Chờ BH xác minh mất 2-4 tuần</td>
                </tr>
                <tr className="bg-teal-50/30 dark:bg-teal-900/10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <td className="p-4 font-bold text-[#0E8A6E] text-xs uppercase">Giải pháp Blockchain</td>
                  <td className="p-4 text-xs text-[#0E8A6E] font-medium">Đặt lịch online, bác sĩ xem trước bệnh sử</td>
                  <td className="p-4 text-xs text-[#0E8A6E] font-medium">Truy cập EHR đầy đủ sau khi được cấp quyền</td>
                  <td className="p-4 text-xs text-[#0E8A6E] font-medium">Kết quả XN lưu On-chain, BV nào cũng truy xuất</td>
                  <td className="p-4 text-xs text-[#0E8A6E] font-medium">Hồ sơ tự động chuyển theo bệnh nhân tức thì</td>
                  <td className="p-4 text-xs text-[#0E8A6E] font-medium">Smart Contract tự động giải quyết Claims cực nhanh</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="max-w-7xl mx-auto w-full animate-fade-in-up mt-32" id="compare">
          <div className="text-[#0E8A6E] dark:text-[#0fb88f] font-bold tracking-widest text-xs uppercase mb-2">Giai đoạn 3 · Đối soát</div>
          <h2 className="text-3xl md:text-4xl text-[#1a1a2e] dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>IX. So Sánh: Cũ vs. Blockchain EHR</h2>
          
          <div className="mt-12 overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/10 shadow-xl">
            <table className="w-full text-left border-collapse bg-white dark:bg-transparent min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500">Tiêu chí</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-red-500">Hệ Thống Truyền Thống</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-[#0E8A6E]">Blockchain EHR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {[
                  { c: "Kiến trúc lưu trữ", o: "Máy chủ tập trung, dễ bị tấn công", n: "Phân tán (P2P), không điểm tập trung duy nhất" },
                  { c: "Bảo mật dữ liệu", o: "Dễ bị Ransomware, Hacker tấn công", n: "Mã hóa mật mã học, gần như không thể hack" },
                  { c: "Quyền kiểm soát", o: "Bệnh viện giữ và quản lý", n: "Bệnh nhân làm chủ qua Private Key" },
                  { c: "Tính bất biến", o: "Dễ sửa, không có audit log đầy đủ", n: "Không thể sửa xóa, audit log vĩnh viễn" },
                  { c: "Xử lý Claims BH", o: "2-4 tuần/hồ sơ, thủ công", n: "Vài phút qua Smart Contract tự động" },
                  { c: "Môi trường", o: "Nhiều hồ sơ giấy, phim X-quang", n: "Xóa bỏ hoàn toàn hồ sơ giấy" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-300">{row.c}</td>
                    <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{row.o}</td>
                    <td className="p-4 text-sm text-[#0E8A6E] dark:text-[#0fb88f] font-medium">{row.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* 5. KIẾN TRÚC */}
      <div className="w-full bg-[#f5f7fa] dark:bg-black/40 py-24 px-4 sm:px-8 border-b border-gray-100 dark:border-white/5 relative">
        {/* Subtle grid background for architecture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <section className="max-w-7xl mx-auto w-full animate-fade-in-up relative z-10" id="architecture">
          <div className="text-[#0E8A6E] dark:text-[#0fb88f] font-bold tracking-widest text-xs uppercase mb-2">Giai đoạn 4 · Prototype</div>
        <h2 className="text-3xl md:text-4xl text-[#1a1a2e] dark:text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Nguyên mẫu kiến trúc 4 lớp</h2>
        <p className="text-[#4a5568] dark:text-gray-400 max-w-2xl text-sm md:text-base mb-10 leading-relaxed">
          Thiết kế phân lớp rõ ràng đảm bảo bảo mật, hiệu năng và khả năng mở rộng theo quy mô.
        </p>

        <div className="flex flex-col gap-4">
          {[
            { num: 1, name: "Frontend — Lớp giao diện người dùng", comps: ["Patient App (iOS/Android)", "Doctor Portal (Web)", "Insurance Dashboard", "React Native · React.js · TypeScript"], bg: "bg-[#0B1F3A]" },
            { num: 2, name: "Middleware — Lớp chuẩn hóa & API", comps: ["API Gateway", "HL7/FHIR Converter", "Authentication Service", "Node.js · FHIR R4 · OAuth 2.0"], bg: "bg-[#1a5276]" },
            { num: 3, name: "Blockchain Core — Lõi phi tập trung", comps: ["EHRRegistry Smart Contract", "AccessControl Contract", "InsuranceClaims Contract", "Hyperledger Fabric / Ethereum"], bg: "bg-[#0E8A6E]" },
            { num: 4, name: "Security — Lớp bảo mật nền tảng", comps: ["Key Management System (PKI)", "AES-256 + RSA Encryption", "Audit Trail Engine", "HSM · End-to-End Encryption"], bg: "bg-[#1e8449]" }
          ].map((layer, idx) => (
            <div 
              key={idx} 
              className="liquid-glass rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 animate-fade-in-up"
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              <div className={`${layer.bg} px-6 py-4 flex items-center justify-start gap-4`}>
                <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center font-bold text-white shadow-inner">{layer.num}</div>
                <h3 className="font-semibold text-white tracking-wide">{layer.name}</h3>
              </div>
              <div className="px-6 py-5 flex flex-wrap gap-3 bg-white dark:bg-transparent">
                {layer.comps.map((comp, i) => (
                  <span key={i} className={`bg-[#f5f7fa] dark:bg-black/30 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-[#4a5568] dark:text-gray-300 shadow-sm`}>
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        </section>
      </div>

      {/* NEW: 10. THÁCH THỨC & HẠN CHẾ */}
      <div className="w-full bg-[#fdf0ef] dark:bg-red-950/10 py-24 px-4 sm:px-8 border-b border-gray-100 dark:border-white/5 relative overflow-hidden">
        <DecorBlobs colors={["bg-red-500/10", "bg-orange-500/10"]} />
        <section className="max-w-7xl mx-auto w-full relative z-10" id="challenges">
          <div className="text-[#C0392B] dark:text-red-500 font-bold tracking-widest text-xs uppercase mb-2 animate-fade-in-up">Giai đoạn 5 · Phân tích</div>
          <h2 className="text-4xl md:text-5xl text-[#1a1a2e] dark:text-white mb-6 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>X. Thách thức & Hạn chế</h2>
          <p className="text-[#4a5568] dark:text-gray-400 max-w-2xl text-base md:text-lg mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Mặc dù Blockchain EHR mang lại nhiều giá trị đột phá, việc triển khai tại Việt Nam vẫn đối mặt với nhiều rào cản.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Pháp Lý & Quy Định", d: "Việt Nam chưa có khung pháp lý cụ thể cho Blockchain trong y tế. Cần sự phê duyệt từ Bộ Y tế." },
              { t: "Chi Phí Triển Khai", d: "Chi phí ban đầu cao: hạ tầng node, đào tạo nhân sự, tích hợp HIS cũ của hàng ngàn bệnh viện." },
              { t: "Khả Năng Mở Rộng", d: "Dữ liệu hình ảnh y tế (DICOM/MRI) rất lớn, khó lưu trực tiếp On-chain. Cần kiến trúc Hybrid." },
              { t: "Rào Cản Người Dùng", d: "Người cao tuổi kém công nghệ khó quản lý Private Key. Rủi ro mất khóa là mất vĩnh viễn dữ liệu." },
              { t: "Tích Hợp Hệ Thống Cũ", d: "Hàng nghìn bệnh viện dùng HIS khác nhau, không tương thích. Cần thời gian migrate dữ liệu." },
              { t: "Bảo Mật Private Key", d: "Cần thiết kế cơ chế Social Recovery hoặc Guardian Key để cứu dữ liệu khi bệnh nhân mất khóa." }
            ].map((item, idx) => (
              <div key={idx} className="liquid-glass rounded-xl p-6 border-l-4 border-l-amber-500 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <h3 className="font-bold text-[#1a1a2e] dark:text-white mb-2 text-sm uppercase tracking-tight">{item.t}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 6. LỘ TRÌNH */}
      <div className="w-full bg-[#f8f9fc] py-24 px-4 sm:px-8 relative overflow-hidden">
        <DecorBlobs colors={["bg-teal-500/10", "bg-blue-500/10"]} />
        <section className="max-w-7xl mx-auto w-full relative z-10" id="roadmap">
          <div className="text-[#0E8A6E] font-bold tracking-widest text-xs uppercase mb-2 animate-fade-in-up">Giai đoạn 5 · Tầm nhìn</div>
        <h2 className="text-4xl md:text-5xl text-[#1a1a2e] mb-6 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>XI. Lộ Trình Triển Khai (5 Năm)</h2>
        <p className="text-[#4a5568] max-w-2xl text-base md:text-lg mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Từ pilot tại 1–2 cơ sở y tế đến hệ thống blockchain EHR chuẩn quốc gia và khu vực ASEAN.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { phase: "Giai đoạn 1", title: "Pilot & MVP", time: "6 – 12 tháng đầu", items: ["Hoàn thiện MVP: Patient App, Doctor Portal, Emergency QR", "Triển khai thí điểm tại 1–2 cơ sở y tế", "Tham gia Sandbox Bộ Y tế", "Hợp tác nhà cung cấp BaaS"], color: "text-[#0E8A6E]", border: "border-[#0E8A6E]/40", bg: "bg-[#e0f5ef]" },
            { phase: "Giai đoạn 2", title: "Mở rộng quy mô", time: "1 – 3 năm", items: ["Tích hợp Smart Contract Claims BH", "Mở rộng 10–20 bệnh viện TP.HCM", "Phát triển AI/ML phân tích Big Data", "Tích hợp BHXH Việt Nam"], color: "text-[#0B1F3A]", border: "border-[#0B1F3A]/40", bg: "bg-[#e8edf5]" },
            { phase: "Giai đoạn 3", title: "Quy mô quốc gia", time: "3 – 5 năm", items: ["Đề xuất chuẩn quốc gia", "Mở rộng sang dược phẩm, Telemedicine", "Kết nối dữ liệu y tế ASEAN", "Tương thích mô hình EU"], color: "text-[#142d52]", border: "border-[#142d52]/40", bg: "bg-[#f0ecff]" }
          ].map((rm, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl border border-gray-100 animate-fade-in-up"
              style={{ animationDelay: `${idx * 200}ms` }}
            >
              <div className={`absolute top-0 right-0 w-2 h-full opacity-50 ${rm.bg} border-r-4 ${rm.border}`}></div>
              <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${rm.color}`}>{rm.phase}</div>
              <h3 className="text-xl font-bold text-[#1a1a2e] mb-1">{rm.title}</h3>
              <div className="text-sm text-gray-400 mb-8 font-medium">{rm.time}</div>
              
              <ul className="space-y-4">
                {rm.items.map((item, i) => (
                  <li key={i} className="text-sm text-[#4a5568] flex items-start gap-2 group-hover:text-black transition-colors">
                    <ChevronRight size={18} className={`shrink-0 ${rm.color} mt-0.5`} />
                    <span className="leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </section>
      </div>

      {/* NEW: 12. KẾT LUẬN & TÀI LIỆU THAM KHẢO */}
      <div className="w-full bg-[#0B1F3A] py-32 px-4 sm:px-8 relative overflow-hidden">
        <DecorBlobs colors={["bg-blue-600/10", "bg-teal-600/10"]} />
        <section className="max-w-7xl mx-auto w-full relative z-10" id="conclusion">
          <div className="text-[#0fb88f] font-bold tracking-widest text-xs uppercase mb-4 animate-fade-in-up">Kết thúc · Nhóm 8</div>
          <h2 className="text-5xl md:text-6xl text-white mb-8 animate-blur-in" style={{ fontFamily: "'Instrument Serif', serif" }}>XII. Kết Luận & Tương Lai</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-[#0fb88f] text-lg font-bold mb-4">Mật Mã Học</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Bảo mật tuyệt đối, chống giả mạo và không thể sửa xóa hồ sơ đã ghi.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-[#0fb88f] text-lg font-bold mb-4">Liên Thông</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Chia sẻ dữ liệu thời gian thực giữa các bệnh viện, giảm 80% sai sót y khoa.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h3 className="text-[#0fb88f] text-lg font-bold mb-4">Làm Chủ</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Bệnh nhân thực sự nắm giữ chìa khóa dữ liệu sức khỏe của chính mình.</p>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-12"></div>
          
          <div className="text-left w-full max-w-4xl mx-auto">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6 border-l-4 border-[#0fb88f] pl-4">Tài liệu tham khảo chính</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-gray-500 font-mono">
              <p>• IBM (2024). What is Blockchain? ibm.com/think/topics/blockchain</p>
              <p>• Mayer et al. (2020). Health Informatics Journal - Blockchain Systematic Review.</p>
              <p>• Quyết định số 5316/QĐ-BYT (22/12/2020). Chuyển đổi số y tế VN đến 2030.</p>
              <p>• Estonia e-Health Foundation. Case study: e-estonia.com/solutions/healthcare</p>
              <p>• HL7 International. FHIR R4 Specification. hl7.org/fhir</p>
              <p>• WHO Digital Health Strategy 2020-2025.</p>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
