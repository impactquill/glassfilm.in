'use client'

import NextLink from 'next/link'
import { products } from '@/data/constants'
import { Check, Star, ArrowLeft, Shield, Thermometer, Sun, Zap, Info, Sparkles, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import BenefitsSection from '@/components/sections/BenefitsSection'
import FAQSection from '@/components/sections/FAQSection'
import { useBooking } from '@/context/BookingContext'
import { generateProductBrochure } from '@/lib/pdf-utils'

interface ProductPageContentProps {
    slug: string;
}

const CATEGORY_DATA: Record<string, { title: string, description: string, image: string, benefits: any[] }> = {
    'heat-control-film': {
        title: 'Heat Control Glass Films',
        description: 'Reduce indoor temperature by up to 8°C and save significantly on your energy bills. Our premium heat control films are designed for the harsh Indian climate.',
        image: '/hero-1.jpg',
        benefits: [
            { icon: Thermometer, title: '80% Heat Rejection', description: 'Block the majority of solar heat from entering your space.' },
            { icon: Zap, title: 'Energy Efficiency', description: 'Lower AC usage and reduce carbon footprint.' },
            { icon: Shield, title: 'Anti-Glare', description: 'Enjoy natural light without the irritating screen glare.' }
        ]
    },
    'privacy-film': {
        title: 'Privacy & Frosted Films',
        description: 'Ensure total privacy for your home or office without compromising on natural daylight. Our films provide a stylish opacity that transforms any glass surface.',
        image: '/product-frosted.jpg',
        benefits: [
            { icon: Shield, title: 'Full Privacy', description: 'Block outside visibility while letting light pass through.' },
            { icon: Info, title: 'Elegant Finish', description: 'Available in various textures and degrees of opacity.' },
            { icon: Check, title: 'Versatile Use', description: 'Perfect for bathrooms, cabins, and front doors.' }
        ]
    },
    'decorative-film': {
        title: 'Decorative Glass Films',
        description: 'Elegance meet functionality. Enhance the aesthetics of your interior glass partitions with our stunning patterned and textured films.',
        image: '/product-decorative.jpg',
        benefits: [
            { icon: Sun, title: 'Botanical Patterns', description: 'Unique designs inspired by nature for your home.' },
            { icon: Check, title: 'Custom Designs', description: 'Available in various patterns to match your decor.' },
            { icon: Shield, title: 'Glass Safety', description: 'Holds glass together in case of accidental breakage.' }
        ]
    },
    'frosted-film': {
        title: 'Classic Frosted Glass Films',
        description: 'Professional and sleek frosting for your office or residential glass. High-quality frosted finish that lasts for years.',
        image: '/product-solar.jpg',
        benefits: [
            { icon: Shield, title: 'High Opacity', description: 'Excellent privacy control for conference rooms.' },
            { icon: Thermometer, title: 'Light Diffusion', description: 'Softens sunlight for a pleasant indoor ambiance.' },
            { icon: Check, title: 'UV Protection', description: 'Blocks 99% of harmful ultraviolet rays.' }
        ]
    },
    'all-wallpapers': {
        title: 'Premium Wallpaper Collection',
        description: 'Discover our complete range of premium wallpapers, from custom 3D murals to Italian textures. Elevate your walls with designs that inspire.',
        image: '/wallpaper-3d.jpg',
        benefits: [
            { icon: Sparkles, title: 'Infinite Designs', description: 'Access to thousands of patterns and custom printing options.' },
            { icon: Shield, title: 'Expert Fitting', description: 'Professional installation for a bubble-free, perfect finish.' },
            { icon: Star, title: '5-Year Warranty', description: 'Guaranteed quality that stays vibrant for years to come.' }
        ]
    },
    'customized-wallpapers': {
        title: 'Bespoke Customized 3D Murals',
        description: 'Where imagination meets architecture. Our customized murals utilize Zero-Join technology to create seamless, wall-to-wall art without visible intersections. Using odorless Green-Guard certified inks, we transform your spatial dimensions into immersive 3D environments.',
        image: '/wallpaper-3d.jpg',
        benefits: [
            { icon: Sparkles, title: 'Zero-Join Technology', description: 'Print on single-stretch architectural fabrics for a completely seamless, join-less finish.' },
            { icon: Info, title: 'Green-Guard Certified', description: 'Odorless, non-toxic latex printing safe for child bedrooms and healthcare facilities.' },
            { icon: Shield, title: 'High-Definition Depth', description: 'Optical-depth printing that creates realistic 3D perspective and tactile visual texture.' }
        ]
    },
    'textured-wallpapers': {
        title: 'Luxury Italian Textured Collection',
        description: 'Experience the tactile sophistication of European design. Our textured collection features heavy-duty non-woven bases with deep-embossed patterns, including metallic leafing, silk weaves, and natural stone finishes for supreme acoustic and visual comfort.',
        image: '/wallpaper-texture.jpg',
        benefits: [
            { icon: Shield, title: 'Tactile Longevity', description: 'Heavy-duty 350+ GSM materials resistant to scuffs, moisture, and fading over 10+ years.' },
            { icon: Star, title: 'Acoustic Comfort', description: 'Embossed textures that help dampen room echoes and improve ambient sound quality.' },
            { icon: Sparkles, title: 'Artisanal Finishes', description: 'Exclusive metallic foils and mica-infused textures that react dynamically to room lighting.' }
        ]
    },
    'all-window-blinds': {
        title: 'Professional Window Blinds',
        description: 'Style and functionality for your windows. Our range of blinds offers perfect light control, privacy, and energy efficiency for both homes and offices.',
        image: '/blinds-roller.jpg',
        benefits: [
            { icon: Sun, title: 'Light Control', description: 'Easily adjust the amount of natural light entering your room.' },
            { icon: Shield, title: 'Privacy Protection', description: 'Superior privacy without sacrificing style or visibility.' },
            { icon: Sparkles, title: 'Expert Fitting', description: 'Custom measured and professionally installed for a perfect fit.' }
        ]
    },
    'roller-blinds': {
        title: 'Elegant Roller Blinds',
        description: 'Sleek and minimalist design for modern spaces. Our roller blinds come in a variety of blackout and translucent fabrics.',
        image: '/blinds-roller.jpg',
        benefits: [
            { icon: Info, title: 'Space Saving', description: 'Compact design that fits perfectly within the window frame.' },
            { icon: Check, title: 'Smooth Operation', description: 'High-quality mechanisms for effortless daily use.' },
            { icon: Star, title: 'Blackout Options', description: 'Perfect for bedrooms and conference rooms.' }
        ]
    },
    'zebra-blinds': {
        title: 'Modern Zebra Blinds',
        description: 'The perfect blend of light and privacy. Zebra blinds offer a unique layered design that allows you to shift between translucent and opaque.',
        image: '/blinds-zebra.jpg',
        benefits: [
            { icon: Sparkles, title: 'Versatile Styling', description: 'A contemporary look that complements any interior decor.' },
            { icon: Sun, title: 'Dual Layers', description: 'Switch between light filtering and complete privacy effortlessly.' },
            { icon: Info, title: 'Easy Install', description: 'Custom fitted for your specific window dimensions.' }
        ]
    }
}

const WallpaperGallery = () => {
    const { handleBookingOpen } = useBooking();
    const [activeTab, setActiveTab] = useState('Nature');

    const wallpaperCategories = [
        { id: 'Nature', label: 'Nature & Landscape', image: '/wallpaper-nature-gallery.png', description: 'Bring the outdoors in with serene 3D landscapes and botanical murals.' },
        { id: 'Kids', label: 'Kids & Fantasy', image: '/wallpaper-kids-gallery.png', description: 'Vibrant, playful environments designed to inspire young imaginations.' },
        { id: 'Office', label: 'Office & Corporate', image: '/wallpaper-office-gallery.png', description: 'Sophisticated geometric patterns that define professional spaces.' },
        { id: 'Luxury', label: 'Luxury & Metallic', image: '/wallpaper-luxury-gallery.png', description: 'Opulent damasks and metallic textures for high-end residential spaces.' },
        { id: 'Abstract', label: 'Modern Abstract', image: '/wallpaper-abstract-gallery.png', description: 'Fluid fluid art and marble textures for contemporary architectural impact.' }
    ];

    const currentCat = wallpaperCategories.find(c => c.id === activeTab);

    return (
        <div className="mt-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">Inspiration Gallery</h2>
                <p className="text-slate max-w-2xl mx-auto">Explore how our customized murals transform different environments.</p>
            </div>

            {/* Tab Switcher */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {wallpaperCategories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === cat.id
                            ? 'bg-teal text-white shadow-lg scale-105'
                            : 'bg-white text-slate hover:bg-teal/5 hover:text-teal border border-slate-200'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Gallery Display */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="grid lg:grid-cols-12 gap-8 items-center bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl h-[500px]">
                        <img
                            src={currentCat?.image}
                            alt={currentCat?.label}
                            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="bg-teal px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-2 inline-block">Featured View</span>
                            <h3 className="text-2xl font-bold">{currentCat?.label} Collection</h3>
                        </div>
                    </div>
                    <div className="lg:col-span-5 p-6 lg:p-10 space-y-6">
                        <div className="inline-flex items-center gap-2 text-teal font-bold text-xs uppercase tracking-widest px-4 py-2 bg-teal/5 rounded-full">
                            <Sparkles className="w-4 h-4" />
                            Premium Custom Selection
                        </div>
                        <h3 className="text-3xl font-playfair font-bold text-charcoal">
                            {currentCat?.label} Spaces
                        </h3>
                        <p className="text-slate text-lg leading-relaxed italic">
                            "{currentCat?.description}"
                        </p>
                        <div className="space-y-4 py-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-teal">
                                    <Check className="w-5 h-5" />
                                </div>
                                <span className="text-charcoal font-medium">Bespoke Architectural Fitting</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-teal">
                                    <Check className="w-5 h-5" />
                                </div>
                                <span className="text-charcoal font-medium">High-Definition 3D Texturing</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-teal">
                                    <Check className="w-5 h-5" />
                                </div>
                                <span className="text-charcoal font-medium">Washable & Breathable Material</span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleBookingOpen(`I am interested in the ${currentCat?.label} for my space.`)}
                            className="w-full btn-primary !py-5 shadow-xl hover:shadow-teal/20 transition-all"
                        >
                            Enquire About This Theme
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ProductPageContent({ slug }: ProductPageContentProps) {
    const { handleBookingOpen } = useBooking();
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!slug) return null

    // Check if it's a category
    const categoryInfo = CATEGORY_DATA[slug]

    // Find products in this category or the product itself
    const filteredProducts = products.filter(p => {
        let categorySlug = ''
        if (p.category === 'Wallpapers') {
            categorySlug = 'all-wallpapers'
        } else if (p.category === 'Window Blinds') {
            categorySlug = 'all-window-blinds'
        } else {
            categorySlug = p.category.toLowerCase().replace(/ /g, '-') + '-film'
        }

        const productSlug = p.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '')
        return categorySlug === slug || productSlug === slug || (slug === 'roller-blinds' && p.name.includes('Roller')) || (slug === 'zebra-blinds' && p.name.includes('Zebra'))
    })

    // If it's a single product view, we can find it specifically
    const product = products.find(p => p.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '') === slug)

    if (!categoryInfo && !product) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-4xl font-playfair font-bold text-charcoal mb-4">Product Not Found</h1>
                    <p className="text-slate mb-8">The page you are looking for might have been moved or deleted.</p>
                    <NextLink href="/" className="btn-primary inline-block">Back to Home</NextLink>
                </div>
            </div>
        )
    }

    const title = categoryInfo?.title || product?.name || ''
    const description = categoryInfo?.description || product?.description || ''
    const heroImage = categoryInfo?.image || product?.image || '/hero-1.jpg'

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Dynamic Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                    style={{
                        backgroundImage: `url(${heroImage})`,
                        transform: `scale(${1 + scrollY * 0.0005})`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent" />

                <div className="container-custom relative z-10">

                    <div className="max-w-2xl text-white">
                        <span className="inline-block bg-teal px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-4">
                            {product ? product.category : 'Premium Collection'}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                            {description}
                        </p>
                        <button
                            onClick={() => handleBookingOpen()}
                            className="btn-primary"
                        >
                            Book Free Site Visit
                        </button>
                    </div>
                </div>
            </section>

            {/* Benefits Content */}
            {categoryInfo && (
                <section className="py-20 bg-white">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">Why Choose {categoryInfo.title}?</h2>
                            <div className="w-24 h-1 bg-teal mx-auto rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {categoryInfo.benefits.map((benefit, idx) => (
                                <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                                    <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal transition-all duration-500">
                                        <benefit.icon className="w-8 h-8 text-teal group-hover:text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-charcoal mb-3">{benefit.title}</h3>
                                    <p className="text-slate leading-relaxed">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Product/Category Display */}
            <section className="py-20">
                <div className="container-custom">
                    {!product ? (
                        <>
                            {slug.includes('wallpaper') ? (
                                <WallpaperGallery />
                            ) : (
                                <>
                                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                                        <div>
                                            <h2 className="text-3xl font-playfair font-bold text-charcoal mb-2">Individual Varieties</h2>
                                            <p className="text-slate">Explore our range of specific products under this category.</p>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm font-medium text-teal">
                                            <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Professional Installation</span>
                                            <span className="flex items-center gap-1"><Check className="w-4 h-4" /> 5-Year Warranty</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {filteredProducts.map((p) => {
                                            const basePath = p.category === 'Wallpapers'
                                                ? '/wallpapers'
                                                : p.category === 'Window Blinds'
                                                    ? '/window-blinds'
                                                    : '/glass-films'
                                            return (
                                                <NextLink
                                                    key={p.id}
                                                    href={`${basePath}/${p.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '')}`}
                                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-slate-100"
                                                >
                                                    <div className="relative aspect-[4/3] overflow-hidden">
                                                        <img
                                                            src={p.image}
                                                            alt={p.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <span className="bg-white text-charcoal px-6 py-2 rounded-full font-semibold flex items-center gap-2">
                                                                View Details <ArrowLeft className="w-4 h-4 rotate-180" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-6">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs font-bold text-teal tracking-widest uppercase">{p.category}</span>
                                                            <div className="flex items-center gap-1 text-sm font-semibold text-charcoal">
                                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                                <span>{p.rating}</span>
                                                            </div>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-teal transition-colors">{p.name}</h3>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleBookingOpen(`Enquiry for ${p.name} from the ${p.category} category.`)}
                                                                className="flex-1 py-3 rounded-lg border-2 border-teal/20 text-teal font-bold group-hover:bg-teal group-hover:text-white transition-all text-sm"
                                                            >
                                                                Enquire Now
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    generateProductBrochure({
                                                                        name: p.name,
                                                                        category: p.category,
                                                                        description: p.description,
                                                                        rating: p.rating,
                                                                        image: p.image
                                                                    });
                                                                }}
                                                                className="px-3 rounded-lg border-2 border-slate-200 text-slate hover:bg-slate-50 transition-all flex items-center justify-center"
                                                                title="Download Brochure"
                                                            >
                                                                <Download className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </NextLink>
                                            )
                                        })}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl overflow-hidden">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-8 -right-8 bg-teal text-white p-8 rounded-2xl shadow-xl hidden md:block">
                                    <p className="text-4xl font-bold mb-1">4.9/5</p>
                                    <p className="text-sm opacity-90 uppercase tracking-widest font-semibold">Customer Rating</p>
                                </div>
                            </div>

                            <div>
                                <span className="text-teal font-bold uppercase tracking-widest text-sm mb-4 block">{product.category}</span>
                                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-6">
                                    {product.name}
                                </h2>
                                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                        <span className="text-charcoal font-bold ml-2">5.0</span>
                                    </div>
                                    <span className="text-slate">Verified Installation</span>
                                </div>

                                <p className="text-lg text-slate mb-10 leading-relaxed">
                                    {product.description}. Our {product.name} is one of our most popular choices for both residential and commercial spaces.
                                    Engineered with premium quality materials, it ensures long-lasting performance and aesthetic excellence.
                                </p>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        'Superior durability with scratch-resistant coating',
                                        'Blocks 99% of harmful UV radiation',
                                        'Available in multiple variations',
                                        'Easy to clean and maintain',
                                        'Professional installation by experts'
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-4 h-4 text-teal" />
                                            </div>
                                            <span className="text-charcoal font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button onClick={() => handleBookingOpen(`I am interested in getting a quote for ${product.name}.`)} className="btn-primary">Get Free Quote</button>
                                    <button
                                        onClick={() => generateProductBrochure({
                                            name: product.name,
                                            category: product.category,
                                            description: product.description,
                                            rating: product.rating,
                                            image: product.image
                                        })}
                                        className="btn-secondary flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download Brochure
                                    </button>
                                    <a href={`https://wa.me/919958360741?text=Hi, I am interested in ${product.name} for my space.`} target="_blank" className="btn-secondary text-center">Chat on WhatsApp</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Common Sections for Product Pages */}
            <BenefitsSection />
            <FAQSection />
        </div>
    )
}
