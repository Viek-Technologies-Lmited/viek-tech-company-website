import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { StatsSection } from "@/components/stats-section"
import { AcademySection } from "@/components/academy-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { defaultContent } from "@/lib/site-content"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection content={defaultContent} />
      <FeaturesSection content={defaultContent} />
      <ServicesSection content={defaultContent} />
      <StatsSection content={defaultContent} />
      <AboutSection content={defaultContent} />
      <AcademySection />
      <TestimonialsSection content={defaultContent} />
      <CtaSection />
      <ContactSection content={defaultContent} />
      <Footer />
      <CookieConsent />
    </main>
  )
}
