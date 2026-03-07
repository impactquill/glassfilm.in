'use client'

import AnnouncementBar from '@/components/sections/AnnouncementBar'
import Header from '@/components/sections/Header'
import LeadCaptureSection from '@/components/sections/LeadCaptureSection'
import Footer from '@/components/sections/Footer'
import FloatingElements from '@/components/sections/FloatingElements'
import BookingDialog from '@/components/sections/BookingDialog'
import { BookingProvider, useBooking } from '@/context/BookingContext'

function LayoutContent({ children }: { children: React.ReactNode }) {
    const {
        isBookingOpen,
        setIsBookingOpen,
        formSubmitted,
        prefilledMessage,
        handleBookingOpen,
        handleBookingSubmit
    } = useBooking();

    return (
        <div className="min-h-screen bg-white">
            <AnnouncementBar />
            <Header />

            <main>
                {children}
            </main>

            <LeadCaptureSection />
            <Footer />
            <FloatingElements onBookingOpen={handleBookingOpen} />
            <BookingDialog
                open={isBookingOpen}
                onOpenChange={setIsBookingOpen}
                formSubmitted={formSubmitted}
                prefilledMessage={prefilledMessage}
                onSubmit={handleBookingSubmit}
            />
        </div>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <BookingProvider>
            <LayoutContent>
                {children}
            </LayoutContent>
        </BookingProvider>
    );
}
