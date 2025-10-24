import { Suspense } from "react"
import { ModelsGrid } from "@/components/visualizer/models-grid"
import { ARSessionsTable } from "@/components/visualizer/ar-sessions-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import Link from "next/link"

export default function VisualizerPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">3D Visualizer</h1>
          <p className="text-muted-foreground mt-2">View 3D models and manage AR sessions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/visualizer/upload">
              <Upload className="h-4 w-4" />
              Upload Model
            </Link>
          </Button>
          <Button asChild>
            <Link href="/visualizer/ar/new">
              <Plus className="h-4 w-4" />
              New AR Session
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList>
          <TabsTrigger value="models">3D Models</TabsTrigger>
          <TabsTrigger value="ar-sessions">AR Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="mt-6">
          <Suspense fallback={<div>Loading models...</div>}>
            <ModelsGrid />
          </Suspense>
        </TabsContent>

        <TabsContent value="ar-sessions" className="mt-6">
          <Suspense fallback={<div>Loading AR sessions...</div>}>
            <ARSessionsTable />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
