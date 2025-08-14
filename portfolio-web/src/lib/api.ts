export type Project = {
  _id: string
  title: string
  description: string
  tags?: string[]
  repoUrl?: string
  liveUrl?: string
}

type ContactBody = {
  name: string
  email: string
  message: string
  website?: string // honeypot
}

type ContactResp = { ok: true } | { error: string }

export const API_BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "http://localhost:5000"

async function fetchJSON<T>(
  path: string,
  init: RequestInit = {},
  timeoutMs = 12000
): Promise<T> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutMs)

  try {
    const res = await fetch(`${API_BASE}${path}`, { ...init, signal: ctrl.signal })
    const data = (await res.json().catch(() => ({}))) as T

    if (!res.ok) {
      const msg =
        (data as any)?.error ||
        `Request failed: ${res.status} ${res.statusText}`
      throw new Error(msg)
    }
    return data
  } finally {
    clearTimeout(t)
  }
}

/* Fetch all projects */
export async function getProjects(): Promise<{ projects: Project[] }> {
  try {
    return await fetchJSON<{ projects: Project[] }>("/api/projects")
  } catch (e) {
    console.error("getProjects error:", e)
    return { projects: [] }
  }
}

/* Send contact form data */
export async function sendContact(body: ContactBody): Promise<ContactResp> {
  return fetchJSON<ContactResp>("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}
