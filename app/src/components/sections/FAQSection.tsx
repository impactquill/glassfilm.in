'use client'
import { Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useIsMobile } from '@/hooks/use-mobile'
import WhatsAppIcon from '@/components/WhatsAppIcon'
import { faqs } from '@/data/constants'

export default function FAQSection() {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a minimal skeleton or nothing to match the server precisely
    return <div className="min-h-[400px]" />
  }
  return (
    <section id="faqs" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-charcoal mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate text-lg mb-6">
              Still have questions? We're here to help.
            </p>
            <div className="flex items-center gap-4">
              {isMobile ? (
                <a href="tel:+91-9958360741" className="flex items-center gap-2 text-teal font-semibold hover:underline">
                  <Phone className="w-5 h-5" />
                  +91-9958360741
                </a>
              ) : (
                <div className="flex items-center gap-2 text-charcoal font-semibold">
                  <Phone className="w-5 h-5" />
                  +91-9958360741
                </div>
              )}
              <a
                href="https://wa.me/919958360741"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 font-semibold hover:underline"
              >
                <WhatsAppIcon className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>
          <div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-playfair font-semibold text-charcoal">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
