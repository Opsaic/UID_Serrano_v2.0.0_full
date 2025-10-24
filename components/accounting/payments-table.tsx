import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"

export async function PaymentsTable() {
  const supabase = await createClient()

  const { data: payments } = await supabase
    .from("payments")
    .select("*, companies(name), invoices(invoice_number)")
    .order("created_at", { ascending: false })
    .limit(50)

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
                  <TableCell>{payment.invoices?.invoice_number || "-"}</TableCell>
                  <TableCell>{payment.companies?.name || "-"}</TableCell>
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
