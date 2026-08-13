import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'destinasi', label: 'Destinasi Wisata' },
    { id: 'wedding', label: 'Layanan Wedding Car' },
    { id: 'galeri', label: 'Galeri & Dokumentasi' },
    { id: 'tentang', label: 'Tentang Kami' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        {/* Logo Badge */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => handleNavClick('beranda')}
            aria-label="Navigasi ke Beranda Simatupang Tour"
            className="flex items-center gap-2.5 bg-white/95 md:backdrop-blur-md border border-zinc-200/80 px-3.5 py-1.5 rounded-full shadow-sm hover:border-zinc-300 transition-colors"
          >
            <img
              src="/images/logo.webp"
              alt="Logo Simatupang Tour & Travel"
              width={32}
              height={32}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border border-zinc-200"
              loading="eager"
            />
            <span className="text-xs font-semibold tracking-wide text-zinc-900 uppercase">
              Simatupang Tour
            </span>
          </button>
        </div>

        {/* Desktop Floating Light Pill Menu */}
        <nav aria-label="Navigasi Utama" className="pointer-events-auto hidden md:flex items-center gap-1 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-full px-4 py-1.5 shadow-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              aria-label={`Navigasi ke ${item.label}`}
              className={`px-4 py-1.5 rounded-full text-xs transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-zinc-900 text-white font-semibold shadow-sm'
                  : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 font-medium'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onOpenBooking}
            aria-label="Pesan sekarang via WhatsApp"
            className="hidden sm:flex group items-center gap-2 bg-zinc-900 hover:bg-black text-white font-medium px-4 py-2 rounded-full text-xs transition-all duration-200 shadow-md active:scale-95"
          >
            <span>PESAN SEKARANG</span>
            <div className="w-4 h-4 rounded-full bg-white text-zinc-900 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-2.5 h-2.5" />
            </div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/95 border border-zinc-200 text-zinc-900 shadow-sm active:scale-95"
            aria-label={mobileMenuOpen ? "Tutup Menu Navigasi" : "Buka Menu Navigasi"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-18 z-40 md:hidden bg-white border border-zinc-200 rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <nav aria-label="Navigasi Seluler" className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-label={`Navigasi seluler ke ${item.label}`}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                    activeSection === item.id
                      ? 'bg-zinc-900 text-white font-semibold'
                      : 'text-zinc-800 hover:bg-zinc-100 font-medium'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              aria-label="Pesan sekarang via WhatsApp dari menu seluler"
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white py-3 rounded-2xl text-xs font-semibold transition-all shadow-md"
            >
              <span>PESAN SEKARANG VIA WHATSAPP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
