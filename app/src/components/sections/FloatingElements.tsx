import WhatsAppIcon from '@/components/WhatsAppIcon'

interface FloatingElementsProps {
  onBookingOpen: () => void
}

export default function FloatingElements({ onBookingOpen }: FloatingElementsProps) {
  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919958360741"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-40"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <button
          onClick={onBookingOpen}
          className="w-full btn-primary"
        >
          Book Free Site Visit
        </button>
      </div>
    </>
  )
}
