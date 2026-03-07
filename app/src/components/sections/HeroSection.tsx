'use client'
import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { heroImages } from '@/data/constants'

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
            <img src={img} alt={heroAlts[index] || `GlassFilm Premium Film Solution ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8 transition-all duration-700 animate-fade-in-up">
              <span className="w-12 h-[1px] bg-teal"></span>
              <span className="text-teal font-bold uppercase tracking-[0.3em] text-xs">
                Architectural Excellence
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold leading-[1.1] mb-8 text-white animate-fade-in-up">
              Redefining Surfaces with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-white/80">
                Premium Solutions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-12 leading-relaxed max-w-xl animate-fade-in-up delay-100 italic">
              Specializing in high-performance heat control films, privacy textures, and custom murals that blend functionality with state-of-the-art design.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-200">
              <button
                onClick={onBookingOpen}
                className="btn-primary text-sm px-10 py-5 shadow-2xl shadow-teal-500/20"
              >
                Book Free Site Visit
              </button>
              <Link
                href="/products"
                className="group flex items-center gap-4 text-white font-bold tracking-widest text-xs uppercase hover:text-teal transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-teal transition-colors">
                  <Check className="w-4 h-4 rotate-[135deg]" />
                </span>
                Explore Collection
              </Link>
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
