export default function GallerySection() {
  return (
    <section id="gallery" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
            Transformations That Speak
          </h2>
          <p className="text-slate text-lg">See the difference our glass films make</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-2xl shadow-card">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold text-slate uppercase mb-2 block">Before</span>
                <img src="/gallery-office-before.jpg" alt="Clear glass windows in a corporate office before film installation" className="rounded-xl w-full h-48 object-cover" />
              </div>
              <div>
                <span className="text-xs font-semibold text-teal uppercase mb-2 block">After</span>
                <img src="/gallery-office-after.jpg" alt="Corporate office with frosted privacy glass film for professional look" className="rounded-xl w-full h-48 object-cover" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="font-playfair font-semibold text-charcoal">Corporate Office</h3>
                <p className="text-sm text-slate">Frosted Film • Mumbai</p>
              </div>
              <span className="text-teal font-semibold">80% Heat Reduction</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-card">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold text-slate uppercase mb-2 block">Before</span>
                <img src="/gallery-home-before.jpg" alt="Residential living room glass doors without privacy film" className="rounded-xl w-full h-48 object-cover" />
              </div>
              <div>
                <span className="text-xs font-semibold text-teal uppercase mb-2 block">After</span>
                <img src="/gallery-home-after.jpg" alt="Living room glass doors with decorative privacy film for elegance" className="rounded-xl w-full h-48 object-cover" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="font-playfair font-semibold text-charcoal">Residential Living Room</h3>
                <p className="text-sm text-slate">Privacy Frosted Film • Delhi</p>
              </div>
              <span className="text-teal font-semibold">Complete Privacy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
