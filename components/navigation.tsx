"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, FileText, Settings, BarChart3, LogOut, User, Users, DollarSign, Cable as Cube } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navigation() {
  console.log("[v0] Navigation component rendering")

  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  console.log("[v0] Navigation - current pathname:", pathname)
  console.log("[v0] Navigation - user:", user ? user.email : "null")

  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/crm", label: "CRM", icon: Users },
    { href: "/estimator", label: "Estimator", icon: FileText },
    { href: "/projects", label: "Projects", icon: BarChart3 },
    { href: "/accounting", label: "Accounting", icon: DollarSign },
    { href: "/visualizer", label: "Visualizer", icon: Cube },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const handleNewEstimate = () => {
    console.log("[v0] Navigation - New Estimate clicked")
    router.push("/estimator")
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-semibold text-primary">
              Serrano
            </Link>
            <div className="hidden md:flex md:gap-6">
              {links.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleNewEstimate}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              New Estimate
            </button>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.user_metadata?.full_name || "User"}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
