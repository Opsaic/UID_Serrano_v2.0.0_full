"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface QuoteGeneratorProps {
  estimateData: any
  onGenerate: (quote: any) => void
}

export function QuoteGenerator({ estimateData, onGenerate }: QuoteGeneratorProps) {
  const [quoteData, setQuoteData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    project_name: "",
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    terms: "Payment due within 30 days. 50% deposit required to begin work.",
    notes: "",
  })

  const handleGenerate = () => {
    onGenerate({
      ...quoteData,
      ...estimateData,
      quote_number: `Q-${Date.now()}`,
      created_at: new Date().toISOString(),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Quote</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client_name">Client Name</Label>
            <Input
              id="client_name"
              value={quoteData.client_name}
              onChange={(e) => setQuoteData({ ...quoteData, client_name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="project_name">Project Name</Label>
            <Input
              id="project_name"
              value={quoteData.project_name}
              onChange={(e) => setQuoteData({ ...quoteData, project_name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="client_email">Client Email</Label>
            <Input
              id="client_email"
              type="email"
              value={quoteData.client_email}
              onChange={(e) => setQuoteData({ ...quoteData, client_email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="client_phone">Client Phone</Label>
            <Input
              id="client_phone"
              type="tel"
              value={quoteData.client_phone}
              onChange={(e) => setQuoteData({ ...quoteData, client_phone: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="valid_until">Valid Until</Label>
          <Input
            id="valid_until"
            type="date"
            value={quoteData.valid_until}
            onChange={(e) => setQuoteData({ ...quoteData, valid_until: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="terms">Terms & Conditions</Label>
          <Textarea
            id="terms"
            value={quoteData.terms}
            onChange={(e) => setQuoteData({ ...quoteData, terms: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={quoteData.notes}
            onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
            rows={2}
          />
        </div>

        <Button onClick={handleGenerate} className="w-full">
          Generate Quote
        </Button>
      </CardContent>
    </Card>
  )
}
