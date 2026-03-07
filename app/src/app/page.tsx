'use client'

import HeroSection from '@/components/sections/HeroSection'
import CategoryTabs from '@/components/sections/CategoryTabs'
import ProductsSection from '@/components/sections/ProductsSection'
import BenefitsSection from '@/components/sections/BenefitsSection'
import WallpaperSection from '@/components/sections/WallpaperSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import StatsTestimonialsSection from '@/components/sections/StatsTestimonialsSection'
import GallerySection from '@/components/sections/GallerySection'
import { useBooking } from '@/context/BookingContext'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Home() {
    const { handleBookingOpen } = useBooking();
    const [activeCategory, setActiveCategory] = useState('All Products');

    return (
        <>
            <HeroSection onBookingOpen={handleBookingOpen} />

            {/* Products Preview */}
            <div className="bg-white">
                <div className="container-custom pt-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">Our Premium Solutions</h2>
                    <p className="text-slate mb-12 max-w-2xl mx-auto">Explore our range of glass films, wallpapers and window blinds.</p>
                </div>
                <CategoryTabs
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
                <ProductsSection
                    activeCategory={activeCategory}
                />
                <div className="container-custom pb-20 text-center">
                    <Link href="/products" className="btn-secondary inline-flex items-center gap-2">
                        View All Products <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                </div>
            </div>

            {/* Why Us Snippet */}
            <div className="bg-slate-50">
                <BenefitsSection />
                <div className="container-custom pb-20 text-center">
                    <Link href="/about" className="btn-secondary inline-flex items-center gap-2 text-teal border-teal hover:bg-teal hover:text-white">
                        Learn More About Us <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                </div>
            </div>

            {/* Wallpaper Highlight */}
            <WallpaperSection />

            {/* How it Works Snippet */}
            <HowItWorksSection onBookingOpen={handleBookingOpen} />

            {/* Gallery Teaser */}
            <div className="bg-white">
                <GallerySection />
                <div className="container-custom pb-20 text-center">
                    <Link href="/gallery" className="btn-secondary inline-flex items-center gap-2">
                        View Full Gallery <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                </div>
            </div>

            <StatsTestimonialsSection />
        </>
    );
}
