import { Phone } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

export default function AnnouncementBar() {
  const isMobile = useIsMobile()

  return (
    <div className="bg-teal text-white py-2.5 px-4">
      <div className="w-full px-6 md:px-10 2xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">🚚</span>
          <span>Free Site Visit across Delhi-NCR | Installation within 24 hours</span>
        </div>
        <div className="flex items-center gap-4">
          {isMobile ? (
            <a href="tel:+919958360741" className="flex items-center gap-1.5 hover:text-coral-200 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+91-9958360741</span>
            </a>
          ) : (
            <div className="flex items-center gap-1.5 text-white/90">
              <Phone className="w-4 h-4" />
              <span>+91-9958360741</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
