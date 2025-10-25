import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { put } from "@vercel/blob"

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()

    // Get user session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const projectId = formData.get("projectId") as string
    const category = (formData.get("category") as string) || "general"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    })

    // Save document metadata to database
    const { data: document, error: dbError } = await supabase
      .from("project_documents")
      .insert({
        project_id: projectId,
        name: file.name,
        file_url: blob.url,
        file_size: file.size,
        file_type: file.type,
        category,
        uploaded_by: user.id,
      })
      .select()
      .single()

    if (dbError) throw dbError

    return NextResponse.json(document)
  } catch (error) {
    console.error("[v0] Error uploading document:", error)
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
  }
}
