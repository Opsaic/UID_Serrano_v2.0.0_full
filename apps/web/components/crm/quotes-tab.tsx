"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, FileText, DollarSign, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Quote {
  id: string
  quote_number: string
  title: string
  description?: string
  total?: number
  status: string
  valid_until?: string
  created_at: string
}

export function QuotesTab() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtotal: "",
    tax_rate: "8.5",
    valid_until: "",
  })

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/crm/quotes")
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load quotes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const subtotal = Number.parseFloat(formData.subtotal) || 0
      const taxRate = Number.parseFloat(formData.tax_rate) || 0
      const taxAmount = (subtotal * taxRate) / 100
      const total = subtotal + taxAmount

      const response = await fetch("/api/crm/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          subtotal,
          tax_rate: taxRate,
          tax_amount: taxAmount,
          total,
          valid_until: formData.valid_until || null,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Quote created successfully",
        })
        setDialogOpen(false)
        setFormData({
          title: "",
          description: "",
          subtotal: "",
          tax_rate: "8.5",
          valid_until: "",
        })
        fetchQuotes()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create quote",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "bg-gray-100 text-gray-700",
      sent: "bg-blue-100 text-blue-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      expired: "bg-orange-100 text-orange-700",
    }
    return colors[status] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quotes</h2>
          <p className="text-sm text-muted-foreground">Manage quotes and proposals</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Quote
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Quote</DialogTitle>
              <DialogDescription>Generate a new quote for a client</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quote Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtotal">Subtotal ($) *</Label>
                  <Input
                    id="subtotal"
                    type="number"
                    step="0.01"
                    value={formData.subtotal}
                    onChange={(e) => setFormData({ ...formData, subtotal: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                  <Input
                    id="tax_rate"
                    type="number"
                    step="0.01"
                    value={formData.tax_rate}
                    onChange={(e) => setFormData({ ...formData, tax_rate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valid_until">Valid Until</Label>
                  <Input
                    id="valid_until"
                    type="date"
                    value={formData.valid_until}
                    onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Quote</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading quotes...</div>
      ) : quotes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No quotes yet. Create your first quote to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote) => (
            <Card key={quote.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {quote.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {quote.quote_number} • {quote.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quote.total && (
                  <div className="flex items-center gap-2 text-lg font-semibold text-green-600">
                    <DollarSign className="h-5 w-5" />
                    {quote.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                )}
                {quote.valid_until && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Valid until {new Date(quote.valid_until).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="pt-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(quote.status)}`}
                  >
                    {quote.status === "accepted" && <CheckCircle className="mr-1 h-3 w-3" />}
                    {quote.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
