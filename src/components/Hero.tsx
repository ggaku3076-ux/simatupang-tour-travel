import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { HERO_SLIDES } from '../data/heroData';

interface HeroProps {
  onOpenBooking: () => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = HERO_SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const words = useMemo(() => slide.headline.split(' '), [slide.headline]);

  return (
    <section className="relative w-full h-screen min-h-[650px] bg-zinc-950 overflow-hidden text-white flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-4 sm:px-8 md:px-12 lg:px-16">
      {/* Background Image Pure & Clear (Fast Local WebP Image) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.bgImage}
            alt={slide.category}
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content Layout Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
        {/* Kiri Tengah: Large Satoshi Bold Headline Text (Mobile Responsive Size) */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
          <motion.h1
            key={slide.id + '-headline'}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-satoshi font-bold leading-tight tracking-tight text-white max-w-2xl"
          >
            {words.map((word, i) => (
              <motion.span
                key={`${slide.id}-${i}`}
                variants={wordVariants}
                className="inline-block mr-2 sm:mr-2.5 will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Kanan Tengah: Secondary Description (White Text with Translucent Dark Backdrop) */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end text-left">
          <motion.p
            key={slide.id + '-desc'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="text-xs sm:text-sm md:text-base font-normal text-white max-w-md leading-relaxed bg-black/50 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 shadow-xl"
          >
            {slide.description}
          </motion.p>
        </div>
      </div>

      {/* Bottom Control & Info Bar Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-end">
        {/* Kiri Bawah: Category Tab Pills */}
        <div className="lg:col-span-7 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {HERO_SLIDES.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-normal transition-all duration-200 whitespace-nowrap border shadow-md ${
                  isActive
                    ? 'bg-white text-zinc-950 border-white scale-105 font-medium'
                    : 'bg-black/60 hover:bg-black/80 text-white border-white/30 backdrop-blur-md'
                }`}
              >
                {item.category}
              </button>
            );
          })}
        </div>

        {/* Kanan Bawah: Controller & Specialist Driver Card */}
        <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center sm:items-end justify-between sm:justify-end gap-3 sm:gap-6">
          {/* Slider Controller (< 01 --------- 05 >) */}
          <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 shadow-xl text-white">
            <button
              onClick={handlePrev}
              className="p-1 rounded-full text-zinc-200 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <span className="text-xs font-mono text-white">
              0{currentIndex + 1}
            </span>
            <div className="w-12 sm:w-16 h-[2px] bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentIndex + 1) / HERO_SLIDES.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-xs font-mono text-zinc-300">
              0{HERO_SLIDES.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1 rounded-full text-zinc-200 hover:text-white transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Floating Specialist Driver Card */}
          <motion.div
            key={slide.driver.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 bg-black/75 backdrop-blur-md border border-white/20 p-2.5 sm:p-3 rounded-2xl shadow-2xl max-w-xs cursor-pointer hover:border-white/40 transition-colors"
            onClick={onOpenBooking}
          >
            <img
              src={slide.driver.avatar}
              alt={slide.driver.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-white/30"
              loading="eager"
            />
            <div className="flex flex-col text-left">
              <h4 className="text-xs font-medium text-white">{slide.driver.name}</h4>
              <p className="text-[10px] sm:text-[11px] font-normal text-zinc-200">{slide.driver.title}</p>
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-amber-300 font-normal">
                <Star className="w-3 h-3 text-amber-300 fill-amber-300" />
                <span>{slide.driver.badge}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
