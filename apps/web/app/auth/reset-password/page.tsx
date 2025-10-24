"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { resetPassword } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { toast } = useToast()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await resetPassword(email)

    if (error) {
      toast({
        title: "Reset Failed",
        description: error.message,
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    toast({
      title: "Email Sent",
      description: "Check your email for password reset instructions",
    })

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">Enter your email to receive reset instructions</CardDescription>
        </CardHeader>
        {!sent ? (
          <form onSubmit={handleReset}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Link href="/auth/login" className="text-sm text-center text-blue-600 hover:underline">
                Back to login
              </Link>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <p className="text-center text-slate-600">We've sent password reset instructions to your email.</p>
            <Button asChild className="w-full">
              <Link href="/auth/login">Return to Login</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
