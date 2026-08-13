import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit3, Image as ImageIcon, Save, RefreshCw, LogOut, Check, Sparkles } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminPanel: React.FC = () => {
  const {
    isAdminLoggedIn,
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    logoutAdmin,
    heroSlides,
    tourPackages,
    weddingCars,
    contactInfo,
    updateHeroSlide,
    updateTourPackage,
    updateWeddingCar,
    updateContactInfo,
    resetToDefaults,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'hero' | 'destinasi' | 'wedding' | 'kontak'>('hero');
  const [selectedSlideId, setSelectedSlideId] = useState<string>(heroSlides[0]?.id || 'ijen');
  const [selectedPkgId, setSelectedPkgId] = useState<string>(tourPackages[0]?.id || 'pkg-ijen');
  const [selectedCarId, setSelectedCarId] = useState<string>(weddingCars[0]?.id || 'car-mobilio');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  if (!isAdminLoggedIn || !isAdminPanelOpen) return null;

  const activeSlide = heroSlides.find((s) => s.id === selectedSlideId) || heroSlides[0];
  const activePkg = tourPackages.find((p) => p.id === selectedPkgId) || tourPackages[0];
  const activeCar = weddingCars.find((c) => c.id === selectedCarId) || weddingCars[0];

  const triggerSuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Helper for image upload to Base64
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onSave: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onSave(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminPanelOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Panel Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-xl bg-zinc-900 text-white h-full shadow-2xl flex flex-col border-l border-zinc-800"
        >
          {/* Header */}
          <div className="p-5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
                  <span>Panel Edit Admin CMS</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Live</span>
                </h2>
                <p className="text-[11px] text-zinc-400">Edit foto, headline, deskripsi, harga & kontak langsung</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={logoutAdmin}
                title="Keluar Mode Admin"
                className="p-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAdminPanelOpen(false)}
                title="Tutup Panel Edit"
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Success Banner */}
          {saveSuccessMsg && (
            <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-5 py-2.5 text-xs text-emerald-300 flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{saveSuccessMsg}</span>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center bg-zinc-950 border-b border-zinc-800 px-3 py-2 gap-1 overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'hero' ? 'bg-white text-zinc-950 font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              🖼️ Hero Slides
            </button>
            <button
              onClick={() => setActiveTab('destinasi')}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'destinasi' ? 'bg-white text-zinc-950 font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              🏝️ Paket Wisata
            </button>
            <button
              onClick={() => setActiveTab('wedding')}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'wedding' ? 'bg-white text-zinc-950 font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              🚗 Wedding Car
            </button>
            <button
              onClick={() => setActiveTab('kontak')}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'kontak' ? 'bg-white text-zinc-950 font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              📞 Kontak & WA
            </button>
          </div>

          {/* Body Editor Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* TAB 1: HERO SLIDES EDITOR */}
            {activeTab === 'hero' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2">Pilih Slide Hero Yang Ingin Diedit:</label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {heroSlides.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSlideId(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          selectedSlideId === s.id
                            ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold'
                            : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                        }`}
                      >
                        {s.category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Headline Text (Hero Section 1)</label>
                    <textarea
                      rows={2}
                      value={activeSlide.headline}
                      onChange={(e) => updateHeroSlide({ ...activeSlide, headline: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows={3}
                      value={activeSlide.description}
                      onChange={(e) => updateHeroSlide({ ...activeSlide, description: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Kategori Tab</label>
                      <input
                        type="text"
                        value={activeSlide.category}
                        onChange={(e) => updateHeroSlide({ ...activeSlide, category: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Driver Specialist</label>
                      <input
                        type="text"
                        value={activeSlide.driver.name}
                        onChange={(e) =>
                          updateHeroSlide({
                            ...activeSlide,
                            driver: { ...activeSlide.driver, name: e.target.value },
                          })
                        }
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Badge Driver</label>
                    <input
                      type="text"
                      value={activeSlide.driver.badge}
                      onChange={(e) =>
                        updateHeroSlide({
                          ...activeSlide,
                          driver: { ...activeSlide.driver, badge: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1 flex items-center justify-between">
                      <span>URL Gambar Latar Slide ({activeSlide.category})</span>
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    </label>
                    <input
                      type="text"
                      value={activeSlide.bgImage}
                      onChange={(e) => updateHeroSlide({ ...activeSlide, bgImage: e.target.value })}
                      placeholder="/images/nama-foto.webp atau https://..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono mb-2"
                    />
                    <div className="flex items-center gap-3 pt-1">
                      <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-medium border border-zinc-700 transition-colors">
                        Upload Foto Dari Perangkat
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileUpload(e, (url) => updateHeroSlide({ ...activeSlide, bgImage: url }))}
                        />
                      </label>
                      <span className="text-[10px] text-zinc-500">Format: WebP / JPG / PNG</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DESTINASI WISATA EDITOR */}
            {activeTab === 'destinasi' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-2">Pilih Paket Wisata Yang Ingin Diedit:</label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {tourPackages.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPkgId(p.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                          selectedPkgId === p.id
                            ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold'
                            : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                        }`}
                      >
                        {p.title.split(' ')[0]} {p.title.split(' ')[1]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Judul Paket Wisata</label>
                    <input
                      type="text"
                      value={activePkg.title}
                      onChange={(e) => updateTourPackage({ ...activePkg, title: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Harga Layanan</label>
                      <input
                        type="text"
                        value={activePkg.price}
                        onChange={(e) => updateTourPackage({ ...activePkg, price: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Durasi Tour</label>
                      <input
                        type="text"
                        value={activePkg.duration}
                        onChange={(e) => updateTourPackage({ ...activePkg, duration: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Lokasi Destinasi</label>
                    <input
                      type="text"
                      value={activePkg.location}
                      onChange={(e) => updateTourPackage({ ...activePkg, location: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">URL / File Gambar Kartu Paket</label>
                    <input
                      type="text"
                      value={activePkg.image}
                      onChange={(e) => updateTourPackage({ ...activePkg, image: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono mb-2"
                    />
                    <label className="inline-block cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-medium border border-zinc-700 transition-colors">
                      Upload Gambar Baru
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, (url) => updateTourPackage({ ...activePkg, image: url }))}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: WEDDING CAR EDITOR */}
            {activeTab === 'wedding' && (
              <div className="space-y-4 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Armada Mobil Pengantin</label>
                  <input
                    type="text"
                    value={activeCar.name}
                    onChange={(e) => updateWeddingCar({ ...activeCar, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Kategori Tipe</label>
                    <input
                      type="text"
                      value={activeCar.type}
                      onChange={(e) => updateWeddingCar({ ...activeCar, type: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Harga Sewa Per Hari</label>
                    <input
                      type="text"
                      value={activeCar.pricePerDay}
                      onChange={(e) => updateWeddingCar({ ...activeCar, pricePerDay: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Foto Armada Mobil Pengantin</label>
                  <input
                    type="text"
                    value={activeCar.image}
                    onChange={(e) => updateWeddingCar({ ...activeCar, image: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono mb-2"
                  />
                  <label className="inline-block cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-xl text-[11px] font-medium border border-zinc-700 transition-colors">
                    Upload Foto Mobil Baru
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, (url) => updateWeddingCar({ ...activeCar, image: url }))}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* TAB 4: KONTAK & WHATSAPP EDITOR */}
            {activeTab === 'kontak' && (
              <div className="space-y-4 bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nomor WhatsApp Tampilan (Contoh: +62 895-1352-3714)</label>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => updateContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nomor WA Mentah Redirect (Contoh: 6289513523714)</label>
                  <input
                    type="text"
                    value={contactInfo.whatsappRaw}
                    onChange={(e) => updateContactInfo({ ...contactInfo, whatsappRaw: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Resmi Kantor</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => updateContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Alamat Kantor Lengkap</label>
                  <textarea
                    rows={2}
                    value={contactInfo.address}
                    onChange={(e) => updateContactInfo({ ...contactInfo, address: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => {
                if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh konten teks & foto ke setelan awal pabrik?')) {
                  resetToDefaults();
                  triggerSuccess('Konten berhasil dikembalikan ke setelan awal pabrik.');
                }
              }}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset ke Setelan Awal</span>
            </button>

            <button
              onClick={() => {
                triggerSuccess('Seluruh perubahan konten berhasil disimpan secara instan!');
              }}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
