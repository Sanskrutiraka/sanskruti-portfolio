import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

/* --------------------------------------------------------
   Project Data
-------------------------------------------------------- */
interface Project {
  id: string
  title: string
  tagline: string
  description: string
  stack: string[]
  github: string
  live?: string
  gradient: string
  badge?: string
  icon: string
}

const projects: Project[] = [
  {
    id: 'civicpulse',
    title: 'CivicPulse+',
    tagline: 'AI-Powered Smart Grievance Management System',
    description:
      'Led full-stack development of an AI-powered grievance platform with complaint registration, RBAC/JWT auth, AI-assisted categorization & routing, SLA tracking, audit logs and analytics. Built on Spring Boot microservices, FastAPI for AI, Kafka for event streaming, and Docker Compose.',
    stack: ['Java', 'Spring Boot', 'FastAPI', 'React', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'],
    github: 'https://github.com/Sanskrutiraka/CivicPulse',
    gradient: 'from-amber-900/40 to-orange-950/40',
    badge: 'Flagship',
    icon: '🏛️',
  },
  {
    id: 'parkvahan',
    title: 'ParkVahan',
    tagline: 'Smart Parking & Mobility Management Platform',
    description:
      'Built during internship at AmbuGrid System LLP. Full-stack mobile/web parking platform with driver, owner and guard workflows. Features parking discovery & booking, QR-based entry/exit, vehicle verification, SOS/calling, EV charging flows and notifications.',
    stack: ['React Native', 'React.js', 'Node.js', 'Express.js', 'Supabase', 'PostgreSQL', 'Razorpay', 'Docker'],
    github: 'https://github.com/Sanskrutiraka/ParkVahan',
    gradient: 'from-teal-900/40 to-cyan-950/40',
    badge: 'Internship',
    icon: '🅿️',
  },
  {
    id: 'complaint-router',
    title: 'Smart Complaint Router',
    tagline: 'Intelligent Complaint Processing Engine',
    description:
      'Java + Spring Boot complaint management system with complaint registration, JWT authentication, status tracking, admin/user workflows and automated complaint routing. REST API tested with Postman.',
    stack: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'JWT', 'Postman', 'Git'],
    github: 'https://github.com/Sanskrutiraka/smart-complaint-router',
    gradient: 'from-violet-900/30 to-purple-950/40',
    icon: '🔀',
  },
  {
    id: 'focusdo',
    title: 'FocusDo',
    tagline: 'Full-Stack To-Do & Task Management App',
    description:
      'Full-stack to-do application with task management, JWT authentication and user-specific data. React Native frontend backed by Node.js + Express REST API with MongoDB. Deployed on Vercel and Render.',
    stack: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Zod', 'Vercel', 'Render'],
    github: 'https://github.com/Sanskrutiraka/FocusDo',
    gradient: 'from-rose-900/30 to-pink-950/40',
    icon: '✅',
  },
]

