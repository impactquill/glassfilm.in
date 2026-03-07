import ProductPageContent from '@/components/pages/ProductPageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Wallpapers — GlassFilm',
    description: 'Explore our collection of 3D, textured, and customized wallpapers for home and office.',
}

export default function WallpaperPage() {
    return <ProductPageContent slug="all-wallpapers" />
}
