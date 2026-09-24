import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

/** Read OS/browser "prefers-reduced-motion" setting once */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

/* --------------------------------------------------------
   Typing animation hook
-------------------------------------------------------- */
const ROLES = [
  'Java & Spring Boot Backend Developer',
  'REST API Builder',
  'Full-Stack Capable (React)',
]

function useTypingEffect(texts: string[], speed = 60, pauseMs = 1800) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting) {
      if (charIndex < current.length) {
        timer = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1))
          setCharIndex(c => c + 1)
        }, speed)
      } else {
        timer = setTimeout(() => setDeleting(true), pauseMs)
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex - 1))
          setCharIndex(c => c - 1)
        }, speed / 2)
      } else {
        setDeleting(false)
        setTextIndex(i => (i + 1) % texts.length)
      }
    }
    return () => clearTimeout(timer)
  }, [charIndex, deleting, textIndex, texts, speed, pauseMs])

  return displayText
}

/* --------------------------------------------------------
   Hero
-------------------------------------------------------- */
export default function Hero() {
  const typedRole = useTypingEffect(ROLES)
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    // Skip parallax listener entirely when motion is reduced
    if (!reduced) {
      window.addEventListener('mousemove', handler)
    }
    return () => window.removeEventListener('mousemove', handler)
  }, [reduced])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden hero-noise hero-grid"
      style={{ backgroundColor: '#0B0E14' }}
    >
      {/* Ambient background orbs — static when reduced-motion is on */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #E8A33D 0%, transparent 70%)',
          transform: reduced
            ? 'translate(0,0)'
            : `translate(${(mousePos.x - 0.5) * -30}px, ${(mousePos.y - 0.5) * -20}px)`,
          transition: reduced ? 'none' : 'transform 0.8s ease-out',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #5FA8A0 0%, transparent 70%)',
          transform: reduced
            ? 'translate(0,0)'
            : `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 15}px)`,
          transition: reduced ? 'none' : 'transform 0.8s ease-out',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">

          {/* ——— LEFT: Text Content ——— */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">

            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: '#6FCF97' }}
              />
              <span className="kicker" style={{ color: '#E8A33D', letterSpacing: '0.1em', fontSize: '0.72rem' }}>
                Backend Developer · Open to Work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="section-heading"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.2rem)', lineHeight: 1.05 }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Hi, I'm{' '}
              <span className="text-amber-gradient">Sanskruti Raka</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div
              className="text-xl font-heading font-medium min-h-[2rem]"
              style={{ color: '#A6ADBB', letterSpacing: '-0.01em' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {typedRole}<span className="cursor-blink" />
            </motion.div>

            {/* Value statement — updated: no physics reference */}
            <motion.p
              className="text-base max-w-lg leading-relaxed"
              style={{ color: '#A6ADBB', lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              MCA 2026 — from writing my first Java code to shipping
              production-grade Spring Boot microservices. I build scalable
              REST APIs, distributed backends, and clean full-stack experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mt-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="projects" smooth duration={600}>
                <button id="hero-view-projects" className="btn-primary">
                  View Projects
                  <ArrowDown size={15} />
                </button>
              </Link>
              <Link to="contact" smooth duration={600}>
                <button id="hero-get-in-touch" className="btn-outline">
                  Get in Touch
                </button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-3 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <a
                id="hero-github-link"
                href="https://github.com/Sanskrutiraka"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                id="hero-linkedin-link"
                href="https://www.linkedin.com/in/sanskruti-raka-105789261"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                id="hero-email-link"
                href="mailto:sanskrutiraka1602@gmail.com"
                className="social-btn"
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
              <span className="text-xs ml-2" style={{ color: '#2A2F3A' }}>——</span>
              <span className="text-xs" style={{ color: '#A6ADBB' }}>Let's connect</span>
            </motion.div>
          </div>

          {/* ——— RIGHT: Profile Photo — Passport Style ——— */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px]">

              {/* Ambient glow — bleeds outward, that's intentional */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '-16px',
                  borderRadius: '36px',
                  background:
                    'radial-gradient(ellipse at 40% 35%, rgba(232,163,61,0.28) 0%, transparent 65%)',
                  filter: 'blur(20px)',
                }}
              />

              {/*
                Spinning border ring — KEY FIX:
                · Gradient goes 0→360 with NO transparent section
                  (low-opacity amber sections instead of transparent,
                   so there is never a hard colour-to-nothing edge)
                · Photo container is a SIBLING (not child) of this div,
                  so it never rotates with it
                · inset: 0 here, inset: '3px' on photo = 3px ring gap
              */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '20px',
                  background:
                    'conic-gradient(from 0deg, #E8A33D 0deg, #F0C070 60deg, #5FA8A0 120deg, rgba(95,168,160,0.35) 200deg, rgba(232,163,61,0.35) 280deg, #E8A33D 360deg)',
                  animation: 'spinSlow 6s linear infinite',
                }}
              />

              {/* Photo container — 3px inside the ring so the ring shows as a border */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '3px',
                  borderRadius: '17px',
                  overflow: 'hidden',
                  background: '#1A1E27',
                  boxShadow: '0 0 32px rgba(232,163,61,0.12)',
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 56px rgba(232,163,61,0.42)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                {/* Profile photo */}
                <img
                  src="/Docs/photo.jpeg"
                  alt="Sanskruti Raka - Java Backend Developer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    ; (e.target as HTMLImageElement).src =
                      'https://ui-avatars.com/api/?name=Sanskruti+Raka&background=1A1E27&color=E8A33D&size=400&font-size=0.33&bold=true'
                  }}
                />
                {/* Hover amber shine */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(232,163,61,0.16) 0%, transparent 55%)',
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* CSS for rotating ring animation */}
      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
