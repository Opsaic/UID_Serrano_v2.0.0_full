import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { logError, handleApiError } from "@/lib/error-logger"

export async function GET(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user || null

    if (!user) {
      console.error("[v0] GET /ar-sessions: Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get("project_id")
    const modelId = searchParams.get("model_id")

    console.log("[v0] GET /ar-sessions:", { userId: user.id, projectId, modelId })

    let query = supabase.from("ar_sessions").select("*").order("timestamp", { ascending: false })

    if (projectId) {
      query = query.eq("project_id", projectId)
    }
    if (modelId) {
      query = query.eq("model_id", modelId)
    }

    const { data: sessions, error: sessionsError } = await query

    if (sessionsError) {
      console.error("[v0] GET /ar-sessions error:", sessionsError)
      throw sessionsError
    }

    if (sessions && sessions.length > 0) {
      const projectIds = [...new Set(sessions.map((s) => s.project_id).filter(Boolean))]
      const modelIds = [...new Set(sessions.map((s) => s.model_id).filter(Boolean))]

      const [{ data: projects }, { data: models }] = await Promise.all([
        supabase.from("projects").select("id, name, project_number").in("id", projectIds),
        supabase.from("models").select("id, name, thumbnail_url").in("id", modelIds),
      ])

      const projectsMap = new Map(projects?.map((p) => [p.id, p]) || [])
      const modelsMap = new Map(models?.map((m) => [m.id, m]) || [])

      const enrichedSessions = sessions.map((session) => ({
        ...session,
        projects: session.project_id ? projectsMap.get(session.project_id) : null,
        models: session.model_id ? modelsMap.get(session.model_id) : null,
      }))

      return NextResponse.json(enrichedSessions)
    }

    return NextResponse.json(sessions || [])
  } catch (error) {
    logError(error, { component: "ar-sessions", action: "GET" })
    return handleApiError(error, "Failed to fetch AR sessions")
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user || null

    if (!user) {
      console.error("[v0] POST /ar-sessions: Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { project_id, model_id, session_type, duration, data: sessionData, screenshots, annotations, metadata } = body

    console.log("[v0] POST /ar-sessions:", { userId: user.id, project_id, model_id, session_type })

    const { data, error } = await supabase
      .from("ar_sessions")
      .insert({
        project_id,
        model_id,
        user_id: user.id,
        session_type: session_type || "preview",
        duration,
        data: sessionData || {},
        screenshots: screenshots || [],
        annotations: annotations || [],
        metadata: metadata || {},
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] POST /ar-sessions error:", error)
      throw error
    }

    console.log("[v0] POST /ar-sessions success:", data.id)
    return NextResponse.json(data)
  } catch (error) {
    logError(error, { component: "ar-sessions", action: "POST" })
    return handleApiError(error, "Failed to create AR session")
  }
}

export async function PATCH(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user || null

    if (!user) {
      console.error("[v0] PATCH /ar-sessions: Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...updates } = body

    console.log("[v0] PATCH /ar-sessions:", { userId: user.id, sessionId: id })

    const { data, error } = await supabase.from("ar_sessions").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("[v0] PATCH /ar-sessions error:", error)
      throw error
    }

    console.log("[v0] PATCH /ar-sessions success:", data.id)
    return NextResponse.json(data)
  } catch (error) {
    logError(error, { component: "ar-sessions", action: "PATCH" })
    return handleApiError(error, "Failed to update AR session")
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user || null

    if (!user) {
      console.error("[v0] DELETE /ar-sessions: Unauthorized access attempt")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      console.error("[v0] DELETE /ar-sessions: Missing ID")
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    console.log("[v0] DELETE /ar-sessions:", { userId: user.id, sessionId: id })

    const { error } = await supabase.from("ar_sessions").delete().eq("id", id)

    if (error) {
      console.error("[v0] DELETE /ar-sessions error:", error)
      throw error
    }

    console.log("[v0] DELETE /ar-sessions success:", id)
    return NextResponse.json({ success: true })
  } catch (error) {
    logError(error, { component: "ar-sessions", action: "DELETE" })
    return handleApiError(error, "Failed to delete AR session")
  }
}
