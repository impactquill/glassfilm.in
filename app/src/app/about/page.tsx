import BenefitsSection from '@/components/sections/BenefitsSection'
import StatsTestimonialsSection from '@/components/sections/StatsTestimonialsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us — GlassFilm',
    description: 'Learn more about GlassFilm, India\'s leading provider of premium glass film solutions with 10,000+ happy customers.',
}

export default function AboutPage() {
    return (
        <div className="pt-8">
            <div className="container-custom py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">About GlassFilm</h1>
                <p className="max-w-3xl mx-auto text-lg text-slate leading-relaxed">
                    We are dedicated to transforming spaces with premium glass films, customized wallpapers, and elegant window blinds.
                    With a focus on quality, durability, and customer satisfaction, we bring sophistication and comfort to your home or office.
                </p>
            </div>
            <BenefitsSection />
            <StatsTestimonialsSection />
        </div>
    )
}
