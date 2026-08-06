import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationsSection } from './components/DestinationsSection';
import { WeddingCarSection } from './components/WeddingCarSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  useLenis();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200 selection:text-zinc-900">
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        activeSection={activeSection}
        setActiveSection={handleNavigate}
      />
      <div id="beranda">
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />
      </div>
      <DestinationsSection onOpenBooking={() => setIsBookingOpen(true)} />
      <WeddingCarSection onOpenBooking={() => setIsBookingOpen(true)} />
      <GallerySection />
      <AboutSection />
      <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />
      <Footer />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default App;
