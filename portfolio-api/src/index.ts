import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import mongoose from "mongoose"
import dotenv from "dotenv"
import * as nodemailer from "nodemailer"
import { z } from "zod"
// import Project from "./models/Project.js" // if you use projects

dotenv.config()
const app = express()

/* ---------- security & parsing ---------- */
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_ORIGIN?.split(",") || [] }))
app.use(express.json({ limit: "100kb" }))
app.use(rateLimit({ windowMs: 60_000, max: 30 }))

/* ---------- db (optional if you already connected) ---------- */
if (!process.env.MONGODB_URI) {
  console.warn("⚠️  MONGODB_URI missing. Projects route may fail.")
} else {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("Mongo connected")
}

/* ---------- health ---------- */
app.get("/api/health", (_req, res) => res.json({ ok: true }))

/* ---------- contact route ---------- */
const contactSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email().max(120),
  message: z.string().min(1).max(2000),
  website: z.string().optional(), // honeypot
})

function makeTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP not configured")
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false, // set true only if you use port 465
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  })
}

app.post("/api/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "Invalid input" })
  }

  const { name, email, message, website } = parsed.data

  // Honeypot: bots often fill hidden fields
  if (website && website.trim() !== "") {
    return res.status(204).end() // silently ignore
  }

  // Ensure email config exists
  if (!process.env.SMTP_HOST || !process.env.MAIL_TO) {
    return res.status(500).json({ ok: false, error: "Email not configured" })
  }

  try {
    const transporter = makeTransporter()
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: `Portfolio contact: ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    })
    return res.json({ ok: true })
  } catch (err) {
    console.error("Email send failed:", err)
    return res.status(500).json({ ok: false, error: "Failed to send email" })
  }
})

/* ---------- projects route (optional) ---------- */
// app.get("/api/projects", async (_req, res) => {
//   const projects = await Project.find().sort({ createdAt: -1 }).lean()
//   res.json({ projects })
// })

/* ---------- start ---------- */
const PORT = Number(process.env.PORT || 5000)
app.listen(PORT, () => console.log(`API running on port ${PORT}`))
