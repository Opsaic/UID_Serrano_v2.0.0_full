import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"

export async function PaymentsTable() {
  const supabase = await createClient()

  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  const companiesMap = new Map()
  const invoicesMap = new Map()

  if (payments && payments.length > 0) {
    const companyIds = [...new Set(payments.map((p) => p.company_id).filter(Boolean))]
    const invoiceIds = [...new Set(payments.map((p) => p.invoice_id).filter(Boolean))]

    if (companyIds.length > 0) {
      const { data: companies } = await supabase.from("companies").select("id, name").in("id", companyIds)

      if (companies) {
        companies.forEach((c) => companiesMap.set(c.id, c))
      }
    }

    if (invoiceIds.length > 0) {
      const { data: invoices } = await supabase.from("invoices").select("id, invoice_number").in("id", invoiceIds)

      if (invoices) {
        invoices.forEach((i) => invoicesMap.set(i.id, i))
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payments</CardTitle>
        <CardDescription>Track received payments</CardDescription>
      </CardHeader>
      <CardContent>
        {payments && payments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment #</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.payment_number}</TableCell>
                  <TableCell>
                    {payment.invoice_id ? invoicesMap.get(payment.invoice_id)?.invoice_number || "-" : "-"}
                  </TableCell>
                  <TableCell>{payment.company_id ? companiesMap.get(payment.company_id)?.name || "-" : "-"}</TableCell>
                  <TableCell>
                    {payment.payment_date ? format(new Date(payment.payment_date), "MMM d, yyyy") : "-"}
                  </TableCell>
                  <TableCell className="font-medium">${payment.amount?.toLocaleString() || "0"}</TableCell>
                  <TableCell>{payment.payment_method || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === "completed" ? "default" : "secondary"}>{payment.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No payments recorded</div>
        )}
      </CardContent>
    </Card>
  )
}
