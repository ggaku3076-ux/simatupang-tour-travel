import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { AdminProvider } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationsSection } from './components/DestinationsSection';
import { WeddingCarSection } from './components/WeddingCarSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { AdminPage } from './pages/AdminPage';

export const AppContent: React.FC = () => {
  useLenis();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash);
  const [currentSearch, setCurrentSearch] = useState<string>(() => window.location.search);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
      setCurrentSearch(window.location.search);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if user is accessing admin via /admin, #admin, or ?admin
  const isAdminRoute =
    currentPath === '/admin' ||
    currentPath === '/admin/' ||
    currentHash === '#admin' ||
    currentSearch.includes('admin');

  if (isAdminRoute) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200 selection:text-zinc-900">
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        activeSection={activeSection}
        setActiveSection={handleNavigate}
      />
      <main id="main-content">
        <div id="beranda">
          <Hero onOpenBooking={() => setIsBookingOpen(true)} />
        </div>
        <DestinationsSection onOpenBooking={() => setIsBookingOpen(true)} />
        <WeddingCarSection onOpenBooking={() => setIsBookingOpen(true)} />
        <GallerySection />
        <AboutSection />
        <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />
      </main>
      <Footer />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
};

export default App;
