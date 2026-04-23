import { useState, useEffect, useRef, useCallback } from "react";
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

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════ */
const FONT_HEADING = "'Outfit', sans-serif";
const FONT_BODY = "'Public Sans', system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

const COLOR = {
  cyan:   { text: "#008b8b", glow: "rgba(0,139,139,0.12)", bg: "rgba(0,139,139,0.06)", border: "rgba(0,139,139,0.2)" },
  blue:   { text: "#005eb8", glow: "rgba(0,94,184,0.12)",  bg: "rgba(0,94,184,0.06)",  border: "rgba(0,94,184,0.2)" },
  purple: { text: "#6b21a8", glow: "rgba(107,33,168,0.12)", bg: "rgba(107,33,168,0.06)", border: "rgba(107,33,168,0.2)" },
  amber:  { text: "#b45309", glow: "rgba(180,83,9,0.12)",  bg: "rgba(180,83,9,0.08)",  border: "rgba(180,83,9,0.2)" },
  green:  { text: "#15803d", glow: "rgba(21,128,61,0.12)",  bg: "rgba(21,128,61,0.06)",  border: "rgba(21,128,61,0.2)" },
  red:    { text: "#b91c1c", glow: "rgba(185,28,28,0.12)",  bg: "rgba(185,28,28,0.06)",  border: "rgba(185,28,28,0.2)" },
};

/* ═══════════════════════════════════════════════════════
   DATA TYPES & FIXTURES
═══════════════════════════════════════════════════════ */
interface EHRRecord {
  id: string; date: string; hospital: string; doctor: string;
  specialty: string; diagnosis: string; icd10: string;
  vitals: { bp: string; pulse: number; temp: string; spo2: number };
  medicines: { name: string; dose: string; freq: string; route: string; dur: string }[];
  tests: { label: string; value: string; unit: string; range: string; status: "normal" | "high" | "low" }[];
  notes: string; hash: string; blockId: number;
}
interface PatientProfile {
  name: string; id: string; dob: string; gender: string; bloodType: string;
  weight: number; height: number; bmi: number; nationality: string;
  address: string; ice: { name: string; relation: string; phone: string };
  organDonor: boolean; insurance: { provider: string; policy: string; tier: string; expiry: string };
}
interface AccessGrant {
  doctorId: string; doctorName: string; specialty: string;
  hospital: string; grantedAt: string; expires: string; scope: string;
}
interface InsuranceClaim {
  id: string; patient: string; patientId: string; hospital: string;
  diagnosis: string; amount: number; paidAmount?: number; date: string;
  status: "pending" | "verified" | "rejected"; blockHash: string; autoScore: number;
}
interface TxLog { time: string; action: string; actor: string; blockId: number; type: string; }

const PATIENT_DATA: PatientProfile = {
  name: "Nguyễn Văn An", id: "N1-234.567.890.12", dob: "12/05/1968", gender: "Nam", bloodType: "O+",
  weight: 72, height: 170, bmi: 24.9, nationality: "Việt Nam",
  address: "123 Lê Lợi, Quận 1, TP.HCM",
  ice: { name: "Nguyễn Thu Hà", relation: "Vợ", phone: "0908 123 456" },
  organDonor: true,
  insurance: { provider: "BHYT Việt Nam", policy: "GD4-79-12-001-00234", tier: "Gold (Hạng A)", expiry: "31/12/2026" }
};

const RECORDS: EHRRecord[] = [
  {
    id: "EHR-2026-001", date: "2026-03-15", hospital: "BV Chợ Rẫy",
    doctor: "BS. Trần Minh", specialty: "Nội khoa",
    diagnosis: "Tăng huyết áp vô căn — Đái tháo đường không phụ thuộc Insulin", icd10: "I10 / E11.9",
    vitals: { bp: "145/90", pulse: 82, temp: "36.7", spo2: 98 },
    medicines: [
      { name: "Amlodipine", dose: "5mg", freq: "1 lần/ngày", route: "p.o", dur: "30 ngày" },
      { name: "Metformin", dose: "500mg", freq: "2 lần/ngày", route: "p.o", dur: "30 ngày" }
    ],
    tests: [
      { label: "Glucose lúc đói", value: "8.4", unit: "mmol/L", range: "3.9 - 6.4", status: "high" },
      { label: "HbA1c", value: "7.2", unit: "%", range: "4.0 - 6.0", status: "high" }
    ],
    notes: "Bệnh nhân tuân thủ điều trị nhưng chưa kiểm soát tốt đường huyết. Đề xuất tăng liều Metformin nếu chỉ số không giảm sau 15 ngày. Khuyến khích tập thể dục nhẹ.",
    hash: "0x5C3d8f2a1b9e4c7d6f3a", blockId: 1041,
  },
  {
    id: "EHR-2026-002", date: "2026-02-10", hospital: "BV Đại học Y Dược TP.HCM",
    doctor: "BS. Nguyễn Lan Anh", specialty: "Hô hấp",
    diagnosis: "Viêm phổi vi khuẩn, không phân loại — COPD cấp", icd10: "J15.9 / J44.1",
    vitals: { bp: "120/80", pulse: 95, temp: "38.5", spo2: 94 },
    medicines: [
      { name: "Amoxicillin", dose: "875mg", freq: "2 lần/ngày", route: "p.o", dur: "7 ngày" },
      { name: "Salbutamol", dose: "100mcg", freq: "Khi cần", route: "Inh", dur: "14 ngày" }
    ],
    tests: [
      { label: "CRP", value: "84", unit: "mg/L", range: "< 5", status: "high" },
      { label: "WBC", value: "14.2", unit: "G/L", range: "4.0 - 10.0", status: "high" }
    ],
    notes: "Đáp ứng tốt với kháng sinh. SPO2 cải thiện từ 91% lên 94%. Tiếp tục theo dõi hô hấp tại nhà.",
    hash: "0x8F2a3e1c9b4d7f0a2c5e", blockId: 1038,
  }
];

const ACCESS_GRANTS: AccessGrant[] = [
  {
    doctorId: "BST-A12", doctorName: "BS. Trần Minh", specialty: "Nội khoa",
    hospital: "BV Chợ Rẫy", grantedAt: "2026-03-14",
    expires: "2026-04-14", scope: "Đọc toàn bộ EHR",
  },
];

const DOCTORS_DB: AccessGrant[] = [
  { doctorId: "BST-B03", doctorName: "BS. Nguyễn Lan Anh", specialty: "Hô hấp", hospital: "BV Đại học Y Dược", grantedAt: "", expires: "30 ngày", scope: "" },
  { doctorId: "BST-C17", doctorName: "BS. Phạm Đức Long", specialty: "Tim mạch", hospital: "BV Tim Hà Nội", grantedAt: "", expires: "30 ngày", scope: "" },
  { doctorId: "BST-D09", doctorName: "BS. Lê Minh Tú", specialty: "Thần kinh", hospital: "BV 115", grantedAt: "", expires: "30 ngày", scope: "" },
];

const CLAIMS: InsuranceClaim[] = [
  { id: "CLM-2026-0891", patient: "Nguyễn Văn An", patientId: "N1-234.567.890.12", hospital: "BV Chợ Rẫy", diagnosis: "Tăng huyết áp độ II, Tiểu đường type 2", amount: 4500000, paidAmount: 4050000, date: "2026-03-16", status: "verified", blockHash: "0x5C3d...", autoScore: 98 },
  { id: "CLM-2026-0885", patient: "Lê Thị Bích", patientId: "N1-567.234.111.08", hospital: "BV Đại học Y Dược", diagnosis: "Phẫu thuật nội soi khớp gối", amount: 12000000, date: "2026-03-10", status: "pending", blockHash: "0x9A1f...", autoScore: 73 },
  { id: "CLM-2026-0879", patient: "Phạm Văn Tuấn", patientId: "N1-789.012.345.66", hospital: "BV 115", diagnosis: "Gãy xương cánh tay phải", amount: 3200000, date: "2026-03-05", status: "rejected", blockHash: "0x2E7c...", autoScore: 12 },
  { id: "CLM-2026-0872", patient: "Trần Thị Mai", patientId: "N1-321.654.987.44", hospital: "BV Từ Dũ", diagnosis: "Sinh mổ — thai 38 tuần", amount: 7800000, paidAmount: 7020000, date: "2026-02-28", status: "verified", blockHash: "0x6B4d...", autoScore: 99 },
  { id: "CLM-2026-0864", patient: "Hoàng Văn Nam", patientId: "N1-444.555.666.77", hospital: "BV Nhi đồng 1", diagnosis: "Viêm phế quản cấp", amount: 1800000, date: "2026-02-20", status: "pending", blockHash: "0xA2B1...", autoScore: 61 },
];

const INIT_TX: TxLog[] = [
  { time: "19:28:05", action: "Phê duyệt yêu cầu bồi thường CLM-2026-0891", actor: "Hợp đồng thông minh", blockId: 1043, type: "contract" },
  { time: "19:24:12", action: "Cấp quyền truy cập cho BS. Trần Minh", actor: "Bệnh nhân Nguyễn Văn An", blockId: 1042, type: "access" },
  { time: "19:10:30", action: "Ghi nhận hồ sơ EHR-2026-001 vào chuỗi", actor: "BS. Trần Minh", blockId: 1041, type: "ehr" },
];

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════ */
function GlowBadge({ label, color, icon }: { label: string; color: keyof typeof COLOR; icon?: string }) {
  const c = COLOR[color];
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border shadow-sm transition-all hover:scale-105"
      style={{ color: c.text, background: c.bg, borderColor: c.border }}>
      {icon && <MaterialIcon icon={icon} size={14} fill={1}/>}
      {label}
    </span>
  );
}

function SystemStatusBar({ blockId }: { blockId: number }) {
  return (
    <div className="w-full bg-slate-900 text-white py-1.5 px-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: FONT_MONO }}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
          NETWORK LIVE
        </div>
        <div className="hidden sm:block opacity-50">LATENCY: 24ms</div>
        <div className="hidden md:block opacity-50">NODES: 128 ACTIVE</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="opacity-50">CURRENT BLOCK:</span>
        <span className="text-cyan-400">#{blockId}</span>
      </div>
    </div>
  );
}

