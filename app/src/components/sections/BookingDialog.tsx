import { Check } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cities } from '@/data/constants'

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formSubmitted: boolean
  onSubmit: (e: React.FormEvent) => void
}

export default function BookingDialog({ open, onOpenChange, formSubmitted, onSubmit }: BookingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">Book Free Site Visit</DialogTitle>
        </DialogHeader>
        {formSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">Thank You!</h3>
            <p className="text-slate">Our team will call you within 2 hours.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="dialog-name">Name *</Label>
              <Input id="dialog-name" name="name" placeholder="Your full name" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="dialog-phone">Phone *</Label>
              <Input id="dialog-phone" name="phone" type="tel" placeholder="+91-9958360741" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="dialog-email">Email</Label>
              <Input id="dialog-email" name="email" type="email" placeholder="your@email.com" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="dialog-city">City *</Label>
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
                  <input type="radio" name="property" value="residential" required />
                  <span>Residential</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="property" value="commercial" required />
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
            <button type="submit" className="w-full btn-primary">
              Book Free Site Visit
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
