"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DocumentAnalyzerProps {
  onAnalyze: (file: File) => Promise<any>
}

export function DocumentAnalyzer({ onAnalyze }: DocumentAnalyzerProps) {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!file) return

    setAnalyzing(true)
    try {
      const analysis = await onAnalyze(file)
      setResult(analysis)
    } catch (error) {
      console.error("[v0] Document analysis error:", error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Document Analyzer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="document">Upload Document</Label>
          <Input
            id="document"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <Button onClick={handleAnalyze} disabled={!file || analyzing} className="w-full">
          {analyzing ? "Analyzing..." : "Analyze Document"}
        </Button>

        {result && (
          <div className="space-y-3 p-4 border rounded-lg">
            <div>
              <div className="font-semibold">Document Type</div>
              <div className="text-sm text-muted-foreground">{result.type}</div>
            </div>
            <div>
              <div className="font-semibold">Key Information</div>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                {result.key_info?.map((info: string, i: number) => (
                  <li key={i}>{info}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold">Summary</div>
              <div className="text-sm text-muted-foreground">{result.summary}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
