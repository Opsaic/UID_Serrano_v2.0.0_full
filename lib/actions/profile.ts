"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: string
  department: string | null
  phone: string | null
  avatar_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export async function createProfile(userId: string, email: string, fullName: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      email,
      full_name: fullName,
      role: "user",
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    return { profile: null, error: error.message }
  }

  return { profile: data, error: null }
}

export async function getProfile(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    return { profile: null, error: error.message }
  }

  return { profile: data as Profile, error: null }
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    return { profile: null, error: error.message }
  }

  revalidatePath("/settings")
  return { profile: data as Profile, error: null }
}
