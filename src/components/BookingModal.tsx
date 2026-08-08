import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Ekspedisi Midnight Kawah Ijen');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Simatupang Tour & Travel,%0A%0ASaya ingin memesan via website:%0A- Nama: ${name}%0A- WhatsApp: ${phone}%0A- Paket/Layanan: ${service}%0A- Tanggal Keberangkatan: ${date}%0A- Catatan: ${notes || '-'}`;
    window.open(`https://wa.me/6289513523714?text=${text}`, '_blank');
    onClose();
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
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-lg bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-zinc-900">Form Pemesanan & Konsultasi</h2>
              <p className="text-xs text-zinc-600 font-medium">Terhubung langsung dengan Admin WhatsApp Simatupang Tour</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup modal pemesanan"
              className="p-1 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="modal-name" className="block text-xs font-semibold text-zinc-700 mb-1">Nama Lengkap</label>
              <input
                id="modal-name"
                name="modal-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 font-medium"
                required
              />
            </div>

            <div>
              <label htmlFor="modal-phone" className="block text-xs font-semibold text-zinc-700 mb-1">Nomor WhatsApp</label>
              <input
                id="modal-phone"
                name="modal-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="089513523714"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 font-medium"
                required
              />
            </div>

            <div>
              <label htmlFor="modal-service" className="block text-xs font-semibold text-zinc-700 mb-1">Pilih Paket / Layanan</label>
              <select
                id="modal-service"
                name="modal-service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 font-medium"
              >
                <option value="Ekspedisi Midnight Kawah Ijen">Ekspedisi Midnight Kawah Ijen Blue Fire</option>
                <option value="Private Tour Sunrise Bromo">Private Tour Sunrise Bromo & Pasir Berbisik</option>
                <option value="Sunset Excursion Pulau Merah">Sunset Excursion Pantai Pulau Merah & De Djajatan</option>
                <option value="Shuttle & Tour Banyuwangi - Bali">Private Shuttle & Tour Banyuwangi - Bali Overland</option>
                <option value="Honda Mobilio Facelift Executive">Rental Mobil Pengantin Honda Mobilio Facelift</option>
              </select>
            </div>

            <div>
              <label htmlFor="modal-date" className="block text-xs font-semibold text-zinc-700 mb-1">Rencana Tanggal Keberangkatan</label>
              <input
                id="modal-date"
                name="modal-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 font-medium"
                required
              />
            </div>

            <div>
              <label htmlFor="modal-notes" className="block text-xs font-semibold text-zinc-700 mb-1">Catatan Tambahan (Opsional)</label>
              <textarea
                id="modal-notes"
                name="modal-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Jumlah peserta, lokasi jemput, dll."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900 font-medium resize-none"
              />
            </div>

            <button
              type="submit"
              aria-label="Kirim pemesanan ke WhatsApp Simatupang Tour"
              className="w-full bg-zinc-900 hover:bg-black text-white py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Pemesanan ke WhatsApp</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
