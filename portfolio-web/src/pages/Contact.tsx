import { useState } from "react"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "" // honeypot
  })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error("Failed to send")

      setForm({ name: "", email: "", message: "", website: "" })
      setStatus("sent")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold">Contact Me</h2>
      <p className="mt-2 text-slate-600">
        Feel free to reach out for collaborations, internships, or just to say hi.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        {/* Honeypot (hidden) */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "sent" && (
          <p className="text-green-600 mt-2">✅ Your message has been sent!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-2">❌ Failed to send. Try again later.</p>
        )}
      </form>
    </section>
  )
}
