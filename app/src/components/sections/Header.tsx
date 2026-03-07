'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { cn } from '@/lib/utils'
import { useBooking } from '@/context/BookingContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { handleBookingOpen } = useBooking()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Products', path: '/products' },
    { label: 'Gallery', path: '/gallery' },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className={cn(
      "sticky top-0 z-50 bg-white transition-shadow duration-300",
      isScrolled ? "shadow-md" : ""
    )}>
      <div className="w-full px-6 md:px-10 2xl:px-16">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="GlassFilm Home"
          >
            <img
              src="/glassfilm-logo.svg"
              alt="GlassFilm Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-charcoal font-semibold hover:text-teal transition-colors py-7">
                Glass Films
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-[90%] left-0 w-60 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-slate-100">
                <div className="p-3">
                  {['Heat Control', 'Privacy', 'Decorative', 'Frosted'].map((item) => (
                    <Link
                      key={item}
                      href={`/glass-films/${item.toLowerCase().replace(/ /g, '-')}-film`}
                      className="block w-full text-left px-5 py-3 text-sm font-medium text-charcoal hover:bg-teal-50 hover:text-teal rounded-xl transition-all"
                    >
                      {item} Films
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1.5 text-charcoal font-semibold hover:text-teal transition-colors py-7">
                Wallpapers
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-[90%] left-0 w-60 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-slate-100">
                <div className="p-3">
                  <Link href="/wallpaper/all-wallpapers" className="block w-full text-left px-5 py-3 text-sm font-medium text-charcoal hover:bg-teal-50 hover:text-teal rounded-xl transition-all">View All Wallpapers</Link>
                  <Link href="/wallpaper/customized-wallpapers" className="block w-full text-left px-5 py-3 text-sm font-medium text-charcoal hover:bg-teal-50 hover:text-teal rounded-xl transition-all">Customized Murals</Link>
                  <Link href="/wallpaper/textured-wallpapers" className="block w-full text-left px-5 py-3 text-sm font-medium text-charcoal hover:bg-teal-50 hover:text-teal rounded-xl transition-all">Italian Textures</Link>
                  <Link href="/wallpaper/kids-fantasy-world" className="block w-full text-left px-5 py-3 text-sm font-medium text-charcoal hover:bg-teal-50 hover:text-teal rounded-xl transition-all">Kids Fantasy World</Link>
                  <Link href="/wallpaper/metallic-damask" className="block w-full text-left px-5 py-3 text-sm font-medium text-charcoal hover:bg-teal-50 hover:text-teal rounded-xl transition-all">Metallic Damask</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1.5 text-charcoal font-semibold hover:text-teal transition-colors py-7">
                Blinds
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-[90%] left-0 w-60 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-slate-100">
                <div className="p-3">
                  <Link href="/window-blinds/all-window-blinds" className="block w-full text-left px-5 py-3 text-sm font-medium text-charcoal hover:bg-teal-50 hover:text-teal rounded-xl transition-all">View All Blinds</Link>
                  <Link href="/window-blinds/roller-blinds" className="block w-full text-left px-5 py-3 text-sm font-medium text-charcoal hover:bg-teal-50 hover:text-teal rounded-xl transition-all">Roller Blinds</Link>
                  <Link href="/window-blinds/zebra-blinds" className="block w-full text-left px-5 py-3 text-sm font-medium text-charcoal hover:bg-teal-50 hover:text-teal rounded-xl transition-all">Zebra Blinds</Link>
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={cn(
                  "font-semibold transition-colors hover:text-teal py-7",
                  isActive(item.path) ? "text-teal" : "text-charcoal"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            <a
              href="https://wa.me/919958360741"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-10 h-10 items-center justify-center hover:bg-gray-100 rounded-full transition-all hover:scale-105"
              aria-label="Contact on WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5 text-green-600" />
            </a>
            <button
              onClick={() => handleBookingOpen()}
              className="hidden md:flex btn-primary text-sm py-2.5 px-6 items-center gap-2 shadow-md shadow-teal-500/10 hover:shadow-teal-500/20 active:scale-95 transition-all"
            >
              Book Free Visit
              <WhatsAppIcon className="w-4 h-4" />
            </button>
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block py-2 font-medium",
                  isActive(item.path) ? "text-teal" : "text-charcoal"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/glass-films/heat-control-film" onClick={() => setIsMenuOpen(false)} className="block py-2 text-charcoal font-medium">Glass Films</Link>
            <Link href="/wallpaper/all-wallpapers" onClick={() => setIsMenuOpen(false)} className="block py-2 text-charcoal font-medium">Wallpapers Collection</Link>
            <Link href="/wallpaper/kids-fantasy-world" onClick={() => setIsMenuOpen(false)} className="block py-2 text-charcoal font-medium">Kids Fantasy World</Link>
            <Link href="/wallpaper/metallic-damask" onClick={() => setIsMenuOpen(false)} className="block py-2 text-charcoal font-medium">Metallic Damask</Link>
            <Link href="/window-blinds/all-window-blinds" onClick={() => setIsMenuOpen(false)} className="block py-2 text-charcoal font-medium">Window Blinds</Link>
            <button
              onClick={() => {
                handleBookingOpen()
                setIsMenuOpen(false)
              }}
              className="w-full btn-primary mt-4 flex items-center justify-center gap-2"
            >
              Book Free Visit
              <WhatsAppIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

