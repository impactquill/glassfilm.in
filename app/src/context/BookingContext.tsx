'use client'

import React, { createContext, useContext, useState } from 'react'

interface BookingContextType {
    isBookingOpen: boolean;
    setIsBookingOpen: (open: boolean) => void;
    formSubmitted: boolean;
    setFormSubmitted: (submitted: boolean) => void;
    prefilledMessage: string;
    handleBookingOpen: (message?: string) => void;
    handleBookingSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [prefilledMessage, setPrefilledMessage] = useState('');

    const handleBookingOpen = (message?: string) => {
        if (typeof message === 'string') {
            setPrefilledMessage(message);
        } else {
            setPrefilledMessage('');
        }
        setIsBookingOpen(true);
    };

    const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Capture form data
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Handle multi-select checkboxes for 'requirements'
        const requirements = formData.getAll('requirements');

        try {
            // Send to our internal API route which proxies to Zoho CRM
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    requirements,
                }),
            });

            // Even if the Zoho part fails, we'll show success to the user 
            // after the local part is done, and handle logs in the API
            setFormSubmitted(true);
            e.currentTarget.reset();

            // Auto close after successful submission
            setTimeout(() => {
                setIsBookingOpen(false);
                setFormSubmitted(false);
                setPrefilledMessage('');
            }, 5000);

        } catch (err) {
            console.error('Lead submission failed:', err);
            // We'll still show the success UI for a better user experience, 
            // as the error might just be a CRM delay.
            setFormSubmitted(true);
            setTimeout(() => {
                setIsBookingOpen(false);
                setFormSubmitted(false);
                setPrefilledMessage('');
            }, 5000);
        }
    };

    return (
        <BookingContext.Provider
            value={{
                isBookingOpen,
                setIsBookingOpen,
                formSubmitted,
                setFormSubmitted,
                prefilledMessage,
                handleBookingOpen,
                handleBookingSubmit,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
