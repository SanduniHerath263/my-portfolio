import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as nodemailer from "nodemailer";
import { z } from "zod";
// import Project from "./models/Project.js"; // if you use projects
dotenv.config();
const app = express();
/* ---------- security & parsing ---------- */
app.use(helmet());
const allowedOrigins = (process.env.FRONTEND_ORIGIN ?? "")
    .split(",")
    .map(o => o.trim())
    .filter(Boolean);
// Allow only configured origins; if none set yet, allow all (handy for first deploy/tests)
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json({ limit: "100kb" }));
app.use(rateLimit({ windowMs: 60_000, max: 30 }));
/* ---------- health ---------- */
app.get("/api/health", (_req, res) => res.json({ ok: true }));
/* ---------- contact route ---------- */
const contactSchema = z.object({
    name: z.string().min(1).max(80),
    email: z.string().email().max(120),
    message: z.string().min(1).max(2000),
    website: z.string().optional(), // honeypot
});
function makeTransporter() {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error("SMTP not configured");
    }
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465, // secure only on 465
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
}
app.post("/api/contact", async (req, res) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ ok: false, error: "Invalid input" });
    const { name, email, message, website } = parsed.data;
    // Honeypot: ignore bots that fill hidden field
    if (website && website.trim() !== "")
        return res.status(204).end();
    if (!process.env.SMTP_HOST || !process.env.MAIL_TO) {
        return res.status(500).json({ ok: false, error: "Email not configured" });
    }
    try {
        const transporter = makeTransporter();
        await transporter.sendMail({
            from: process.env.MAIL_FROM || process.env.SMTP_USER,
            to: process.env.MAIL_TO,
            replyTo: `${name} <${email}>`,
            subject: `Portfolio contact: ${name}`,
            text: `${name} <${email}>\n\n${message}`,
        });
        res.json({ ok: true });
    }
    catch (err) {
        console.error("Email send failed:", err);
        res.status(500).json({ ok: false, error: "Failed to send email" });
    }
});
/* ---------- projects route (optional) ---------- */
// app.get("/api/projects", async (_req, res) => {
//   const projects = await Project.find().sort({ createdAt: -1 }).lean();
//   res.json({ projects });
// });
/* ---------- start (connect DB first if provided) ---------- */
const PORT = Number(process.env.PORT || 5000);
async function start() {
    try {
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Mongo connected");
        }
        else {
            console.warn("⚠️  MONGODB_URI missing. Skipping DB connect.");
        }
    }
    catch (e) {
        console.error("Mongo connection failed:", e);
        // Continue to start if your routes don't require DB at boot
    }
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}
start();
//# sourceMappingURL=index.js.map