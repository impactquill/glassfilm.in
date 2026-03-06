import { Instagram, Facebook, Linkedin, Youtube, Sparkles, MapPin } from 'lucide-react'
import { scrollToSection } from '@/lib/utils'

const companyLinks: Record<string, string> = {
  'About Us': 'about',
  'Our Process': 'products',
  'Gallery': 'gallery',
  'Blog': '',
  'Careers': '',
  'Contact': 'contact',
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-playfair text-xl font-bold">GlassComfort</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Premium glass film solutions for homes and offices. Transform your space with comfort and style.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <span className="text-white block font-medium mb-1">Greater Noida</span>
                  Roza Jalalpur, Greater Noida West, UP-203207
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-400">
                  <span className="text-white block font-medium mb-1">New Delhi</span>
                  D215, Laxmi Park, Nangloi, New Delhi - 110041
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, index) => (
                <button
                  key={index}
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6">Products</h4>
            <ul className="space-y-3">
              {['Heat Control Films', 'Privacy Films', 'Decorative Films', 'Frosted Films', 'Wallpapers', 'Window Blinds'].map((item) => (
                <li key={item}>
                  <button onClick={() => scrollToSection('products')} className="text-gray-400 hover:text-white transition-colors text-sm text-left">{item}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {Object.entries(companyLinks).map(([label, sectionId]) => (
                <li key={label}>
                  <button
                    onClick={() => sectionId && scrollToSection(sectionId)}
                    className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              {['FAQs', 'Warranty Info', 'Installation Guide', 'Returns Policy', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <button className="text-gray-400 hover:text-white transition-colors text-sm text-left">{item}</button>
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
  )
}
