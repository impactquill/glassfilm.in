import { categories } from '@/data/constants'

interface CategoryTabsProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function CategoryTabs({ activeCategory, setActiveCategory }: CategoryTabsProps) {
  return (
    <section className="bg-white border-b">
      <div className="container-custom">
        <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === category
                ? 'bg-teal text-white'
                : 'bg-gray-100 text-charcoal hover:bg-teal-50 hover:text-teal'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
