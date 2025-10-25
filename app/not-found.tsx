import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Page not found</CardTitle>
          </div>
          <CardDescription>The page you're looking for doesn't exist</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The page may have been moved or deleted. Please check the URL or navigate back to the home page.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/">Go to home page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
