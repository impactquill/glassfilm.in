import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from '@/lib/utils'

export default function SectionRouter() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isScrollingRef = useRef(false)
  const lastNavigatedPathRef = useRef(pathname)

  // Handle initial load and manual path changes (links/back-forward)
  useEffect(() => {
    // If the pathname change was already handled/ignored by our scroll logic, skip
    if (pathname === lastNavigatedPathRef.current) return

    const sectionId = pathname.substring(1) || 'home'
    const element = document.getElementById(sectionId)
    
    if (element) {
      isScrollingRef.current = true
      scrollToSection(sectionId)
      lastNavigatedPathRef.current = pathname
      
      // Reset the flag after smooth scroll is likely finished
      setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    }
  }, [pathname])

  // Update URL path based on scroll position
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', // Narrower detection window for stability
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      // Don't update URL while we are programmatically scrolling
      if (isScrollingRef.current) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          const newPath = id === 'home' ? '/' : `/${id}`
          
          if (pathname !== newPath) {
            // Update the ref first so the 'scroll to path' effect knows to ignore this change
            lastNavigatedPathRef.current = newPath
            navigate(newPath, { replace: true })
          }
        }
      })
    }, observerOptions)

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [pathname, navigate])

  return null
}
