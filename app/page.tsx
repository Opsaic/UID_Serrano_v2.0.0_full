import { MarketingHero } from "@/components/marketing/hero"
import { MarketingFeatures } from "@/components/marketing/features"
import { MarketingShowcase } from "@/components/marketing/showcase"
import { MarketingProcess } from "@/components/marketing/process"
import { MarketingTestimonials } from "@/components/marketing/testimonials"
import { MarketingCTA } from "@/components/marketing/cta"
import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <MarketingHero />
      <MarketingFeatures />
      <MarketingShowcase />
      <MarketingProcess />
      <MarketingTestimonials />
      <MarketingCTA />
      <MarketingFooter />
    </div>
  )
}
