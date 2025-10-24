import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Eye, Edit, Download } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export async function QuotesTable() {
  const supabase = await createClient()

  const { data: quotes } = await supabase
    .from("quotes")
    .select("*, companies(name)")
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quotes</CardTitle>
        <CardDescription>Manage customer quotes and proposals</CardDescription>
      </CardHeader>
      <CardContent>
        {quotes && quotes.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quote #</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.quote_number}</TableCell>
                  <TableCell>{quote.companies?.name || "-"}</TableCell>
                  <TableCell>{quote.title}</TableCell>
                  <TableCell>${quote.total?.toLocaleString() || "0"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        quote.status === "accepted"
                          ? "default"
                          : quote.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{quote.valid_until ? format(new Date(quote.valid_until), "MMM d, yyyy") : "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/crm/quotes/${quote.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/crm/quotes/${quote.id}/edit`}>
                          <Edit className="h-4 w-4" />
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
            <p className="text-muted-foreground mb-4">No quotes yet</p>
            <Button asChild>
              <Link href="/crm/quotes/new">Create your first quote</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
