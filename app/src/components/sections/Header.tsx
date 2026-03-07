import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onBookingOpen: () => void
  setActiveCategory: (category: string) => void
}

export default function Header({ onBookingOpen, setActiveCategory }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-white transition-shadow duration-300",
      isScrolled ? "shadow-md" : ""
    )}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            aria-label="GlassComfort Home"
          >
            <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="font-playfair text-xl font-bold text-charcoal">GlassComfort</span>
              <span className="block text-xs text-slate">Premium Film Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/" 
              className={cn(
                "font-medium transition-colors hover:text-teal",
                isActive('/') ? "text-teal" : "text-charcoal"
              )}
            >
              Home
            </Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1 text-charcoal font-medium hover:text-teal transition-colors">
                Glass Films
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {['Heat Control', 'Privacy', 'Decorative', 'Frosted'].map((item) => (
                    <Link
                      key={item}
                      to="/products"
                      onClick={() => setActiveCategory(item)}
                      className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors"
                    >
                      {item} Films
                    </Link>
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
                  <Link to="/wallpaper" className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Customized Design</Link>
                  <Link to="/wallpaper" className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Textured Wallpapers</Link>
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
                  <Link to="/products" className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Roller Blinds</Link>
                  <Link to="/products" className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Zebra Blinds</Link>
                  <Link to="/products" className="block w-full text-left px-4 py-2.5 text-sm text-charcoal hover:bg-teal-50 hover:text-teal rounded-lg transition-colors">Vertical Blinds</Link>
                </div>
              </div>
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "font-medium transition-colors hover:text-teal",
                  isActive(item.path) ? "text-teal" : "text-charcoal"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919958360741"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Contact on WhatsApp"
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
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block py-2 font-medium",
                  isActive(item.path) ? "text-teal" : "text-charcoal"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block py-2 text-charcoal font-medium">Glass Films</Link>
            <Link to="/wallpaper" onClick={() => setIsMenuOpen(false)} className="block py-2 text-charcoal font-medium">Wallpapers</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block py-2 text-charcoal font-medium">Window Blinds</Link>
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
