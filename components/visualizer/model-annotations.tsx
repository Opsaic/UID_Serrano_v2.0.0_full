"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface Annotation {
  id: string
  position: { x: number; y: number; z: number }
  label: string
  description: string
}

interface ModelAnnotationsProps {
  modelId: string
  annotations: Annotation[]
  onAddAnnotation: (annotation: Omit<Annotation, "id">) => void
  onDeleteAnnotation: (id: string) => void
}

export function ModelAnnotations({ modelId, annotations, onAddAnnotation, onDeleteAnnotation }: ModelAnnotationsProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newAnnotation, setNewAnnotation] = useState({
    label: "",
    description: "",
    position: { x: 0, y: 0, z: 0 },
  })

  const handleAdd = () => {
    onAddAnnotation(newAnnotation)
    setNewAnnotation({ label: "", description: "", position: { x: 0, y: 0, z: 0 } })
    setIsAdding(false)
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Annotations</h3>
          <Button size="sm" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? "Cancel" : "Add Annotation"}
          </Button>
        </div>

        {isAdding && (
          <div className="space-y-2 p-3 border rounded-lg">
            <Input
              placeholder="Label"
              value={newAnnotation.label}
              onChange={(e) => setNewAnnotation({ ...newAnnotation, label: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newAnnotation.description}
              onChange={(e) => setNewAnnotation({ ...newAnnotation, description: e.target.value })}
            />
            <Button size="sm" onClick={handleAdd} className="w-full">
              Save Annotation
            </Button>
          </div>
        )}

        <div className="space-y-2">
          {annotations.map((annotation) => (
            <div key={annotation.id} className="p-3 border rounded-lg flex justify-between items-start">
              <div>
                <div className="font-medium">{annotation.label}</div>
                <div className="text-sm text-muted-foreground">{annotation.description}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onDeleteAnnotation(annotation.id)}>
                ×
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
