import { Lightbulb, Ruler, Hammer, CheckCircle } from "lucide-react"

export function MarketingProcess() {
  const steps = [
    {
      icon: Lightbulb,
      number: "01",
      title: "Conceptualize",
      description: "Share your vision with our team. We'll help refine your ideas into actionable designs.",
    },
    {
      icon: Ruler,
      number: "02",
      title: "Visualize",
      description: "Experience your door in AR. Make real-time adjustments and see instant pricing updates.",
    },
    {
      icon: Hammer,
      number: "03",
      title: "Manufacture",
      description: "Our craftsmen bring your design to life with precision engineering and quality materials.",
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "Install",
      description: "Professional installation ensures perfect fit and finish. Your satisfaction guaranteed.",
    },
  ]

  return (
    <section id="process" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4 text-balance">
            From Vision to Reality
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Our streamlined process ensures your project stays on time and on budget.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-border hidden lg:block" />

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="relative">
                  {/* Step Number Circle */}
                  <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-accent shadow-lg">
                    <Icon className="h-10 w-10 text-accent-foreground" />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="mb-2 text-sm font-bold text-accent">{step.number}</div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
