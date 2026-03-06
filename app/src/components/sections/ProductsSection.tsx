import { Heart, Star, ArrowRight } from 'lucide-react'
import { products } from '@/data/constants'

interface ProductsSectionProps {
  activeCategory: string
  onBookingOpen: () => void
}

export default function ProductsSection({ activeCategory, onBookingOpen }: ProductsSectionProps) {
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
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-card card-hover">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-coral hover:text-white transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-teal uppercase tracking-wide">{product.category}</span>
                <h3 className="font-playfair text-lg font-semibold text-charcoal mt-1 mb-2">{product.name}</h3>
                <p className="text-sm text-slate mb-3">{product.description}</p>
                <div className="flex items-center gap-2 mb-3">
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
                <div className="flex items-center justify-end">
                  <button
                    onClick={onBookingOpen}
                    className="text-coral font-medium text-sm flex items-center gap-1 hover:underline"
                  >
                    Enquire <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
