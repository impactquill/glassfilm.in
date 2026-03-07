import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '@/index.css'
import ClientLayout from '@/components/layout/ClientLayout'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
})

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair'
})

export const metadata: Metadata = {
    title: 'GlassFilm — Premium Glass Films, Wallpapers & Window Blinds | India',
    description: "Transform your space with GlassFilm's premium glass films, customised wallpapers, and window blinds. Up to 80% heat reduction, UV protection, and privacy solutions. Free site visit across 100+ cities in India.",
    keywords: 'glass films, window films, heat control films, privacy films, decorative films, frosted films, wallpaper, window blinds, roller blinds, zebra blinds, UV protection, energy saving, India',
    authors: [{ name: 'GlassFilm' }],
    robots: 'index, follow',
    openGraph: {
        type: 'website',
        url: 'https://glasscomfort.in/',
        title: 'GlassFilm — Premium Glass Films, Wallpapers & Window Blinds',
        description: 'Heat control. Privacy. Elegance. Experience up to 80% heat reduction with our expert glass film installation. 10,000+ installations, 5-year warranty, 100+ cities.',
        images: [{ url: 'https://glasscomfort.in/hero-1.jpg' }],
        locale: 'en_IN',
        siteName: 'GlassFilm',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GlassFilm — Premium Glass Films, Wallpapers & Window Blinds',
        description: 'Heat control. Privacy. Elegance. Experience up to 80% heat reduction with our expert glass film installation. Free site visit across India.',
        images: ['https://glasscomfort.in/hero-1.jpg'],
    },
    icons: {
        icon: '/favicon.svg',
        apple: '/apple-touch-icon.png',
    },
    alternates: {
        canonical: 'https://glasscomfort.in/',
    },
}

export const viewport = {
    themeColor: '#0D7377',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
            <body suppressHydrationWarning>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    )
}
