"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface ARControlsProps {
  modelId: string
  onStartAR: () => void
  onStopAR: () => void
}

export function ARControls({ modelId, onStartAR, onStopAR }: ARControlsProps) {
  const [isARActive, setIsARActive] = useState(false)
  const [scale, setScale] = useState([1])
  const [rotation, setRotation] = useState([0])

  const handleStartAR = () => {
    setIsARActive(true)
    onStartAR()
  }

  const handleStopAR = () => {
    setIsARActive(false)
    onStopAR()
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">AR Controls</h3>
          {!isARActive ? (
            <Button onClick={handleStartAR}>Start AR</Button>
          ) : (
            <Button variant="destructive" onClick={handleStopAR}>
              Stop AR
            </Button>
          )}
        </div>

        {isARActive && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Scale</label>
              <Slider value={scale} onValueChange={setScale} min={0.1} max={3} step={0.1} />
              <span className="text-xs text-muted-foreground">{scale[0]}x</span>
            </div>

            <div>
              <label className="text-sm font-medium">Rotation</label>
              <Slider value={rotation} onValueChange={setRotation} min={0} max={360} step={1} />
              <span className="text-xs text-muted-foreground">{rotation[0]}°</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                Reset Position
              </Button>
              <Button variant="outline" size="sm">
                Take Screenshot
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
