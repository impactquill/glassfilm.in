import { useState, useEffect } from 'react'
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Search,
  Heart,
  Check,
  Star,
  ArrowRight,
  Thermometer,
  Shield,
  Sun,
  Wallet,
  Sparkles,
  Wrench,
  Calendar,
  Ruler,
  FileText,
  CheckCircle,
  Instagram,
  Facebook,
  Linkedin,
  Youtube
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useIsMobile } from '@/hooks/use-mobile'
import './App.css'

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

// Product data
const products = [
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

const benefits = [
  { icon: Thermometer, title: 'Heat Reduction', description: 'Reduce indoor temperature by up to 8°C. Save on AC bills.' },
  { icon: Shield, title: 'Privacy', description: 'Enjoy natural light without compromising privacy.' },
  { icon: Sun, title: 'UV Protection', description: 'Block 99% harmful UV rays. Protect furniture from fading.' },
  { icon: Wallet, title: 'Energy Savings', description: 'Cut cooling costs by up to 30% annually.' },
  { icon: Sparkles, title: 'Aesthetic Appeal', description: 'Modern, sleek look for any space.' },
  { icon: Wrench, title: 'Easy Maintenance', description: 'Wipe clean. No dust like curtains. Lasts 10+ years.' },
]

const steps = [
  { icon: Search, title: 'Choose Design', description: 'Browse our collection' },
  { icon: Calendar, title: 'Book Visit', description: 'Schedule free consultation' },
  { icon: Ruler, title: 'Get Measured', description: 'Expert measurement' },
  { icon: FileText, title: 'Approve Quote', description: 'Review and confirm' },
  { icon: CheckCircle, title: 'Install & Enjoy', description: 'Professional installation' },
]

const testimonials = [
  { name: 'Rahul Sharma', location: 'Mumbai', type: 'Office', rating: 5, text: 'Amazing transformation! Our office is so much cooler now. The glare on screens is completely gone.' },
  { name: 'Priya Mehta', location: 'Delhi', type: 'Home', rating: 5, text: 'Professional service from start to finish. Highly recommend! The privacy film is perfect for our street-facing windows.' },
  { name: 'Amit Kumar', location: 'Bangalore', type: 'Home', rating: 5, text: 'Best decision for our home. So much cooler and private. AC bills have dropped significantly!' },
]

const faqs = [
  { question: 'How long does installation take?', answer: 'Most residential installations are completed within 2-4 hours. Larger commercial projects may take 1-2 days depending on the size and complexity.' },
  { question: 'Can films be removed later?', answer: 'Yes, all our films can be professionally removed without damaging the glass. We also offer removal services if needed.' },
  { question: 'Do you offer warranty?', answer: 'Absolutely! We provide a 5-year warranty on all our films covering peeling, bubbling, and discoloration.' },
  { question: 'What\'s the cost per square foot?', answer: 'Our prices are competitive and vary depending on the film type and project complexity. We provide free detailed quotes after a site visit and measurement.' },
  { question: 'Will it make my room dark?', answer: 'Not at all. Our films are designed to reduce heat and glare while maintaining natural light. You can choose the level of tint that suits your needs.' },
  { question: 'Is it suitable for all glass types?', answer: 'Our films work on most glass types including single pane, double pane, and tempered glass. We assess your glass during the free site visit.' },
]

const cities = [
  'Noida', 'Greater Noida', 'Delhi', 'Gurugram', 'Ghaziabad', 'Faridabad', 'Mumbai', 'Bangalore', 'Hyderabad',
  'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
  'Ludhiana', 'Agra', 'Nashik', 'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad',
  'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
  'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur', 'Hubli-Dharwad'
]

function App() {
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All Products')
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [currentHero, setCurrentHero] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const heroImages = [
    '/hero-1.jpg',
    '/hero-2.jpg',
    '/hero-3.jpg',
    '/hero-4.jpg',
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredProducts = activeCategory === 'All Products'
    ? products
    : activeCategory === 'Glass Films'
      ? products.filter(p => ['Heat Control', 'Privacy', 'Decorative', 'Frosted'].includes(p.category))
      : products.filter(p => p.category === activeCategory)

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setIsBookingOpen(false)
      setFormSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-teal text-white py-2.5 px-4">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">🚚</span>
            <span>Free Site Visit across Delhi-NCR | Installation within 24 hours</span>
          </div>
          <div className="flex items-center gap-4">
            {isMobile ? (
              <a href="tel:+919958360741" className="flex items-center gap-1.5 hover:text-coral-200 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+91-9958360741</span>
              </a>
            ) : (
              <div className="flex items-center gap-1.5 text-white/90">
                <Phone className="w-4 h-4" />
                <span>+91-9958360741</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-playfair text-xl font-bold text-charcoal">GlassComfort</span>
                <span className="block text-xs text-slate">Premium Film Solutions</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-charcoal font-medium hover:text-teal transition-colors">Home</a>
              <div className="relative group">
                <button className="flex items-center gap-1 text-charcoal font-medium hover:text-teal transition-colors">
                  Glass Films
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    {['Heat Control', 'Privacy', 'Decorative', 'Frosted'].map((item) => (
                      <a
                        key={item}
                        href="#products"
                        onClick={() => setActiveCategory(item)}
                        className="block px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors"
                      >
                        {item} Films
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-1 text-charcoal font-medium hover:text-teal transition-colors">
                  Wallpapers
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <a href="#wallpaper" className="block px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Customized Design</a>
                    <a href="#wallpaper" className="block px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Textured Wallpapers</a>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center gap-1 text-charcoal font-medium hover:text-teal transition-colors">
                  Window Blinds
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <a href="#blinds" className="block px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Roller Blinds</a>
                    <a href="#blinds" className="block px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Zebra Blinds</a>
                    <a href="#blinds" className="block px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Vertical Blinds</a>
                  </div>
                </div>
              </div>
              <a href="#gallery" className="text-charcoal font-medium hover:text-teal transition-colors">Gallery</a>
              <a href="#about" className="text-charcoal font-medium hover:text-teal transition-colors">About</a>
              <a href="#contact" className="text-charcoal font-medium hover:text-teal transition-colors">Contact</a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-charcoal" />
              </button>
              <a
                href="https://wa.me/919958360741"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 text-green-600" />
              </a>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="hidden md:block btn-primary text-sm py-3 px-6"
              >
                Book Free Visit
              </button>
              <button
                className="lg:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="container-custom py-4 space-y-4">
              <a href="#" className="block py-2 text-charcoal font-medium">Home</a>
              <a href="#products" className="block py-2 text-charcoal font-medium">Glass Films</a>
              <a href="#wallpaper" className="block py-2 text-charcoal font-medium">Wallpapers</a>
              <a href="#blinds" className="block py-2 text-charcoal font-medium">Window Blinds</a>
              <a href="#gallery" className="block py-2 text-charcoal font-medium">Gallery</a>
              <a href="#about" className="block py-2 text-charcoal font-medium">About</a>
              <a href="#contact" className="block py-2 text-charcoal font-medium">Contact</a>
              <button
                onClick={() => {
                  setIsBookingOpen(true)
                  setIsMenuOpen(false)
                }}
                className="w-full btn-primary mt-4"
              >
                Book Free Visit
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHero ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={img} alt={`Hero ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom py-20">
          <div className="max-w-2xl text-white">
            <span className="inline-block bg-teal/90 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
              50+ Glass Film Varieties
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight mb-6">
              Transform Your Space with Premium Glass Films
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Heat control. Privacy. Elegance. Experience up to 80% heat reduction with our expert installation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-primary text-lg"
              >
                Book Free Site Visit
              </button>
              <a href="#products" className="btn-secondary border-white text-white hover:bg-white hover:text-charcoal text-center">
                Explore Films
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-coral" />
                <span className="text-sm">10,000+ Installations</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-coral" />
                <span className="text-sm">5-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-coral" />
                <span className="text-sm">Same-Day Measurement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentHero ? 'bg-coral w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-[72px] z-40 bg-white border-b shadow-sm">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
            {['All Products', 'Glass Films', 'Window Blinds', 'Wallpapers'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === category
                  ? 'bg-teal text-white'
                  : 'bg-gray-100 text-charcoal hover:bg-teal-50 hover:text-teal'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
              Explore Our {activeCategory === 'All Products' ? 'Complete' : activeCategory} Collection
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              Find the perfect solution for your space from our premium range of 50+ glass films
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-card card-hover">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-coral hover:text-white transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-teal uppercase tracking-wide">{product.category}</span>
                  <h3 className="font-playfair text-lg font-semibold text-charcoal mt-1 mb-2">{product.name}</h3>
                  <p className="text-sm text-slate mb-3">{product.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="text-coral font-medium text-sm flex items-center gap-1 hover:underline"
                    >
                      Enquire <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="about" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
                Why Choose Glass Films?
              </h2>
              <p className="text-slate text-lg mb-8">
                The smart alternative to curtains and blinds. Experience the perfect balance of comfort, privacy, and style.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl shadow-card card-hover">
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-teal" />
                    </div>
                    <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/hero-3.jpg"
                alt="Before After Comparison"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wallpaper Section */}
      <section id="wallpaper" className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
              <img src="/hero-2.jpg" alt="Wallpaper 1" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
              <img src="/hero-4.jpg" alt="Wallpaper 2" className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8" />
              <img src="/gallery-home-after.jpg" alt="Wallpaper 3" className="rounded-2xl shadow-lg w-full h-64 object-cover -mt-8" />
              <img src="/gallery-office-after.jpg" alt="Wallpaper 4" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-teal font-semibold text-sm uppercase tracking-wide">Also Available</span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mt-2 mb-4">
                Customised Wallpaper Solutions
              </h2>
              <p className="text-slate text-lg mb-6">
                From concept to installation, we create wallpapers that tell your story. Perfect for homes, offices, and commercial spaces.
              </p>
              <ul className="space-y-3 mb-8">
                {['Upload your own design', '3D, textured, and metallic finishes', 'Room-wise customization', 'Installation included'].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-teal flex-shrink-0" />
                    <span className="text-charcoal">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn-secondary"
              >
                Explore Wallpaper
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding gradient-teal">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Get Your Glass Films in 5 Easy Steps
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-white/30 -translate-y-1/2" />
                  )}
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-white text-teal rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-playfair text-lg font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-coral text-white font-inter font-semibold px-10 py-4 rounded-lg text-lg hover:bg-coral-600 transition-colors shadow-lg"
            >
              Book Free Site Visit
            </button>
          </div>
        </div>
      </section>

      {/* Stats & Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: '10,000+', label: 'Installations' },
              { value: '50+', label: 'Varieties' },
              { value: '100+', label: 'Cities' },
              { value: '5-Year', label: 'Warranty' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-teal mb-2">{stat.value}</div>
                <div className="text-slate">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-charcoal mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">{testimonial.name}</div>
                    <div className="text-sm text-slate">{testimonial.location} • {testimonial.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
              Transformations That Speak
            </h2>
            <p className="text-slate text-lg">See the difference our glass films make</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-2xl shadow-card">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate uppercase mb-2 block">Before</span>
                  <img src="/gallery-office-before.jpg" alt="Office Before" className="rounded-xl w-full h-48 object-cover" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-teal uppercase mb-2 block">After</span>
                  <img src="/gallery-office-after.jpg" alt="Office After" className="rounded-xl w-full h-48 object-cover" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-playfair font-semibold text-charcoal">Corporate Office</h3>
                  <p className="text-sm text-slate">Frosted Film • Mumbai</p>
                </div>
                <span className="text-teal font-semibold">80% Heat Reduction</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-card">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate uppercase mb-2 block">Before</span>
                  <img src="/gallery-home-before.jpg" alt="Home Before" className="rounded-xl w-full h-48 object-cover" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-teal uppercase mb-2 block">After</span>
                  <img src="/gallery-home-after.jpg" alt="Home After" className="rounded-xl w-full h-48 object-cover" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-playfair font-semibold text-charcoal">Residential Living Room</h3>
                  <p className="text-sm text-slate">Privacy Frosted Film • Delhi</p>
                </div>
                <span className="text-teal font-semibold">Complete Privacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate text-lg mb-6">
                Still have questions? We're here to help.
              </p>
              <div className="flex items-center gap-4">
                {isMobile ? (
                  <a href="tel:+91-9958360741" className="flex items-center gap-2 text-teal font-semibold hover:underline">
                    <Phone className="w-5 h-5" />
                    +91-9958360741
                  </a>
                ) : (
                  <div className="flex items-center gap-2 text-charcoal font-semibold">
                    <Phone className="w-5 h-5" />
                    +91-9958360741
                  </div>
                )}
                <a
                  href="https://wa.me/919958360741"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 font-semibold hover:underline"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
            <div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-playfair font-semibold text-charcoal">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section id="contact" className="section-padding gradient-teal">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Book Your Free Site Visit Today
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Our experts will visit, measure, and recommend the perfect film — completely free.
              </p>
              <ul className="space-y-4 mb-8">
                {['Free consultation', 'Expert measurement', 'Same-day quote', 'No obligation'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-coral" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-white/80">
                <Shield className="w-5 h-5" />
                <span>No obligation • Free consultation</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" placeholder="Your full name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Select required>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2 block">Property Type *</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="property" value="residential" required className="text-teal" />
                      <span>Residential</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="property" value="commercial" required className="text-teal" />
                      <span>Commercial</span>
                    </label>
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Requirements</Label>
                  <div className="flex flex-wrap gap-3">
                    {['Glass Films', 'Window Blinds', 'Wallpapers'].map((req) => (
                      <label key={req} className="flex items-center gap-2">
                        <Checkbox />
                        <span className="text-sm">{req}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full bg-coral text-white font-semibold py-4 rounded-lg hover:bg-coral-600 transition-colors">
                  Book Free Site Visit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="font-playfair text-xl font-bold">GlassComfort</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Premium glass film solutions for homes and offices. Transform your space with comfort and style.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Linkedin, Youtube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-playfair font-semibold text-lg mb-4">Products</h4>
              <ul className="space-y-2">
                {['Heat Control Films', 'Privacy Films', 'Decorative Films', 'Frosted Films', 'Wallpapers', 'Window Blinds'].map((item) => (
                  <li key={item}>
                    <a href="#products" className="text-gray-400 hover:text-white transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-playfair font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Our Process', 'Gallery', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-playfair font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2">
                {['FAQs', 'Warranty Info', 'Installation Guide', 'Returns Policy', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">© 2026 GlassComfort. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex gap-2">
                {['Visa', 'Mastercard', 'UPI'].map((payment) => (
                  <span key={payment} className="px-3 py-1 bg-white/10 rounded text-xs">{payment}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919958360741"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-40"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <button
          onClick={() => setIsBookingOpen(true)}
          className="w-full btn-primary"
        >
          Book Free Site Visit
        </button>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-playfair text-2xl">Book Free Site Visit</DialogTitle>
          </DialogHeader>
          {formSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">Thank You!</h3>
              <p className="text-slate">Our team will call you within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="dialog-name">Name *</Label>
                <Input id="dialog-name" placeholder="Your full name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="dialog-phone">Phone *</Label>
                <Input id="dialog-phone" type="tel" placeholder="+91-9958360741" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="dialog-email">Email</Label>
                <Input id="dialog-email" type="email" placeholder="your@email.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="dialog-city">City *</Label>
                <Select required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block">Property Type *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="dialog-property" value="residential" required />
                    <span>Residential</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="dialog-property" value="commercial" required />
                    <span>Commercial</span>
                  </label>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Requirements</Label>
                <div className="flex flex-wrap gap-3">
                  {['Glass Films', 'Window Blinds', 'Wallpapers'].map((req) => (
                    <label key={req} className="flex items-center gap-2">
                      <Checkbox />
                      <span className="text-sm">{req}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full btn-primary">
                Book Free Site Visit
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
