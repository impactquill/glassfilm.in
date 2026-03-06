import { useState } from 'react'
import AnnouncementBar from '@/components/sections/AnnouncementBar'
import Header from '@/components/sections/Header'
import HeroSection from '@/components/sections/HeroSection'
import CategoryTabs from '@/components/sections/CategoryTabs'
import ProductsSection from '@/components/sections/ProductsSection'
import BenefitsSection from '@/components/sections/BenefitsSection'
import WallpaperSection from '@/components/sections/WallpaperSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import StatsTestimonialsSection from '@/components/sections/StatsTestimonialsSection'
import GallerySection from '@/components/sections/GallerySection'
import FAQSection from '@/components/sections/FAQSection'
import LeadCaptureSection from '@/components/sections/LeadCaptureSection'
import Footer from '@/components/sections/Footer'
import FloatingElements from '@/components/sections/FloatingElements'
import BookingDialog from '@/components/sections/BookingDialog'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('All Products')
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleBookingOpen = () => setIsBookingOpen(true)

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
      <AnnouncementBar />
      <Header
        onBookingOpen={handleBookingOpen}
        setActiveCategory={setActiveCategory}
      />
      <HeroSection onBookingOpen={handleBookingOpen} />
      <CategoryTabs
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ProductsSection
        activeCategory={activeCategory}
        onBookingOpen={handleBookingOpen}
      />
      <BenefitsSection />
      <WallpaperSection onBookingOpen={handleBookingOpen} />
      <HowItWorksSection onBookingOpen={handleBookingOpen} />
      <StatsTestimonialsSection />
      <GallerySection />
      <FAQSection />
      <LeadCaptureSection onSubmit={handleBookingSubmit} />
      <Footer />
      <FloatingElements onBookingOpen={handleBookingOpen} />
      <BookingDialog
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        formSubmitted={formSubmitted}
        onSubmit={handleBookingSubmit}
      />
    </div>
  )
}

export default App
