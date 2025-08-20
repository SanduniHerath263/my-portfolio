import { useEffect, useRef, useState } from "react"
import { getProjects, sendContact, type Project } from "../lib/api"
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Typewriter({
  text,
  speed = 40,         
  startDelay = 300,   
  className = "",
  showCursor = true,
}: {
  text: string
  speed?: number
  startDelay?: number
  className?: string
  showCursor?: boolean
}) {
  const [out, setOut] = useState("")
  const i = useRef(0)

  useEffect(() => {
    let startTimer: number | undefined
    let interval: number | undefined

    startTimer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i.current += 1
        setOut(text.slice(0, i.current))
        if (i.current >= text.length) {
          window.clearInterval(interval)
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(startTimer)
      window.clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return (
    <span className={className}>
      {out}
      {showCursor && <span className="type-caret">|</span>}
    </span>
  )
}

export default function PortfolioPg() {
  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0A0F1F" }}>
      <TopBar />
      <HeroSection />
      <ProjectsSection />
          <Technologies />
      <BeyondCode />
      <ContactSection />
      <Footer />
    </div>
  )
}

function TopBar() {
  const links = [
    ["#home", "Home"],
    ["#projects", "Projects"],
      ["#technologies", "Skills"],
    ["#beyond", "Beyond Code"],
    ["#contact", "Contact Me"],
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
          <a
            href="/assets/Sanduni_Upeksha_Herath.pdf" 
            download
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white text-sm font-medium hover:opacity-90 transition"
          >
            Download CV
          </a>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 400px at 50% 50%, rgba(0,180,219,0.25), transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 md:pb-10">
        <h1 className="mt-3 text-5xl sm:text-6xl font-extrabold leading-tight text-center">
          Hello, I’m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0]">
            Sanduni Upeksha Herath
          </span>
        </h1>
<div className="mt-4 text-center text-[#AEE4FF] text-lg min-h-[28px]">
  <Typewriter
    text="• Passionate Software Engineering Undergraduate | Turning Challenges into Solutions"
    speed={35}
    startDelay={400}
    className="inline-block"
    showCursor
  />
</div>
        <div className="mt-12 flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-[#001F33] to-[#002B40] rounded-2xl p-8 shadow-lg">
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
          <div className="text-white/80 leading-relaxed text-sm sm:text-base max-w-4xl">
            <p>
              I’m an enthusiastic Software Engineering undergraduate with a passion for creating meaningful, user-focused software solutions. With experience across both frontend and backend development, I enjoy turning ideas into impactful products. My journey in chess has sharpened my critical thinking, patience, and focus — qualities I carry into every project I build. I thrive in collaborative environments, love solving challenges, and am always eager to learn, grow, and contribute to innovative projects.
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://www.linkedin.com/in/sanduni-upeksha-herath-705a07312/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AEE4FF] hover:text-white text-3xl transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/SanduniHerath263"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AEE4FF] hover:text-white text-3xl transition"
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

function ProjectsSection() {
  const [, setProjects] = useState<Project[]>([])
  const [, setLoading] = useState(true)
  const fetched = useRef(false)

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

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvProjects.map(p => <Card key={p.title} {...p} />)}
        </div>
      </div>
    </section>
  )
}
/* ---------------------- TECHNOLOGIES ---------------------- */
function Technologies() {
  const techs = [
    "Java", "JavaScript", "React", "TypeScript", "Node.js", "Express",
    "MongoDB", "MySQL", "PHP", "Git", "Tailwind CSS", "Figma",
    "Android Studio", "Kotlin", "HTML", "CSS", "C","C++"
  ]

  return (
    <section id="technologies" className="bg-[#0A0F1F]">
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0]">
          Technologies I Use
        </h2>
        <p className="mt-3 text-white/70 max-w-2xl mx-auto">
          A collection of tools, frameworks, and languages I use to design,
          develop, and deliver projects with clean code and great user experience.
        </p>

        {/* Tech Badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {techs.map(t => (
            <span
              key={t}
              className="px-4 py-2 rounded-full text-sm font-medium text-[#AEE4FF] border border-[#00B4DB]/40 bg-[#001F33]/40 hover:bg-[#002B40] transition"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}


function BeyondCode() {
  const events = [
    { icon: "♜", title: "SLIIT Women’s Chess Captain", meta: "2025–2026" },
    { icon: "♞", title: "Member of the University of Kelaniya Chess Team", meta: "2024 – Present" },
    { icon: "♞", title: "Member of the SLIIT Chess Team", meta: "2023 – Present" },
    { icon: "🏅", title: "Received Colors from University of Kelaniya", meta: "2024" },
    { icon: "🏅", title: "Received Colors from the Sri Lanka Institute of Information Technology (SLIIT)", meta: "2023 & 2024" },
    { icon: "♟", title: "School Chess Captain - Musaeus College", meta: "2019–2020" },
  ]

  return (
    <section id="beyond" className="bg-[#0C1426]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] to-[#0083B0]">
          Beyond The Code
        </h2>
        <p className="mt-4 text-white/75 max-w-3xl">
          Chess has been a defining part of my personal and academic journey,
          sharpening my strategic thinking, focus, and decision-making under
          pressure. From leading teams to winning awards, the skills
          I’ve gained from chess directly influence how I approach problem-solving
          in software engineering.
        </p>

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

function Footer() {
  return (
    <footer className="border-t border-white/10 text-center py-4 text-white/60 text-sm">
      © {new Date().getFullYear()} All rights reserved by Sanduni Upeksha Herath
    </footer>
  )
}
