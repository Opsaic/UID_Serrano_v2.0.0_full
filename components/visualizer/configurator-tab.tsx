"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Cable as Cube, Save } from "lucide-react"

export function ConfiguratorTab() {
  const { toast } = useToast()
  const [config, setConfig] = useState({
    doorType: "single",
    width: 36,
    height: 80,
    material: "wood",
    finish: "natural",
    hardware: "brushed_nickel",
    glass: "none",
  })

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Your door configuration has been saved successfully",
    })
  }

  const calculatePrice = () => {
    let basePrice = 500
    if (config.doorType === "double") basePrice *= 1.8
    if (config.material === "steel") basePrice *= 1.3
    if (config.material === "fiberglass") basePrice *= 1.5
    if (config.glass !== "none") basePrice += 200
    return basePrice.toFixed(2)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Door Configuration</CardTitle>
            <CardDescription>Customize your door specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="doorType">Door Type</Label>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (inches): {config.width}"</Label>
                <Slider
                  value={[config.width]}
                  onValueChange={(value) => setConfig({ ...config, width: value[0] })}
                  min={24}
                  max={48}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (inches): {config.height}"</Label>
                <Slider
                  value={[config.height]}
                  onValueChange={(value) => setConfig({ ...config, height: value[0] })}
                  min={72}
                  max={96}
                  step={1}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Select value={config.material} onValueChange={(value) => setConfig({ ...config, material: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wood">Wood</SelectItem>
                  <SelectItem value="steel">Steel</SelectItem>
                  <SelectItem value="fiberglass">Fiberglass</SelectItem>
                  <SelectItem value="aluminum">Aluminum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="finish">Finish</Label>
              <Select value={config.finish} onValueChange={(value) => setConfig({ ...config, finish: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="stained">Stained</SelectItem>
                  <SelectItem value="painted_white">Painted White</SelectItem>
                  <SelectItem value="painted_black">Painted Black</SelectItem>
                  <SelectItem value="powder_coated">Powder Coated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hardware">Hardware</Label>
              <Select value={config.hardware} onValueChange={(value) => setConfig({ ...config, hardware: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brushed_nickel">Brushed Nickel</SelectItem>
                  <SelectItem value="oil_rubbed_bronze">Oil Rubbed Bronze</SelectItem>
                  <SelectItem value="polished_chrome">Polished Chrome</SelectItem>
                  <SelectItem value="matte_black">Matte Black</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="glass">Glass Options</Label>
              <Select value={config.glass} onValueChange={(value) => setConfig({ ...config, glass: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Glass</SelectItem>
                  <SelectItem value="clear">Clear Glass</SelectItem>
                  <SelectItem value="frosted">Frosted Glass</SelectItem>
                  <SelectItem value="decorative">Decorative Glass</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Estimated Price:</span>
                <span className="text-2xl font-bold text-green-600">${calculatePrice()}</span>
              </div>
              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>3D Preview</CardTitle>
            <CardDescription>Interactive 3D visualization of your door</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <Cube className="h-16 w-16 text-slate-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-slate-700">3D Viewer</p>
                  <p className="text-sm text-slate-500">Three.js integration coming soon</p>
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <p>Type: {config.doorType}</p>
                  <p>
                    Size: {config.width}" × {config.height}"
                  </p>
                  <p>Material: {config.material}</p>
                  <p>Finish: {config.finish.replace("_", " ")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AR Preview</CardTitle>
            <CardDescription>View in augmented reality</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent" disabled>
              Launch AR View
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">AR functionality coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
