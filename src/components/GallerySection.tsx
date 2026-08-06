import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Camera, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video'; url: string; title: string } | null>(null);

  const mediaItems = [
    {
      id: 'img-1',
      type: 'image' as const,
      url: '/images/car-mobilio.webp',
      title: 'Armada Mobil Executive Simatupang Tour',
      tag: 'Armada & Shuttle'
    },
    {
      id: 'img-2',
      type: 'image' as const,
      url: '/images/car-front.webp',
      title: 'Tampilan Depan Armada Siap Rute Jawa-Bali',
      tag: 'Kondisi Armada'
    },
    {
      id: 'img-3',
      type: 'image' as const,
      url: '/images/pulau-merah-tourists.webp',
      title: 'Dokumentasi Wisatawan di Pantai Pulau Merah Banyuwangi',
      tag: 'Dokumentasi Tour'
    },
    {
      id: 'vid-1',
      type: 'video' as const,
      url: '/videos/video-1.mp4',
      title: 'Video Perjalanan & Layanan Driver Professional',
      tag: 'Video Dok'
    },
    {
      id: 'vid-2',
      type: 'video' as const,
      url: '/videos/video-2.mp4',
      title: 'Video Penjemputan & Suasana Wisata Jawa-Bali',
      tag: 'Video Dok'
    }
  ];

  return (
    <section id="galeri" className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-zinc-900 bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        {/* Title from Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-xs uppercase font-normal tracking-widest text-zinc-500 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-zinc-700" />
            Galeri & Dokumentasi Perjalanan
          </span>
          <h2 className="text-3xl md:text-4xl font-normal mt-2 text-zinc-900">
            Dokumentasi Asli Armada & Klien Kami
          </h2>
        </motion.div>

        {/* Subtitle from Right */}
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="text-sm text-zinc-600 max-w-md"
        >
          Lihat foto dan video asli pelayanan supir, armada executive, serta keseruan liburan wisatawan di Banyuwangi, Kawah Ijen, Bromo, dan Pulau Merah.
        </motion.p>
      </div>

      {/* Media Cards with Staggered Scale & Fade Entrance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative h-72 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 shadow-sm cursor-pointer"
            onClick={() => setSelectedMedia(item)}
          >
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full relative bg-zinc-900 flex items-center justify-center">
                <video
                  src={item.url}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-zinc-900 ml-0.5" />
                  </div>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-between">
              <span className="self-start text-[10px] uppercase tracking-wider font-medium text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                {item.tag}
              </span>
              <h4 className="text-sm font-medium text-white drop-shadow-sm">
                {item.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal with Framer Motion */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800">
                <h4 className="text-sm font-normal text-white">{selectedMedia.title}</h4>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 flex items-center justify-center bg-black max-h-[75vh]">
                {selectedMedia.type === 'image' ? (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    className="max-h-[70vh] w-auto object-contain rounded-xl"
                  />
                ) : (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-h-[70vh] w-auto rounded-xl"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
