import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { scrollToSection } from '@/lib/utils'

interface HeaderProps {
  onBookingOpen: () => void
  setActiveCategory: (category: string) => void
}

export default function Header({ onBookingOpen, setActiveCategory }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="font-playfair text-xl font-bold text-charcoal">GlassComfort</span>
              <span className="block text-xs text-slate">Premium Film Solutions</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-charcoal font-medium hover:text-teal transition-colors">Home</button>
            <div className="relative group">
              <button className="flex items-center gap-1 text-charcoal font-medium hover:text-teal transition-colors">
                Glass Films
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {['Heat Control', 'Privacy', 'Decorative', 'Frosted'].map((item) => (
                    <button
                      key={item}
                      onClick={() => { setActiveCategory(item); scrollToSection('products') }}
                      className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors"
                    >
                      {item} Films
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 text-charcoal font-medium hover:text-teal transition-colors">
                Wallpapers
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  <button onClick={() => scrollToSection('wallpaper')} className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Customized Design</button>
                  <button onClick={() => scrollToSection('wallpaper')} className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Textured Wallpapers</button>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 text-charcoal font-medium hover:text-teal transition-colors">
                Window Blinds
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Roller Blinds</button>
                  <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Zebra Blinds</button>
                  <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Vertical Blinds</button>
                </div>
              </div>
            </div>
            <button onClick={() => scrollToSection('gallery')} className="text-charcoal font-medium hover:text-teal transition-colors">Gallery</button>
            <button onClick={() => scrollToSection('about')} className="text-charcoal font-medium hover:text-teal transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-charcoal font-medium hover:text-teal transition-colors">Contact</button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919958360741"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 text-green-600" />
            </a>
            <button
              onClick={onBookingOpen}
              className="hidden md:block btn-primary text-sm py-3 px-6"
            >
              Book Free Visit
            </button>
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container-custom py-4 space-y-4">
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false) }} className="block py-2 text-charcoal font-medium">Home</button>
            <button onClick={() => handleNavClick('products')} className="block py-2 text-charcoal font-medium">Glass Films</button>
            <button onClick={() => handleNavClick('wallpaper')} className="block py-2 text-charcoal font-medium">Wallpapers</button>
            <button onClick={() => handleNavClick('products')} className="block py-2 text-charcoal font-medium">Window Blinds</button>
            <button onClick={() => handleNavClick('gallery')} className="block py-2 text-charcoal font-medium">Gallery</button>
            <button onClick={() => handleNavClick('about')} className="block py-2 text-charcoal font-medium">About</button>
            <button onClick={() => handleNavClick('contact')} className="block py-2 text-charcoal font-medium">Contact</button>
            <button
              onClick={() => {
                onBookingOpen()
                setIsMenuOpen(false)
              }}
              className="w-full btn-primary mt-4"
            >
              Book Free Visit
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