function PatientIdentityCard({ profile }: { profile: PatientProfile }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6 p-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
            <MaterialIcon icon="person" size={48} fill={1}/>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <MaterialIcon icon="check" size={16}/>
          </div>
        </div>
        <div className="flex-1 text-center md:text-left space-y-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1 justify-center md:justify-start">
             <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: FONT_HEADING }}>{profile.name}</h2>
             <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{profile.id}</span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[13px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5"><MaterialIcon icon="event" size={16} fill={1} className="text-slate-400"/> {profile.dob}</div>
            <div className="flex items-center gap-1.5"><MaterialIcon icon="fingerprint" size={16} fill={1} className="text-slate-400"/> {profile.bloodType}</div>
            <div className="flex items-center gap-1.5"><MaterialIcon icon="public" size={16} fill={1} className="text-slate-400"/> {profile.nationality}</div>
            <div className="flex items-center gap-1.5"><MaterialIcon icon="history_edu" size={16} fill={1} className="text-slate-400"/> {profile.organDonor ? "Tự nguyện hiến tạng" : "Chưa đăng ký"}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
          <div className="bg-slate-50 p-2.5 rounded-xl border text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">BMI</div>
            <div className="text-lg font-black text-slate-900">{profile.bmi}</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">TIER</div>
            <div className="text-lg font-black text-emerald-600">GOLD</div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-6 py-3 border-t flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
          <MaterialIcon icon="contact_emergency" size={18} fill={1} className="text-red-500"/> 
          KHẨN CẤP: {profile.ice.name} ({profile.ice.relation}) — <span className="text-slate-900">{profile.ice.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-[11px] font-bold text-blue-600 hover:underline">XUẤT THẺ Y TẾ</button>
          <div className="h-4 w-px bg-slate-200"/>
          <button className="text-[11px] font-bold text-blue-600 hover:underline">SỬA HỒ SƠ</button>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label, title, color = "cyan" }: { label: string; title: string; color?: keyof typeof COLOR }) {
  const c = COLOR[color];
  return (
    <div className="mb-6 md:mb-8 text-center sm:text-left">
      <div className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5 md:mb-2" style={{ color: c.text, fontFamily: FONT_MONO, opacity: 0.8 }}>
        {label}
      </div>
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]" style={{ fontFamily: FONT_HEADING }}>
        {title}
      </h2>
    </div>
  );
}

