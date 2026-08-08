import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/catalogData';

interface DestinationsProps {
  onOpenBooking: () => void;
}

export const DestinationsSection: React.FC<DestinationsProps> = ({ onOpenBooking }) => {
  return (
    <section id="destinasi" className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-zinc-900 bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        {/* Title sliding from Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-xs uppercase font-semibold tracking-widest text-zinc-600">
            Destinasi Pilihan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-zinc-900">
            Paket Wisata Favorit Jawa-Bali
          </h2>
        </motion.div>

        {/* Subtitle text sliding from Right */}
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-sm text-zinc-700 max-w-md font-medium"
        >
          Nikmati perjalanan bebas repot ke Kawah Ijen, Bromo, Pantai Pulau Merah, dan destinasi hits Banyuwangi dengan supir berpengalaman.
        </motion.p>
      </div>

      {/* Cards with Staggered Entrance from Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOUR_PACKAGES.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: idx * 0.12, ease: [0.25, 0.1, 0.25, 1.0] }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors flex flex-col justify-between shadow-sm"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={pkg.image}
                alt={`Foto Destinasi Wisata ${pkg.title}`}
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-zinc-900 flex items-center gap-1 border border-zinc-200 shadow-sm">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{pkg.rating}</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium mb-2">
                  <MapPin className="w-3.5 h-3.5 text-zinc-800" />
                  <span>{pkg.location}</span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors line-clamp-2">
                  {pkg.title}
                </h3>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-200">
                <div className="flex flex-col gap-1 text-xs text-zinc-700">
                  <span className="flex items-center gap-1 text-zinc-600 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {pkg.duration}
                  </span>
                  <span className="text-zinc-950 font-bold">{pkg.price}</span>
                </div>

                <button
                  onClick={onOpenBooking}
                  aria-label={`Pesan paket wisata ${pkg.title}`}
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  <span>Pesan Paket Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
