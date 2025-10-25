"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PricingCalculatorProps {
  onPriceChange: (price: number) => void
}

export function PricingCalculator({ onPriceChange }: PricingCalculatorProps) {
  const [config, setConfig] = useState({
    doorType: "single",
    material: "steel",
    finish: "powder_coat",
    hardware: "standard",
    installation: "basic",
    quantity: 1,
  })

  const basePrices = {
    doorType: { single: 500, double: 900, sliding: 1200 },
    material: { steel: 0, aluminum: 200, wood: 400, fiberglass: 300 },
    finish: { powder_coat: 0, anodized: 150, painted: 100, stained: 200 },
    hardware: { standard: 0, premium: 300, luxury: 600 },
    installation: { basic: 200, standard: 400, premium: 800 },
  }

  const calculatePrice = () => {
    const basePrice = basePrices.doorType[config.doorType as keyof typeof basePrices.doorType]
    const materialCost = basePrices.material[config.material as keyof typeof basePrices.material]
    const finishCost = basePrices.finish[config.finish as keyof typeof basePrices.finish]
    const hardwareCost = basePrices.hardware[config.hardware as keyof typeof basePrices.hardware]
    const installationCost = basePrices.installation[config.installation as keyof typeof basePrices.installation]

    const unitPrice = basePrice + materialCost + finishCost + hardwareCost + installationCost
    const totalPrice = unitPrice * config.quantity

    return { unitPrice, totalPrice }
  }

  const { unitPrice, totalPrice } = calculatePrice()

  useEffect(() => {
    onPriceChange(totalPrice)
  }, [totalPrice, onPriceChange])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Door Type</Label>
            <Select value={config.doorType} onValueChange={(value) => setConfig({ ...config, doorType: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Door</SelectItem>
                <SelectItem value="double">Double Door</SelectItem>
                <SelectItem value="sliding">Sliding Door</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Material</Label>
            <Select value={config.material} onValueChange={(value) => setConfig({ ...config, material: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="steel">Steel</SelectItem>
                <SelectItem value="aluminum">Aluminum</SelectItem>
                <SelectItem value="wood">Wood</SelectItem>
                <SelectItem value="fiberglass">Fiberglass</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Finish</Label>
            <Select value={config.finish} onValueChange={(value) => setConfig({ ...config, finish: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="powder_coat">Powder Coat</SelectItem>
                <SelectItem value="anodized">Anodized</SelectItem>
                <SelectItem value="painted">Painted</SelectItem>
                <SelectItem value="stained">Stained</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Hardware</Label>
            <Select value={config.hardware} onValueChange={(value) => setConfig({ ...config, hardware: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Installation</Label>
            <Select
              value={config.installation}
              onValueChange={(value) => setConfig({ ...config, installation: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              min="1"
              value={config.quantity}
              onChange={(e) => setConfig({ ...config, quantity: Number.parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Unit Price:</span>
            <span className="font-semibold">${unitPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total Price:</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
