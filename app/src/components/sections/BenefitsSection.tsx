import { benefits } from '@/data/constants'

export default function BenefitsSection() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
              Why Choose Glass Films?
            </h2>
            <p className="text-slate text-lg mb-8">
              The smart alternative to curtains and blinds. Experience the perfect balance of comfort, privacy, and style.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-card card-hover">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-teal" />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="/hero-3.jpg"
              alt="Before After Comparison"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
