'use client'

import HowItWorksSection from '@/components/sections/HowItWorksSection'
import { useBooking } from '@/context/BookingContext'

export default function HowItWorksPage() {
    const { handleBookingOpen } = useBooking()

    return (
        <div className="pt-8">
            <HowItWorksSection onBookingOpen={handleBookingOpen} />
        </div>
    )
}
