import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, Calculator } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "New Project",
      description: "Start a new custom door project",
      icon: Plus,
      href: "/projects/new",
    },
    {
      title: "Create Quote",
      description: "Generate a quote for a client",
      icon: FileText,
      href: "/crm/quotes/new",
    },
    {
      title: "Add Contact",
      description: "Add a new client or lead",
      icon: Users,
      href: "/crm/contacts/new",
    },
    {
      title: "Door Estimator",
      description: "Configure and price a door",
      icon: Calculator,
      href: "/estimator",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks to get you started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto flex-col items-start p-4 text-left bg-transparent"
                asChild
              >
                <Link href={action.href}>
                  <Icon className="h-5 w-5 mb-2 text-accent" />
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs text-muted-foreground font-normal mt-1">{action.description}</div>
                </Link>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
