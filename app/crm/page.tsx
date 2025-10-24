import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadsTable } from "@/components/crm/leads-table"
import { CompaniesTable } from "@/components/crm/companies-table"
import { OpportunitiesTable } from "@/components/crm/opportunities-table"
import { QuotesTable } from "@/components/crm/quotes-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CRMPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
          <p className="text-muted-foreground mt-2">Manage your leads, companies, opportunities, and quotes</p>
        </div>
        <Button asChild>
          <Link href="/crm/leads/new">
            <Plus className="h-4 w-4" />
            New Lead
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="mt-6">
          <Suspense fallback={<div>Loading leads...</div>}>
            <LeadsTable />
          </Suspense>
        </TabsContent>

        <TabsContent value="companies" className="mt-6">
          <Suspense fallback={<div>Loading companies...</div>}>
            <CompaniesTable />
          </Suspense>
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6">
          <Suspense fallback={<div>Loading opportunities...</div>}>
            <OpportunitiesTable />
          </Suspense>
        </TabsContent>

        <TabsContent value="quotes" className="mt-6">
          <Suspense fallback={<div>Loading quotes...</div>}>
            <QuotesTable />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
