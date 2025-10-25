"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Calculator,
  DollarSign,
  Cable as Cube,
  Settings,
  LogOut,
  Building2,
  FileText,
  BarChart3,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"

const navigation = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Business",
    items: [
      { name: "CRM", href: "/crm", icon: Users },
      { name: "Projects", href: "/projects", icon: FolderKanban },
      { name: "Estimator", href: "/estimator", icon: Calculator },
      { name: "Accounting", href: "/accounting", icon: DollarSign },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Visualizer", href: "/visualizer", icon: Cube },
      { name: "Documents", href: "/documents", icon: FileText },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, profile, signOut } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <Building2 className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">UID Serrano</span>
            <span className="text-xs text-muted-foreground">v6.0.0</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.href}>
                          <Icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut()}>
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {profile && (
          <div className="px-2 py-2 text-xs text-muted-foreground truncate">{profile.full_name || profile.email}</div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
