"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Save, Send } from "lucide-react"

export function EstimatorSidebar() {
  const priceBreakdown = [
    { label: "Base Door", amount: 1200 },
    { label: "Materials Upgrade", amount: 350 },
    { label: "Hardware", amount: 180 },
    { label: "Glass Options", amount: 0 },
    { label: "Labor", amount: 450 },
  ]

  const subtotal = priceBreakdown.reduce((sum, item) => sum + item.amount, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Price Estimate</CardTitle>
          <CardDescription>Real-time pricing breakdown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {priceBreakdown.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">${item.amount.toLocaleString()}</span>
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
            <span className="text-2xl font-bold text-accent">${total.toLocaleString()}</span>
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
              <span className="font-medium">$250</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
