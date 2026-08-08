import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Heart } from 'lucide-react';
import { WEDDING_CARS } from '../data/catalogData';

interface WeddingCarProps {
  onOpenBooking: () => void;
}

export const WeddingCarSection: React.FC<WeddingCarProps> = ({ onOpenBooking }) => {
  return (
    <section id="wedding" className="py-24 bg-zinc-50 border-y border-zinc-200 px-6 md:px-12 text-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          {/* Header Title Sliding from Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="text-xs uppercase font-semibold tracking-widest text-zinc-600 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-zinc-800 fill-zinc-800" />
              Layanan Khusus Pernikahan
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-zinc-900">
              Rental Mobil Pengantin Eksklusif (Wedding Car)
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
            Lengkapi momen bahagia Anda dengan armada mobil pengantin premium Honda Mobilio Facelift, lengkap dengan supir berbusana resmi & dekorasi bunga murni.
          </motion.p>
        </div>

        {/* Wedding Car Card with Scale Pop & Fade Up */}
        <div className="grid grid-cols-1 max-w-xl mx-auto gap-8">
          {WEDDING_CARS.map((car, idx) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.25, 0.1, 0.25, 1.0] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-zinc-200 rounded-3xl p-6 flex flex-col justify-between hover:border-zinc-300 transition-colors shadow-sm"
            >
              <div>
                <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-zinc-100 flex items-center justify-center border border-zinc-200">
                  <img
                    src={car.image}
                    alt={`Foto Armada ${car.name}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <span className="text-xs font-semibold text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                  {car.type}
                </span>

                <h3 className="text-xl font-bold text-zinc-900 mt-3 mb-1">
                  {car.name}
                </h3>
                <p className="text-xs text-zinc-700 font-semibold mb-4">{car.pricePerDay}</p>

                <div className="space-y-2 mb-6">
                  <span className="text-xs text-zinc-700 font-bold uppercase tracking-wider block">Fasilitas All-In:</span>
                  {car.includes.map((inc, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-2 text-xs text-zinc-800 font-medium"
                    >
                      <Check className="w-3.5 h-3.5 text-zinc-950 flex-shrink-0" />
                      <span>{inc}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                aria-label={`Sewa mobil pengantin ${car.name}`}
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white py-3 rounded-2xl text-xs font-semibold transition-all shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sewa Mobil Pengantin</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
