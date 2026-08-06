import { TourPackage, WeddingCar } from '../types';

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-ijen',
    title: 'Ekspedisi Midnight Kawah Ijen Blue Fire',
    category: 'wisata',
    location: 'Banyuwangi, Jawa Timur',
    duration: '12 Jam (Midnight)',
    price: 'Mulai dari Rp 200.000 (Menyesuaikan Jarak)',
    image: '/images/ijen-custom.png',
    rating: 4.9,
    features: ['Masker Gas Respirator', 'Tiket Masuk Taman Nasional', 'Driver & Guide Lokal', 'Antar Jemput Surabaya/Banyuwangi']
  },
  {
    id: 'pkg-bromo',
    title: 'Private Tour Sunrise Bromo & Pasir Berbisik',
    category: 'wisata',
    location: 'Probolinggo / Pasuruan',
    duration: '1D (Full Day)',
    price: 'Mulai dari Rp 200.000 (Menyesuaikan Jarak)',
    image: '/images/bromo.webp',
    rating: 5.0,
    features: ['Sewa Jeep 4x4 VIP', 'Spot Penanjakan 1 & Kawah', 'Dokumentasi Foto', 'Snack & Air Mineral']
  },
  {
    id: 'pkg-pulau-merah',
    title: 'Sunset Excursion Pantai Pulau Merah & De Djajatan',
    category: 'wisata',
    location: 'Pesanggaran, Banyuwangi',
    duration: '1D',
    price: 'Mulai dari Rp 200.000 (Menyesuaikan Jarak)',
    image: '/images/pulau-merah-tourists.webp',
    rating: 4.8,
    features: ['Mobil AC Dingin Nyaman', 'Kunjungan Hutan De Djajatan', 'Tiket Masuk All-In', 'Supir Ramah']
  },
  {
    id: 'pkg-bali-overland',
    title: 'Private Shuttle & Tour Banyuwangi - Bali Overland',
    category: 'private',
    location: 'Surabaya - Banyuwangi - Denpasar',
    duration: '3D2N Custom',
    price: 'Mulai dari Rp 200.000 (Menyesuaikan Jarak)',
    image: '/images/car-front.webp',
    rating: 4.9,
    features: ['Penyeberangan Kapal Ferri', 'BBM + Driver Pengalaman', 'Penjemputan Hotel/Bandara', 'Free Time Flexibility']
  }
];

export const WEDDING_CARS: WeddingCar[] = [
  {
    id: 'car-mobilio',
    name: 'Honda Mobilio Facelift Executive',
    type: 'Luxury Executive Car',
    pricePerDay: 'Mulai dari Rp 200.000 (Menyesuaikan Jarak & Rute)',
    image: '/images/car-mobilio.webp',
    specs: ['Elegance White Body', 'Interior Premium Leather', 'AC Dingin & Kursi Nyaman'],
    includes: ['Chauffeur VIP Pengalaman', 'Dekorasi Bunga Spesial', 'BBM & Pelayanan Prioritas']
  }
];
