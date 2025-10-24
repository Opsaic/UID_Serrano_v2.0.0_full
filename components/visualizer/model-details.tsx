import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, Share2, Edit } from "lucide-react"
import Link from "next/link"

export function ModelDetails({ model }: { model: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Model Details</CardTitle>
          <CardDescription>Information and specifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <Badge variant="secondary">{model.category || "Uncategorized"}</Badge>
            </div>

            {model.dimensions && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dimensions</span>
                <span className="font-medium">
                  {model.dimensions.width} x {model.dimensions.height} x {model.dimensions.depth}
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">File Size</span>
              <span className="font-medium">
                {model.file_size ? `${(model.file_size / 1024 / 1024).toFixed(2)} MB` : "Unknown"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Public</span>
              <Badge variant={model.is_public ? "default" : "secondary"}>{model.is_public ? "Yes" : "No"}</Badge>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <Button className="w-full">
              <Download className="h-4 w-4" />
              Download Model
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href={`/visualizer/${model.id}/edit`}>
                <Edit className="h-4 w-4" />
                Edit Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {model.tags && model.tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {model.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
