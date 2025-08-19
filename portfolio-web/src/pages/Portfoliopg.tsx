import { useEffect, useRef, useState } from "react"
import { getProjects, sendContact, type Project } from "../lib/api"
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function PortfolioPg() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0A0F1F" }}>
      <TopBar />
      <HeroSection />
      <ProjectsSection />
      <BeyondCode />
      <ContactSection />
      <Footer />
    </div>
  )
}

/* ---------------------- TOP BAR ---------------------- */
function TopBar() {
  const links = [
    ["#home", "Home"],
    ["#projects", "Projects"],
    ["#beyond", "Beyond Code"],
    ["#contact", "Contact"],

  ] as const

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A0F1F]/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0]">
          Sanduni Upeksha
        </a>
        <ul className="hidden md:flex gap-2">
          {links.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="px-3 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
         {/* Download CV Button */}
          <a
            href="/assets/Sanduni_Herath_CV.pdf" // make sure CV is in /public/assets/
            download
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white text-sm font-medium hover:opacity-90 transition"
          >
            Download CV
          </a>
      </div>
    </header>
  )
}

/* ---------------------- HERO ---------------------- */
function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Light blue gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 400px at 50% 50%, rgba(0,180,219,0.25), transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 md:pb-10">
        {/* Heading */}
        <h1 className="mt-3 text-5xl sm:text-6xl font-extrabold leading-tight text-center">
          Hello, I’m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0]">
            Sanduni Upeksha Herath
          </span>
        </h1>
        <p className="mt-4 text-[#AEE4FF] text-lg text-center">
          • Software Engineering Undergraduate 
        </p>

        {/* Gradient bubble with picture + paragraph */}
        <div className="mt-12 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-[#001F33] to-[#002B40] rounded-2xl p-8 shadow-lg">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#0083B0] blur-xl opacity-30" />
              <img
                src="/assets/pic1.jpg"
                alt="Profile"
                className="relative w-64 h-64 rounded-full object-cover border-4 border-[#00B4DB] shadow-lg"
              />
            </div>
          </div>

          {/* Paragraph + Icons */}
          <div className="text-white/80 leading-relaxed text-sm sm:text-base max-w-2xl">

            <p>
              I am currently an undergraduate specializing in Software Engineering, with a strong passion
 for building impactful and user-centered software solutions. My academic journey is
 supported by hands-on project experience and a solid foundation in both frontend and
 backend development. My chess experience has enhanced my critical thinking and focus,
 which directly support my approach to software development. I am eager to contribute to
 innovative projects in a collaborative environment while continuously learning and growing
 as a developer
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-4">
              <a
                href="https://www.linkedin.com/in/sanduni-upeksha-herath-705a07312/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AEE4FF] hover:text-white text-2xl transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/SanduniHerath263"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AEE4FF] hover:text-white text-2xl transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- PROJECTS ---------------------- */
