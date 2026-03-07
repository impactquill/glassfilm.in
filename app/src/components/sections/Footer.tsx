import Link from 'next/link'
import { Instagram, Facebook, Linkedin, Youtube, MapPin, Phone, ArrowRight } from 'lucide-react'

const footerLinks = {
  'Products': [
    { label: 'Heat Control Films', path: '/glass-films/heat-control-film' },
    { label: 'Privacy Films', path: '/glass-films/privacy-film' },
    { label: 'Decorative Films', path: '/glass-films/decorative-film' },
    { label: 'Frosted Films', path: '/glass-films/frosted-film' },
    { label: 'Custom Wallpapers', path: '/wallpaper/all-wallpapers' },
    { label: 'Window Blinds', path: '/window-blinds/all-window-blinds' }
  ],
  'Company': [
    { label: 'About Us', path: '/about' },
    { label: 'Our Process', path: '/how-it-works' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' }
  ],
  'Support': [
    { label: 'FAQs', path: '/faqs' },
    { label: 'Warranty Info', path: '/about' },
    { label: 'Privacy Policy', path: '/contact' },
    { label: 'Terms of Service', path: '/contact' }
  ]
}

const socialLinks = [
  { Icon: Instagram, href: '#', color: 'hover:text-teal' },
  { Icon: Facebook, href: '#', color: 'hover:text-teal' },
  { Icon: Linkedin, href: '#', color: 'hover:text-teal' },
  { Icon: Youtube, href: '#', color: 'hover:text-teal' },
]

export default function Footer() {
  return (
    <footer className="bg-[#041C1E] text-white pt-24 pb-12 overflow-hidden relative border-t border-teal/10">
      {/* Background Architectural Textures */}
      <div className="absolute inset-0 subtle-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-teal/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand & Address Section */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block mb-10 group">
              <img src="/glassfilm-logo.svg" alt="GlassFilm Logo" className="h-12 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-105" />
            </Link>

            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
              Specializing in premium architectural glass films, customized 3D murals, and designer window blinds. We transform functional surfaces into creative statements.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal font-bold uppercase tracking-widest text-[10px]">
                  <MapPin className="w-3 h-3" />
                  Corporate Office
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  1 Roza, Jalalpur, Roza Jalalpur, Greater Noida, UP, 203207
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal font-bold uppercase tracking-widest text-[10px]">
                  <MapPin className="w-3 h-3" />
                  Branch Office
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  WZ-23, Ram Complex, Paschim Vihar, New Delhi - 110063
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 md:col-span-6 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-playfair text-xl font-bold mb-8 text-white relative inline-block">
                Products
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal rounded-full" />
              </h4>
              <ul className="space-y-4">
                {footerLinks.Products.map((link) => (
                  <li key={link.label}>
                    <Link href={link.path} className="text-gray-400 hover:text-teal transition-all flex items-center gap-2 group text-sm">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-playfair text-xl font-bold mb-8 text-white relative inline-block">
                Company
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal rounded-full" />
              </h4>
              <ul className="space-y-4">
                {footerLinks.Company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.path} className="text-gray-400 hover:text-teal transition-all flex items-center gap-2 group text-sm">
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-4 lg:pl-10">
            <h4 className="font-playfair text-xl font-bold mb-8 text-white relative inline-block">
              Quick Connect
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-teal rounded-full" />
            </h4>

            <div className="space-y-8">
              <a href="tel:+919958360741" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-teal transition-all duration-500 border border-white/10 group-hover:border-transparent">
                  <Phone className="w-5 h-5 text-teal group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 group-hover:text-teal transition-colors">Relationship Manager</p>
                  <p className="text-lg font-bold text-white group-hover:translate-x-1 transition-transform">Manish Kumar</p>
                  <p className="text-sm text-gray-400">+91 9958360741</p>
                </div>
              </a>

              <div className="flex gap-4 pt-6">
                {socialLinks.map(({ Icon, href, color }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center transition-all duration-500 hover:bg-teal hover:border-transparent group"
                    aria-label="Social Link"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-center md:text-left">
            <div>
              <p className="text-gray-500 text-sm mb-1">© 2026 GlassFilm. Redefining Surfaces with Premium Solutions.</p>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider font-semibold">
                Partner of{' '}
                <a
                  href="https://www.chhayachhavidecor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal/60 hover:text-teal transition-colors underline decoration-teal/20"
                >
                  Chhaya Chhavi Decor
                </a>
              </p>
            </div>
            <div className="flex gap-6">
              <Link href="/contact" className="text-xs text-gray-600 hover:text-teal transition-colors uppercase tracking-[0.2em] font-bold">Privacy</Link>
              <Link href="/contact" className="text-xs text-gray-600 hover:text-teal transition-colors uppercase tracking-[0.2em] font-bold">Terms</Link>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white/[0.03] px-5 py-2.5 rounded-xl border border-white/5 shadow-inner">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold whitespace-nowrap">Accepted:</span>
            <div className="flex gap-4 items-center">
              {['UPI', 'VISA', 'MASTERCARD'].map((method) => (
                <span key={method} className="text-[9px] font-black tracking-widest text-white/40 hover:text-teal transition-colors cursor-default border border-white/10 px-2 py-1 rounded bg-white/5">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
