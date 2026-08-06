import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { label: 'Pengalaman Rute', value: '10+ Tahun' },
    { label: 'Wisatawan Terlayani', value: '5.000+' },
    { label: 'Armada Siap Pakai', value: '25+ Unit' },
    { label: 'Kepuasan Pelanggan', value: '4.9 / 5.0' },
  ];

  return (
    <section id="tentang" className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-zinc-900 bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Sliding from Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="lg:col-span-6 space-y-6"
        >
          <span className="text-xs uppercase font-normal tracking-widest text-zinc-500">
            Tentang Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-normal text-zinc-900 leading-tight">
            Partner Perjalanan Terpercaya Anda untuk Rute Jawa - Bali & Banyuwangi
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Simatupang Tour & Travel berpusat di Banyuwangi, melayani paket wisata lengkap Banyuwangi - Surabaya hingga Bali overland. Kami mengedepankan keamanan, kenyamanan armada, dan pelayanan supir yang profesional serta berpengalaman.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {stats.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                className="bg-zinc-50 border border-zinc-200 p-4 rounded-2xl"
              >
                <h4 className="text-2xl font-semibold text-zinc-900">{st.value}</h4>
                <p className="text-xs text-zinc-500 mt-1">{st.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column Sliding from Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-6 relative"
        >
          <div className="rounded-3xl overflow-hidden border border-zinc-200 h-96 relative shadow-md">
            <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
              alt="Armada Simatupang Tour"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-zinc-900" />
                <div>
                  <h4 className="text-xs font-medium text-zinc-900">Banyuwangi - Surabaya - Bali</h4>
                  <p className="text-[11px] text-zinc-500">Layanan Antar Jemput All-In & Private Tour</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
