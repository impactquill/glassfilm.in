import { Check, Shield } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cities } from '@/data/constants'

interface LeadCaptureSectionProps {
  onSubmit: (e: React.FormEvent) => void
}

export default function LeadCaptureSection({ onSubmit }: LeadCaptureSectionProps) {
  return (
    <section id="contact" className="section-padding gradient-teal">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Book Your Free Site Visit Today
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Our experts will visit, measure, and recommend the perfect film — completely free.
            </p>
            <ul className="space-y-4 mb-8">
              {['Free consultation', 'Expert measurement', 'Same-day quote', 'No obligation'].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-coral" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5" />
              <span>No obligation • Free consultation</span>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" placeholder="Your full name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Select name="city" required>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block">Property Type *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="property" value="residential" required className="text-teal" />
                    <span>Residential</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="property" value="commercial" required className="text-teal" />
                    <span>Commercial</span>
                  </label>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Requirements</Label>
                <div className="flex flex-wrap gap-3">
                  {['Glass Films', 'Window Blinds', 'Wallpapers'].map((req) => (
                    <label key={req} className="flex items-center gap-2">
                      <Checkbox />
                      <span className="text-sm">{req}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full bg-coral text-white font-semibold py-4 rounded-lg hover:bg-coral-600 transition-colors">
                Book Free Site Visit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
