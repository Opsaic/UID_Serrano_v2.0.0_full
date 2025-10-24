import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function MarketingCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-accent/10 via-background to-primary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-12 md:p-16 lg:p-20 shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl mb-6 text-balance">
              Ready to Transform Your Door Business?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 text-pretty">
              Join hundreds of professionals who are already using UID Serrano to streamline their workflow and delight
              their clients.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group h-12 bg-accent text-accent-foreground hover:bg-accent/90 px-8 text-base font-medium"
                asChild
              >
                <Link href="#contact">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base font-medium border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                asChild
              >
                <Link href="#contact">Schedule Demo</Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/70">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary-foreground/20 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
