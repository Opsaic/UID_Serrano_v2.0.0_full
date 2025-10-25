import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType = "success" | "warning" | "error" | "info" | "default"

interface StatusBadgeProps {
  status: string
  type?: StatusType
  className?: string
}

const statusColors: Record<StatusType, string> = {
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  default: "",
}

export function StatusBadge({ status, type = "default", className }: StatusBadgeProps) {
  return (
    <Badge
      variant={type === "default" ? "default" : "secondary"}
      className={cn(type !== "default" && statusColors[type], className)}
    >
      {status}
    </Badge>
  )
}
