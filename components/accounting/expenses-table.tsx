import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Eye, Receipt } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export async function ExpensesTable() {
  const supabase = await createClient()

  const { data: expenses } = await supabase
    .from("expenses")
    .select("*, projects(name)")
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
        <CardDescription>Track business expenses and costs</CardDescription>
      </CardHeader>
      <CardContent>
        {expenses && expenses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expense #</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.expense_number}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.category || "-"}</TableCell>
                  <TableCell>{expense.projects?.name || "-"}</TableCell>
                  <TableCell>
                    {expense.expense_date ? format(new Date(expense.expense_date), "MMM d, yyyy") : "-"}
                  </TableCell>
                  <TableCell className="font-medium">${expense.amount?.toLocaleString() || "0"}</TableCell>
                  <TableCell>
                    <Badge variant={expense.status === "approved" ? "default" : "secondary"}>{expense.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/accounting/expenses/${expense.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      {expense.receipt_url && (
                        <Button variant="ghost" size="icon-sm" asChild>
                          <a href={expense.receipt_url} target="_blank" rel="noopener noreferrer">
                            <Receipt className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No expenses yet</p>
            <Button asChild>
              <Link href="/accounting/expenses/new">Record your first expense</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
