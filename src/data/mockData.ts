import { Product, City, FAQItem, Testimonial } from '../types';

export const CITIES: City[] = [
  { name: 'Bangalore', state: 'Karnataka', active: true },
  { name: 'Mumbai', state: 'Maharashtra', active: false },
  { name: 'Delhi / NCR', state: 'Delhi', active: false },
  { name: 'Pune', state: 'Maharashtra', active: false },
  { name: 'Hyderabad', state: 'Telangana', active: false },
  { name: 'Chennai', state: 'Tamil Nadu', active: false },
  { name: 'Gurgaon', state: 'Haryana', active: false },
  { name: 'Noida', state: 'Uttar Pradesh', active: false },
];

const DIVERSE_IMAGES = [
  'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1612287233002-91d0f5326c33?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585076641977-f6556cff3c75?auto=format&fit=crop&w=800&q=80',
];

const MODEL_PREFIXES = [
  'PlayStation 5 Pro', 'PlayStation 5 Slim Digital', 'Xbox Series X Elite', 'Xbox Series S Carbon',
  'Meta Quest 3 512GB', 'Meta Quest Pro VR', 'Sony PlayStation VR2', 'Logitech G923 TrueForce',
  'Thrustmaster T300 RS GT', 'Asus ROG Ally Z1 Extreme', 'Steam Deck OLED 1TB', 'Nintendo Switch OLED Mario',
  'Razer Blade 16 RTX 4080', 'Alienware m16 R2 Gaming', 'MSI Katana 15 i7-13', 'Lenovo Legion Pro 5 Gen 8',
  'Acer Predator Helios 16', 'BenQ X3000i 4K Projector', 'Anker Nebula Cosmos Laser 4K', 'Sony Inzone H9 Wireless',
  'SteelSeries Arctis Nova Pro', 'Razer BlackShark V2 Pro', 'Xbox Elite Controller Series 2', 'PS5 DualSense Edge Pro',
  'Nintendo Switch Pro Controller', 'Astro A50 Wireless Gen 4', 'Logitech G PRO X Superlight', 'HyperX Cloud III Wireless',
  'Secretlab Titan Evo Gaming Chair', 'Gamdias Atlas RGB Setup'
];

const CATEGORIES_LIST: ('ps5' | 'xbox' | 'vr' | 'big-screen' | 'racing-wheel' | 'games')[] = [
  'ps5', 'xbox', 'vr', 'big-screen', 'racing-wheel', 'games'
];

const CATEGORY_LABELS: Record<string, string> = {
  'ps5': 'PS5 Console',
  'xbox': 'Xbox Console',
  'vr': 'VR',
  'big-screen': 'Big Screen Gaming',
  'racing-wheel': 'Racing Wheel',
  'games': 'PS5 Games',
};

// Generate exactly 100 unique models with distinct images
export const PRODUCTS: Product[] = Array.from({ length: 100 }, (_, index) => {
  const modelName = MODEL_PREFIXES[index % MODEL_PREFIXES.length] + (index >= MODEL_PREFIXES.length ? ` Mk.${Math.floor(index / MODEL_PREFIXES.length) + 1}` : '');
  const category = CATEGORIES_LIST[index % CATEGORIES_LIST.length];
  const image = DIVERSE_IMAGES[index % DIVERSE_IMAGES.length];
  
  const pricePerMonth = 1299 + (index * 47) % 2800;
  const deposit = 1000 + (index * 131) % 2500;
  const rating = Number((4.6 + ((index * 3) % 4) * 0.1).toFixed(1));
  const reviewsCount = 120 + (index * 31) % 1500;
  const bookingsCount = 450 + (index * 83) % 4000;
  const badge = index % 5 === 0 ? 'Most Popular' : index % 7 === 0 ? 'Lowest Price Guarantee' : index % 11 === 0 ? 'Trending' : undefined;

  return {
    id: `prod-${index + 1}`,
    name: `${modelName} - Rental Edition #${index + 1}`,
    category,
    categoryLabel: CATEGORY_LABELS[category],
    description: `High-performance ${modelName} available for immediate rent in Bangalore with free doorstep delivery, setup, and 100% verified pristine condition.`,
    specs: [
      `Genuine ${modelName} Unit`,
      `Multi-point QC Tested & Sanitized`,
      `Includes All Original Cables & Accessories`,
      `Free Doorstep Delivery & Return Pickup in Bangalore`
    ],
    image,
    rating,
    reviewsCount,
    bookingsCount,
    pricePerMonth,
    deposit,
    inStock: true,
    badge,
    popular: index % 3 === 0,
  };
});

