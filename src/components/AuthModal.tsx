import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
  onSuccess: (user: any) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onSuccess(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        onSuccess(userCredential.user);
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl relative animate-slide-up-sm border-2 border-slate-100">
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight mb-1" style={{ fontFamily: FONT_HEADING }}>
                {isLogin ? 'Đăng nhập Hệ thống' : 'Đăng ký Tài khoản'}
              </h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                MEDCHAIN NEXUS V5
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <MaterialIcon icon="close" size={24} className="text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-100 animate-shake">
                <MaterialIcon icon="error" size={16} />
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Địa chỉ Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MaterialIcon icon="mail" size={18} className="text-slate-400" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="name@hospital.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MaterialIcon icon="lock" size={18} className="text-slate-400" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 mt-4 rounded-2xl text-white text-[13px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2
                ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-900/20 active:scale-95'}`}
            >
              {loading ? (
                <MaterialIcon icon="progress_activity" className="animate-spin" size={20} />
              ) : (
                <>
                  <MaterialIcon icon={isLogin ? 'login' : 'person_add'} size={20} />
                  {isLogin ? 'Xác thực & Đăng nhập' : 'Khởi tạo tài khoản'}
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500 font-medium mb-3">
            {isLogin ? 'Chưa có tài khoản truy cập?' : 'Đã có danh tính On-chain?'}
          </p>
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm font-black text-blue-600 hover:text-blue-700 transition-colors"
          >
            {isLogin ? 'Tạo Tài Khoản Mới' : 'Đăng Nhập Ngay'}
          </button>
        </div>
      </div>
    </div>
  );
}
