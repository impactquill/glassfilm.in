import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smoothly scrolls to a section by its element ID without
 * adding a # hash to the URL. Accounts for sticky header offset.
 */
export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 120 // sticky header + category bar height
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: 'smooth',
    })
  }
}
