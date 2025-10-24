import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Eye, Edit } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export async function OpportunitiesTable() {
  const supabase = await createClient()

  const { data: opportunities } = await supabase
    .from("opportunities")
    .select("*, companies(name)")
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunities</CardTitle>
        <CardDescription>Track sales opportunities and deals</CardDescription>
      </CardHeader>
      <CardContent>
        {opportunities && opportunities.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opportunity</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Probability</TableHead>
                <TableHead>Close Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opp) => (
                <TableRow key={opp.id}>
                  <TableCell className="font-medium">{opp.name}</TableCell>
                  <TableCell>{opp.companies?.name || "-"}</TableCell>
                  <TableCell>${opp.value?.toLocaleString() || "0"}</TableCell>
                  <TableCell>
                    <Badge>{opp.stage}</Badge>
                  </TableCell>
                  <TableCell>{opp.probability}%</TableCell>
                  <TableCell>
                    {opp.expected_close_date
                      ? formatDistanceToNow(new Date(opp.expected_close_date), { addSuffix: true })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/crm/opportunities/${opp.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/crm/opportunities/${opp.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No opportunities yet</p>
            <Button asChild>
              <Link href="/crm/opportunities/new">Create your first opportunity</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
