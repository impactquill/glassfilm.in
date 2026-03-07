import { Star } from 'lucide-react'
import Link from 'next/link'
import { products } from '@/data/constants'

interface ProductsSectionProps {
  activeCategory: string
}

export default function ProductsSection({ activeCategory }: ProductsSectionProps) {
  const filteredProducts = activeCategory === 'All Products'
    ? products
    : activeCategory === 'Glass Films'
      ? products.filter(p => ['Heat Control', 'Privacy', 'Decorative', 'Frosted'].includes(p.category))
      : products.filter(p => p.category === activeCategory)

  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
            Explore Our {activeCategory === 'All Products' ? 'Complete' : activeCategory} Collection
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto">
            Find the perfect solution for your space from our premium range of 50+ glass films
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const basePath = product.category === 'Wallpapers'
              ? '/wallpaper'
              : product.category === 'Window Blinds'
                ? '/window-blinds'
                : '/glass-films'
            return (
              <Link
                key={product.id}
                href={`${basePath}/${product.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '')}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-card card-hover flex flex-col h-full cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-xs font-semibold text-teal uppercase tracking-wide">{product.category}</span>
                  <h3 className="font-playfair text-lg font-semibold text-charcoal mt-1 mb-2 group-hover:text-teal transition-colors">{product.name}</h3>
                  <p className="text-sm text-slate mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate">({product.reviews})</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

