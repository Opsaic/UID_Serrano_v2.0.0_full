import { Cable as Cube, Zap, Shield, TrendingUp, Users, Clock } from "lucide-react"

export function MarketingFeatures() {
  const features = [
    {
      icon: Cube,
      title: "AR Visualization",
      description:
        "See your custom doors in real-time with augmented reality. Make confident decisions before production begins.",
    },
    {
      icon: Zap,
      title: "Instant Estimates",
      description:
        "Generate accurate quotes in seconds with our intelligent pricing engine. No more waiting days for estimates.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance. Your designs and client data are always protected.",
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Track project performance, conversion rates, and revenue metrics in real-time.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless communication between architects, contractors, and clients on a unified platform.",
    },
    {
      icon: Clock,
      title: "Time Savings",
      description: "Reduce project timelines by 40% with automated workflows and instant approvals.",
    },
  ]

  return (
    <section id="features" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4 text-balance">
            Everything You Need to
            <span className="text-accent"> Scale Your Business</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Powerful features designed for modern door manufacturers and design professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:border-accent/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
