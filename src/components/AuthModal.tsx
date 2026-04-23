import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

const FONT_HEADING = "'Outfit', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

function MaterialIcon({ icon, size = 24, className = "", fill = 0, style = {} }: any) {
  return (
    <span className={`material-symbols-rounded ${className}`} 
      style={{ fontSize: size, fontVariationSettings: `'FILL' ${fill}, 'wght' 400`, ...style }}>
      {icon}
    </span>
  );
}

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void; // For email link, success is handled in App.tsx after redirect
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('patient');
  const [medicalId, setMedicalId] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const actionCodeSettings = {
        url: window.location.origin, // Redirect back to the main page
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Save data locally so we can retrieve it after redirect
      window.localStorage.setItem('emailForSignIn', email);
      window.localStorage.setItem('medchainRegistrationPending', JSON.stringify({
        fullName,
        role,
        medicalId
      }));

      setLinkSent(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Lỗi gửi xác thực. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] relative animate-slide-up-sm border border-slate-700">
        
        {/* Top Decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600"/>

        <div className="p-8 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-black text-white leading-tight mb-1" style={{ fontFamily: FONT_HEADING }}>
                Xác thực Y tế
              </h2>
              <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] font-mono flex items-center gap-2">
                <MaterialIcon icon="fingerprint" size={14} /> Passwordless Auth
              </p>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
              <MaterialIcon icon="close" size={20} />
            </button>
          </div>

          {linkSent ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <MaterialIcon icon="mark_email_read" size={40} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Đã gửi Link Xác thực</h3>
              <p className="text-sm text-slate-400 mb-6 px-4">
                Chúng tôi đã gửi một liên kết đăng nhập an toàn đến <span className="text-cyan-400 font-bold">{email}</span>. Vui lòng kiểm tra hộp thư của bạn.
              </p>
              <button 
                onClick={onClose}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 text-red-400 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-500/20 animate-shake">
                  <MaterialIcon icon="error" size={16} />
                  {error}
                </div>
              )}
              
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Địa chỉ Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MaterialIcon icon="mail" size={18} className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500 focus:bg-slate-900 transition-all placeholder:text-slate-600"
                    placeholder="name@hospital.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Họ và Tên</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MaterialIcon icon="badge" size={18} className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500 focus:bg-slate-900 transition-all placeholder:text-slate-600"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Vai trò</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <MaterialIcon icon={role === 'doctor' ? 'local_hospital' : 'personal_injury'} size={16} className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full pl-9 pr-8 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500 appearance-none relative z-0"
                    >
                      <option value="patient">Bệnh nhân</option>
                      <option value="doctor">Bác sĩ</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
                      <MaterialIcon icon="expand_more" size={16} className="text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">CCCD / Mã YT</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MaterialIcon icon="pin" size={16} className="text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input 
                      type="text" 
                      value={medicalId}
                      onChange={(e) => setMedicalId(e.target.value)}
                      className="w-full pl-9 pr-3 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600"
                      placeholder="01234..."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full py-4 rounded-xl text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.2)]
                    ${loading ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95'}`}
                >
                  {loading ? (
                    <MaterialIcon icon="progress_activity" className="animate-spin" size={18} />
                  ) : (
                    <>
                      <MaterialIcon icon="mark_email_unread" size={18} />
                      Gửi Link Đăng Nhập
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-slate-500 mt-4 leading-relaxed font-medium">
                  Bằng việc tiếp tục, dữ liệu của bạn sẽ được mã hóa và ghi danh vào sổ cái Blockchain MedChain Nexus.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
