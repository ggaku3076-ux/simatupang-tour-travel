import React, { createContext, useContext, useState, useEffect } from 'react';
import { HeroSlide, TourPackage, WeddingCar } from '../types';
import { HERO_SLIDES as DEFAULT_HERO_SLIDES } from '../data/heroData';
import { TOUR_PACKAGES as DEFAULT_TOUR_PACKAGES, WEDDING_CARS as DEFAULT_WEDDING_CARS } from '../data/catalogData';

interface ContactInfo {
  phone: string;
  whatsappRaw: string;
  email: string;
  address: string;
}

const DEFAULT_CONTACT_INFO: ContactInfo = {
  phone: '+62 895-1352-3714',
  whatsappRaw: '6289513523714',
  email: 'info@simatupangtour.com',
  address: 'Jl. Raya Banyuwangi No. 88, Banyuwangi, Jawa Timur',
};

interface AdminContextType {
  isAdminLoggedIn: boolean;
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  heroSlides: HeroSlide[];
  tourPackages: TourPackage[];
  weddingCars: WeddingCar[];
  contactInfo: ContactInfo;
  updateHeroSlide: (slide: HeroSlide) => void;
  updateTourPackage: (pkg: TourPackage) => void;
  updateWeddingCar: (car: WeddingCar) => void;
  updateContactInfo: (info: ContactInfo) => void;
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('simatupang_admin_logged_in') === 'true';
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('simatupang_hero_slides');
    return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
  });

  const [tourPackages, setTourPackages] = useState<TourPackage[]>(() => {
    const saved = localStorage.getItem('simatupang_tour_packages');
    return saved ? JSON.parse(saved) : DEFAULT_TOUR_PACKAGES;
  });

  const [weddingCars, setWeddingCars] = useState<WeddingCar[]>(() => {
    const saved = localStorage.getItem('simatupang_wedding_cars');
    return saved ? JSON.parse(saved) : DEFAULT_WEDDING_CARS;
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('simatupang_contact_info');
    return saved ? JSON.parse(saved) : DEFAULT_CONTACT_INFO;
  });

  useEffect(() => {
    localStorage.setItem('simatupang_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('simatupang_tour_packages', JSON.stringify(tourPackages));
  }, [tourPackages]);

  useEffect(() => {
    localStorage.setItem('simatupang_wedding_cars', JSON.stringify(weddingCars));
  }, [weddingCars]);

  useEffect(() => {
    localStorage.setItem('simatupang_contact_info', JSON.stringify(contactInfo));
  }, [contactInfo]);

  const loginAdmin = (passcode: string): boolean => {
    if (passcode === 'admin123' || passcode === '089513523714') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('simatupang_admin_logged_in', 'true');
      setIsAdminPanelOpen(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('simatupang_admin_logged_in');
    setIsAdminPanelOpen(false);
  };

  const updateHeroSlide = (updatedSlide: HeroSlide) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === updatedSlide.id ? updatedSlide : s)));
  };

  const updateTourPackage = (updatedPkg: TourPackage) => {
    setTourPackages((prev) => prev.map((p) => (p.id === updatedPkg.id ? updatedPkg : p)));
  };

  const updateWeddingCar = (updatedCar: WeddingCar) => {
    setWeddingCars((prev) => prev.map((c) => (c.id === updatedCar.id ? updatedCar : c)));
  };

  const updateContactInfo = (newInfo: ContactInfo) => {
    setContactInfo(newInfo);
  };

  const resetToDefaults = () => {
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setTourPackages(DEFAULT_TOUR_PACKAGES);
    setWeddingCars(DEFAULT_WEDDING_CARS);
    setContactInfo(DEFAULT_CONTACT_INFO);
    localStorage.removeItem('simatupang_hero_slides');
    localStorage.removeItem('simatupang_tour_packages');
    localStorage.removeItem('simatupang_wedding_cars');
    localStorage.removeItem('simatupang_contact_info');
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        loginAdmin,
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
