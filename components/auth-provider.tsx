"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log("[v0] AuthProvider initializing")

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] AuthProvider useEffect - checking session")

    // Check active session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("[v0] AuthProvider session error:", error)
      } else {
        console.log("[v0] AuthProvider session:", session ? "✓ Active" : "✗ No session")
        if (session) {
          console.log("[v0] AuthProvider user:", session.user.email)
        }
      }
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    console.log("[v0] AuthProvider setting up auth state listener")
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("[v0] AuthProvider auth state change:", event)
      console.log("[v0] AuthProvider new session:", session ? "✓ Active" : "✗ No session")
      setUser(session?.user ?? null)
      router.refresh()
    })

    return () => {
      console.log("[v0] AuthProvider cleanup - unsubscribing")
      subscription.unsubscribe()
    }
  }, [router])

  const handleSignOut = async () => {
    console.log("[v0] AuthProvider signing out")
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  console.log("[v0] AuthProvider rendering, user:", user ? user.email : "null", "loading:", loading)

  return <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
