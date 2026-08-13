import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, KeyRound } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin } = useAdmin();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = loginAdmin(passcode);
    if (success) {
      setPasscode('');
      onClose();
    } else {
      setError('PIN / Password Admin salah. Silakan coba lagi.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900">Login Mode Admin</h2>
                <p className="text-xs text-zinc-600 font-medium">Akses Fitur Edit Teks & Foto Website</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup modal login admin"
              className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-passcode" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                PIN / Password Admin (Default: admin123)
              </label>
              <div className="relative">
                <input
                  id="admin-passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Masukkan Password Admin"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 font-medium"
                  autoFocus
                  required
                />
                <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              </div>
              {error && <p className="text-xs text-red-600 font-medium mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              aria-label="Masuk ke Mode Admin"
              className="w-full bg-zinc-900 hover:bg-black text-white py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <span>MASUK MODE EDIT ADMIN</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
