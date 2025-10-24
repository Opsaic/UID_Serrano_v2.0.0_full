"use client"
import { Navigation } from "@/components/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompaniesTab } from "@/components/crm/companies-tab"
import { LeadsTab } from "@/components/crm/leads-tab"
import { OpportunitiesTab } from "@/components/crm/opportunities-tab"
import { QuotesTab } from "@/components/crm/quotes-tab"

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">CRM & Order Intake</h1>
          <p className="mt-2 text-muted-foreground">Manage clients, leads, opportunities, and quotes</p>
        </div>

        <Tabs defaultValue="companies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
          </TabsList>

          <TabsContent value="companies">
            <CompaniesTab />
          </TabsContent>

          <TabsContent value="leads">
            <LeadsTab />
          </TabsContent>

          <TabsContent value="opportunities">
            <OpportunitiesTab />
          </TabsContent>

          <TabsContent value="quotes">
            <QuotesTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
