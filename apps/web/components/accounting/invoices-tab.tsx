"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, FileText, DollarSign, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface Invoice {
  id: string
  invoice_number: string
  issue_date: string
  due_date: string
  total: number
  amount_paid: number
  amount_due: number
  status: string
  created_at: string
}

export function InvoicesTab() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    issue_date: new Date().toISOString().split("T")[0],
    due_date: "",
    subtotal: "",
    tax_rate: "8.5",
  })

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await fetch("/api/invoices")
      const data = await response.json()
      setInvoices(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load invoices",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const subtotal = Number.parseFloat(formData.subtotal)
      const taxRate = Number.parseFloat(formData.tax_rate)
      const taxAmount = (subtotal * taxRate) / 100
      const total = subtotal + taxAmount

      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issue_date: formData.issue_date,
          due_date: formData.due_date,
          subtotal,
          tax_rate: taxRate,
          tax_amount: taxAmount,
          total,
          amount_paid: 0,
          amount_due: total,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Invoice created successfully",
        })
        setDialogOpen(false)
        setFormData({
          issue_date: new Date().toISOString().split("T")[0],
          due_date: "",
          subtotal: "",
          tax_rate: "8.5",
        })
        fetchInvoices()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "bg-gray-100 text-gray-700",
      sent: "bg-blue-100 text-blue-700",
      paid: "bg-green-100 text-green-700",
      overdue: "bg-red-100 text-red-700",
      partial: "bg-yellow-100 text-yellow-700",
    }
    return colors[status] || "bg-gray-100 text-gray-700"
  }

  const isOverdue = (dueDate: string, status: string) => {
    return status !== "paid" && new Date(dueDate) < new Date()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-sm text-muted-foreground">Manage customer invoices and billing</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>Generate a new invoice for a client</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issue_date">Issue Date *</Label>
                    <Input
                      id="issue_date"
                      type="date"
                      value={formData.issue_date}
                      onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due_date">Due Date *</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                      required
                    />
                  </div>
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
              </div>
              <DialogFooter>
                <Button type="submit">Create Invoice</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading invoices...</div>
      ) : invoices.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No invoices yet. Create your first invoice to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {invoice.invoice_number}
                </CardTitle>
                <CardDescription>Issued {new Date(invoice.issue_date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-2xl font-bold text-green-600">
                  <DollarSign className="h-6 w-6" />
                  {invoice.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                {invoice.amount_paid > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Paid: ${invoice.amount_paid.toLocaleString(undefined, { minimumFractionDigits: 2 })} | Due: $
                    {invoice.amount_due.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Due {new Date(invoice.due_date).toLocaleDateString()}</span>
                  {isOverdue(invoice.due_date, invoice.status) && <AlertCircle className="h-4 w-4 text-red-500" />}
                </div>
                <div className="pt-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(invoice.status)}`}
                  >
                    {invoice.status}
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
