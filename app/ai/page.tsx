"use client"

import { useState } from "react"
import { AIChatAssistant } from "@/components/ai/ai-chat-assistant"
import { DocumentAnalyzer } from "@/components/ai/document-analyzer"
import { PredictiveInsights } from "@/components/ai/predictive-insights"
import { SmartRecommendations } from "@/components/ai/smart-recommendations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AIPage() {
  const [insights] = useState([
    {
      id: "1",
      type: "opportunity" as const,
      title: "High-Value Lead Detected",
      description: "ABC Construction has viewed your quote 3 times in the past week. Consider following up.",
      confidence: 87,
      impact: "high" as const,
    },
    {
      id: "2",
      type: "risk" as const,
      title: "Project Delay Risk",
      description: "Project #1234 is 15% behind schedule. Resource reallocation recommended.",
      confidence: 92,
      impact: "high" as const,
    },
    {
      id: "3",
      type: "trend" as const,
      title: "Seasonal Demand Increase",
      description: "Historical data shows 30% increase in door installations during Q2.",
      confidence: 95,
      impact: "medium" as const,
    },
  ])

  const [recommendations] = useState([
    {
      id: "1",
      title: "Optimize Pricing Strategy",
      description: "Your quotes are 12% higher than market average. Consider adjusting pricing for standard doors.",
      action: "Review Pricing",
      priority: 9,
    },
    {
      id: "2",
      title: "Follow Up on Stale Leads",
      description: "You have 8 leads with no activity in 30+ days. Automated follow-up recommended.",
      action: "Send Follow-ups",
      priority: 7,
    },
    {
      id: "3",
      title: "Inventory Restock Alert",
      description: "Standard door hinges are running low. Reorder recommended to avoid delays.",
      action: "Reorder Inventory",
      priority: 8,
    },
  ])

  const handleSendMessage = async (message: string) => {
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) throw new Error("Chat request failed")

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error("[v0] Chat error:", error)
      return "I apologize, but I'm having trouble connecting right now. Please try again."
    }
  }

  const handleAnalyzeDocument = async (file: File) => {
    try {
      // Read file content
      const text = await file.text()

      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_text: text }),
      })

      if (!response.ok) throw new Error("Analysis request failed")

      return await response.json()
    } catch (error) {
      console.error("[v0] Analysis error:", error)
      throw error
    }
  }

  const handleApplyRecommendation = (id: string) => {
    console.log("[v0] Applying recommendation:", id)
    // In production, implement recommendation actions
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">Leverage AI to enhance your business operations</p>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList>
          <TabsTrigger value="chat">Chat Assistant</TabsTrigger>
          <TabsTrigger value="analyze">Document Analyzer</TabsTrigger>
          <TabsTrigger value="insights">Predictive Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <AIChatAssistant onSendMessage={handleSendMessage} />
        </TabsContent>

        <TabsContent value="analyze">
          <DocumentAnalyzer onAnalyze={handleAnalyzeDocument} />
        </TabsContent>

        <TabsContent value="insights">
          <PredictiveInsights insights={insights} />
        </TabsContent>

        <TabsContent value="recommendations">
          <SmartRecommendations recommendations={recommendations} onApply={handleApplyRecommendation} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
