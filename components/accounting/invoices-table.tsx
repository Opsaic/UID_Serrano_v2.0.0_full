import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Eye, Download } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export async function InvoicesTable() {
  const supabase = await createClient()

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  // Fetch related companies if invoices exist
  const companiesMap = new Map()
  if (invoices && invoices.length > 0) {
    const companyIds = [...new Set(invoices.map((i) => i.company_id).filter(Boolean))]
    if (companyIds.length > 0) {
      const { data: companies } = await supabase.from("companies").select("id, name").in("id", companyIds)

      if (companies) {
        companies.forEach((c) => companiesMap.set(c.id, c))
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
        <CardDescription>Manage customer invoices and billing</CardDescription>
      </CardHeader>
      <CardContent>
        {invoices && invoices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                  <TableCell>{invoice.company_id ? companiesMap.get(invoice.company_id)?.name || "-" : "-"}</TableCell>
                  <TableCell>
                    {invoice.issue_date ? format(new Date(invoice.issue_date), "MMM d, yyyy") : "-"}
                  </TableCell>
                  <TableCell>{invoice.due_date ? format(new Date(invoice.due_date), "MMM d, yyyy") : "-"}</TableCell>
                  <TableCell>${invoice.total?.toLocaleString() || "0"}</TableCell>
                  <TableCell>${invoice.amount_paid?.toLocaleString() || "0"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "paid"
                          ? "default"
                          : invoice.status === "overdue"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/accounting/invoices/${invoice.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No invoices yet</p>
            <Button asChild>
              <Link href="/accounting/invoices/new">Create your first invoice</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
