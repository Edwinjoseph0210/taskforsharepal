export interface Product {
  id: string;
  name: string;
  category: 'ps5' | 'xbox' | 'vr' | 'big-screen' | 'racing-wheel' | 'games';
  categoryLabel: string;
  description: string;
  specs: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  bookingsCount: number;
  pricePerMonth: number;
  deposit: number;
  inStock: boolean;
  badge?: string;
  popular?: boolean;
}

export interface City {
  name: string;
  state: string;
  active: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  durationMonths: number;
  startDate: string;
  quantity: number;
}
