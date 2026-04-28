import React, { useState } from 'react';
import { auth } from '../firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

function MaterialIcon({ icon, size = 24, className = "", fill = 0, style = {} }: any) {
  return (
    <span className={`material-symbols-rounded ${className}`}
      style={{ fontSize: size, fontVariationSettings: `'FILL' ${fill}, 'wght' 400`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}>
      {icon}
    </span>
  );
}

interface AuthModalProps {
  onClose: () => void;
  onGuestLogin: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ onClose, onGuestLogin }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('patient');
  const [medicalId, setMedicalId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const actionCodeSettings = {
        url: window.location.origin,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      if (activeTab === 'register') {
        window.localStorage.setItem('medchainRegistrationPending', JSON.stringify({ fullName, role, medicalId }));
      }
      setLinkSent(true);
    } catch (err: any) {
      setError(err.message || 'Lỗi gửi xác thực. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'patient', label: 'Bệnh nhân', icon: 'personal_injury' },
    { value: 'doctor', label: 'Bác sĩ / Y tá', icon: 'stethoscope' },
    { value: 'insurance', label: 'Bảo hiểm', icon: 'payments' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
      <style>{`
        @keyframes modal-in { from { opacity:0; transform:translateY(16px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
        .auth-modal-in { animation: modal-in 0.3s cubic-bezier(0.16,1,0.3,1) both; }
        .auth-input { width:100%; padding: 12px 16px 12px 44px; border:1.5px solid #e2e8f0; border-radius:10px; font-size:14px; color:#1e293b; background:#fff; outline:none; transition:all 0.2s; font-family:'Inter',sans-serif; }
        .auth-input:focus { border-color:#0E8A6E; box-shadow: 0 0 0 3px rgba(14,138,110,0.1); }
        .auth-input::placeholder { color:#94a3b8; }
      `}</style>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden auth-modal-in relative" style={{ fontFamily: "'Inter', sans-serif" }}>
        
        {/* Header strip */}
        <div className="flex items-center gap-3 px-6 py-4" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #142d52 100%)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(14,138,110,0.25)', border: '1px solid rgba(14,184,143,0.3)' }}>
            <MaterialIcon icon="local_hospital" size={20} style={{ color: '#0fb88f' }} fill={1} />
          </div>
          <div>
            <div className="text-white font-bold text-[15px]">MedChain</div>
            <div className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>Hệ thống hồ sơ bệnh án điện tử</div>
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 rounded-lg hover:bg-white/10 transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <MaterialIcon icon="close" size={18} />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-slate-100">
          {(['login', 'register'] as const).map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setError(''); }}
              className="flex-1 py-3 text-[13px] font-bold transition-all relative"
              style={{ color: activeTab === tab ? '#0E8A6E' : '#94a3b8' }}>
              {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: '#0E8A6E' }} />
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {linkSent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#e0f5ef', border: '2px solid #0E8A6E' }}>
                <MaterialIcon icon="mark_email_read" size={32} style={{ color: '#0E8A6E' }} fill={1} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Đã gửi link xác thực!</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Kiểm tra hộp thư <span className="font-bold text-slate-700">{email}</span> và nhấn vào liên kết để đăng nhập an toàn.
              </p>
              <div className="p-3 rounded-xl text-[11px] text-slate-500 mb-4" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <MaterialIcon icon="info" size={14} className="inline mr-1" style={{ color: '#64748b' }} />
                Liên kết có hiệu lực trong 24 giờ và chỉ dùng một lần.
              </div>
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all" style={{ background: '#0E8A6E' }}>
                Đóng
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-[12px] font-medium" style={{ background: '#fdf0ef', border: '1px solid #fca5a5', color: '#b91c1c' }}>
                  <MaterialIcon icon="error" size={16} />
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-[12px] font-semibold text-slate-600">Địa chỉ Email <span style={{ color: '#dc2626' }}>*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MaterialIcon icon="mail" size={18} style={{ color: '#94a3b8' }} />
                  </div>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    className="auth-input" placeholder="ten@benhvien.vn" required />
                </div>
              </div>

              {/* Fields only for register */}
              {activeTab === 'register' && (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-[12px] font-semibold text-slate-600">Họ và Tên <span style={{ color: '#dc2626' }}>*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MaterialIcon icon="badge" size={18} style={{ color: '#94a3b8' }} />
                      </div>
                      <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                        className="auth-input" placeholder="Nguyễn Văn A" required />
                    </div>
                  </div>

                  {/* Role selector */}
                  <div className="space-y-1.5">
                    <label className="block text-[12px] font-semibold text-slate-600">Vai trò</label>
                    <div className="grid grid-cols-3 gap-2">
                      {roles.map(r => (
                        <button key={r.value} type="button" onClick={() => setRole(r.value)}
                          className="flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-[11px] font-bold transition-all"
                          style={{
                            borderColor: role === r.value ? '#0E8A6E' : '#e2e8f0',
                            background: role === r.value ? '#e0f5ef' : '#fff',
                            color: role === r.value ? '#0E8A6E' : '#64748b',
                          }}>
                          <MaterialIcon icon={r.icon} size={20} fill={role === r.value ? 1 : 0} style={{ color: role === r.value ? '#0E8A6E' : '#94a3b8' }} />
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[12px] font-semibold text-slate-600">CCCD / Mã y tế</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MaterialIcon icon="fingerprint" size={18} style={{ color: '#94a3b8' }} />
                      </div>
                      <input type="text" value={medicalId} onChange={e => setMedicalId(e.target.value)}
                        className="auth-input" placeholder="012345678910" />
                    </div>
                  </div>
                </>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-white text-[13px] font-bold transition-all flex items-center justify-center gap-2 mt-2"
                style={{ background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0E8A6E, #0fb88f)', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 4px 14px rgba(14,138,110,0.3)' }}>
                {loading
                  ? <><MaterialIcon icon="progress_activity" size={18} className="animate-spin" /> Đang xử lý...</>
                  : <><MaterialIcon icon="send" size={18} fill={1} /> {activeTab === 'login' ? 'Gửi Link Đăng Nhập' : 'Đăng Ký & Xác Thực'}</>
                }
              </button>

              <p className="text-[11px] text-center text-slate-400 leading-relaxed">
                Không cần mật khẩu. Chúng tôi gửi link đăng nhập an toàn qua email.
              </p>

              <div className="pt-3 border-t border-slate-100">
                <button type="button" onClick={onGuestLogin}
                  className="w-full py-2.5 rounded-xl border text-[12px] font-bold transition-all flex items-center justify-center gap-2"
                  style={{ borderColor: '#e2e8f0', color: '#64748b', background: '#f8fafc' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; }}>
                  <MaterialIcon icon="visibility" size={16} />
                  Tiếp tục với tư cách Khách (Demo)
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-1">
                {[
                  { icon: 'verified_user', label: 'HIPAA' },
                  { icon: 'lock', label: 'AES-256' },
                  { icon: 'assignment_turned_in', label: 'GDPR' },
                ].map(b => (
                  <div key={b.label} className="flex items-center gap-1 text-[10px] text-slate-400">
                    <MaterialIcon icon={b.icon} size={12} style={{ color: '#0E8A6E' }} />
                    {b.label}
                  </div>
                ))}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
