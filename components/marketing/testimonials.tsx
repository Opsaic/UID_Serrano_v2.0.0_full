import { Star } from "lucide-react"

export function MarketingTestimonials() {
  const testimonials = [
    {
      quote:
        "UID Serrano transformed how we present door options to clients. The AR visualization closed deals 3x faster.",
      author: "Sarah Chen",
      role: "Principal Architect",
      company: "Chen Design Studio",
      rating: 5,
    },
    {
      quote: "The instant pricing and project management tools saved us countless hours. ROI was immediate.",
      author: "Michael Rodriguez",
      role: "General Contractor",
      company: "Rodriguez Construction",
      rating: 5,
    },
    {
      quote: "Finally, a platform that understands the custom door industry. The attention to detail is remarkable.",
      author: "Emily Thompson",
      role: "Interior Designer",
      company: "Thompson Interiors",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 text-balance">
            Trusted by Professionals
          </h2>
          <p className="text-lg text-primary-foreground/80 text-pretty">
            See what industry leaders are saying about UID Serrano.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl bg-primary-foreground/10 backdrop-blur-sm p-8 border border-primary-foreground/20"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-6 text-lg leading-relaxed text-primary-foreground/90">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-accent/20" />
                <div>
                  <div className="font-semibold text-primary-foreground">{testimonial.author}</div>
                  <div className="text-sm text-primary-foreground/70">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
