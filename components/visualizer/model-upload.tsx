"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ModelUploadProps {
  onUpload: (data: any) => void
  onCancel: () => void
}

export function ModelUpload({ onUpload, onCancel }: ModelUploadProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "door",
    file_url: "",
    thumbnail_url: "",
    file_size: 0,
    format: "glb",
    tags: "",
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In production, upload to storage and get URL
      setFormData({
        ...formData,
        file_size: file.size,
        format: file.name.split(".").pop() || "glb",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpload({
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Model Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="door">Door</SelectItem>
            <SelectItem value="window">Window</SelectItem>
            <SelectItem value="hardware">Hardware</SelectItem>
            <SelectItem value="frame">Frame</SelectItem>
            <SelectItem value="accessory">Accessory</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="file">3D Model File (.glb, .gltf)</Label>
        <Input id="file" type="file" accept=".glb,.gltf" onChange={handleFileChange} required />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="modern, steel, commercial"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Upload Model</Button>
      </div>
    </form>
  )
}
