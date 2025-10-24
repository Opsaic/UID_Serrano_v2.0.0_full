"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Cable as Cube } from "lucide-react"

export function ModelViewer({ model }: { model: any }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="aspect-video bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center rounded-lg">
          {model.src ? (
            <div className="text-center">
              <Cube className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">3D Model Viewer</p>
              <p className="text-xs text-muted-foreground mt-1">Interactive viewer coming soon</p>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              <Cube className="h-16 w-16 mx-auto mb-4" />
              <p>No model file available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
