"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { ModelViewer } from "@/components/visualizer/model-viewer"

export function MarketingHero() {
  const [showDemo, setShowDemo] = useState(false)

  const demoModel = {
    src: "/models/sample-door.glb", // This would be a real model file
    name: "Custom Entry Door",
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm animate-fade-in-up">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-muted-foreground">Revolutionizing Custom Door Manufacturing</span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl animate-fade-in-up text-balance">
            Visualize Your Vision.
            <br />
            <span className="text-accent">Build With Precision.</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-12 text-lg text-muted-foreground sm:text-xl lg:text-2xl max-w-3xl mx-auto animate-fade-in-up leading-relaxed text-pretty">
            Experience the future of custom door design with AR-powered visualization, instant estimates, and seamless
            project management—all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up">
            <Button
              size="lg"
              className="group h-12 bg-accent text-accent-foreground hover:bg-accent/90 px-8 text-base font-medium"
              asChild
            >
              <Link href="#contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group h-12 px-8 text-base font-medium bg-transparent"
              onClick={() => setShowDemo(true)}
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-col items-center gap-8 animate-fade-in-up">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Trusted by Industry Leaders
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {["Architects", "Contractors", "Designers", "Builders"].map((client) => (
                <div key={client} className="text-lg font-semibold text-muted-foreground">
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image/Visual */}
        <div className="mt-20 animate-scale-in">
          <div className="relative mx-auto max-w-5xl">
            <button
              onClick={() => setShowDemo(true)}
              className="w-full aspect-video rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 shadow-2xl border overflow-hidden hover:shadow-3xl transition-shadow cursor-pointer group"
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-24 w-24 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                    <Play className="h-12 w-12 text-accent" />
                  </div>
                  <p className="text-muted-foreground font-medium">Click to View 3D Door Visualization</p>
                  <p className="text-sm text-muted-foreground mt-1">Interactive AR-powered preview</p>
                </div>
              </div>
            </button>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
          </div>
        </div>
      </div>

      <Dialog open={showDemo} onOpenChange={setShowDemo}>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="text-2xl font-bold">3D Door Visualization</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Interact with the model using your mouse or touch. Drag to rotate, scroll to zoom, right-click to pan.
          </DialogDescription>
          <div className="space-y-4">
            <ModelViewer model={demoModel} />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <p>Drag to rotate • Scroll to zoom • Right-click to pan</p>
              <Button variant="outline" asChild>
                <Link href="/visualizer">Open Full Visualizer</Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
