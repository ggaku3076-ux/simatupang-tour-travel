import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Compass } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Paket Kawah Ijen');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Simatupang Tour & Travel,%0A%0ASaya ingin memesan via website:%0A- Nama: ${name}%0A- WhatsApp: ${phone}%0A- Paket/Layanan: ${service}%0A- Tanggal Keberangkatan: ${date}%0A- Catatan: ${notes || '-'}`;
    window.open(`https://wa.me/6289513523714?text=${text}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-6 shadow-2xl text-zinc-900"
        >
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-zinc-900" />
              <h3 className="text-base font-normal text-zinc-900">Form Pemesanan & Konsultasi</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1">Nomor WhatsApp</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="089513523714"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1">Pilihan Layanan</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
              >
                <option value="Paket Kawah Ijen Blue Fire">Paket Kawah Ijen Blue Fire</option>
                <option value="Sunrise Gunung Bromo VIP">Sunrise Gunung Bromo VIP</option>
                <option value="Pantai Pulau Merah Banyuwangi">Pantai Pulau Merah Banyuwangi</option>
                <option value="Private Tour Banyuwangi 3D2N">Private Tour Banyuwangi 3D2N</option>
                <option value="Wedding Car - Toyota Alphard">Wedding Car - Toyota Alphard</option>
                <option value="Wedding Car - Mercedes-Benz">Wedding Car - Mercedes-Benz</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1">Rencana Tanggal Perjalanan</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1">Catatan Tambahan (Opsional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Jumlah peserta, lokasi penjemputan, dll."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-zinc-900 hover:bg-black text-white font-medium py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Pemesanan via WhatsApp</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
