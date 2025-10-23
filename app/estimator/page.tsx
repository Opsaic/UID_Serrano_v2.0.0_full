"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Upload, Calculator } from "lucide-react"

export default function EstimatorPage() {
  const [quantity, setQuantity] = useState("20")
  const [material, setMaterial] = useState("wood")
  const [estimate, setEstimate] = useState<number | null>(null)

  const calculateEstimate = () => {
    const basePrice = material === "wood" ? 450 : material === "metal" ? 380 : 520
    const total = Number.parseInt(quantity) * basePrice
    setEstimate(total)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground">Door Estimator</h1>
          <p className="mt-2 text-muted-foreground">Configure your door specifications and get instant pricing</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Step 1: Upload File
              </CardTitle>
              <CardDescription>Upload a .stp, .step, or .STL file to view costs in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="w-full max-w-xs bg-transparent">
                    Upload file
                  </Button>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Calculate</Button>
                </div>
                <div className="rounded-lg border-2 border-dashed border-border bg-muted/20 p-8 text-center">
                  <p className="text-sm text-muted-foreground">Drag & Drop a file here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Step 2: Input Project Info
              </CardTitle>
              <CardDescription>Adjust these fields to change the estimated quote</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <select
                    id="material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="wood">Wood (Premium)</option>
                    <option value="metal">Metal (Standard)</option>
                    <option value="composite">Composite (Deluxe)</option>
                  </select>
                </div>
              </div>
              <Button
                onClick={calculateEstimate}
                className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Generate Estimate
              </Button>
            </CardContent>
          </Card>

          {estimate !== null && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-accent">Pricing Generated: ESTIMATE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <div className="text-sm text-muted-foreground">Master Pattern Cost</div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">${(estimate * 0.15).toFixed(0)}</div>
                  </div>
                  <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <div className="text-sm text-muted-foreground">Number of Molds</div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">
                      {Math.ceil(Number.parseInt(quantity) / 10)}
                    </div>
                  </div>
                  <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <div className="text-sm text-muted-foreground">Mold Cost (per mold)</div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">${(estimate * 0.08).toFixed(0)}</div>
                  </div>
                  <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <div className="text-sm text-muted-foreground">Part Cost (per part)</div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">
                      ${(estimate / Number.parseInt(quantity)).toFixed(0)}
                    </div>
                  </div>
                  <div className="col-span-2 rounded-lg border-2 border-accent bg-accent/10 p-6">
                    <div className="text-sm font-medium text-muted-foreground">Total Cost</div>
                    <div className="mt-2 text-4xl font-bold text-accent">${estimate.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Email Address</CardTitle>
              <CardDescription>Want to have this formally evaluated for DFM & Quote?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input type="email" placeholder="Your Email" className="max-w-md border-input" />
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Send</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
