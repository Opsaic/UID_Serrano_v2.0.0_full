import { DoorConfigurator } from "@/components/estimator/door-configurator"
import { EstimatorSidebar } from "@/components/estimator/estimator-sidebar"

export default function EstimatorPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Door Estimator</h1>
        <p className="text-muted-foreground mt-2">Configure and price custom doors in real-time</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <DoorConfigurator />
        <EstimatorSidebar />
      </div>
    </div>
  )
}
