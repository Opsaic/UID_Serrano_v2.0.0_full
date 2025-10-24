export function MarketingShowcase() {
  const showcaseItems = [
    {
      title: "Modern Minimalist",
      category: "Residential",
      image: "/modern-minimalist-door-design.jpg",
    },
    {
      title: "Industrial Elegance",
      category: "Commercial",
      image: "/industrial-elegant-door-design.jpg",
    },
    {
      title: "Classic Craftsmanship",
      category: "Heritage",
      image: "/classic-craftsman-door-design.jpg",
    },
  ]

  return (
    <section id="showcase" className="py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-4 text-balance">
            Crafted to Perfection
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Every door tells a story. See how we bring architectural visions to life.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {showcaseItems.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-2xl"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 transition-transform group-hover:translate-y-0">
                <p className="mb-1 text-sm font-medium text-accent">{item.category}</p>
                <h3 className="text-2xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="text-accent font-medium hover:underline">View Full Portfolio →</button>
        </div>
      </div>
    </section>
  )
}
