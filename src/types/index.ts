export interface HeroSlide {
  id: string;
  category: string;
  headline: string;
  description: string;
  bgImage: string;
  driver: {
    name: string;
    title: string;
    avatar: string;
    badge: string;
  };
}

export interface TourPackage {
  id: string;
  title: string;
  category: 'wisata' | 'wedding' | 'private';
  location: string;
  duration: string;
  price: string;
  image: string;
  rating: number;
  features: string[];
}

export interface WeddingCar {
  id: string;
  name: string;
  type: string;
  pricePerDay: string;
  image: string;
  specs: string[];
  includes: string[];
}
