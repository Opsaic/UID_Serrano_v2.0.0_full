"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Upload, Calculator } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PriceBreakdown {
  master_pattern_cost: number
  number_of_molds: number
  mold_cost_per_mold: number
  total_mold_cost: number
  part_cost: number
  total_parts_cost: number
  total_cost: number
}

export default function EstimatorPage() {
  const { toast } = useToast()
  const [quantity, setQuantity] = useState("20")
  const [material, setMaterial] = useState("wood")
  const [breakdown, setBreakdown] = useState<PriceBreakdown | null>(null)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [configId, setConfigId] = useState<string | null>(null)

  const calculateEstimate = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/estimates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: Number.parseInt(quantity),
          material,
          door_type: "custom",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setBreakdown(data.breakdown)
        setConfigId(data.estimate.id)
        toast({
          title: "Estimate generated",
          description: `Total cost calculated: $${data.breakdown.total_cost.toLocaleString()}`,
        })
      } else {
        throw new Error("Failed to generate estimate")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate estimate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Estimate sent",
      description: `Formal quote sent to ${email}`,
    })
    setEmail("")
  }

  const handleFileUpload = () => {
    toast({
      title: "File upload",
      description: "File upload functionality would open here.",
    })
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
                  <Button onClick={handleFileUpload} variant="outline" className="w-full max-w-xs bg-transparent">
                    Upload file
                  </Button>
                  <Button
                    onClick={calculateEstimate}
                    disabled={loading}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    {loading ? "Calculating..." : "Calculate"}
                  </Button>
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
                    <option value="fiberglass">Fiberglass</option>
                    <option value="steel">Steel</option>
                  </select>
                </div>
              </div>
              <Button
                onClick={calculateEstimate}
                disabled={loading}
                className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Generate Estimate
              </Button>
            </CardContent>
          </Card>

          {breakdown && (
            <Card className="border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-accent">Pricing Generated: ESTIMATE</CardTitle>
                  {configId && <span className="text-xs text-muted-foreground">Config ID: {configId.slice(0, 8)}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <div className="text-sm text-muted-foreground">Master Pattern Cost</div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">
                      ${breakdown.master_pattern_cost.toLocaleString()}
                    </div>
                  </div>
                  <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <div className="text-sm text-muted-foreground">Number of Molds</div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">{breakdown.number_of_molds}</div>
                  </div>
                  <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <div className="text-sm text-muted-foreground">Mold Cost (per mold)</div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">
                      ${breakdown.mold_cost_per_mold.toLocaleString()}
                    </div>
                  </div>
                  <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                    <div className="text-sm text-muted-foreground">Part Cost (per part)</div>
                    <div className="mt-1 text-2xl font-semibold text-foreground">
                      ${breakdown.part_cost.toLocaleString()}
                    </div>
                  </div>
                  <div className="col-span-2 rounded-lg border-2 border-accent bg-accent/10 p-6">
                    <div className="text-sm font-medium text-muted-foreground">Total Cost</div>
                    <div className="mt-2 text-4xl font-bold text-accent">${breakdown.total_cost.toLocaleString()}</div>
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
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-md border-input"
                />
                <Button onClick={handleSendEmail} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
