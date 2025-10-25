"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InvoiceFormProps {
  invoice?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function InvoiceForm({ invoice, onSubmit, onCancel }: InvoiceFormProps) {
  const [formData, setFormData] = useState({
    invoice_number: invoice?.invoice_number || "",
    project_id: invoice?.project_id || "",
    company_id: invoice?.company_id || "",
    issue_date: invoice?.issue_date || new Date().toISOString().split("T")[0],
    due_date: invoice?.due_date || "",
    subtotal: invoice?.subtotal || 0,
    tax_amount: invoice?.tax_amount || 0,
    total_amount: invoice?.total_amount || 0,
    status: invoice?.status || "draft",
    notes: invoice?.notes || "",
    line_items: invoice?.line_items || [],
  })

  const [lineItems, setLineItems] = useState(
    invoice?.line_items || [{ description: "", quantity: 1, unit_price: 0, amount: 0 }],
  )

  const calculateTotals = (items: any[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0)
    const tax_amount = subtotal * 0.1 // 10% tax
    const total_amount = subtotal + tax_amount
    return { subtotal, tax_amount, total_amount }
  }

  const handleLineItemChange = (index: number, field: string, value: any) => {
    const newItems = [...lineItems]
    newItems[index] = { ...newItems[index], [field]: value }

    if (field === "quantity" || field === "unit_price") {
      newItems[index].amount = newItems[index].quantity * newItems[index].unit_price
    }

    setLineItems(newItems)
    const totals = calculateTotals(newItems)
    setFormData({ ...formData, ...totals, line_items: newItems })
  }

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, unit_price: 0, amount: 0 }])
  }

  const removeLineItem = (index: number) => {
    const newItems = lineItems.filter((_, i) => i !== index)
    setLineItems(newItems)
    const totals = calculateTotals(newItems)
    setFormData({ ...formData, ...totals, line_items: newItems })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="invoice_number">Invoice Number</Label>
          <Input
            id="invoice_number"
            value={formData.invoice_number}
            onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="issue_date">Issue Date</Label>
          <Input
            id="issue_date"
            type="date"
            value={formData.issue_date}
            onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            type="date"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Line Items</Label>
          <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
            Add Item
          </Button>
        </div>

        {lineItems.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-5">
              <Input
                placeholder="Description"
                value={item.description}
                onChange={(e) => handleLineItemChange(index, "description", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => handleLineItemChange(index, "quantity", Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Price"
                value={item.unit_price}
                onChange={(e) => handleLineItemChange(index, "unit_price", Number.parseFloat(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="Amount" value={item.amount} disabled />
            </div>
            <div className="col-span-1">
              <Button type="button" variant="ghost" size="sm" onClick={() => removeLineItem(index)}>
                ×
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${formData.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%):</span>
          <span>${formData.tax_amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${formData.total_amount.toFixed(2)}</span>
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{invoice ? "Update" : "Create"} Invoice</Button>
      </div>
    </form>
  )
}
