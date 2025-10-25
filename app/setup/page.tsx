"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const createAdminUser = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/setup/create-admin", {
        method: "POST",
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to create admin user",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Serrano Setup</CardTitle>
          <CardDescription>Create the admin user account to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              This will create an admin account with the following credentials:
            </p>
            <div className="bg-slate-100 p-3 rounded-md space-y-1 font-mono text-sm">
              <div>
                <span className="text-muted-foreground">Email:</span>{" "}
                <span className="font-semibold">admin@serrano.ai</span>
              </div>
              <div>
                <span className="text-muted-foreground">Password:</span>{" "}
                <span className="font-semibold">TestPass123!</span>
              </div>
            </div>
          </div>

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              <div className="flex items-start gap-2">
                {result.success ? <CheckCircle2 className="h-4 w-4 mt-0.5" /> : <XCircle className="h-4 w-4 mt-0.5" />}
                <AlertDescription className="text-sm">{result.message}</AlertDescription>
              </div>
            </Alert>
          )}

          <Button onClick={createAdminUser} disabled={loading || result?.success} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Admin User...
              </>
            ) : result?.success ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Admin User Created
              </>
            ) : (
              "Create Admin User"
            )}
          </Button>

          {result?.success && (
            <div className="pt-4 border-t">
              <p className="text-sm text-center text-muted-foreground mb-3">Setup complete! You can now log in.</p>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => (window.location.href = "/auth/login")}
              >
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