function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const fetched = useRef(false)

  // Featured projects (from your CV) — tech names unchanged
  const cvProjects = [
    {
      title: "Travel Lanka — Tourism Management System",
      description:
        "Full-stack tourism platform handling users, bookings, and packages.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    },
    {
      title: "Lincholin — School Management System",
      description:
        "Role-based access for teachers, students, and admins with academic data management.",
      tags: ["Java", "MySQL", "Eclipse", "MySQL Workbench"],
    },
    {
      title: "FitForge — Online Fitness Management System",
      description:
        "User registration, session booking, and equipment shopping with a responsive UI.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "XAMPP"],
    },
    {
      title: "Zylo — Time Management Mobile App",
      description:
        "Android app with clean UI and smooth screen navigation for time management.",
      tags: ["Android Studio", "Kotlin"],
    },
    {
      title: "ZynPay — Personal Finance Tracker",
      description:
        "Budgeting & expense tracking with persistent storage and currency settings.",
      tags: ["Android Studio", "Kotlin", "SharedPreferences"],
    },
  ]

  useEffect(() => {
    if (fetched.current) return
    fetched.current = true
    getProjects().then(r => setProjects(r.projects || [])).finally(() => setLoading(false))
  }, [])

  const Card = ({
    title,
    description,
    tags,
  }: { title: string; description: string; tags?: string[] }) => (
    <article className="rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors">
      {/* slim gradient bar for accent (neat, not loud) */}
      <div className="h-1 w-full bg-gradient-to-r from-[#00B4DB] to-[#0083B0] rounded-t-xl" />
      <div className="p-5">
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm text-white/70 mt-2">{description}</p>
        {tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map(t => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-full text-[#AEE4FF] border border-[#00B4DB]/40 bg-[#001F33]/40"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0]">
          Projects
        </h2>

        {/* Featured from CV */}
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvProjects.map(p => <Card key={p.title} {...p} />)}
        </div>
      </div>
    </section>
  )
}


/* ---------------------- BEYOND CODE ---------------------- */
function BeyondCode() {
  const events = [
    { icon: "♜", title: "SLIIT Women’s Chess Captain", meta: "2025–2026" },
    { icon: "♞", title: "Member of the University of Kelaniya Chess Team", meta: "2024 – Present" },
    { icon: "🏅", title: "Awarded Colors from University of Kelaniya", meta: "2024" },
    { icon: "🏅", title: "Awarded Colors from Sri Lanka Institute of Information Technology (SLIIT)", meta: "2023 & 2024" },
    { icon: "♟", title: "School Chess Captain - Musaeus College", meta: "2019–2020" },
  ]

  return (
    <section id="beyond" className="bg-[#0C1426]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0]">
          Beyond Code
        </h2>

        {/* Small intro paragraph */}
        <p className="mt-4 text-white/75 max-w-3xl">
          Chess has been a defining part of my personal and academic journey,
          sharpening my strategic thinking, focus, and decision-making under
          pressure. From leading university teams to winning awards, the skills
          I’ve gained from chess directly influence how I approach problem-solving
          in software engineering.
        </p>

        {/* Achievements list */}
        <ol className="mt-8 relative border-s border-white/10">
          {events.map((e, idx) => (
            <li key={idx} className="mb-8 ms-6">
              <span className="absolute -start-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-xs text-white">
                {e.icon}
              </span>
              <div className="rounded-xl p-5 bg-white/[0.03] border border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{e.title}</h3>
                  <span className="text-xs text-white/60">{e.meta}</span>
                </div>
                
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------------- CONTACT ---------------------- */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await sendContact(form);
      if ((res as any).ok) {
        setForm({ name: "", email: "", message: "", website: "" });
        setStatus("sent");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-[#0C1426]">
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0]">
          Contact Me
        </h2>

        {/* Friendly caption */}
        <p className="mt-3 text-white/75 max-w-2xl mx-auto">
          Whether you have a project in mind, a question, or an opportunity to collaborate, I’d be happy to connect. Send me a message and I’ll respond as soon as possible.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4 max-w-xl mx-auto text-left">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Name"
            className="w-full rounded-md border border-white/15 bg-white/[0.05] px-3 py-2"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full rounded-md border border-white/15 bg-white/[0.05] px-3 py-2"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            placeholder="Message"
            rows={5}
            className="w-full rounded-md border border-white/15 bg-white/[0.05] px-3 py-2"
          />
          <button
            disabled={status === "sending"}
            className="px-5 py-2 rounded-md bg-gradient-to-r from-[#00B4DB] to-[#0083B0] hover:opacity-90 transition"
          >
            {status === "sending" ? "Sending…" : "Send"}
          </button>
          {status === "sent" && <p className="text-[#AEE4FF]">✅ Sent successfully!</p>}
          {status === "error" && <p className="text-red-400">❌ Failed to send</p>}
        </form>
      </div>
    </section>
  );
}



/* ---------------------- FOOTER ---------------------- */
function Footer() {
  return (
    <footer className="border-t border-white/10 text-center py-4 text-white/60 text-sm">
      © {new Date().getFullYear()} All rights reserved by Sanduni Upeksha Herath
    </footer>
  )
}
