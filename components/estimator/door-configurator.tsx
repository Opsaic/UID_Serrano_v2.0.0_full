"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DoorConfigurator() {
  const [config, setConfig] = useState({
    doorType: "single",
    width: "36",
    height: "80",
    material: "wood",
    finish: "natural",
    hardware: "standard",
    glass: "none",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Door Configuration</CardTitle>
        <CardDescription>Customize your door specifications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="glass">Glass</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="doorType">Door Type</Label>
                <Select value={config.doorType} onValueChange={(value) => setConfig({ ...config, doorType: value })}>
                  <SelectTrigger id="doorType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Door</SelectItem>
                    <SelectItem value="double">Double Door</SelectItem>
                    <SelectItem value="sliding">Sliding Door</SelectItem>
                    <SelectItem value="bifold">Bi-fold Door</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="width">Width (inches)</Label>
                <Input
                  id="width"
                  type="number"
                  value={config.width}
                  onChange={(e) => setConfig({ ...config, width: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (inches)</Label>
                <Input
                  id="height"
                  type="number"
                  value={config.height}
                  onChange={(e) => setConfig({ ...config, height: e.target.value })}
                />
              </div>
            </div>

            <div className="aspect-video rounded-lg border border-border bg-muted/20 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-lg font-medium mb-2">Door Preview</p>
                <p className="text-sm">
                  {config.doorType} - {config.width}" x {config.height}"
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Select value={config.material} onValueChange={(value) => setConfig({ ...config, material: value })}>
                  <SelectTrigger id="material">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wood">Solid Wood</SelectItem>
                    <SelectItem value="steel">Steel</SelectItem>
                    <SelectItem value="fiberglass">Fiberglass</SelectItem>
                    <SelectItem value="aluminum">Aluminum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="finish">Finish</Label>
                <Select value={config.finish} onValueChange={(value) => setConfig({ ...config, finish: value })}>
                  <SelectTrigger id="finish">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Natural</SelectItem>
                    <SelectItem value="stained">Stained</SelectItem>
                    <SelectItem value="painted">Painted</SelectItem>
                    <SelectItem value="powder-coated">Powder Coated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hardware" className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="hardware">Hardware Package</Label>
              <Select value={config.hardware} onValueChange={(value) => setConfig({ ...config, hardware: value })}>
                <SelectTrigger id="hardware">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="glass" className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="glass">Glass Options</Label>
              <Select value={config.glass} onValueChange={(value) => setConfig({ ...config, glass: value })}>
                <SelectTrigger id="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Glass</SelectItem>
                  <SelectItem value="clear">Clear Glass</SelectItem>
                  <SelectItem value="frosted">Frosted Glass</SelectItem>
                  <SelectItem value="decorative">Decorative Glass</SelectItem>
                  <SelectItem value="tempered">Tempered Glass</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
