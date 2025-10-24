import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ModelViewer } from "@/components/visualizer/model-viewer"
import { ModelDetails } from "@/components/visualizer/model-details"

export default async function ModelViewerPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: model } = await supabase.from("models").select("*").eq("id", params.id).single()

  if (!model) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{model.name}</h1>
        <p className="text-muted-foreground mt-2">{model.description || "No description"}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <ModelViewer model={model} />
        <ModelDetails model={model} />
      </div>
    </div>
  )
}
