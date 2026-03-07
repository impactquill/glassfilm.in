import { Link } from 'react-router-dom'
import { Instagram, Facebook, Linkedin, Youtube, Sparkles, MapPin } from 'lucide-react'

const companyLinks: Record<string, string> = {
  'About Us': '/about',
  'Our Process': '/how-it-works',
  'Gallery': '/gallery',
  'Contact': '/contact',
}

const socialLinks = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Youtube, label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="GlassComfort Home">
              <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-playfair text-xl font-bold">GlassComfort</span>
            </Link>
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
              {socialLinks.map(({ Icon, label }, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-teal transition-colors"
                  aria-label={`Follow us on ${label}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6">Products</h4>
            <ul className="space-y-3">
              {['Heat Control Films', 'Privacy Films', 'Decorative Films', 'Frosted Films', 'Wallpapers', 'Window Blinds'].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm text-left block">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {Object.entries(companyLinks).map(([label, path]) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-gray-400 hover:text-white transition-colors text-sm text-left block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/faqs" className="text-gray-400 hover:text-white transition-colors text-sm text-left block">FAQs</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm text-left block">Warranty Info</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm text-left block">Installation Guide</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm text-left block">Service Request</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm text-left block">Privacy Policy</Link></li>
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
