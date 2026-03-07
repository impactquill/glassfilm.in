import { steps } from '@/data/constants'

interface HowItWorksSectionProps {
  onBookingOpen: () => void
}

export default function HowItWorksSection({ onBookingOpen }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="section-padding gradient-teal">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
            Get Your Glass Films in 5 Easy Steps
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-coral rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-white/30 -translate-y-1/2" />
                )}
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-white text-teal rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-playfair text-lg font-semibold text-white mb-1">{step.title}</h3>
              <p className="text-sm text-white/80">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onBookingOpen}
            className="bg-coral text-white font-inter font-semibold px-10 py-4 rounded-lg text-lg hover:bg-coral-600 transition-colors shadow-lg"
          >
            Book Free Site Visit
          </button>
        </div>
      </div>
    </section>
  )
}
