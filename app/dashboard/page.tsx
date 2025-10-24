"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  DollarSign,
  Box,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    activeProjects: 12,
    pendingQuotes: 8,
    revenue: 284500,
    completionRate: 94,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Welcome back to UID Serrano</p>
            </div>
            <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-xl">
                <FolderKanban className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.activeProjects}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Active Projects</p>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-xl">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                Pending
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.pendingQuotes}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Pending Quotes</p>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950 rounded-xl">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8%
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">${(stats.revenue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Revenue</p>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-violet-50 dark:bg-violet-950 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <span className="text-xs font-medium text-violet-600 dark:text-violet-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2%
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.completionRate}%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Completion Rate</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/estimator" className="group">
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 border-0 hover:shadow-xl transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Box className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Door Estimator</h3>
              <p className="text-sm text-blue-100">Create custom door quotes with AR visualization</p>
            </Card>
          </Link>

          <Link href="/crm" className="group">
            <Card className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 hover:shadow-xl transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">CRM</h3>
              <p className="text-sm text-emerald-100">Manage clients, leads, and opportunities</p>
            </Card>
          </Link>

          <Link href="/projects" className="group">
            <Card className="p-6 bg-gradient-to-br from-violet-500 to-violet-600 border-0 hover:shadow-xl transition-all hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Projects</h3>
              <p className="text-sm text-violet-100">Track project progress and timelines</p>
            </Card>
          </Link>
        </div>

        {/* Recent Activity & Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                {
                  action: "New quote created",
                  project: "Luxury Residence - Oak Doors",
                  time: "2 hours ago",
                  status: "success",
                },
                {
                  action: "Project milestone completed",
                  project: "Commercial Building Phase 2",
                  time: "5 hours ago",
                  status: "success",
                },
                { action: "Payment received", project: "Modern Villa Project", time: "1 day ago", status: "success" },
                {
                  action: "Quote pending approval",
                  project: "Hotel Renovation",
                  time: "2 days ago",
                  status: "pending",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
                >
                  <div
                    className={`p-2 rounded-lg ${item.status === "success" ? "bg-green-50 dark:bg-green-950" : "bg-amber-50 dark:bg-amber-950"}`}
                  >
                    {item.status === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{item.action}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{item.project}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Links */}
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "3D Visualizer", href: "/visualizer", icon: Box },
                { label: "Accounting", href: "/accounting", icon: DollarSign },
                { label: "Settings", href: "/settings", icon: LayoutDashboard },
              ].map((link, i) => (
                <Link key={i} href={link.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <link.icon className="w-4 h-4 mr-3" />
                    {link.label}
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
