import { MarketingNav } from "@/components/marketing/nav"
import { MarketingHero } from "@/components/marketing/hero"
import { MarketingFeatures } from "@/components/marketing/features"
import { MarketingProcess } from "@/components/marketing/process"
import { MarketingShowcase } from "@/components/marketing/showcase"
import { MarketingTestimonials } from "@/components/marketing/testimonials"
import { MarketingCTA } from "@/components/marketing/cta"
import { MarketingFooter } from "@/components/marketing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <MarketingNav />
      <MarketingHero />
      <MarketingFeatures />
      <MarketingProcess />
      <MarketingShowcase />
      <MarketingTestimonials />
      <MarketingCTA />
      <MarketingFooter />
    </div>
  )
}
