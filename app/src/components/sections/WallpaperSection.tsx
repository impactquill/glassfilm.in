import { Check } from 'lucide-react'
import Link from 'next/link'

export default function WallpaperSection() {
  return (
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
            <Link
              href="/wallpaper/all-wallpapers"
              className="btn-secondary inline-block"
            >
              Explore Wallpaper
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

