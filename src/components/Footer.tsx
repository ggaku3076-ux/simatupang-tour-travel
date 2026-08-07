import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 border-t border-zinc-800 pt-16 pb-12 px-6 md:px-12 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
        
        {/* Brand Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-4 space-y-4"
        >
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.webp"
              alt="Simatupang Tour & Travel Logo"
              className="w-10 h-10 rounded-full object-cover border border-zinc-700"
            />
            <div>
              <h3 className="text-base font-semibold text-white tracking-wide uppercase">
                Simatupang Tour & Travel
              </h3>
              <p className="text-[11px] text-zinc-400">Pengalaman Terbaik Indonesia</p>
            </div>
          </div>

          <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
            Spesialis penyedia jasa paket wisata eksklusif rute Jawa - Bali, shuttle private Banyuwangi - Surabaya, serta rental mobil pengantin (Wedding Car) executive dengan supir berpengalaman.
          </p>

          <div className="flex items-center gap-2 text-xs text-zinc-300 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Layanan Profesional & Armada Terawat</span>
          </div>
        </motion.div>

        {/* Services Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-3 space-y-3"
        >
          <h4 className="text-sm font-medium text-white uppercase tracking-wider">Layanan Utama</h4>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#destinasi" className="hover:text-white transition-colors">• Tour Kawah Ijen Blue Fire</a></li>
            <li><a href="#destinasi" className="hover:text-white transition-colors">• Private Sunrise Gunung Bromo</a></li>
            <li><a href="#destinasi" className="hover:text-white transition-colors">• Excursion Pantai Pulau Merah</a></li>
            <li><a href="#destinasi" className="hover:text-white transition-colors">• Shuttle Tour Banyuwangi - Surabaya</a></li>
            <li><a href="#destinasi" className="hover:text-white transition-colors">• Ekspedisi Tour Jawa - Bali</a></li>
            <li><a href="#wedding" className="hover:text-white transition-colors">• Rental Mobil Pengantin (Wedding Car)</a></li>
          </ul>
        </motion.div>

        {/* Coverage & Operating Hours Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="lg:col-span-2 space-y-3"
        >
          <h4 className="text-sm font-medium text-white uppercase tracking-wider">Area & Jam Operasional</h4>
          <div className="space-y-2 text-zinc-400">
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-zinc-300 mt-0.5" />
              <div>
                <span className="text-white block">24 Jam Non-Stop</span>
                <span className="text-[11px] text-zinc-400">Senin - Minggu</span>
              </div>
            </div>
            <div className="flex items-start gap-2 pt-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-300 mt-0.5" />
              <div>
                <span className="text-white block">Coverage Layanan:</span>
                <span className="text-[11px] text-zinc-400">Banyuwangi, Surabaya, Malang, Probolinggo, & Bali</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Info Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-3 space-y-3"
        >
          <h4 className="text-sm font-medium text-white uppercase tracking-wider">Kontak Layanan</h4>
          <div className="space-y-2.5 text-zinc-400">
            <div className="flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
              <Phone className="w-4 h-4 text-white" />
              <div>
                <span className="text-[10px] text-zinc-500 block">WhatsApp Respon Cepat</span>
                <a href="https://wa.me/6289513523714" target="_blank" rel="noreferrer" className="text-white font-medium hover:underline">
                  +62 895-1352-3714
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
              <Mail className="w-4 h-4 text-white" />
              <div>
                <span className="text-[10px] text-zinc-500 block">Email Informasi</span>
                <span className="text-white font-medium">info@simatupangtour.com</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 pt-1">
              Jl. Raya Banyuwangi No. 88, Banyuwangi, Jawa Timur
            </p>
          </div>
        </motion.div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
        <p>© {new Date().getFullYear()} Simatupang Tour & Travel. Semua hak cipta dilindungi undang-undang.</p>
        <div className="flex items-center gap-6">
          <a href="#beranda" className="hover:text-white transition-colors">Beranda</a>
          <a href="#destinasi" className="hover:text-white transition-colors">Destinasi</a>
          <a href="#wedding" className="hover:text-white transition-colors">Wedding Car</a>
          <a href="#galeri" className="hover:text-white transition-colors">Galeri</a>
          <a href="#kontak" className="hover:text-white transition-colors">Kontak</a>
        </div>
      </div>
    </footer>
  );
};
