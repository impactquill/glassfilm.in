import {
  Search,
  Calendar,
  Ruler,
  FileText,
  CheckCircle,
  Thermometer,
  Shield,
  Sun,
  Wallet,
  Sparkles,
  Wrench,
} from 'lucide-react'

export const products = [
  { id: 1, name: 'UV Shield Pro', category: 'Heat Control', image: '/product-uv-shield.jpg', rating: 4.8, reviews: 124, description: 'Block 99% harmful UV rays' },
  { id: 2, name: 'Frosted Elegance', category: 'Privacy', image: '/product-frosted.jpg', rating: 4.9, reviews: 89, description: 'Stylish opacity for offices' },
  { id: 3, name: 'Solar Silver', category: 'Frosted', image: '/product-solar.jpg', rating: 4.7, reviews: 156, description: 'Reflective protection for south-facing windows' },
  { id: 4, name: 'Decorative Flora', category: 'Decorative', image: '/product-decorative.jpg', rating: 4.8, reviews: 67, description: 'Botanical patterns for homes' },
  { id: 5, name: 'One-Way Mirror', category: 'Privacy', image: '/product-mirror.jpg', rating: 4.9, reviews: 203, description: 'See out, not in' },
  { id: 6, name: 'Ceramic Heat Block', category: 'Heat Control', image: '/product-ceramic.jpg', rating: 4.8, reviews: 91, description: 'Advanced ceramic technology' },
  { id: 7, name: 'Gradient Fade', category: 'Decorative', image: '/product-gradient.jpg', rating: 4.6, reviews: 45, description: 'Modern ombre effect' },
  { id: 8, name: 'Custom Print Film', category: 'Decorative', image: '/product-custom.jpg', rating: 4.9, reviews: 34, description: 'Your design, your film' },
  { id: 9, name: 'Premium Roller Blinds', category: 'Window Blinds', image: '/blinds-roller.jpg', rating: 4.8, reviews: 112, description: 'Smooth operation with blackout options' },
  { id: 10, name: 'Zebra Dual Shade', category: 'Window Blinds', image: '/blinds-zebra.jpg', rating: 4.9, reviews: 85, description: 'Adjustable light control with style' },
  { id: 11, name: 'Vertical Office Blinds', category: 'Window Blinds', image: '/blinds-vertical.jpg', rating: 4.7, reviews: 143, description: 'Professional look for large windows' },
  { id: 12, name: 'Wooden Venetian Blinds', category: 'Window Blinds', image: '/blinds-wooden.jpg', rating: 4.9, reviews: 67, description: 'Classic aesthetic with natural texture' },
  { id: 13, name: 'Custom 3D Mural', category: 'Wallpapers', image: '/wallpaper-3d.jpg', rating: 4.9, reviews: 92, description: 'Immersive designs for your accent wall' },
  { id: 14, name: 'Italian Textured Wall', category: 'Wallpapers', image: '/wallpaper-texture.jpg', rating: 4.8, reviews: 76, description: 'Premium feel with subtle patterns' },
  { id: 15, name: 'Kids Fantasy World', category: 'Wallpapers', image: '/wallpaper-kids.jpg', rating: 4.9, reviews: 54, description: 'Playful and vibrant for children rooms' },
  { id: 16, name: 'Metallic Damask', category: 'Wallpapers', image: '/wallpaper-metallic.jpg', rating: 4.7, reviews: 31, description: 'Luxury finish for living spaces' },
]

export const benefits = [
  { icon: Thermometer, title: 'Heat Reduction', description: 'Reduce indoor temperature by up to 8°C. Save on AC bills.' },
  { icon: Shield, title: 'Privacy', description: 'Enjoy natural light without compromising privacy.' },
  { icon: Sun, title: 'UV Protection', description: 'Block 99% harmful UV rays. Protect furniture from fading.' },
  { icon: Wallet, title: 'Energy Savings', description: 'Cut cooling costs by up to 30% annually.' },
  { icon: Sparkles, title: 'Aesthetic Appeal', description: 'Modern, sleek look for any space.' },
  { icon: Wrench, title: 'Easy Maintenance', description: 'Wipe clean. No dust like curtains. Lasts 10+ years.' },
]

export const steps = [
  { icon: Search, title: 'Choose Design', description: 'Browse our collection' },
  { icon: Calendar, title: 'Book Visit', description: 'Schedule free consultation' },
  { icon: Ruler, title: 'Get Measured', description: 'Expert measurement' },
  { icon: FileText, title: 'Approve Quote', description: 'Review and confirm' },
  { icon: CheckCircle, title: 'Install & Enjoy', description: 'Professional installation' },
]

export const testimonials = [
  { name: 'Rahul Sharma', location: 'Mumbai', type: 'Office', rating: 5, avatar: 'https://i.pravatar.cc/150?img=11', text: 'Amazing transformation! Our office is so much cooler now. The glare on screens is completely gone.' },
  { name: 'Priya Mehta', location: 'Delhi', type: 'Home', rating: 5, avatar: 'https://i.pravatar.cc/150?img=32', text: 'Professional service from start to finish. Highly recommend! The privacy film is perfect for our street-facing windows.' },
  { name: 'Amit Kumar', location: 'Bangalore', type: 'Home', rating: 5, avatar: 'https://i.pravatar.cc/150?img=53', text: 'Best decision for our home. So much cooler and private. AC bills have dropped significantly!' },
]

export const faqs = [
  { question: 'How long does installation take?', answer: 'Most residential installations are completed within 2-4 hours. Larger commercial projects may take 1-2 days depending on the size and complexity.' },
  { question: 'Can films be removed later?', answer: 'Yes, all our films can be professionally removed without damaging the glass. We also offer removal services if needed.' },
  { question: 'Do you offer warranty?', answer: 'Absolutely! We provide a 5-year warranty on all our films covering peeling, bubbling, and discoloration.' },
  { question: 'What\'s the cost per square foot?', answer: 'Our prices are competitive and vary depending on the film type and project complexity. We provide free detailed quotes after a site visit and measurement.' },
  { question: 'Will it make my room dark?', answer: 'Not at all. Our films are designed to reduce heat and glare while maintaining natural light. You can choose the level of tint that suits your needs.' },
  { question: 'Is it suitable for all glass types?', answer: 'Our films work on most glass types including single pane, double pane, and tempered glass. We assess your glass during the free site visit.' },
]

export const cities = [
  'Noida', 'Greater Noida', 'Delhi', 'Gurugram', 'Ghaziabad', 'Faridabad', 'Mumbai', 'Bangalore', 'Hyderabad',
  'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
  'Ludhiana', 'Agra', 'Nashik', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
  'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
  'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli-Dharwad'
]

export const heroImages = [
  '/hero-1.png',
  '/hero-2.png',
  '/hero-3.png',
  '/hero-4.png',
]

export const categories = ['All Products', 'Glass Films', 'Window Blinds', 'Wallpapers'] as const
