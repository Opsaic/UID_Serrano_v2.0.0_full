"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Box, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

interface Model {
  id: string
  name: string
  description?: string
  category: string
  src: string
  thumbnail_url?: string
  created_at: string
}

export function ModelsTab() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "door",
    src: "",
  })

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      const response = await fetch("/api/models")
      const data = await response.json()
      setModels(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load 3D models",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "3D model added successfully",
        })
        setDialogOpen(false)
        setFormData({
          name: "",
          description: "",
          category: "door",
          src: "",
        })
        fetchModels()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add 3D model",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">3D Models Library</h2>
          <p className="text-sm text-muted-foreground">Manage 3D door models for visualization</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Model
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add 3D Model</DialogTitle>
              <DialogDescription>Upload a new 3D door model</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Model Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="door">Door</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="frame">Frame</SelectItem>
                      <SelectItem value="accessory">Accessory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="src">Model URL *</Label>
                  <Input
                    id="src"
                    placeholder="https://example.com/model.glb"
                    value={formData.src}
                    onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Model</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading 3D models...</div>
      ) : models.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Box className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No 3D models yet. Add your first model to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <Card key={model.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mb-4">
                  {model.thumbnail_url ? (
                    <img
                      src={model.thumbnail_url || "/placeholder.svg"}
                      alt={model.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Box className="h-16 w-16 text-slate-400" />
                  )}
                </div>
                <CardTitle className="flex items-center gap-2">
                  <Box className="h-5 w-5" />
                  {model.name}
                </CardTitle>
                <CardDescription>{model.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{model.description || "No description"}</p>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  View Model
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
