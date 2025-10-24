"use client"

import { Navigation } from "@/components/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelsTab } from "@/components/visualizer/models-tab"
import { ConfiguratorTab } from "@/components/visualizer/configurator-tab"
import { ARSessionsTab } from "@/components/visualizer/ar-sessions-tab"

export default function VisualizerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">3D Visualization & AR</h1>
          <p className="mt-2 text-muted-foreground">Configure and visualize custom doors in 3D and AR</p>
        </div>

        <Tabs defaultValue="configurator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="configurator">Configurator</TabsTrigger>
            <TabsTrigger value="models">3D Models</TabsTrigger>
            <TabsTrigger value="ar-sessions">AR Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="configurator">
            <ConfiguratorTab />
          </TabsContent>

          <TabsContent value="models">
            <ModelsTab />
          </TabsContent>

          <TabsContent value="ar-sessions">
            <ARSessionsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
