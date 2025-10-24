import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvoicesTable } from "@/components/accounting/invoices-table"
import { PaymentsTable } from "@/components/accounting/payments-table"
import { ExpensesTable } from "@/components/accounting/expenses-table"
import { AccountingStats } from "@/components/accounting/accounting-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AccountingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
          <p className="text-muted-foreground mt-2">Manage invoices, payments, and expenses</p>
        </div>
        <Button asChild>
          <Link href="/accounting/invoices/new">
            <Plus className="h-4 w-4" />
            New Invoice
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <AccountingStats />
      </Suspense>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-6">
          <Suspense fallback={<div>Loading invoices...</div>}>
            <InvoicesTable />
          </Suspense>
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <Suspense fallback={<div>Loading payments...</div>}>
            <PaymentsTable />
          </Suspense>
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <Suspense fallback={<div>Loading expenses...</div>}>
            <ExpensesTable />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
