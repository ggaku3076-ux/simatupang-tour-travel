import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Edit3, Save, RefreshCw, LogOut, Check, Image as ImageIcon, ExternalLink, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminPage: React.FC = () => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    heroSlides,
    tourPackages,
    weddingCars,
    galleryItems,
    contactInfo,
    updateHeroSlide,
    updateTourPackage,
    updateWeddingCar,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    updateContactInfo,
    resetToDefaults,
  } = useAdmin();

  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'destinasi' | 'wedding' | 'galeri' | 'kontak'>('hero');
  const [selectedSlideId, setSelectedSlideId] = useState<string>(heroSlides[0]?.id || 'ijen');
  const [selectedPkgId, setSelectedPkgId] = useState<string>(tourPackages[0]?.id || 'pkg-ijen');
  const [selectedCarId, setSelectedCarId] = useState<string>(weddingCars[0]?.id || 'car-mobilio');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // New Gallery Form State
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalTag, setNewGalTag] = useState('Dokumentasi Tour');
  const [newGalType, setNewGalType] = useState<'image' | 'video'>('image');
  const [newGalUrl, setNewGalUrl] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(passcode);
    if (!success) {
      setLoginError('PIN / Password Admin salah. Silakan coba lagi.');
    }
  };

  const triggerSuccess = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

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

  const handleAddGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle || !newGalUrl) {
      alert('Mohon isi Judul dan URL/Upload Berkas media.');
      return;
    }
    addGalleryItem({
      title: newGalTitle,
      tag: newGalTag,
      type: newGalType,
      url: newGalUrl,
    });
    setNewGalTitle('');
    setNewGalUrl('');
    triggerSuccess('Item Galeri Baru Berhasil Ditambahkan!');
  };

  const activeSlide = heroSlides.find((s) => s.id === selectedSlideId) || heroSlides[0];
  const activePkg = tourPackages.find((p) => p.id === selectedPkgId) || tourPackages[0];
  const activeCar = weddingCars.find((c) => c.id === selectedCarId) || weddingCars[0];

  // LOGIN SCREEN FOR /admin
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide uppercase">Admin CMS Dashboard</h1>
              <p className="text-xs text-zinc-400 mt-1">Simatupang Tour & Travel Management System</p>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
            <div>
              <label htmlFor="admin-page-pin" className="block text-xs font-semibold text-zinc-300 mb-1.5">
                PIN / Password Admin (Default: admin123)
              </label>
              <input
                id="admin-page-pin"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan Password Admin"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                autoFocus
                required
              />
              {loginError && <p className="text-xs text-red-400 font-medium mt-2">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <span>MASUK DASBOR ADMIN</span>
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-800 text-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new Event('popstate'));
              }}
              className="text-xs text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Website Utama</span>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // DEDICATED ADMIN DASHBOARD PAGE
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.webp"
            alt="Logo Simatupang Tour"
            className="w-9 h-9 rounded-full object-cover border border-zinc-700"
          />
          <div>
            <h1 className="text-base font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <span>Halaman Panel Admin CMS</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">Aktif</span>
            </h1>
            <p className="text-xs text-zinc-400">Pengaturan Teks, Foto, Galeri, Harga, & Kontak Website</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new Event('popstate'));
            }}
            className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3.5 py-2 rounded-xl text-xs font-semibold border border-zinc-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website Live</span>
          </a>

          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3.5 py-2 rounded-xl text-xs font-semibold border border-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-6">
        {/* Success Banner */}
        {saveSuccessMsg && (
          <div className="bg-emerald-500/20 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-300 flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="font-semibold">{saveSuccessMsg}</span>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-2 rounded-2xl overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'hero' ? 'bg-emerald-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🖼️ Edit Hero Slides
          </button>
          <button
            onClick={() => setActiveTab('destinasi')}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'destinasi' ? 'bg-emerald-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🏝️ Edit Paket Wisata
          </button>
          <button
            onClick={() => setActiveTab('wedding')}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'wedding' ? 'bg-emerald-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            🚗 Edit Wedding Car
          </button>
          <button
            onClick={() => setActiveTab('galeri')}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'galeri' ? 'bg-emerald-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            📷 Edit & Tambah Galeri ({galleryItems.length})
          </button>
          <button
            onClick={() => setActiveTab('kontak')}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'kontak' ? 'bg-emerald-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            📞 Edit Kontak & WA
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* TAB 1: HERO SLIDES */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                  Pilih Slide Hero Yang Ingin Diedit:
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {heroSlides.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSlideId(s.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSlideId === s.id
                          ? 'bg-white text-zinc-950 border-white shadow-md'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                    >
                      {s.category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Headline Utama Slide</label>
                    <textarea
                      rows={3}
                      value={activeSlide.headline}
                      onChange={(e) => updateHeroSlide({ ...activeSlide, headline: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-bold uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Sub-Deskripsi</label>
                    <textarea
                      rows={3}
                      value={activeSlide.description}
                      onChange={(e) => updateHeroSlide({ ...activeSlide, description: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Kategori Tab</label>
                      <input
                        type="text"
                        value={activeSlide.category}
                        onChange={(e) => updateHeroSlide({ ...activeSlide, category: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Supir / Specialist</label>
                      <input
                        type="text"
                        value={activeSlide.driver.name}
                        onChange={(e) =>
                          updateHeroSlide({
                            ...activeSlide,
                            driver: { ...activeSlide.driver, name: e.target.value },
                          })
                        }
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Badge Supir</label>
                    <input
                      type="text"
                      value={activeSlide.driver.badge}
                      onChange={(e) =>
                        updateHeroSlide({
                          ...activeSlide,
                          driver: { ...activeSlide.driver, badge: e.target.value },
                        })
                      }
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                {/* Image Preview & Upload */}
                <div className="lg:col-span-5 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-4">
                  <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Foto Latar Slide ({activeSlide.category})</span>
                    <ImageIcon className="w-4 h-4 text-emerald-400" />
                  </h3>

                  <div className="h-44 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                    <img src={activeSlide.bgImage} alt="Pratinjau Foto Slide" className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1">URL Foto Gambar</label>
                    <input
                      type="text"
                      value={activeSlide.bgImage}
                      onChange={(e) => updateHeroSlide({ ...activeSlide, bgImage: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono mb-2"
                    />
                    <label className="block text-center cursor-pointer bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold border border-emerald-500/30 transition-colors">
                      Upload Foto Baru Dari Komputer / HP
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, (url) => updateHeroSlide({ ...activeSlide, bgImage: url }))}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PAKET WISATA */}
          {activeTab === 'destinasi' && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
                  Pilih Paket Wisata Yang Ingin Diedit:
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {tourPackages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPkgId(p.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedPkgId === p.id
                          ? 'bg-white text-zinc-950 border-white shadow-md'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white'
                      }`}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Judul Paket Wisata</label>
                    <input
                      type="text"
                      value={activePkg.title}
                      onChange={(e) => updateTourPackage({ ...activePkg, title: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Teks Harga Layanan</label>
                      <input
                        type="text"
                        value={activePkg.price}
                        onChange={(e) => updateTourPackage({ ...activePkg, price: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">Durasi Paket</label>
                      <input
                        type="text"
                        value={activePkg.duration}
                        onChange={(e) => updateTourPackage({ ...activePkg, duration: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Lokasi Destinasi</label>
                    <input
                      type="text"
                      value={activePkg.location}
                      onChange={(e) => updateTourPackage({ ...activePkg, location: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-4">
                  <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Foto Kartu Paket Wisata</h3>
                  <div className="h-44 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                    <img src={activePkg.image} alt="Pratinjau Foto Paket" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={activePkg.image}
                      onChange={(e) => updateTourPackage({ ...activePkg, image: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono mb-2"
                    />
                    <label className="block text-center cursor-pointer bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold border border-emerald-500/30 transition-colors">
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
            </div>
          )}

          {/* TAB 3: WEDDING CAR */}
          {activeTab === 'wedding' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Nama Armada Mobil Pengantin</label>
                  <input
                    type="text"
                    value={activeCar.name}
                    onChange={(e) => updateWeddingCar({ ...activeCar, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Tipe Mobil</label>
                    <input
                      type="text"
                      value={activeCar.type}
                      onChange={(e) => updateWeddingCar({ ...activeCar, type: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Harga Sewa Mobil</label>
                    <input
                      type="text"
                      value={activeCar.pricePerDay}
                      onChange={(e) => updateWeddingCar({ ...activeCar, pricePerDay: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-4">
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Foto Armada Mobil Pengantin</h3>
                <div className="h-44 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                  <img src={activeCar.image} alt="Pratinjau Mobil Pengantin" className="w-full h-full object-cover" />
                </div>
                <div>
                  <input
                    type="text"
                    value={activeCar.image}
                    onChange={(e) => updateWeddingCar({ ...activeCar, image: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono mb-2"
                  />
                  <label className="block text-center cursor-pointer bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-4 py-2.5 rounded-xl text-xs font-bold border border-emerald-500/30 transition-colors">
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
            </div>
          )}

          {/* TAB 4: EDIT & TAMBAH GALERI */}
          {activeTab === 'galeri' && (
            <div className="space-y-8">
              {/* Form Tambah Item Baru */}
              <form onSubmit={handleAddGallerySubmit} className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-4">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Foto / Video Galeri Baru</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Judul / Deskripsi Galeri</label>
                    <input
                      type="text"
                      value={newGalTitle}
                      onChange={(e) => setNewGalTitle(e.target.value)}
                      placeholder="Contoh: Suasana Penjemputan di Bandara Banyuwangi"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Tag / Kategori Dokumentasi</label>
                    <input
                      type="text"
                      value={newGalTag}
                      onChange={(e) => setNewGalTag(e.target.value)}
                      placeholder="Contoh: Dokumentasi Tour / Armada & Shuttle"
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">Jenis Media</label>
                    <select
                      value={newGalType}
                      onChange={(e) => setNewGalType(e.target.value as 'image' | 'video')}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="image">📷 Foto Gambar (Image)</option>
                      <option value="video">🎥 Video (MP4)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">URL Media / Upload File</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newGalUrl}
                        onChange={(e) => setNewGalUrl(e.target.value)}
                        placeholder="/images/foto.webp atau /videos/video.mp4"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono"
                        required
                      />
                      <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2.5 rounded-xl text-xs font-bold border border-zinc-700 transition-colors whitespace-nowrap flex items-center justify-center">
                        Upload
                        <input
                          type="file"
                          accept={newGalType === 'image' ? 'image/*' : 'video/*'}
                          className="hidden"
                          onChange={(e) => handleImageFileUpload(e, (url) => setNewGalUrl(url))}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>TAMBAHKAN KE GALERI WEBSITE</span>
                </button>
              </form>

              {/* Daftar Galeri Terpasang */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Daftar Item Galeri Terpasang ({galleryItems.length}):</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded-lg bg-zinc-900 overflow-hidden border border-zinc-800 flex-shrink-0">
                          {item.type === 'image' ? (
                            <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-zinc-800 text-emerald-400 flex items-center justify-center font-bold text-[10px]">VIDEO</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateGalleryItem({ ...item, title: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold mb-1"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.tag}
                              onChange={(e) => updateGalleryItem({ ...item, tag: e.target.value })}
                              className="w-28 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-0.5 text-[10px] text-zinc-400 focus:outline-none focus:border-emerald-500"
                            />
                            <span className="text-[10px] text-emerald-400 uppercase">{item.type}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus item galeri "${item.title}"?`)) {
                              deleteGalleryItem(item.id);
                              triggerSuccess('Item galeri berhasil dihapus!');
                            }
                          }}
                          className="p-2 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-zinc-900 transition-colors"
                          title="Hapus item galeri"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KONTAK & WA */}
          {activeTab === 'kontak' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Nomor WhatsApp Tampilan (+62 895-1352-3714)</label>
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) => updateContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Nomor WA Redirect Mentah (6289513523714)</label>
                <input
                  type="text"
                  value={contactInfo.whatsappRaw}
                  onChange={(e) => updateContactInfo({ ...contactInfo, whatsappRaw: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Email Resmi Kantor</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => updateContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Alamat Kantor Lengkap</label>
                <textarea
                  rows={2}
                  value={contactInfo.address}
                  onChange={(e) => updateContactInfo({ ...contactInfo, address: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* Global Save & Reset Bar */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh isi teks & foto ke setelan awal pabrik?')) {
                resetToDefaults();
                triggerSuccess('Seluruh isi website telah dikembalikan ke setelan awal pabrik.');
              }
            }}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-amber-400 transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Seluruh Konten Ke Awal Pabrik</span>
          </button>

          <button
            onClick={() => {
              triggerSuccess('Perubahan berhasil disimpan! Silakan klik "Lihat Website Live" untuk meninjau.');
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-6 py-3 rounded-2xl text-xs transition-all shadow-lg active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>SIMPAN SEMUA PERUBAHAN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
