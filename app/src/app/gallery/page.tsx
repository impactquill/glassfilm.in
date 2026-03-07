import GallerySection from '@/components/sections/GallerySection'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
    title: 'Gallery — GlassFilm',
    description: 'View our successful installations of premium glass films, wallpapers and window blinds across India.',
}

export default function GalleryPage() {
    const installationsDir = path.join(process.cwd(), 'public', 'installations')
    let installationImages: string[] = []

    try {
        if (fs.existsSync(installationsDir)) {
            const files = fs.readdirSync(installationsDir)
            installationImages = files
                .filter(file => file.toLowerCase().endsWith('.png'))
                .map(file => `/installations/${file}`)
        }
    } catch (error) {
        console.error('Error reading installations directory:', error)
    }

    return (
        <div className="pt-8">
            <GallerySection externalImages={installationImages} />
        </div>
    )
}
