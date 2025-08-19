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

// Support either VITE_API_URL or VITE_API_BASE; trim trailing slashes.
const RAW =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  (import.meta.env.VITE_API_BASE as string | undefined)

export const API_BASE =
  (RAW?.replace(/\/+$/, "") ||
    // local dev fallback:
    "http://localhost:5000") as string

async function fetchJSON<T>(
  path: string,
  init: RequestInit = {},
  timeoutMs = 12_000
): Promise<T> {
  const ctrl = new AbortController()
  const to = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...(init.headers || {}) },
      signal: ctrl.signal,
      ...init,
    })
    const isJSON = res.headers.get("content-type")?.includes("application/json")
    const data = (isJSON ? await res.json() : await res.text()) as T

    if (!res.ok) {
      const msg =
        (isJSON && (data as any)?.error) ||
        `Request failed: ${res.status} ${res.statusText}`
      throw new Error(msg)
    }
    return data
  } finally {
    clearTimeout(to)
  }
}

/* Fetch all projects (make sure /api/projects exists on the server) */
export async function getProjects(): Promise<{ projects: Project[] }> {
  try {
    return await fetchJSON<{ projects: Project[] }>("/api/projects")
  } catch (e) {
    console.error("getProjects error:", e)
    return { projects: [] }
  }
}

/* Send contact form data (remember to pass website: "" for honeypot) */
export async function sendContact(body: ContactBody): Promise<ContactResp> {
  return fetchJSON<ContactResp>("/api/contact", {
    method: "POST",
    body: JSON.stringify({ website: "", ...body }),
  })
}

/* Optional: quick health check helper */
export async function health(): Promise<{ ok: boolean }> {
  return fetchJSON<{ ok: boolean }>("/api/health", { method: "GET" })
}
