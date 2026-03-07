import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { heroImages } from '@/data/constants'
import { scrollToSection } from '@/lib/utils'

interface HeroSectionProps {
  onBookingOpen: () => void
}

export default function HeroSection({ onBookingOpen }: HeroSectionProps) {
  const [currentHero, setCurrentHero] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const heroAlts = [
    "Premium heat control glass film installation for modern home windows",
    "Privacy frosted glass film for office partitions and conference rooms",
    "Decorative window film with elegant patterns for residential glass doors",
  ]

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHero ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img} alt={heroAlts[index] || `GlassComfort Premium Film Solution ${index + 1}`} className="w-full h-full object-cover" />
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
              onClick={onBookingOpen}
              className="btn-primary text-lg"
            >
              Book Free Site Visit
            </button>
            <button onClick={() => scrollToSection('products')} className="btn-secondary border-white text-white hover:bg-white hover:text-charcoal text-center">
              Explore Films
            </button>
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
  )
}
