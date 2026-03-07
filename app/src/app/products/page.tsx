'use client'

import { useState } from 'react'
import CategoryTabs from '@/components/sections/CategoryTabs'
import ProductsSection from '@/components/sections/ProductsSection'

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState('All Products');

    return (
        <div className="pt-20">
            <div className="container-custom text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">Our Products</h1>
                <p className="text-lg text-slate max-w-2xl mx-auto">
                    Explore our comprehensive collection of heat control films, privacy frosted films, and elegant window solutions.
                </p>
            </div>
            <CategoryTabs
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <ProductsSection
                activeCategory={activeCategory}
            />
        </div>
    );
}
