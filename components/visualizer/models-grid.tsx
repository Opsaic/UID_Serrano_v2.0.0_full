import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Cable as Cube, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function ModelsGrid() {
  const supabase = await createClient()

  const { data: models } = await supabase.from("models").select("*").order("created_at", { ascending: false })

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {models && models.length > 0 ? (
        models.map((model) => (
          <Card key={model.id} className="overflow-hidden">
            <div className="aspect-video bg-muted/20 flex items-center justify-center border-b border-border">
              {model.thumbnail_url ? (
                <img
                  src={model.thumbnail_url || "/placeholder.svg"}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Cube className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {model.description || "No description"}
                  </CardDescription>
                </div>
                {model.category && <Badge variant="secondary">{model.category}</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {model.file_size ? `${(model.file_size / 1024 / 1024).toFixed(2)} MB` : "Unknown size"}
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/visualizer/${model.id}`}>
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <Cube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No 3D models yet</p>
          <Button asChild>
            <Link href="/visualizer/upload">Upload your first model</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
