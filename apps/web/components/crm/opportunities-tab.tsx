"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Target, DollarSign, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface Opportunity {
  id: string
  name: string
  description?: string
  value?: number
  stage: string
  probability: number
  expected_close_date?: string
  status: string
  created_at: string
}

export function OpportunitiesTab() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    value: "",
    stage: "qualification",
    probability: "25",
    expected_close_date: "",
  })

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    try {
      const response = await fetch("/api/crm/opportunities")
      const data = await response.json()
      setOpportunities(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load opportunities",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/crm/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          value: formData.value ? Number.parseFloat(formData.value) : null,
          probability: Number.parseInt(formData.probability),
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Opportunity created successfully",
        })
        setDialogOpen(false)
        setFormData({
          name: "",
          description: "",
          value: "",
          stage: "qualification",
          probability: "25",
          expected_close_date: "",
        })
        fetchOpportunities()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create opportunity",
        variant: "destructive",
      })
    }
  }

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      qualification: "bg-blue-100 text-blue-700",
      proposal: "bg-purple-100 text-purple-700",
      negotiation: "bg-yellow-100 text-yellow-700",
      closed_won: "bg-green-100 text-green-700",
      closed_lost: "bg-red-100 text-red-700",
    }
    return colors[stage] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Opportunities</h2>
          <p className="text-sm text-muted-foreground">Track sales opportunities and pipeline</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Opportunity</DialogTitle>
              <DialogDescription>Create a new sales opportunity</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Opportunity Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <Label htmlFor="value">Value ($)</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualification">Qualification</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="closed_won">Closed Won</SelectItem>
                      <SelectItem value="closed_lost">Closed Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="probability">Probability (%)</Label>
                  <Input
                    id="probability"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.probability}
                    onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expected_close_date">Expected Close Date</Label>
                  <Input
                    id="expected_close_date"
                    type="date"
                    value={formData.expected_close_date}
                    onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Opportunity</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading opportunities...</div>
      ) : opportunities.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No opportunities yet. Add your first opportunity to start tracking.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => (
            <Card key={opp.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {opp.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">{opp.description || "No description"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {opp.value && (
                  <div className="flex items-center gap-2 text-lg font-semibold text-green-600">
                    <DollarSign className="h-5 w-5" />
                    {opp.value.toLocaleString()}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span>{opp.probability}% probability</span>
                </div>
                {opp.expected_close_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(opp.expected_close_date).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="pt-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStageColor(opp.stage)}`}
                  >
                    {opp.stage.replace("_", " ")}
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
