import type { ReactNode } from "react"

export function DashboardShell({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-8">{children}</div>
}
