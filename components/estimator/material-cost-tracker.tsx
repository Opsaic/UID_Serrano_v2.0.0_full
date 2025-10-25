"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Material {
  id: string
  name: string
  quantity: number
  unit: string
  unit_cost: number
  total_cost: number
}

interface MaterialCostTrackerProps {
  onUpdate: (materials: Material[]) => void
}

export function MaterialCostTracker({ onUpdate }: MaterialCostTrackerProps) {
  const [materials, setMaterials] = useState<Material[]>([
    { id: "1", name: "Steel Frame", quantity: 1, unit: "unit", unit_cost: 200, total_cost: 200 },
    { id: "2", name: "Hardware Kit", quantity: 1, unit: "set", unit_cost: 150, total_cost: 150 },
  ])

  const updateMaterial = (id: string, field: string, value: any) => {
    const updated = materials.map((m) => {
      if (m.id === id) {
        const newMaterial = { ...m, [field]: value }
        if (field === "quantity" || field === "unit_cost") {
          newMaterial.total_cost = newMaterial.quantity * newMaterial.unit_cost
        }
        return newMaterial
      }
      return m
    })
    setMaterials(updated)
    onUpdate(updated)
  }

  const addMaterial = () => {
    const newMaterial = {
      id: Date.now().toString(),
      name: "",
      quantity: 1,
      unit: "unit",
      unit_cost: 0,
      total_cost: 0,
    }
    setMaterials([...materials, newMaterial])
  }

  const removeMaterial = (id: string) => {
    const updated = materials.filter((m) => m.id !== id)
    setMaterials(updated)
    onUpdate(updated)
  }

  const totalCost = materials.reduce((sum, m) => sum + m.total_cost, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Material Cost Tracker</span>
          <Button size="sm" onClick={addMaterial}>
            Add Material
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {materials.map((material) => (
          <div key={material.id} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-4">
              <Input
                placeholder="Material name"
                value={material.name}
                onChange={(e) => updateMaterial(material.id, "name", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Qty"
                value={material.quantity}
                onChange={(e) => updateMaterial(material.id, "quantity", Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Unit"
                value={material.unit}
                onChange={(e) => updateMaterial(material.id, "unit", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Unit $"
                value={material.unit_cost}
                onChange={(e) => updateMaterial(material.id, "unit_cost", Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="col-span-1">
              <Input type="number" value={material.total_cost.toFixed(2)} disabled />
            </div>
            <div className="col-span-1">
              <Button variant="ghost" size="sm" onClick={() => removeMaterial(material.id)}>
                ×
              </Button>
            </div>
          </div>
        ))}

        <div className="border-t pt-4 flex justify-between font-bold text-lg">
          <span>Total Material Cost:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