export const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'Gamepad2' },
  { id: 'ps5', label: 'PS5 Console', icon: 'Playstation' },
  { id: 'xbox', label: 'Xbox Console', icon: 'Tv' },
  { id: 'vr', label: 'VR', icon: 'Glasses' },
  { id: 'big-screen', label: 'Big Screen Gaming', icon: 'MonitorPlay' },
  { id: 'racing-wheel', label: 'Racing Wheel', icon: 'Compass' },
  { id: 'games', label: 'PS5 Games', icon: 'Disc' },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does renting gaming gadgets work in Bangalore?',
    answer: 'Renting with SharePal is simple and seamless in Bangalore. Choose your desired gaming console or gadget (like PS5 or Xbox), select your rental dates and duration, complete a quick KYC verification, and we deliver the sanitized, ready-to-play device directly to your doorstep with free delivery and pickup.',
  },
  {
    id: 'faq-2',
    question: 'What is the minimum rental period?',
    answer: 'The minimum rental period for gaming gadgets on SharePal is 1 month. However, you can easily extend your rental duration at any time through your account or by contacting our support team.',
  },
  {
    id: 'faq-3',
    question: 'When will my gaming console be delivered and installed?',
    answer: 'We offer express delivery across Bangalore within 24-48 hours of order confirmation. Our delivery executive will drop off the equipment and guide you through the setup if needed.',
  },
  {
    id: 'faq-4',
    question: 'Do I need to pay a security deposit?',
    answer: 'Yes, a fully refundable security deposit is applicable for all high-value electronics and gaming gear. The deposit is refunded back to your original payment method within 2-3 working days after successful inspection upon return pickup.',
  },
  {
    id: 'faq-5',
    question: 'What if the console or controller malfunctions during my rental period?',
    answer: 'All SharePal gaming gear undergoes rigorous multi-point quality checks. In the rare event of a technical glitch or hardware malfunction during your rental tenure, we provide immediate doorstep replacement at zero additional cost.',
  },
  {
    id: 'faq-6',
    question: 'Can I extend my rental period?',
    answer: 'Absolutely! You can extend your rental anytime before your current tenure ends by logging into your SharePal account and paying the pro-rata rental extension fee.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Aditya Sharma',
    city: 'Indiranagar, Bangalore',
    product: 'PlayStation 5 Console',
    rating: 5,
    comment: 'Rented a PS5 for a weekend gaming party and tournament in Indiranagar. The console was in pristine condition, loaded with amazing games, and delivery was right on time. Highly recommended!',
    date: '2 weeks ago',
  },
  {
    id: 'test-2',
    name: 'Karthik R.',
    city: 'Koramangala, Bangalore',
    product: 'Meta Quest 3 VR',
    rating: 5,
    comment: 'SharePal made it super easy to try out VR gaming without spending Rs. 50k upfront. The Meta Quest 3 unit was spotless and fully updated. Fantastic customer support too.',
    date: '1 month ago',
  },
  {
    id: 'test-3',
    name: 'Priya Nambiar',
    city: 'HSR Layout, Bangalore',
    product: 'Xbox Series X',
    rating: 5,
    comment: 'Seamless process from booking to doorstep delivery in HSR Layout. The Xbox Series X with Game Pass kept my friends and me entertained all month long. Will definitely rent again!',
    date: '3 weeks ago',
  },
  {
    id: 'test-4',
    name: 'Rahul Mehta',
    city: 'Whitefield, Bangalore',
    product: 'Logitech G29 Racing Wheel',
    rating: 5,
    comment: 'The racing wheel setup combined with Gran Turismo was an absolute game changer. Solid build quality and zero hassle during pickup.',
    date: '1 month ago',
  },
];

export const RELATED_CATEGORIES = [
  'Action Cameras',
  'Cameras',
  'Trekking Gear',
  'Riding Gear',
  'Creator Gear',
  'Gaming Console',
  'Winter Wear',
  'Camping Gear',
  'Audio Visual Equipment',
];

export const TRUST_METRICS = [
  { value: '₹250Cr+', label: 'Saved Together' },
  { value: '4.5M Kg', label: 'CO₂e Emissions Saved' },
  { value: '100K+', label: 'Products in Circulation' },
];
