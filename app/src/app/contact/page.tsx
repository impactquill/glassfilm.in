import FAQSection from '@/components/sections/FAQSection'
import { Mail, Phone, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us — GlassFilm',
    description: 'Get in touch with GlassFilm for a free site visit and expert consultation on glass films, wallpapers, and window blinds.',
}

export default function ContactPage() {
    return (
        <div className="pt-8">
            <section className="section-padding">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">Contact Us</h1>
                        <p className="text-lg text-slate">
                            Have questions or want to book a free site visit? Our team is here to help you choose the best solutions for your space.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <div className="bg-white p-8 rounded-2xl shadow-card text-center transition-transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-6">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="font-playfair font-bold text-xl mb-2">Call Us</h3>
                            <p className="text-slate mb-4">Monday – Saturday, 10am – 7pm</p>
                            <a href="tel:+919958360741" className="text-teal font-semibold text-lg hover:underline">+91 99583 60741</a>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-card text-center transition-transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="font-playfair font-bold text-xl mb-2">Email Us</h3>
                            <p className="text-slate mb-4">We'll respond within 24 hours</p>
                            <a href="mailto:info@glasscomfort.in" className="text-teal font-semibold text-lg hover:underline">info@glasscomfort.in</a>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-card text-center transition-transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-teal/10 text-teal rounded-full flex items-center justify-center mx-auto mb-6">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="font-playfair font-bold text-xl mb-2">Visit Us</h3>
                            <p className="text-slate mb-4">India's leading glass film experts</p>
                            <p className="text-charcoal font-semibold text-lg">Present in 100+ Cities across India</p>
                        </div>
                    </div>
                </div>
            </section>
            <FAQSection />
        </div>
    )
}
