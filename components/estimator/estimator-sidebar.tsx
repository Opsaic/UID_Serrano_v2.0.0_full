"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Save, Send } from "lucide-react"
import { useState, useEffect } from "react"

export function EstimatorSidebar() {
  const [priceBreakdown, setPriceBreakdown] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPricing = async () => {
      setLoading(true)
      try {
        // Fetch materials cost from materials_library
        const materialsResponse = await fetch("/api/materials?category=doors")
        const materials = await materialsResponse.json()

        // Fetch freight rates
        const freightResponse = await fetch("/api/freight-rates")
        const freight = await freightResponse.json()

        setPriceBreakdown({
          baseDoor: materials[0]?.unit_cost || 1200,
          materials: 350,
          hardware: 180,
          glass: 0,
          labor: 450,
          freight: freight?.rate_amount || 250,
        })
      } catch (err) {
        console.error("[v0] Error fetching pricing:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPricing()
  }, [])

  const subtotal = priceBreakdown
    ? Object.values(priceBreakdown).reduce((sum: number, val: any) => sum + (val || 0), 0)
    : 0
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Price Estimate</CardTitle>
          <CardDescription>{loading ? "Loading pricing..." : "Real-time pricing breakdown"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {priceBreakdown &&
            Object.keys(priceBreakdown).map((key) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                <span className="font-medium">${priceBreakdown[key].toLocaleString()}</span>
              </div>
            ))}

          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" size="lg">
            <Send className="h-4 w-4" />
            Send Quote
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            <Save className="h-4 w-4" />
            Save Configuration
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Delivery Estimate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lead Time</span>
              <span className="font-medium">4-6 weeks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">${priceBreakdown?.freight || 250}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