/* --------------------------------------------------------
   Tilt-on-hover Project Card
   — Responsive: full-width on mobile, fixed on desktop
-------------------------------------------------------- */
function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    x.set(nx)
    y.set(ny)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    /*
      Width strategy:
      - Mobile  (<640px): 100vw minus 48px padding = full visible width, no overflow
      - Tablet  (640px+): 320px
      - Desktop (1024px+): 380px
      CSS custom property used so Tailwind responsive classes can't conflict.
    */
    <div
      className="tilt-wrapper embla__slide"
      style={{
        width: 'min(calc(100vw - 48px), 380px)',
        minWidth: 0,
      }}
    >
      <motion.div
        ref={cardRef}
        className="card overflow-hidden h-full flex flex-col cursor-grab active:cursor-grabbing"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Card header / gradient banner */}
        <div
          className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden flex-shrink-0`}
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          {/* Project icon */}
          <div
            className="text-6xl z-10 select-none"
            style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}
          >
            {project.icon}
          </div>
          {/* Badge */}
          {project.badge && (
            <span
              className="absolute top-3 right-3 text-xs font-heading font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(232,163,61,0.2)',
                color: '#E8A33D',
                border: '1px solid rgba(232,163,61,0.3)',
              }}
            >
              {project.badge}
            </span>
          )}
          {/* Bottom fade */}
          <div className="project-img-overlay absolute inset-0" />
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Title + tagline */}
          <div>
            <h3
              className="font-heading font-bold text-lg leading-tight"
              style={{ color: '#F3EFE7', letterSpacing: '-0.01em' }}
            >
              {project.title}
            </h3>
            <p className="text-xs font-medium mt-0.5" style={{ color: '#E8A33D' }}>
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: '#A6ADBB', lineHeight: 1.7 }}
          >
            {project.description}
          </p>

          {/* Stack chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(tech => (
              <span key={tech} className="tag-chip text-xs">
                {tech}
              </span>
            ))}
          </div>

          {/* ── Action buttons row ── */}
          <div
            className="flex items-center gap-2 mt-1 pt-3"
            style={{ borderTop: '1px solid #2A2F3A' }}
          >
            {/* GitHub icon button */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn flex-shrink-0"
              aria-label={`${project.title} GitHub repository`}
              style={{ width: '36px', height: '36px' }}
            >
              <Github size={15} />
            </a>

            {/* Live Demo — full-width pill button if URL exists, placeholder if not */}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-heading font-semibold transition-all duration-200"
                style={{
                  background: 'rgba(232,163,61,0.12)',
                  color: '#E8A33D',
                  border: '1px solid rgba(232,163,61,0.3)',
                }}
                aria-label={`${project.title} Live Demo`}
                onMouseEnter={e => {
                  ; (e.currentTarget as HTMLElement).style.background = '#E8A33D'
                    ; (e.currentTarget as HTMLElement).style.color = '#0B0E14'
                }}
                onMouseLeave={e => {
                  ; (e.currentTarget as HTMLElement).style.background = 'rgba(232,163,61,0.12)'
                    ; (e.currentTarget as HTMLElement).style.color = '#E8A33D'
                }}
              >
                <ExternalLink size={13} />
                Live Demo
              </a>
            ) : (
              <span
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-heading font-medium"
                style={{
                  background: '#1A1E27',
                  color: '#2A2F3A',
                  border: '1px solid #2A2F3A',
                }}
              >
                <ExternalLink size={13} />
                Demo coming soon
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* --------------------------------------------------------
   Projects Section with Embla Carousel
   — Auto-scrolls right-to-left every 3 seconds
   — Pauses on hover/touch, resumes on leave
-------------------------------------------------------- */
export default function Projects() {
  // 3000ms = 3-second interval as requested
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, rootNode: (emblaRoot) => emblaRoot.parentElement })
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: false,           // snappy snapping, not free drag (better for mobile)
      containScroll: 'trimSnaps', // prevents partial cards at edges on mobile
    },
    [autoplay.current]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="section-padding" style={{ backgroundColor: '#0B0E14' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          ref={headingRef}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="kicker mb-3">( 03 ) PROJECTS</p>
            <h2 className="section-heading">
              Things I've <span className="text-amber-gradient">actually built</span>
            </h2>
            <p className="mt-2 text-sm" style={{ color: '#A6ADBB' }}>
              Drag or use arrows to browse
            </p>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              id="projects-prev"
              onClick={scrollPrev}
              className="social-btn"
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              id="projects-next"
              onClick={scrollNext}
              className="social-btn"
              aria-label="Next project"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Carousel wrapper — overflow hidden clips cards neatly on mobile */}
        <div
          className="embla"
          ref={emblaRef}
          onMouseEnter={() => autoplay.current.stop()}
          onMouseLeave={() => autoplay.current.play()}
          style={{ overflow: 'hidden' }}
        >
          <div className="embla__container py-4" style={{ gap: '20px' }}>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              id={`project-dot-${i}`}
              className={`embla-dot transition-all duration-300 ${i === selectedIndex ? 'embla-dot--active' : ''
                }`}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
