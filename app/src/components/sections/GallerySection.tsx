'use client'

import { useState } from 'react'
import { X, Search } from 'lucide-react'

interface GallerySectionProps {
  externalImages?: string[]
}

export default function GallerySection({ externalImages = [] }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-charcoal mb-4">
            Transformations That Speak
          </h2>
          <p className="text-slate text-lg max-w-2xl mx-auto">
            Witness the synthesis of privacy, heat control, and aesthetic elegance in our latest project completions.
          </p>
        </div>

        {/* Existing Showcase: Before & After */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {[
            {
              title: "Corporate Headquarters",
              location: "Frosted Privacy Film • Mumbai Projects",
              stat: "80% Heat Rejection",
              verified: "Verified Performance",
              before: "/gallery-office-before.jpg",
              after: "/gallery-office-after.jpg"
            },
            {
              title: "Luxury Residential Wing",
              location: "Designer Decorative Film • Delhi NCR",
              stat: "Absolute Privacy",
              verified: "Certified Installation",
              before: "/gallery-home-before.jpg",
              after: "/gallery-home-after.jpg"
            }
          ].map((project, pIdx) => (
            <div key={pIdx} className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 group transition-all duration-500 hover:shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative cursor-zoom-in" onClick={() => setSelectedImage(project.before)}>
                  <span className="absolute top-3 left-3 z-10 bg-slate-900/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Before</span>
                  <img src={project.before} alt="Project Before" className="rounded-2xl w-full h-64 object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="relative cursor-zoom-in" onClick={() => setSelectedImage(project.after)}>
                  <span className="absolute top-3 left-3 z-10 bg-teal/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">After</span>
                  <img src={project.after} alt="Project After" className="rounded-2xl w-full h-64 object-cover" />
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-charcoal">{project.title}</h3>
                  <p className="text-sm text-slate flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal"></span>
                    {project.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block text-teal font-bold text-lg">{project.stat}</span>
                  <span className="text-[10px] text-slate uppercase tracking-tighter">{project.verified}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Modern Showcase */}
        {externalImages && externalImages.length > 0 && (
          <div className="mt-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-l-4 border-teal pl-6">
              <div>
                <h2 className="text-3xl font-playfair font-bold text-charcoal">Installation Showcase</h2>
                <p className="text-slate italic mt-1 font-medium">Real-time updates from our nationwide service teams.</p>
              </div>
              <div className="text-slate text-sm font-semibold uppercase tracking-widest bg-slate-200/50 px-4 py-2 rounded-full">
                {externalImages.length} Projects Live
              </div>
            </div>

            {/* Modern Masonry Layout */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {externalImages.map((src, idx) => (
                <div
                  key={idx}
                  className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-md border border-slate-100 bg-white cursor-zoom-in"
                  onClick={() => setSelectedImage(src)}
                >
                  <img
                    src={src}
                    alt={`GlassFilm Installation ${idx + 1}`}
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="bg-white/20 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Search className="text-white w-5 h-5" />
                    </div>
                    <span className="text-teal font-bold text-[10px] uppercase tracking-[0.2em] mb-1">Recent Completion</span>
                    <h4 className="text-white font-bold text-sm">Site ID: #{20260 + idx}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium Zoom Modal / Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-charcoal/95 backdrop-blur-sm transition-all duration-500 animate-in fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative max-w-7xl max-h-full flex items-center justify-center animate-in zoom-in-95 duration-300">
              <img
                src={selectedImage}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border-4 border-white/10"
                alt="Zoomed Installation"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
