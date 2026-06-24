import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Send, Linkedin, Mail } from 'lucide-react'
import dragonImg from '@/assets/code-guardian-dragon.png'

type Card = {
  tag: string
  title: string
  body?: string
  list?: string[]
  links?: { label: string; href: string; icon: React.ReactNode, target?: string, rel?: string;}[]
}

const CARDS: Card[] = [
  {
    tag: 'WHO AM I',
    title: 'Full-Stack Developer',
    body: 'I craft reliable, scalable web applications — pairing an elegant frontend with a powerful backend.',
  },
  {
    tag: 'MY STACK',
    title: 'Technologies',
    list: ['Next.js', 'React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Docker'],
  },
  {
    tag: 'EXPERIENCE',
    title: "Developer's Path",
    body: '3+ years of commercial development. Architecture design and performance optimization for large-scale projects.',
  },
  {
    tag: 'PROJECTS',
    title: 'Featured Work',
    list: ['Project Alpha', 'Project Beta', 'Project Gamma'],
  },
  {
    tag: 'GET IN TOUCH',
    title: 'Contact',
    links: [
      { label: 'Telegram', rel: 'noopener noreferrer', href: '#', target: '_blank', icon: <Send className="w-4 h-4" /> },
      { label: 'GitHub', rel: 'noopener noreferrer', href: 'https://github.com/Farrux-Developer', target: '_blank', icon: <Github className="w-4 h-4" /> },
      { label: 'LinkedIn', rel: 'noopener noreferrer', href: '#', target: '_blank', icon: <Linkedin className="w-4 h-4" /> },
      { label: 'farruxwebsitedeveloper@gmail.com', rel: 'noopener noreferrer', href: '#', target: '_blank', icon: <Mail className="w-4 h-4" /> },
    ],
  },
]

export default function CodeGuardian() {
  const [angle, setAngle] = useState(0)
  const radius = 460
  const step = 360 / CARDS.length

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (t: number) => {
      const dt = (t - last) / 1000
      last = t
      setAngle((a) => a + dt * 6) // slow auto rotation
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-neutral-900">
      {/* subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 55%, rgba(59,130,246,0.10), transparent 70%)',
        }}
      />



     

      <div className="relative mx-auto mt-6 h-[640px] w-full max-w-6xl [perspective:1600px]">
        <motion.img
          src={dragonImg}
          alt="Code Guardian Dragon"
          width={1024}
          height={1024}
          className="absolute left-1/2 top-1/2 w-[520px] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none drop-shadow-[0_30px_60px_rgba(59,130,246,0.35)]"
          animate={{ y: ['-52%', '-48%', '-52%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ x: '-50%' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ transformStyle: 'preserve-3d', transform: `translate(-50%,-50%) rotateY(${angle}deg)` }}
        >
          {CARDS.map((c, i) => {
            const rot = i * step
            return (
              <div
                key={c.tag}
                className="absolute"
                style={{
                  transform: `rotateY(${rot}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-900/10 bg-white/70 p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] backdrop-blur-md"
                  style={{ transform: `rotateY(${-angle - rot}deg)` }}
                >
                  <div className="text-[10px] font-semibold tracking-[0.2em] text-blue-600">
                    {c.tag}
                  </div>
                  <div className="mt-2 font-bagel text-xl leading-tight text-neutral-900">
                    {c.title}
                  </div>
                  <div className="mt-3 h-px w-10 bg-gradient-to-r from-blue-500 to-transparent" />
                  {c.body && (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{c.body}</p>
                  )}
                  {c.list && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {c.list.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-neutral-900/10 bg-neutral-50 px-2 py-1 text-[11px] font-medium text-neutral-700"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  {c.links && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target={l.target}
                          rel={l.rel}
                          className="inline-flex items-center gap-1.5 rounded-md border border-neutral-900/10 bg-neutral-900 px-2.5 py-1.5 text-[11px] font-medium text-white transition hover:bg-blue-600"
                        >
                          {l.icon}
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

     
    </div>
  )
}
