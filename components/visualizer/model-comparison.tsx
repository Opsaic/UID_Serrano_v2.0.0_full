"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Model {
  id: string
  name: string
  thumbnail_url: string
}

interface ModelComparisonProps {
  models: Model[]
}

export function ModelComparison({ models }: ModelComparisonProps) {
  const [model1, setModel1] = useState<string>("")
  const [model2, setModel2] = useState<string>("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare Models</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Model 1</label>
            <Select value={model1} onValueChange={setModel1}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Model 2</label>
            <Select value={model2} onValueChange={setModel2}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {model1 && model2 && (
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Model 1 Preview</span>
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">Model 2 Preview</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