function Card({ children, color = "cyan", className = "" }: { children: React.ReactNode; color?: keyof typeof COLOR; className?: string }) {
  const c = COLOR[color];
  return (
    <div className={`rounded-2xl border p-5 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}
      style={{ background: "#ffffff", borderColor: "rgba(0,0,0,0.08)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = c.border; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.08)"; }}>
      {children}
    </div>
  );
}

function StatBlock({ label, value, sub, color = "cyan" }: { label: string; value: string | number; sub?: string; color?: keyof typeof COLOR }) {
  const c = COLOR[color];
  return (
    <div className="rounded-xl border p-4 text-center" style={{ background: c.bg, borderColor: c.border }}>
      <div className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: c.text, fontFamily: FONT_MONO }}>
        {label}
      </div>
      <div className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: FONT_HEADING }}>
        {value}
      </div>
      {sub && <div className="text-[10px] mt-1" style={{ color: c.text, opacity: 0.9, fontFamily: FONT_MONO }}>{sub}</div>}
    </div>
  );
}

function HashBadge({ hash }: { hash: string }) {
  const [show, setShow] = useState(false);
  return (
    <button onClick={() => setShow(s => !s)}
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium border transition-colors"
      style={{ color: COLOR.cyan.text, background: COLOR.cyan.bg, borderColor: COLOR.cyan.border, fontFamily: FONT_MONO }}>
      <MaterialIcon icon={show ? "visibility_off" : "visibility"} size={12}/>
      {show ? "0xa3f5c81d2b9e4726f1cc" : hash}
    </button>
  );
}

function NavBar({ title, sub, icon, onBack, color = "cyan", rightSlot }: {
  title: string; sub: string; icon: React.ReactNode; onBack: () => void; color?: keyof typeof COLOR; rightSlot?: React.ReactNode;
}) {
  const c = COLOR[color];
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.92)", borderColor: "rgba(0,0,0,0.06)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-5 h-14 md:h-16 flex items-center gap-3 md:gap-4">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all shrink-0">
          <MaterialIcon icon="arrow_back" size={20}/>
        </button>
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border-2 shrink-0" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
            <MaterialIcon icon={typeof icon === 'string' ? icon : 'home'} size={20} fill={1}/>
          </div>
          <div className="truncate">
            <div className="text-[13px] md:text-[15px] font-extrabold text-slate-900 truncate" style={{ fontFamily: FONT_BODY }}>{title}</div>
            <div className="text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-tight truncate" style={{ fontFamily: FONT_MONO }}>{sub}</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-4 shrink-0">
          {rightSlot}
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════
   PATIENT PORTAL
═══════════════════════════════════════════════════════ */
function ClinicalSidebar({ profile }: { profile: PatientProfile }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <MaterialIcon icon="warning" size={14} fill={1} className="text-amber-500"/> Cảnh báo & Dị ứng
        </div>
        <div className="space-y-2">
          <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-red-700 text-[11px] font-bold flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/> Dị ứng: Penicillin (Nặng)
          </div>
          <div className="px-3 py-2 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 text-[11px] font-bold">
            Tiền sử: Hút thuốc (đã bỏ)
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Chỉ số sinh hiệu gần nhất</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "HUYẾT ÁP", val: "145/90", unit: "mmHg", trend: "up", color: "red" },
            { label: "NHỊP TIM", val: "82", unit: "bpm", trend: "stable", color: "blue" },
            { label: "NHIỆT ĐỘ", val: "36.7", unit: "°C", trend: "stable", color: "green" },
            { label: "SPO2", val: "98", unit: "%", trend: "stable", color: "green" },
          ].map(v => (
            <div key={v.label} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-[9px] font-bold text-slate-400 mb-0.5">{v.label}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-black text-slate-900">{v.val}</span>
                <span className="text-[8px] font-bold text-slate-400">{v.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Bảo hiểm & Thanh toán</div>
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Số chính sách:</span>
            <span className="text-slate-900">{profile.insurance.policy}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-slate-400">Hạng thẻ:</span>
            <span className="text-emerald-600 font-bold">{profile.insurance.tier}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
function PatientPortal({ onBack, records, setRecords, patientData, setPatientData, filterPart, setFilterPart }: { 
  onBack: () => void; 
  records: EHRRecord[]; 
  setRecords: React.Dispatch<React.SetStateAction<EHRRecord[]>>; 
  patientData: any; 
  setPatientData: React.Dispatch<React.SetStateAction<any>>;
  filterPart: string | null;
  setFilterPart: (part: string | null) => void;
}) {
  const [access, setAccess] = useState<AccessGrant[]>(ACCESS_GRANTS);
  const [tab, setTab] = useState<"records" | "access" | "emergency" | "audit">("records");
  const [selected, setSelected] = useState<EHRRecord | null>(records[0]);
  const [grantModal, setGrantModal] = useState(false);
  const [docSearch, setDocSearch] = useState("");
  const [revokeId, setRevokeId] = useState<string | null>(null);
  const [grantSuccess, setGrantSuccess] = useState("");
  const [qrFlicker, setQrFlicker] = useState(false);
  const [showBio, setShowBio] = useState(true);

  // Filtering records based on body part
  const filteredRecords = records.filter(r => {
    if (!filterPart) return true;
    const searchStr = (r.diagnosis + " " + r.icd10 + " " + r.specialty).toLowerCase();
    if (filterPart === "Hệ Tim Mạch") return searchStr.includes("tim") || searchStr.includes("huyết áp") || searchStr.includes("mạch");
    if (filterPart === "Hệ Thần Kinh") return searchStr.includes("não") || searchStr.includes("thần kinh") || searchStr.includes("đầu");
    if (filterPart === "Hệ Hô Hấp") return searchStr.includes("phổi") || searchStr.includes("hô hấp") || searchStr.includes("thở");
    if (filterPart === "Cơ Xương Khớp") return searchStr.includes("xương") || searchStr.includes("khớp") || searchStr.includes("cơ");
    return true;
  });

  useEffect(() => { 
    const t = setInterval(() => setQrFlicker(f => !f), 1800); 
    const b = setTimeout(() => setShowBio(false), 2500);
    return () => { clearInterval(t); clearTimeout(b); }; 
  }, []);

  const grantAccess = (doc: AccessGrant) => {
    if (access.find(a => a.doctorId === doc.doctorId)) return;
    const today = new Date();
    const exp = new Date(today); exp.setDate(exp.getDate() + 30);
    setAccess(prev => [...prev, {
      ...doc, grantedAt: today.toISOString().slice(0, 10),
      expires: exp.toISOString().slice(0, 10), scope: "Đọc toàn bộ EHR",
    }]);
    setGrantModal(false); setDocSearch("");
    setGrantSuccess(`Đã cấp quyền cho ${doc.doctorName}`);
    setTimeout(() => setGrantSuccess(""), 3000);
  };

  const filteredDocs = DOCTORS_DB.filter(d =>
    d.doctorName.toLowerCase().includes(docSearch.toLowerCase()) ||
    d.hospital.toLowerCase().includes(docSearch.toLowerCase()) ||
    d.specialty.toLowerCase().includes(docSearch.toLowerCase())
  );

  const tabs = [
    { id: "records", label: "Hồ Sơ Y Tế", icon: "description" },
    { id: "access",  label: "Quyền Truy Cập", icon: "verified_user" },
    { id: "audit",   label: "Nhật Ký Truy Cập", icon: "history" },
    { id: "emergency", label: "QR Khẩn Cấp", icon: "qr_code_2" },
  ] as const;

  return (
    <div className="min-h-screen pb-12" style={{ background: "#f8fafc", fontFamily: FONT_BODY }}>
      <SystemStatusBar blockId={1044}/>
      
      {/* Biometric Simulation Overlay */}
      {showBio && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 animate-hologram-flicker">
          <div className="w-32 h-32 rounded-full border-4 border-cyan-500/30 flex items-center justify-center mb-8 animate-biometric-pulse">
            <MaterialIcon icon="fingerprint" size={64} className="text-cyan-400"/>
          </div>
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Xác Minh Danh Tính Sinh Trắc Học</h2>
          <p className="text-cyan-400 font-mono text-[11px] animate-pulse">ĐANG QUÉT CHỮ KÝ MÃ HÓA RSA-4096...</p>
          <div className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 animate-[radar-scan_1.5s_infinite]"/>
          </div>
        </div>
      )}

      <NavBar title={PATIENT_DATA.name} sub={`${PATIENT_DATA.id} · Nhóm máu ${PATIENT_DATA.bloodType} · Bảo hiểm VIP`}
        icon="account_circle" onBack={onBack} color="cyan"
        rightSlot={<GlowBadge label="Danh tính On-chain: Đã xác thực" color="green" icon="verified_user"/>}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
        <PatientIdentityCard profile={PATIENT_DATA}/>

        <div className="flex gap-2 p-1 bg-slate-100/50 backdrop-blur rounded-xl mb-8 w-fit border border-slate-200">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id as "records" | "access" | "emergency" | "audit")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-bold transition-all ${tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <MaterialIcon icon={t.icon} size={18} fill={tab === t.id ? 1 : 0}/>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── RECORDS ── */}
        {tab === "records" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Records List */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between px-2">
                <SectionHeader label="Sổ Cái Bệnh Án On-chain" title="Dòng Thời Gian Bệnh Án" color="cyan"/>
                <div className="flex gap-2">
                   {filterPart && (
                     <button onClick={() => setFilterPart(null)} className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white text-[10px] font-black uppercase flex items-center gap-2 animate-pulse">
                        Lọc: {filterPart} <MaterialIcon icon="close" size={14}/>
                     </button>
                   )}
                   <button className="px-3 py-1.5 rounded-lg bg-white border text-[11px] font-bold text-slate-500 hover:text-cyan-600 transition-all flex items-center gap-1.5">
                      <MaterialIcon icon="filter_list" size={14}/> Sắp xếp
                   </button>
                </div>
              </div>
              <div className="space-y-4">
                {filteredRecords.length > 0 ? filteredRecords.map(r => (
                  <button key={r.id} onClick={() => setSelected(r)}
                    className="w-full text-left rounded-2xl p-5 border-2 transition-all group relative overflow-hidden"
                    style={{
                      background: selected?.id === r.id ? "white" : "transparent",
                      borderColor: selected?.id === r.id ? COLOR.cyan.border : "rgba(0,0,0,0.04)",
                      boxShadow: selected?.id === r.id ? "0 10px 30px -10px rgba(0,139,139,0.15)" : "none"
                    }}>
                    {selected?.id === r.id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-500"/>}
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.date}</div>
                      <div className="text-[10px] font-black text-cyan-600 font-mono">BLOCK #{r.blockId}</div>
                    </div>
                    <div className="text-[15px] font-black text-slate-900 group-hover:text-cyan-700 transition-colors">{r.diagnosis.split("—")[0].trim()}</div>
                    <div className="text-[12px] text-slate-500 mt-1 flex items-center gap-2">
                       <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500">{r.icd10.split("/")[0].trim()}</span>
                       <span className="truncate">{r.hospital}</span>
                    </div>
                  </button>
                )) : (
                  <div className="p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <MaterialIcon icon="search_off" size={48} className="text-slate-300 mb-4"/>
                    <p className="text-slate-400 font-bold">Không tìm thấy hồ sơ nào liên quan đến {filterPart}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Digital Twin (Expert Upgrade) */}
            <div className="lg:col-span-4 space-y-6">
               <SectionHeader label="Mô Phỏng Cơ Thể Số" title="Giải Phẫu Học Số" color="cyan"/>
               <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-50/30 opacity-50 pointer-events-none"/>
                  
                  {/* Human SVG Simulator */}
                  <div className="relative w-full aspect-[1/2] max-w-[200px] hologram-glow">
                     <svg viewBox="0 0 100 200" className="w-full h-full fill-slate-200 stroke-cyan-500/30 stroke-[0.5]">
                        <path d="M50 10 C 60 10 65 20 65 30 C 65 40 60 50 50 50 C 40 50 35 40 35 30 C 35 20 40 10 50 10" 
                          onClick={() => setFilterPart("Hệ Thần Kinh")}
                          className={`hover:fill-cyan-400 cursor-pointer transition-all ${filterPart === "Hệ Thần Kinh" ? "fill-cyan-500" : ""}`}/> {/* Head */}
                        <path d="M35 55 L65 55 L70 120 L30 120 Z" 
                          onClick={() => setFilterPart("Hệ Tim Mạch")}
                          className={`hover:fill-cyan-400 cursor-pointer transition-all ${filterPart === "Hệ Tim Mạch" ? "fill-cyan-500" : ""}`}/> {/* Torso */}
                        <rect x="25" y="60" width="10" height="60" rx="5" 
                          onClick={() => setFilterPart("Cơ Xương Khớp")}
                          className={`hover:fill-cyan-400 cursor-pointer transition-all ${filterPart === "Cơ Xương Khớp" ? "fill-cyan-500" : ""}`}/> {/* L Arm */}
                        <rect x="65" y="60" width="10" height="60" rx="5" 
                          onClick={() => setFilterPart("Cơ Xương Khớp")}
                          className={`hover:fill-cyan-400 cursor-pointer transition-all ${filterPart === "Cơ Xương Khớp" ? "fill-cyan-500" : ""}`}/> {/* R Arm */}
                        <path d="M35 120 L48 190 L50 190 L50 120 Z" 
                          onClick={() => setFilterPart("Cơ Xương Khớp")}
                          className={`hover:fill-cyan-400 cursor-pointer transition-all ${filterPart === "Cơ Xương Khớp" ? "fill-cyan-500" : ""}`}/> {/* L Leg */}
                        <path d="M65 120 L52 190 L50 190 L50 120 Z" 
                          onClick={() => setFilterPart("Cơ Xương Khớp")}
                          className={`hover:fill-cyan-400 cursor-pointer transition-all ${filterPart === "Cơ Xương Khớp" ? "fill-cyan-500" : ""}`}/> {/* R Leg */}
                     </svg>
                     {/* Scanning Line overlay */}
                     <div className="absolute inset-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_cyan] animate-scan-laser pointer-events-none opacity-40"/>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-2 w-full">
                    {["Hệ Thần Kinh", "Hệ Tim Mạch", "Hệ Hô Hấp", "Cơ Xương Khớp"].map(sys => (
                      <button key={sys} onClick={() => setFilterPart(sys)}
                        className={`px-3 py-2 rounded-xl border text-[10px] font-black transition-all ${filterPart === sys ? "bg-cyan-600 text-white border-cyan-700 shadow-lg" : "bg-white border-slate-100 text-slate-500 hover:bg-cyan-50 hover:text-cyan-600"}`}>
                        {sys}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-2xl bg-cyan-50 border border-cyan-100 text-[11px] font-bold text-cyan-700 leading-relaxed text-center">
                    Cơ sở dữ liệu đang đồng bộ: 12 tệp DICOM · 4 Kết quả xét nghiệm
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* ── ACCESS ── */}
        {tab === "access" && (
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center justify-between mb-6">
              <SectionHeader label="Private Key — Kiểm soát truy cập" title="Quản Lý Quyền" color="cyan"/>
              <button onClick={() => setGrantModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: COLOR.cyan.bg, border: `1px solid ${COLOR.cyan.border}`, color: COLOR.cyan.text, fontFamily: FONT_BODY }}>
                <MaterialIcon icon="add" size={18}/> Cấp quyền mới
              </button>
            </div>

            {grantSuccess && (
              <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium" style={{ background: COLOR.green.bg, border: `1px solid ${COLOR.green.border}`, color: COLOR.green.text }}>
                <MaterialIcon icon="check_circle" size={20}/>{grantSuccess}
              </div>
            )}

            {access.length === 0 && (
              <Card color="cyan" className="text-center py-12">
                <MaterialIcon icon="lock" size={48} className="mx-auto mb-3" style={{ color: "#374151" }}/>
                <p className="text-sm" style={{ color: "#6b7280", fontFamily: FONT_BODY }}>Chưa có bác sĩ nào được cấp quyền</p>
              </Card>
            )}

            {access.map(a => (
              <div key={a.doctorId} className="rounded-xl border p-5 flex items-center justify-between gap-4 transition-all shadow-sm"
                style={{ background: "white", borderColor: "rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border" style={{ background: COLOR.blue.bg, borderColor: COLOR.blue.border }}>
                    <MaterialIcon icon="stethoscope" size={24} style={{ color: COLOR.blue.text }}/>
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-slate-900" style={{ fontFamily: FONT_BODY }}>{a.doctorName}</div>
                    <div className="text-[12px] text-slate-500">{a.specialty} · {a.hospital}</div>
                    <div className="text-[11px] mt-1 text-slate-400" style={{ fontFamily: FONT_MONO }}>
                      {a.doctorId} · Hết hạn {a.expires}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <GlowBadge label="Hoạt động" color="green"/>
                  <button onClick={() => setRevokeId(a.doctorId)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    style={{ background: COLOR.red.bg, border: `1px solid ${COLOR.red.border}`, color: COLOR.red.text }}>
                    Thu hồi
                  </button>
                </div>
              </div>
            ))}

            {/* Grant modal */}
            {grantModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
                <div className="rounded-2xl border p-8 max-w-md w-full shadow-2xl" style={{ background: "white", borderColor: "rgba(0,0,0,0.1)" }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: FONT_HEADING }}>Cấp Quyền Truy Cập</h3>
                    <button onClick={() => { setGrantModal(false); setDocSearch(""); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all"><MaterialIcon icon="close" size={20}/></button>
                  </div>
                  <div className="relative mb-4">
                    <MaterialIcon icon="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#64748b" }}/>
                    <input value={docSearch} onChange={e => setDocSearch(e.target.value)}
                      placeholder="Tìm bác sĩ / bệnh viện / chuyên khoa..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border outline-none text-sm placeholder-slate-400"
                      style={{ background: "#f8fafc", borderColor: "rgba(0,0,0,0.08)", color: "#1e293b", fontFamily: FONT_BODY }}
                    />
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {filteredDocs.map(d => {
                      const granted = !!access.find(a => a.doctorId === d.doctorId);
                      return (
                        <button key={d.doctorId} onClick={() => !granted && grantAccess(d)} disabled={granted}
                          className="w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all"
                          style={{
                            background: granted ? "#f8fafc" : COLOR.cyan.bg,
                            borderColor: granted ? "rgba(0,0,0,0.05)" : COLOR.cyan.border,
                            opacity: granted ? 0.6 : 1,
                          }}>
                          <div>
                            <div className="text-[13px] font-bold text-slate-900">{d.doctorName}</div>
                            <div className="text-[11px] mt-0.5 text-slate-500">{d.specialty} · {d.hospital}</div>
                          </div>
                          {granted ? <GlowBadge label="Đã cấp" color="green"/> : <MaterialIcon icon="chevron_right" size={20} style={{ color: COLOR.cyan.text }}/>}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 rounded-xl p-3 text-[11px]" style={{ background: COLOR.cyan.bg, border: `1px solid ${COLOR.cyan.border}`, color: COLOR.cyan.text, fontFamily: FONT_MONO }}>
                    ⚠ Hành động cấp quyền được ghi vĩnh viễn lên Blockchain. Mỗi lần truy cập đều có audit log.
                  </div>
                </div>
              </div>
            )}

            {/* Revoke confirm */}
            {revokeId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                <div className="rounded-2xl border p-6 max-w-sm w-full shadow-2xl" style={{ background: "white", borderColor: "rgba(0,0,0,0.1)" }}>
                  <MaterialIcon icon="security_update_warning" size={36} className="mx-auto mb-4" style={{ color: COLOR.red.text }}/>
                  <h3 className="text-center text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: FONT_HEADING }}>Thu Hồi Quyền Truy Cập?</h3>
                  <p className="text-center text-sm mb-5 text-slate-500">Bác sĩ sẽ không thể đọc hồ sơ. Hành động này được ghi blockchain.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setRevokeId(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold border transition-colors border-slate-200 text-slate-500 hover:bg-slate-50">Huỷ</button>
                    <button onClick={() => { setAccess(a => a.filter(x => x.doctorId !== revokeId)); setRevokeId(null); }}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-colors" style={{ background: "#dc2626" }}>
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── AUDIT LOG ── */}
        {tab === "audit" && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between px-2">
              <SectionHeader label="Immutable Access Log" title="Nhật Ký Truy Cập Blockchain" color="cyan"/>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-[11px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">
                <MaterialIcon icon="lock" size={16}/> RSA-4096 VALIDATED
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b-2 border-slate-100">
                    {["Thời gian", "Sự kiện", "Thực thể", "Khối (Block)", "Trạng thái"].map(h => (
                      <th key={h} className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { time: "21/04/2026 09:42:01", event: "Truy vấn hồ sơ EHR", actor: "BS. Trần Minh (BV Chợ Rẫy)", block: "#1044", status: "Xác thực" },
                    { time: "20/04/2026 14:15:30", event: "Yêu cầu bồi thường bảo hiểm", actor: "Bảo Hiểm Việt Nam (AI)", block: "#1041", status: "Thành công" },
                    { time: "19/04/2026 16:22:10", event: "Cấp quyền truy cập mới", actor: "Bệnh nhân (An)", block: "#1038", status: "Bất biến" },
                    { time: "18/04/2026 10:05:44", event: "Ghi nhận xét nghiệm Lab", actor: "Node Trung tâm #12", block: "#1035", status: "Ký SHA" },
                    { time: "17/04/2026 23:58:12", event: "Đồng bộ P2P Network", actor: "System Validator #3", block: "#1032", status: "Hoàn tất" },
                  ].map((log, i) => (
                    <tr key={i} className="hover:bg-cyan-50/20 transition-colors">
                      <td className="px-6 py-4 text-[12px] font-bold text-slate-500 font-mono">{log.time}</td>
                      <td className="px-6 py-4">
                        <div className="text-[14px] font-black text-slate-900">{log.event}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[12px] font-bold text-slate-600">{log.actor}</div>
                      </td>
                      <td className="px-6 py-4 text-[11px] font-black text-cyan-600 font-mono">{log.block}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase border border-emerald-100 flex items-center gap-1.5 w-fit">
                           <MaterialIcon icon="shield_with_heart" size={14} fill={1}/> {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-4 opacity-10"><MaterialIcon icon="history_edu" size={120} fill={1}/></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-2 text-center md:text-left">
                     <h4 className="text-2xl font-black tracking-tight" style={{ fontFamily: FONT_HEADING }}>Tính Minh Bạch Tuyệt Đối</h4>
                     <p className="text-[14px] text-slate-400 font-medium max-w-lg leading-relaxed">
                       Chúng tôi sử dụng thuật toán Merkle Tree để liên kết mọi hành động với mã băm của khối trước đó. 
                       Không có bất kỳ dữ liệu nào có thể bị sửa đổi mà không làm hỏng chuỗi.
                     </p>
                  </div>
                  <button className="px-10 py-4 rounded-2xl bg-white text-slate-900 text-[14px] font-black hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shrink-0 active:scale-95">
                     <MaterialIcon icon="download" size={20}/> XUẤT NHẬT KÝ (.PDF)
                  </button>
               </div>
            </div>
          </div>
        )}

        {/* ── EMERGENCY QR ── */}
        {tab === "emergency" && (
          <div className="flex flex-col items-center py-6 max-w-lg mx-auto">
            <SectionHeader label="Smart Contract · Emergency Access" title="Mã QR Cấp Cứu" color="amber"/>
            <p className="text-sm text-center mb-8 -mt-4 text-slate-500">
              Bác sĩ cấp cứu quét mã để truy cập tức thì thông tin thiết yếu — không cần Private Key của bệnh nhân.
            </p>

            <div className="relative p-8 rounded-[3rem] border-4 mb-8 transition-all shadow-2xl overflow-hidden group" style={{
              background: "#ffffff",
              borderColor: qrFlicker ? "#fbbf24" : "rgba(0,0,0,0.08)",
            }}>
              {/* Radar Rotating Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                 <div className="w-[300px] h-[300px] rounded-full border-2 border-slate-900 animate-radar-rotate"/>
                 <div className="absolute w-[200px] h-[200px] rounded-full border-2 border-slate-900 animate-radar-rotate [animation-direction:reverse]"/>
              </div>

              {/* QR Matrix */}
              <div className="relative grid grid-cols-10 gap-1 p-2 bg-white rounded-2xl">
                {Array.from({ length: 100 }, (_, i) => {
                  const fixed = [0,1,2,10,11,12,20,21,22, 7,8,9,17,18,19,27,28,29, 70,71,72,80,81,82,90,91,92].includes(i);
                  const data = (i * 7 + 3) % 5 === 0;
                  return (
                    <div key={i} className={`w-4 h-4 rounded-[2px] transition-all duration-700 ${qrFlicker ? 'scale-90 opacity-40' : 'scale-100 opacity-100'}`}
                      style={{ background: fixed ? "#0f172a" : data ? `#1e293b77` : "#f1f5f9" }}/>
                  );
                })}
              </div>

              {/* Scanning HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-400 shadow-[0_0_20px_#fbbf24] animate-radar-scan"/>
                 <div className="absolute inset-0 border-[20px] border-transparent border-t-amber-500/10 border-b-amber-500/10 animate-pulse"/>
              </div>

              {/* Cryptographic Annotations */}
              <div className="absolute top-4 left-4 text-[8px] font-black font-mono text-slate-300 tracking-widest">ECC-BP256r1</div>
              <div className="absolute bottom-4 right-4 text-[8px] font-black font-mono text-slate-300 tracking-widest">AES-256-GCM</div>
            </div>

            <div className="mb-8 flex flex-col items-center gap-2">
               <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-black border border-amber-200 uppercase tracking-widest animate-pulse">
                  <MaterialIcon icon="bolt" size={14}/> Smart Contract: Unlocked
               </div>
               <p className="text-[11px] font-bold text-slate-400 font-mono">HASH: 0x7e...8b9 (VALIDATED)</p>
            </div>

            {/* Info */}
            <div className="w-full space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-widest mb-3 text-slate-500" style={{ fontFamily: FONT_MONO }}>
                THÔNG TIN KHẨN CẤP (Public — Không cần xác thực)
              </div>
              {[
                { label: "Nhóm máu", value: "O+", icon: "favorite", color: "red" },
                { label: "Dị ứng nghiêm trọng", value: "Penicillin · Thuốc Sulfa", icon: "warning", color: "amber" },
                { label: "Bệnh nền", value: "Tiểu đường type 2 · Tăng huyết áp", icon: "monitoring", color: "blue" },
                { label: "Liên hệ khẩn cấp", value: "Nguyễn Thị Hoa (vợ) · 0912.345.678", icon: "call", color: "green" },
              ].map((item, i) => {
                const c = COLOR[item.color as keyof typeof COLOR];
                return (
                  <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3 shadow-sm" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <MaterialIcon icon={item.icon} size={20} style={{ color: c.text }}/>
                    <span className="text-[12px] flex-1 text-slate-500" style={{ fontFamily: FONT_BODY }}>{item.label}</span>
                    <span className="text-[13px] font-bold text-slate-900" style={{ fontFamily: FONT_BODY }}>{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DOCTOR PORTAL
═══════════════════════════════════════════════════════ */
function DoctorPortal({ onBack, records, setRecords, patient, setPatient }: { onBack: () => void; records: EHRRecord[]; setRecords: React.Dispatch<React.SetStateAction<EHRRecord[]>>; patient: any; setPatient: React.Dispatch<React.SetStateAction<any>> }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [hashing, setHashing] = useState(false);
  const [savedBlock, setSavedBlock] = useState<number | null>(null);
  const [form, setForm] = useState({ 
    diagnosis: "", specialty: "Nội khoa", icd10: "", medicines: "", tests: "", notes: "",
    bp: "120/80", pulse: 75, temp: "37.0", spo2: 99
  });

  const search = useCallback(() => {
    if (!searchQuery.trim()) return;
    setPatient({ name: PATIENT_DATA.name, id: PATIENT_DATA.id, records });
  }, [searchQuery, records]);

  const specialties = ["Nội khoa", "Ngoại khoa", "Tim mạch", "Hô hấp", "Tiêu hoá", "Thần kinh", "Nhi khoa"];

  const saveRecord = async () => {
    if (!form.diagnosis.trim()) return;
    setHashing(true);
    await new Promise(r => setTimeout(r, 2000));
    const newBlock = 1045 + records.length;
    const nr: EHRRecord = {
      id: `EHR-2026-00${records.length + 1}`, 
      date: new Date().toISOString().slice(0, 10),
      hospital: "BV Chợ Rẫy", doctor: "BS. Trần Minh", specialty: form.specialty,
      diagnosis: form.diagnosis,
      icd10: form.icd10 || "Uncoded",
      vitals: { bp: form.bp, pulse: Number(form.pulse), temp: form.temp, spo2: Number(form.spo2) },
      medicines: form.medicines.split("\n").filter(Boolean).map(m => ({ 
        name: m.split(":")[0]?.trim() || m, dose: "Standard", freq: "q.d", route: "p.o", dur: "7 ngày" 
      })),
      tests: form.tests.split("\n").filter(Boolean).map(t => ({
        label: t.split(":")[0]?.trim() || t, value: "N/A", unit: "-", range: "-", status: "normal"
      })),
      notes: form.notes,
      hash: `0x${Math.random().toString(16).slice(2, 20)}`,
      blockId: newBlock,
    };
    setRecords(prev => [nr, ...prev]);
    setPatient((prev: any) => prev ? { ...prev, records: [nr, ...prev.records] } : null);
    setHashing(false); setSavedBlock(newBlock);
    setAddMode(false); 
    setForm({ diagnosis: "", specialty: "Nội khoa", icd10: "", medicines: "", tests: "", notes: "", bp: "120/80", pulse: 75, temp: "37.0", spo2: 99 });
    setTimeout(() => setSavedBlock(null), 4000);
  };

  return (
    <div className="min-h-screen pb-12" style={{ background: "#f8fafc", fontFamily: FONT_BODY }}>
      <SystemStatusBar blockId={1044}/>
      <NavBar title="BS. Trần Minh" sub="NỘI KHOA • BV CHỢ RẪY • ID#BST-A12"
        icon="stethoscope" onBack={onBack} color="blue"
        rightSlot={savedBlock ? (
          <GlowBadge label={`KHỐI #${savedBlock} ĐÃ XÁC NHẬN`} color="green" icon="verified"/>
        ) : (
          <GlowBadge label="HỆ THỐNG TRỰC TUYẾN" color="blue" icon="cloud_done"/>
        )}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-5 py-6 md:py-8 space-y-6">
        <SectionHeader label="Thực Hành Y Khoa · Ghi Bệnh Án EHR" title="Phòng Khám Bác Sĩ" color="blue"/>
        
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 shadow-sm rounded-xl overflow-hidden">
            <MaterialIcon icon="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill={1}/>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && search()}
              placeholder="Nhập mã BHYT hoặc tên bệnh nhân… (thử: N1-234)"
              className="w-full pl-11 pr-4 py-3 border outline-none text-sm transition-all"
              style={{ background: "white", borderColor: "rgba(0,0,0,0.08)", color: "#1e293b", fontFamily: FONT_BODY }}
              onFocus={e => { e.currentTarget.style.borderColor = COLOR.blue.border; }}
              onBlur={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
            />
          </div>
          <button onClick={search} className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 shadow-md flex items-center justify-center gap-2 shrink-0"
            style={{ background: `linear-gradient(135deg,${COLOR.blue.text},#1976D2)` }}>
            <MaterialIcon icon="database" size={18} fill={1}/> Truy xuất EHR
          </button>
        </div>

        {!patient && (
          <div className="flex flex-col items-center py-20 md:py-32 text-center px-4">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border-2 bg-slate-50 shadow-sm" style={{ borderColor: COLOR.blue.border }}>
              <MaterialIcon icon="clinical_notes" size={36} style={{ color: COLOR.blue.text }} fill={1}/>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2" style={{ fontFamily: FONT_HEADING }}>Sẵn sàng truy xuất hồ sơ</h3>
            <p className="text-sm md:text-base text-slate-500 max-w-sm">Nhập mã BHYT chuẩn của MedChain để xem lịch sử điều trị bất biến trên sổ cái.</p>
          </div>
        )}

        {patient && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <ClinicalSidebar profile={PATIENT_DATA}/>
              <button onClick={() => setAddMode(true)}
                className="w-full flex items-center justify-center gap-2 py-4 mt-4 rounded-2xl text-[14px] font-black transition-all hover:scale-[1.02] active:scale-95 text-white shadow-xl"
                style={{ background: `linear-gradient(135deg, ${COLOR.blue.text}, #1e40af)` }}>
                <MaterialIcon icon="edit_note" size={20} fill={1}/> TẠO HỒ SƠ MỚI
              </button>
            </div>

            {/* Records */}
            <div className="lg:col-span-9 space-y-4">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-slate-400" style={{ fontFamily: FONT_MONO }}>
                HỆ THỐNG HỒ SƠ Y TẾ KHÁCH (DỮ LIỆU PHI TẬP TRUNG)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patient.records.map((r: EHRRecord) => (
                  <div key={r.id} className="rounded-2xl border bg-white p-6 transition-all shadow-sm hover:shadow-md hover:border-blue-200 group">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-1.5 py-0.5 rounded bg-blue-50 text-[10px] font-black text-blue-600 border border-blue-100">{r.icd10}</span>
                          <span className="text-[10px] font-bold text-slate-400 font-mono">#{r.id}</span>
                        </div>
                        <div className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors uppercase leading-tight mb-1" style={{ fontFamily: FONT_HEADING }}>{r.diagnosis}</div>
                        <div className="text-[11px] text-slate-400 font-medium">{r.hospital} • {r.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black text-blue-600 font-mono mb-1">BLOCK #{r.blockId}</div>
                        <MaterialIcon icon="verified" size={20} className="text-emerald-500" fill={1}/>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-1 p-2 rounded-xl bg-slate-50 border border-slate-100">
                         {[{l:'BP',v:r.vitals.bp},{l:'P',v:r.vitals.pulse},{l:'T',v:r.vitals.temp},{l:'O2',v:r.vitals.spo2}].map(x=>(
                            <div key={x.l} className="text-center">
                              <div className="text-[8px] font-bold text-slate-400 uppercase">{x.l}</div>
                              <div className="text-[11px] font-black text-slate-900">{x.v}</div>
                            </div>
                         ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {r.medicines.slice(0, 2).map((m: any, i: number) => (
                          <span key={i} className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-100">{m.name}</span>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-dashed flex items-center justify-between">
                         <div className="flex items-center gap-1.5">
                            <MaterialIcon icon="verified_user" size={14} className="text-emerald-500"/>
                            <span className="text-[9px] font-black text-slate-400 uppercase font-mono tracking-tighter">ECC-Signature: Valid</span>
                         </div>
                         <button className="text-[9px] font-black text-blue-600 hover:underline uppercase tracking-widest">Verify Hash</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Record Modal */}
      {addMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="rounded-2xl border w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]" style={{ background: "white", borderColor: "rgba(0,0,0,0.1)" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
              <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: FONT_HEADING }}>Thêm Hồ Sơ Bệnh Án Mới</h3>
              <button onClick={() => setAddMode(false)} className="text-slate-400 hover:text-slate-900"><MaterialIcon icon="close" size={20}/></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-400">Chuyên khoa</label>
                   <select value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })}
                     className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 outline-none text-sm bg-slate-50 focus:border-blue-500 transition-all">
                     {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-400">Mã ICD-10</label>
                   <input value={form.icd10} onChange={e => setForm({ ...form, icd10: e.target.value })}
                     placeholder="Vd: I10, E11.9..." className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 outline-none text-sm bg-slate-50 focus:border-blue-500 transition-all"
                   />
                 </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-400">Chẩn đoán lâm sàng *</label>
                <input value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })}
                  placeholder="Vd: Tăng huyết áp vô căn..." className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 outline-none text-sm bg-slate-50 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Vitals Input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">Chỉ số sinh hiệu (Vitals)</label>
                <div className="grid grid-cols-4 gap-2">
                   {[
                     { l: "BP", k: "bp", p: "120/80" },
                     { l: "P", k: "pulse", p: "75" },
                     { l: "T", k: "temp", p: "37.0" },
                     { l: "O2", k: "spo2", p: "99" },
                   ].map(v => (
                     <div key={v.k} className="relative">
                        <input value={form[v.k as keyof typeof form]} onChange={e => setForm({ ...form, [v.k]: e.target.value })}
                          placeholder={v.p} className="w-full px-2 py-2 rounded-lg border border-slate-200 text-center text-xs font-bold bg-slate-50 outline-none focus:border-blue-400 transition-all"
                        />
                        <div className="text-[8px] font-black text-slate-400 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-0.5">{v.l}</div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-400">Y lệnh & Thuốc</label>
                <textarea rows={2} value={form.medicines} onChange={e => setForm({ ...form, medicines: e.target.value })}
                  placeholder="Vd: Metformin: 500mg (2 lần/ngày)..." className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 outline-none text-sm bg-slate-50 focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-400">Ghi chú & Dặn dò</label>
                <textarea rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="Lời dặn của truyền..." className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-100 outline-none text-sm bg-slate-50 focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div className="p-3 rounded-xl border border-blue-100 bg-blue-50 flex gap-3">
                <MaterialIcon icon="lock" size={20} className="text-blue-500"/>
                <p className="text-[10px] text-blue-700 font-bold leading-relaxed">
                  Dữ liệu sẽ được mã hóa RSA-4096 và ký tên số của bạn (ID #BST-A12). 
                  Khối bệnh án sẽ được lưu trữ bất biến trên Hyperledger Fabric.
                </p>
              </div>

              <button onClick={saveRecord} disabled={hashing || !form.diagnosis.trim()}
                className="w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${COLOR.blue.text}, #1e40af)`, color: "white" }}>
                {hashing ? <><MaterialIcon icon="refresh" size={18} className="animate-spin"/> ĐANG TẠO HASH & XÁC THỰC...</> : <>XÁC NHẬN GHI LÊN BLOCKCHAIN</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INSURANCE DASHBOARD
═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   PHARMACY PORTAL
 ═══════════════════════════════════════════════════════ */
function PharmacyPortal({ onBack }: { onBack: () => void }) {
  const [filling, setFilling] = useState<string | null>(null);
  const [filledList, setFilledList] = useState<string[]>([]);

  const prescriptions = [
    { id: "RX-1044-A", patient: "Nguyễn Văn An", patientId: "BN-2026-001", medication: "Metformin 500mg", dosage: "2 lần/ngày", doctor: "BS. Trần Minh", hospital: "BV Chợ Rẫy" },
    { id: "RX-1043-B", patient: "Lê Thị B", patientId: "BN-2026-092", medication: "Aspirin 81mg", dosage: "1 lần/ngày", doctor: "BS. Phạm Văn", hospital: "BV K" },
  ];

  const fillRx = async (id: string) => {
    setFilling(id);
    await new Promise(r => setTimeout(r, 2500));
    setFilledList(prev => [...prev, id]);
    setFilling(null);
  };

  return (
    <div className="min-h-screen pb-12" style={{ background: "#f8fafc", fontFamily: FONT_BODY }}>
      <SystemStatusBar blockId={1044}/>
      <NavBar title="Cổng Dược Phẩm On-chain" sub="XÁC THỰC VÀ CẤP THUỐC ĐIỆN TỬ · SMART CONTRACT RX"
        icon="medical_services" onBack={onBack} color="green"
      />

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <SectionHeader label="Prescription Management" title="Danh Sách Đơn Thuốc Chờ Cấp" color="green"/>
        
        <div className="space-y-4">
          {prescriptions.map(rx => {
            const isFilled = filledList.includes(rx.id);
            const isBusy = filling === rx.id;
            return (
              <div key={rx.id} className="bg-white rounded-3xl border-2 border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-6 transition-all hover:border-emerald-200">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">#{rx.id}</span>
                    <span className="text-sm font-black text-slate-900 uppercase">{rx.patient}</span>
                  </div>
                  <h4 className="text-xl font-black text-slate-800">{rx.medication}</h4>
                  <div className="flex gap-4 text-[12px] font-bold text-slate-400">
                    <span className="flex items-center gap-1"><MaterialIcon icon="stethoscope" size={14}/> {rx.doctor}</span>
                    <span className="flex items-center gap-1"><MaterialIcon icon="apartment" size={14}/> {rx.hospital}</span>
                  </div>
                </div>
                
                <div className="shrink-0 w-full md:w-auto">
                  {isFilled ? (
                    <div className="px-6 py-3 rounded-2xl bg-emerald-50 border-2 border-emerald-100 text-emerald-600 font-black text-xs flex items-center gap-2 justify-center">
                      <MaterialIcon icon="check_circle" size={18} fill={1}/> ĐÃ CẤP THUỐC
                    </div>
                  ) : (
                    <button onClick={() => fillRx(rx.id)} disabled={filling !== null}
                      className="w-full px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-xs transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-xl">
                      {isBusy ? <MaterialIcon icon="refresh" size={18} className="animate-spin"/> : <MaterialIcon icon="verified" size={18}/>}
                      {isBusy ? "ĐANG XÁC THỰC HASH..." : "XÁC THỰC & CẤP THUỐC"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOCKCHAIN EXPLORER
 ═══════════════════════════════════════════════════════ */
function BlockchainExplorer({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  const blocks = Array.from({ length: 6 }, (_, i) => ({
    height: 1044 - i,
    hash: `0x5C3d8f2a1b9e4c7d6f3a${1044-i}b8f...`,
    prevHash: `0x1a2b3c4d5e6f7g8h9i0j${1043-i}k1l...`,
    merkleRoot: `0xb8f7d6e5a4c3b2a1${1044-i}f9e8...`,
    txCount: Math.floor(Math.random() * 20) + 5,
    timestamp: new Date(Date.now() - i * 3600000).toLocaleString("vi-VN"),
  }));

  return (
    <div className="min-h-screen pb-12" style={{ background: "#0f172a", fontFamily: FONT_BODY }}>
      <NavBar title="Blockchain Ledger Explorer" sub="NETWORK MONITOR · REAL-TIME BLOCK INSPECTOR"
        icon="manage_search" onBack={onBack} color="cyan"
      />

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Block List */}
        <div className="lg:col-span-12 space-y-4">
           <SectionHeader label="System Ledger" title="Danh Sách Các Khối Gần Đây" color="cyan"/>
           <div className="overflow-x-auto rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-white/5 bg-white/5">
                   {["Mức khối", "Mã Hash", "Số GD", "Thời gian"].map(h => (
                     <th key={h} className="px-6 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400 font-mono">{h}</th>
                   ))}
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {blocks.map(b => (
                   <tr key={b.height} onClick={() => setSelected(b.height)}
                     className={`cursor-pointer transition-colors hover:bg-white/5 ${selected === b.height ? 'bg-cyan-500/10' : ''}`}>
                     <td className="px-6 py-5 font-mono text-cyan-500 font-black">#{b.height}</td>
                     <td className="px-6 py-5 text-[11px] font-mono text-slate-400 truncate max-w-[200px]">{b.hash}</td>
                     <td className="px-6 py-5 text-[12px] font-bold text-white">{b.txCount} TXs</td>
                     <td className="px-6 py-5 text-[11px] font-bold text-slate-500">{b.timestamp}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* Detailed View (Simple JSON overlay for now) */}
        {selected && (
          <div className="lg:col-span-12 p-8 rounded-[2.5rem] border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-xl animate-hologram-flicker">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-cyan-400 uppercase tracking-widest font-mono">Block Data Inspection [#{selected}]</h3>
              <button onClick={() => setSelected(null)} className="text-cyan-400 hover:text-white"><MaterialIcon icon="close" size={24}/></button>
            </div>
            <pre className="text-[12px] font-mono text-cyan-300/80 leading-relaxed overflow-x-auto p-6 bg-black/40 rounded-3xl border border-white/5">
{`{
  "header": {
    "block_height": ${selected},
    "version": "4.0.2-LTS",
    "timestamp": "${blocks.find(b => b.height === selected)?.timestamp}",
    "prev_block_hash": "${blocks.find(b => b.height === selected)?.prevHash}"
  },
  "merkle_root": "${blocks.find(b => b.height === selected)?.merkleRoot}",
  "transactions": [... ${blocks.find(b => b.height === selected)?.txCount} records],
  "validator": "Node_Mainframe_#08",
  "signature": "RSA_4096_SIG_0x${selected}A8...92",
  "status": "IMMUTABLE_AND_VALIDATED"
}`}
            </pre>
            
            <div className="mt-8 flex flex-col md:flex-row items-center gap-6">
               <button onClick={async () => {
                 setSelected(null);
                 await new Promise(r => setTimeout(r, 100));
                 setSelected(blocks[0].height);
               }} className="px-8 py-4 rounded-2xl bg-cyan-500 text-slate-900 font-black text-xs hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20">
                  <MaterialIcon icon="verified" size={18}/> XÁC THỰC TOÀN VẸN DỮ LIỆU
               </button>
               <div className="flex-1 w-full bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="text-[9px] font-bold text-slate-500 uppercase mb-2">Network Energy Verification</div>
                  <div className="flex gap-1 h-8 items-end">
                     {Array.from({ length: 40 }).map((_, i) => (
                       <div key={i} className="flex-1 bg-cyan-500/30 rounded-t-sm animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}/>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InsuranceDashboard({ onBack }: { onBack: () => void }) {
  const [claims, setClaims] = useState<InsuranceClaim[]>(CLAIMS);
  const [selected, setSelected] = useState<InsuranceClaim | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "rejected">("all");
  const [justProcessed, setJustProcessed] = useState("");
  const [showCode, setShowCode] = useState(false);

  const filtered = filter === "all" ? claims : claims.filter(c => c.status === filter);

  const processClaim = async (id: string, status: "verified" | "rejected") => {
    setVerifying(true);
    await new Promise(r => setTimeout(r, 2000));
    setClaims(prev => prev.map(c => c.id === id ? { ...c, status, paidAmount: status === "verified" ? c.amount * 0.9 : 0 } : c));
    setVerifying(false);
    setSelected(null);
    setJustProcessed(`Claim ${id} đã được ${status === "verified" ? "phê duyệt" : "từ chối"}.`);
    setTimeout(() => setJustProcessed(""), 4000);
  };

  return (
    <div className="min-h-screen pb-12" style={{ background: "#f8fafc", fontFamily: FONT_BODY }}>
      <SystemStatusBar blockId={1044}/>
      <NavBar title="Cổng Thanh Toán Bảo Hiểm" sub="HỆ THỐNG GIÁM ĐỊNH TỰ ĐỘNG · AI ENGINE v4.2"
        icon="payments" onBack={onBack} color="purple"
        rightSlot={<GlowBadge label="Hợp đồng thông minh: Live" color="purple" icon="bolt"/>}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <SectionHeader label="Trung Tâm Xử Lý Bồi Thường" title="Danh Sách Bồi Thường" color="purple"/>
              <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
                {["all", "pending", "verified", "rejected"].map(f => (
                  <button key={f} onClick={() => setFilter(f as any)}
                    className={`px-4 py-1.5 rounded-lg text-[11px] font-black uppercase transition-all ${filter === f ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    {f === 'all' ? 'Tất cả' : f === 'pending' ? 'Chờ duyệt' : f === 'verified' ? 'Đã duyệt' : 'Từ chối'}
                  </button>
                ))}
              </div>
            </div>

            {justProcessed && (
              <div className="p-4 rounded-2xl bg-purple-50 border-2 border-purple-100 text-purple-700 text-sm font-bold animate-pulse flex items-center gap-3">
                <MaterialIcon icon="auto_awesome" size={20}/> {justProcessed}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(c => (
                <button key={c.id} onClick={() => setSelected(c)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all group relative overflow-hidden ${selected?.id === c.id ? 'bg-white shadow-xl scale-[1.02]' : 'bg-white/50 hover:bg-white'}`}
                  style={{ borderColor: selected?.id === c.id ? COLOR.purple.border : "rgba(0,0,0,0.04)" }}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.status === 'verified' ? 'bg-emerald-50 text-emerald-600' : c.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                          <MaterialIcon icon={c.status === 'verified' ? 'check_circle' : c.status === 'rejected' ? 'cancel' : 'hourglass_empty'} size={24} fill={1}/>
                       </div>
                       <div className="text-[10px] font-black font-mono text-slate-400">#{c.id}</div>
                    </div>
                    <div className="text-right">
                       <div className="text-lg font-black text-slate-900">{c.amount.toLocaleString()} <span className="text-xs">đ</span></div>
                       <div className="text-[10px] font-bold text-slate-400 tracking-widest">{c.date}</div>
                    </div>
                  </div>
                  <div className="space-y-1 mb-4">
                    <div className="text-[15px] font-black text-slate-900 group-hover:text-purple-700 transition-colors uppercase truncate">{c.patient}</div>
                    <div className="text-[12px] text-slate-500 font-medium truncate">{c.diagnosis}</div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-dashed">
                     <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div className="h-full rounded-full transition-all" style={{ width: `${c.autoScore}%`, background: c.autoScore > 80 ? '#10b981' : c.autoScore > 50 ? '#f59e0b' : '#ef4444' }}/>
                        </div>
                        <span className="text-[10px] font-black text-slate-400">{c.autoScore}% AI</span>
                     </div>
                     <MaterialIcon icon="arrow_forward" size={16} className="text-slate-300 group-hover:text-purple-500 transition-all"/>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-4">
            {selected ? (
              <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-2xl p-6 sticky top-24 space-y-6">
                <div className="text-center">
                   <div className="text-[11px] font-black text-purple-600 uppercase tracking-widest mb-2 font-mono">Blockchain Claim Receipt</div>
                   <h3 className="text-2xl font-black text-slate-900 uppercase" style={{ fontFamily: FONT_HEADING }}>Chi Tiết Giám Định</h3>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 space-y-3">
                   <div className="flex justify-between items-center text-[13px]">
                      <span className="font-bold text-slate-400">Bệnh viện:</span>
                      <span className="font-black text-slate-900">{selected.hospital}</span>
                   </div>
                   <div className="flex justify-between items-center text-[13px]">
                      <span className="font-bold text-slate-400">Số thẻ:</span>
                      <span className="font-black text-slate-900">{selected.patientId}</span>
                   </div>
                   <div className="flex justify-between items-center text-[13px]">
                      <span className="font-bold text-slate-400">Chẩn đoán:</span>
                      <span className="font-black text-slate-900 text-right">{selected.diagnosis}</span>
                   </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-xl">
                   <div className="absolute top-0 right-0 p-2 opacity-20"><MaterialIcon icon="auto_awesome" size={64}/></div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-4">Điểm Phân Tích Rủi Ro AI</div>
                   <div className="flex items-baseline gap-2 mb-2">
                      <div className="text-5xl font-black text-white">{selected.autoScore}</div>
                      <div className="text-xl font-bold text-slate-500">/ 100</div>
                   </div>
                   <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                     {selected.autoScore > 85 ? "Dữ liệu hồ sơ bệnh án trên chuỗi khớp 100% với yêu cầu bồi thường. Đề xuất phê duyệt ngay." : 
                      selected.autoScore > 50 ? "Có một vài sai lệch nhỏ về định mức thuốc. Cần bác sĩ giám định thủ công." : 
                      "Điểm rủi ro cao. Hồ sơ có dấu hiệu không nhất quán với phác đồ điều trị tiêu chuẩn."}
                   </p>
                </div>

                 <div className="mt-4 p-4 rounded-xl border border-dashed border-slate-200">
                    <div className="flex justify-between items-center mb-2">
                       <div className="text-[9px] font-bold text-slate-400 uppercase">Blockchain Verification Hash</div>
                       <button onClick={() => setShowCode(!showCode)} className="text-[9px] font-black text-purple-600 uppercase hover:underline">
                         {showCode ? "Hide Logic" : "View Smart Contract"}
                       </button>
                    </div>
                    {showCode ? (
                      <pre className="text-[9px] font-mono text-purple-700 bg-purple-50 p-3 rounded-lg overflow-x-auto leading-tight">
{`function verifyClaim(uint256 id) public {
  Claim storage c = claims[id];
  uint256 score = AI_Engine.audit(c.data);
  if (score > 85) {
    c.status = Status.Approved;
    emit Payout(c.patient, c.amount);
  }
}`}
                      </pre>
                    ) : (
                      <div className="text-[10px] font-mono text-slate-500 break-all leading-tight">0x7d6f3a5C3d8f2a1b9e4c1041B8f...</div>
                    )}
                 </div>

                {selected.status === "pending" && (
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button onClick={() => processClaim(selected.id, "rejected")} disabled={verifying}
                      className="py-4 rounded-2xl font-black text-xs text-red-500 bg-red-50 border-2 border-red-100 hover:bg-red-500 hover:text-white transition-all active:scale-95">
                      TỪ CHỐI
                    </button>
                    <button onClick={() => processClaim(selected.id, "verified")} disabled={verifying}
                      className="py-4 rounded-2xl font-black text-xs text-white bg-purple-600 hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-95">
                      DUYỆT CHI TRẢ
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                   <MaterialIcon icon="clinical_notes" size={32} className="text-slate-300"/>
                </div>
                <h4 className="text-lg font-bold text-slate-400 mb-2">Chưa chọn hồ sơ</h4>
                <p className="text-sm text-slate-400 max-w-[200px]">Vui lòng chọn một yêu cầu bồi thường từ danh sách để xem chi tiết.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SIMULATION HUB
═══════════════════════════════════════════════════════ */
export default function AppSimulation({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<"hub" | "patient" | "doctor" | "insurance" | "pharmacy" | "explorer">("hub");
  const [txLogs, setTxLogs] = useState<TxLog[]>(INIT_TX);
  const [blockId, setBlockId] = useState(1044);
   const [records, setRecords] = useState<EHRRecord[]>(RECORDS);
  const [patientData, setPatientData] = useState<any>(PATIENT_DATA);
  const [doctorPatient, setDoctorPatient] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const txRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetSimulation = () => {
    if (confirm("Xác nhận xóa toàn bộ dữ liệu mô phỏng và khởi động lại phiên làm việc?")) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const actions = [
      { action: "Ghi nhận hồ sơ EHR mới vào mạng lưới", actor: "BS. Trần Minh", type: "ehr" },
      { action: "Xác thực chữ ký số RSA-2048", actor: "Node xác thực #3", type: "auth" },
      { action: "Hợp đồng thông minh phê duyệt Claim", actor: "Insurance Contract", type: "contract" },
      { action: "Cấp quyền truy cập hồ sơ EHR thành công", actor: "Bệnh nhân Nguyễn Văn An", type: "access" },
      { action: "Đồng bộ dữ liệu P2P tới Node #7", actor: "Lớp mạng lưới", type: "sync" },
      { action: "Tính toán Hash Merkle Root hoàn tất", actor: "Lõi Blockchain", type: "hash" },
    ];
    txRef.current = setInterval(() => {
      const pick = actions[Math.floor(Math.random() * actions.length)];
      const now = new Date().toLocaleTimeString("vi-VN");
      setBlockId(b => {
        setTxLogs(prev => [{ time: now, ...pick, blockId: b + 1 }, ...prev.slice(0, 8)]);
        return b + 1;
      });
    }, 3500);
    return () => { if (txRef.current) clearInterval(txRef.current); };
  }, []);

  if (view === "patient")   return <PatientPortal onBack={() => setView("hub")} records={records} setRecords={setRecords} patientData={patientData} setPatientData={setPatientData} filterPart={selectedBodyPart} setFilterPart={setSelectedBodyPart}/>;
  if (view === "doctor")    return <DoctorPortal onBack={() => setView("hub")} records={records} setRecords={setRecords} patient={doctorPatient} setPatient={setDoctorPatient}/>;
  if (view === "insurance") return <InsuranceDashboard onBack={() => setView("hub")}/>;
  if (view === "pharmacy")  return <PharmacyPortal onBack={() => setView("hub")}/>;
  if (view === "explorer")  return <BlockchainExplorer onBack={() => setView("hub")}/>;

  const txTypeIcon = (type: string) => {
    const map: Record<string, string> = {
      ehr: "description", auth: "lock", contract: "bolt",
      access: "how_to_reg", sync: "refresh", hash: "memory",
    };
    return <MaterialIcon icon={map[type] || "database"} size={14}/>;
  };
  const txTypeColor = (type: string): keyof typeof COLOR => {
    const map: Record<string, keyof typeof COLOR> = { ehr: "green", auth: "amber", contract: "purple", access: "cyan", sync: "blue", hash: "cyan" };
    return map[type] ?? "cyan";
  };

  return (
    <div className="min-h-screen pb-12" style={{ background: "#f8fafc", fontFamily: FONT_BODY }}>
      <style>{`
        @keyframes radar-scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes radar-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scan-laser { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        @keyframes biometric-pulse { 0% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.4); } 70% { box-shadow: 0 0 0 20px rgba(0, 255, 255, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); } }
        @keyframes hologram-flicker { 0% { opacity: 0.95; transform: scale(1); } 5% { opacity: 0.8; transform: scale(1.002); } 10% { opacity: 0.95; transform: scale(1); } 100% { opacity: 1; transform: scale(1); } }
        .animate-radar-scan { animation: radar-scan 2s linear infinite; }
        .animate-radar-rotate { animation: radar-rotate 10s linear infinite; }
        .animate-scan-laser { animation: scan-laser 3s ease-in-out infinite alternate; }
        .animate-biometric-pulse { animation: biometric-pulse 2s infinite; }
        .hologram-glow { filter: drop-shadow(0 0 8px rgba(0, 139, 139, 0.3)); }
      `}</style>
      
      <SystemStatusBar blockId={blockId}/>

      <nav className="border-b sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.9)", borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1 text-[12px] font-medium text-slate-500 hover:text-slate-900 transition-colors" style={{ fontFamily: FONT_BODY }}>
            <MaterialIcon icon="arrow_back" size={18}/> <span className="hidden sm:inline">Trang chủ</span>
          </button>
          <div className="flex-1 flex justify-center truncate px-2">
            <span className="text-[13px] md:text-[15px] font-bold text-slate-900 truncate" style={{ fontFamily: FONT_HEADING }}>MedChain · Mô Phỏng Hệ Sinh Thái Nexus V5</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={resetSimulation} className="text-[9px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest font-mono">Reset</button>
            <div className="flex items-center gap-2 text-[11px] font-bold" style={{ color: COLOR.cyan.text, fontFamily: FONT_MONO }}>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/> Khối #{blockId}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-5 py-12 xl:grid xl:grid-cols-4 xl:gap-8">
        <div className="xl:col-span-3 space-y-10">
          <div className="text-center px-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50 text-blue-600 mb-6 font-mono text-[10px] font-bold uppercase tracking-widest">
              <MaterialIcon icon="hub" size={18} fill={1}/> Giao Thức Kết Nối Toàn Cầu Đang Hoạt Động
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-none" style={{ fontFamily: FONT_HEADING }}>
               MẠNG LƯỚI<br/>Y TẾ PHI TẬP TRUNG
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[
              { id: "patient", color: "cyan" as const, icon: "person", title: "Người Bệnh", desc: "Quản lý EHR & 3D Twin", action: "Cổng của tôi" },
              { id: "doctor", color: "blue" as const, icon: "stethoscope", title: "Bác Sĩ", desc: "Khám & Ký ICD-10", action: "Đang làm việc" },
              { id: "insurance", color: "purple" as const, icon: "payments", title: "Bảo Hiểm", desc: "Giám định AI Claim", action: "Xem xét" },
              { id: "pharmacy", color: "green" as const, icon: "medical_services", title: "Dược Phẩm", desc: "Xác thực & Cấp RX", action: "Xác thực" },
              { id: "explorer", color: "amber" as const, icon: "manage_search", title: "Explorer", desc: "Soi dữ liệu Block thô", action: "Kiểm tra" },
            ].map(p => {
              const c = COLOR[p.color];
              return (
                <button key={p.id} onClick={() => setView(p.id as any)}
                  className="group p-6 rounded-[2rem] border-2 bg-white transition-all hover:shadow-xl hover:-translate-y-2 relative overflow-hidden"
                  style={{ borderColor: "rgba(0,0,0,0.04)" }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" style={{ background: c.bg }}/>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border-2 shadow-sm group-hover:scale-110 transition-transform" 
                      style={{ background: c.bg, borderColor: c.border, color: c.text }}>
                      <MaterialIcon icon={p.icon} size={24} fill={1}/>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight" style={{ fontFamily: FONT_HEADING }}>{p.title}</h3>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-6 opacity-70 group-hover:opacity-100">{p.desc}</p>
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest" style={{ color: c.text }}>
                      {p.action} <MaterialIcon icon="arrow_forward" size={14}/>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Map Card - Ultimate High-Fidelity (Dark Theme Unified) */}
             <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900 p-8 shadow-2xl relative overflow-hidden h-[520px] group/map lg:col-span-2 flex flex-col">
                <div className="flex justify-between items-start mb-6 relative z-20">
                   <div>
                      <div className="flex items-center gap-2 mb-2">
                         <MaterialIcon icon="public" size={24} className="text-blue-400" />
                         <span className="text-xl font-black text-white" style={{ fontFamily: FONT_HEADING }}>Hệ Thống Nexus V5 • Toàn Cầu</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium max-w-md">Giám sát mạng lưới phi tập trung thời gian thực với công nghệ xác thực đa điểm và đồng bộ sổ cái tức thời.</p>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-500/20 shadow-sm">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"/> Mainnet: Đang Hoạt Động
                      </div>
                      <div className="text-[9px] font-mono text-slate-500">TPS: 1,240 / LÚC: {new Date().toLocaleTimeString()}</div>
                   </div>
                </div>

                <div className="flex-1 relative rounded-3xl bg-slate-950 overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] border border-slate-800">
                   {/* 1. Background Grid & Radar Scan */}
                   <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
                      <defs>
                         <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <circle cx="1.5" cy="1.5" r="1" fill="rgba(59,130,246,0.2)"/>
                         </pattern>
                         <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
                            <stop offset="100%" stopColor="rgba(59,130,246,0.15)" />
                         </radialGradient>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#dotGrid)" className="animate-grid-fade"/>
                      <circle cx="500" cy="250" r="300" fill="url(#radarGradient)" className="animate-radar-rotate origin-center"/>
                      <line x1="500" y1="250" x2="500" y2="-50" stroke="rgba(59,130,246,0.3)" strokeWidth="1" className="animate-radar-rotate origin-center"/>
                   </svg>

                   {/* 2. Stylized World Continents */}
                   <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
                      <path d="M150,150 Q200,100 300,150 T450,200 T600,150 T800,250 T900,200 L950,450 L100,450 Z" fill="rgba(59,130,246,0.5)" />
                      <path d="M700,100 Q750,50 850,100 T950,150 L900,300 L650,250 Z" fill="rgba(59,130,246,0.4)" />
                      <path d="M200,350 Q250,300 350,350 T450,400 L400,480 L150,450 Z" fill="rgba(59,130,246,0.3)" />
                   </svg>

                   {/* 3. Scanline Animation Overlay */}
                   <div className="absolute inset-0 w-full h-[1px] bg-blue-500/30 shadow-[0_0_20px_#3b82f6] animate-scanline z-10 pointer-events-none"/>

                   {/* 4. Glowing Connections (Double Layer) */}
                   <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                      {[
                        { x1: "75%", y1: "40%", x2: "30%", y2: "25%" },
                        { x1: "75%", y1: "40%", x2: "80%", y2: "35%" },
                        { x1: "30%", y1: "25%", x2: "20%", y2: "60%" },
                        { x1: "20%", y1: "60%", x2: "75%", y2: "40%" }
                      ].map((l, i) => (
                        <g key={i}>
                          {/* Outer Glow */}
                          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className="stroke-blue-500/20 stroke-[3px] blur-sm"/>
                          {/* Inner Line */}
                          <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} className="stroke-blue-400/50 stroke-[1px] animate-line-flow"/>
                          {/* Data Packet */}
                          <circle r="2.5" fill="#60a5fa" className="animate-packet shadow-[0_0_10px_#60a5fa]" style={{ offsetPath: `path('M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}')`, animationDelay: `${i * 1.5}s` }}/>
                        </g>
                      ))}
                   </svg>

                   {/* 5. Live Handshake Feed (Floating) */}
                   <div className="absolute top-4 left-4 z-20 space-y-2 pointer-events-none max-w-[180px]">
                      {[
                        "TX_SYNC: NODE_21 -> VERIFIED",
                        "TX_SYNC: NODE_56 -> VERIFIED",
                        "TX_SYNC: NODE_73 -> VERIFIED"
                      ].map((text, i) => (
                        <div key={i} className={`bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-lg px-3 py-1.5 flex items-center gap-2 animate-fade-in-up`} style={{ animationDelay: `${i * 0.5}s` }}>
                           <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse"/>
                           <div className="text-[8px] font-mono text-blue-200 uppercase tracking-tight">
                              {text}
                           </div>
                        </div>
                      ))}
                   </div>

                   {/* 6. Interactive Nodes */}
                   {[
                     { id: "vn", t: 40, l: 75, n: "VIETNAM_HUB", status: "Hoạt động", latency: "12ms", storage: "84%", load: 45 }, 
                     { id: "us", t: 25, l: 30, n: "NYC_NODE", status: "Đang đồng bộ", latency: "115ms", storage: "62%", load: 78 }, 
                     { id: "au", t: 60, l: 20, n: "SYDNEY_NODE", status: "Hoạt động", latency: "84ms", storage: "45%", load: 23 }, 
                     { id: "jp", t: 35, l: 80, n: "TOKYO_LE", status: "Chờ", latency: "42ms", storage: "91%", load: 12 }
                   ].map((node) => (
                     <button key={node.id} onClick={() => setSelectedNode(node as any)} 
                        className={`absolute flex flex-col items-center group/node transition-all ${selectedNode?.id === node.id ? 'z-40 scale-110' : 'z-20 hover:scale-105'}`} 
                        style={{ top: `${node.t}%`, left: `${node.l}%` }}>
                        <div className="relative">
                           <div className={`w-10 h-10 rounded-2xl border backdrop-blur-2xl transition-all duration-300 flex items-center justify-center ${selectedNode?.id === node.id ? 'bg-blue-600 border-blue-400 rotate-45 shadow-[0_0_25px_rgba(59,130,246,0.6)]' : 'bg-slate-900/80 border-slate-700 group-hover/node:border-blue-500/50 group-hover/node:bg-slate-800'}`}>
                              <MaterialIcon icon={node.id === 'vn' ? "hub" : "dns"} size={18} className={`transition-all duration-300 ${selectedNode?.id === node.id ? '-rotate-45 text-white' : 'text-slate-400 group-hover/node:text-blue-400'}`}/>
                           </div>
                           <div className={`absolute -inset-2 rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity blur-lg ${node.status === 'Hoạt động' ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}/>
                           {/* Small Load Indicator Arc */}
                           <svg className="absolute -inset-1 w-12 h-12 -rotate-90 pointer-events-none">
                              <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"/>
                              <circle cx="24" cy="24" r="21" fill="none" stroke={node.status === 'Hoạt động' ? '#10b981' : '#3b82f6'} strokeWidth="1.5" strokeDasharray="131.95" strokeDashoffset={131.95 - (node.load * 1.3195)} className="transition-all duration-1000"/>
                           </svg>
                        </div>
                        <div className="mt-2 bg-slate-900/95 border border-white/10 px-2 py-1 rounded-md text-[8px] font-bold text-slate-300 font-mono tracking-widest opacity-0 group-hover/node:opacity-100 transition-all transform translate-y-1 group-hover/node:translate-y-0 shadow-lg">
                           {node.n}
                        </div>
                     </button>
                   ))}

                   {/* 7. Selected Node Modal (Liquid Glass Sidebar) */}
                   {selectedNode && (
                     <div className="absolute right-0 top-0 bottom-0 w-72 bg-slate-950/80 backdrop-blur-2xl border-l border-white/10 z-50 p-6 flex flex-col animate-blur-in shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                           <div className="flex flex-col">
                              <div className="text-[9px] font-black text-blue-500 font-mono uppercase tracking-[0.2em] mb-1">NETWORK_TERMINAL</div>
                              <div className="text-sm font-black text-white uppercase tracking-tight">{selectedNode.n}</div>
                           </div>
                           <button onClick={() => setSelectedNode(null)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all transform hover:rotate-90"><MaterialIcon icon="close" size={18}/></button>
                        </div>
                        
                        <div className="space-y-4 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                           {[
                             { l: "Trạng thái", v: selectedNode.status, i: "language", c: selectedNode.status === 'Hoạt động' ? 'text-emerald-400' : 'text-blue-400', p: 100 },
                             { l: "Độ trễ (Ping)", v: selectedNode.latency, i: "bolt", p: 85 },
                             { l: "Lưu trữ", v: selectedNode.storage, i: "data_usage", p: parseInt(selectedNode.storage) },
                             { l: "Tin cậy", v: "HẠNG A+", i: "verified", c: "text-emerald-400", p: 98 }
                           ].map(m => (
                             <div key={m.l} className="bg-white/5 rounded-2xl p-4 border border-white/5 group/metric hover:bg-white/10 transition-all duration-300">
                                <div className="flex items-center gap-2 mb-2">
                                   <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center text-slate-400 group-hover/metric:text-blue-400 transition-colors">
                                      <MaterialIcon icon={m.i} size={14}/>
                                   </div>
                                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.l}</span>
                                </div>
                                <div className={`text-base font-black font-mono mb-2 ${m.c || 'text-white'}`}>{m.v}</div>
                                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                   <div className={`h-full transition-all duration-1000 delay-300 ${m.c ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${m.p}%` }}/>
                                </div>
                             </div>
                           ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10">
                           <div className="flex items-center justify-between mb-4">
                              <div className="text-[9px] font-mono text-slate-500 uppercase">Hash:</div>
                              <div className="text-[9px] font-mono text-blue-400 truncate ml-2">0x{Math.random().toString(16).slice(2, 12)}...</div>
                           </div>
                           <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 group/btn">
                              <MaterialIcon icon="sync" size={16} className="group-hover/btn:rotate-180 transition-transform duration-700"/> Đồng bộ lại
                           </button>
                        </div>
                     </div>
                   )}
                </div>

                <div className="mt-6 flex items-center gap-8 px-2">
                   <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] animate-pulse"/>
                      <span className="text-[10px] font-black text-slate-300 font-mono tracking-widest">MẠNG_ỔN_ĐỊNH</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] animate-line-flow"/>
                      <span className="text-[10px] font-black text-slate-300 font-mono tracking-widest">LUỒNG_TỐI_ƯU</span>
                   </div>
                   <div className="hidden md:flex items-center gap-2">
                      <MaterialIcon icon="security" size={14} className="text-slate-500"/>
                      <span className="text-[10px] font-black text-slate-500 font-mono tracking-widest">SSL_ENCRYPTED</span>
                   </div>
                </div>
             </div>

             {/* Performance Metrics Card - Now styled to match and placed alongside */}
             <div className="rounded-[2.5rem] border border-slate-800 p-8 shadow-2xl relative overflow-hidden text-white lg:col-span-1 flex flex-col h-[520px]" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
                <div className="absolute top-0 right-0 p-4 opacity-5"><MaterialIcon icon="hub" size={160}/></div>
                
                <div className="flex items-center gap-2 mb-8 relative z-10">
                   <MaterialIcon icon="monitoring" size={24} className="text-cyan-400" />
                   <span className="text-xl font-black text-white" style={{ fontFamily: FONT_HEADING }}>Hiệu Năng Real-time</span>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-6 relative z-10">
                   <div className="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Thông lượng (Throughput)</div>
                      <div className="flex items-end gap-2">
                         <div className="text-4xl font-black text-white">45.2</div>
                         <div className="text-sm text-slate-500 font-mono mb-1">TX/s</div>
                      </div>
                      <div className="mt-3 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-cyan-400 w-[70%] animate-pulse"/>
                      </div>
                   </div>

                   <div className="bg-white/5 rounded-2xl p-5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Độ trễ trung bình</div>
                      <div className="flex items-end gap-2">
                         <div className="text-4xl font-black text-white">124</div>
                         <div className="text-sm text-slate-500 font-mono mb-1">ms</div>
                      </div>
                      <div className="mt-3 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-emerald-400 w-[40%]"/>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                         <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Hợp đồng</div>
                         <div className="text-xl font-black text-cyan-400">8,421</div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                         <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Giá Gas</div>
                         <div className="text-xl font-black text-emerald-400">2.4 <span className="text-[10px] text-slate-500">nM8</span></div>
                      </div>
                   </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"/>
                      <span className="text-[10px] font-mono text-slate-400">HỆ THỐNG LÕI TỐT</span>
                   </div>
                   <span className="text-[10px] font-bold text-slate-500 font-mono">CPU: 65%</span>
                </div>
             </div>
          </div>

          <div className="rounded-2xl border p-6 bg-white shadow-sm border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-widest mb-6 text-slate-400 font-mono">BẤT BIẾN DỮ LIỆU · FLOW CHUẨN</div>
            <div className="flex flex-col sm:flex-row items-center gap-2 justify-between">
              {[
                { icon: null, label: "Cấp quyền", sub: "→" },
                { icon: "stethoscope", label: "Bác sĩ", sub: "Khám & Ghi EHR", color: "blue" as const },
                { icon: null, label: "Hash + Ký RSA", sub: "→" },
                { icon: "database", label: "Blockchain", sub: "Bất biến", color: "amber" as const },
                { icon: null, label: "Xác minh", sub: "→" },
                { icon: "shield", label: "Bảo hiểm", sub: "Smart Contract", color: "purple" as const },
              ].map((s, i) => s.icon ? (
                <div key={i} className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border flex-1 shadow-sm"
                  style={{ background: COLOR[s.color!].bg, borderColor: COLOR[s.color!].border }}>
                  <MaterialIcon icon={s.icon} size={24} style={{ color: COLOR[s.color!].text }}/>
                  <span className="text-[12px] font-bold text-slate-900 uppercase" style={{ fontFamily: FONT_BODY }}>{s.label}</span>
                  <span className="text-[10px] text-slate-500">{s.sub}</span>
                </div>
              ) : (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="text-[18px]" style={{ color: "#374151" }}>{s.sub}</span>
                  <span className="text-[9px] text-center whitespace-nowrap" style={{ color: "#4b5563", fontFamily: FONT_MONO }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live TX Feed */}
        <div className="xl:col-span-1 mt-8 xl:mt-0">
          <div className="sticky top-24 rounded-2xl border overflow-hidden shadow-sm" style={{ background: "white", borderColor: "rgba(0,0,0,0.08)" }}>
            <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(0,0,0,0.05)", background: "rgba(0,139,139,0.04)" }}>
              <MaterialIcon icon="monitoring" size={18} style={{ color: COLOR.cyan.text }} className="animate-pulse"/>
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: COLOR.cyan.text, fontFamily: FONT_MONO }}>Mạng Trực Tuyến</span>
              <span className="ml-auto text-[10px] text-slate-400" style={{ fontFamily: FONT_MONO }}>NODE #8</span>
            </div>
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
              {txLogs.map((tx, i) => {
                const c = COLOR[txTypeColor(tx.type)];
                return (
                  <div key={i} className="px-4 py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5" style={{ color: c.text }}>
                        {txTypeIcon(tx.type)}
                        <span className="text-[10px] font-bold" style={{ fontFamily: FONT_MONO }}>#{tx.blockId}</span>
                      </div>
                      <span className="text-[10px] text-slate-400" style={{ fontFamily: FONT_MONO }}>{tx.time}</span>
                    </div>
                    <div className="text-[12px] font-semibold text-slate-900 leading-snug" style={{ fontFamily: FONT_BODY }}>{tx.action}</div>
                    <div className="text-[10px] text-slate-500" style={{ fontFamily: FONT_MONO }}>{tx.actor}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
