import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import { Github, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, Laptop } from 'lucide-react'

/* --------------------------------------------------------
   Project Data Interfaces & Definitions
-------------------------------------------------------- */
interface Project {
  id: string
  title: string
  tagline: string
  bullets?: string[]
  description?: string
  stack: string[]
  github: string
  live: string
  image?: string
  badge?: string
  badgeColor?: string
}

const mainProjects: Project[] = [
  {
    id: 'civicpulse',
    title: 'CivicPulse+',
    tagline: 'AI-Augmented Public Grievance Resolution Platform',
    bullets: [
      'Microservices Architecture: 6 Spring Boot 3.2 services (API Gateway, User Service with JWT authentication and RBAC, Grievance Engine, Notification, Audit, Analytics).',
      'FastAPI AI Service: Hugging Face Inference APIs for zero-shot classification across 14+ departments with Human-in-the-Loop (HITL) review queue.',
      'Triage & Duplicates: Rule-based urgency scoring and embedding-based cosine similarity duplicate detection with an in-memory index.',
      'Event Streaming & Profiles: Apache Kafka event-driven pipelines in local architecture; Render deploy profile uses REST event delivery (omitting separate Notification Service).',
    ],
    stack: [
      'Java 17',
      'Spring Boot 3.2',
      'Python FastAPI',
      'PostgreSQL',
      'Apache Kafka',
      'Redis',
      'Docker',
      'React 18',
      'Spring Cloud Gateway',
      'Hugging Face APIs',
    ],
    github: 'https://github.com/Sanskrutiraka/CivicPulse',
    live: 'https://civicpulse.onrender.com',
    image: '/projects/CivicPulse-Plus.png',
    badge: 'GovTech Microservices',
    badgeColor: '#E8A33D',
  },
  {
    id: 'parkvahan',
    title: 'ParkVahan',
    tagline: 'Smart Parking & Mobility Platform — Internship Project',
    bullets: [
      'Internship Contribution: Developed core features and workflows during Software Development Internship at AmbuGrid System LLP.',
      'Cross-Platform Stack: Built responsive application surfaces using React Native, Expo, React.js, and Node.js/Express.',
      'Data & Workflows: Implemented PostgreSQL/Supabase database schemas, vehicle space telemetry, and REST API integrations.',
      'Quality & Testing: Handled debugging, Postman API testing, and Git version control across mobile and web.',
    ],
    stack: [
      'React Native',
      'Expo',
      'React.js',
      'Node.js',
      'Express.js',
      'Supabase',
      'PostgreSQL',
      'REST APIs',
      'Git',
    ],
    github: 'https://github.com/Sanskrutiraka/ParkVahan',
    live: 'https://parkvahan.com',
    image: '/projects/ParkVahan.png',
    badge: 'Internship Project',
    badgeColor: '#5FA8A0',
  },
  {
    id: 'complaint-router',
    title: 'Smart Complaint Routing System',
    tagline: 'Java & Spring Boot Backend Architecture',
    bullets: [
      'Java Spring Boot Backend: Modular REST API architecture with complaint registration, user management, and category routing.',
      'State & Lifecycle Tracking: Managed complaint status transitions, admin/user workflows, and database persistence with MySQL.',
      'Error Handling & Validation: Custom global exception handling, robust input validation, and comprehensive Postman test suites.',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'MySQL',
      'Hibernate / JPA',
      'REST APIs',
      'Postman',
      'Git',
    ],
    github: 'https://github.com/Sanskrutiraka/smart-complaint-router',
    live: 'https://github.com/Sanskrutiraka/smart-complaint-router',
    image: '/projects/complaint-router.png',
    badge: 'Java Backend',
    badgeColor: '#A78BFA',
  },
  {
    id: 'shopsphere',
    title: 'ShopSphere',
    tagline: 'AI-Enabled E-Commerce Platform — Hackathon',
    bullets: [
      'Hackathon Project: Full-stack AI-powered e-commerce platform built with Code Worriers hackathon team.',
      'AI Assistant Integration: Integrated Google Gemini API for intelligent conversational shopping and contextual recommendations.',
      'Modern Frontend: Built dynamic catalog, cart state, and responsive checkout workflows with React and Tailwind CSS.',
    ],
    stack: [
      'React',
      'JavaScript',
      'Google Gemini AI',
      'Tailwind CSS',
      'Django REST',
      'PostgreSQL',
      'Vercel',
    ],
    github: 'https://github.com/Sanskrutiraka/shopsphere-ecommerce',
    live: 'https://shopsphere-ecommerce-dusky.vercel.app',
    image: '/projects/ShopSphere.png',
    badge: 'Hackathon Project',
    badgeColor: '#EC4899',
  },
]

const otherProjects: Project[] = [
  {
    id: 'focusdo',
    title: 'FocusDo',
    tagline: 'Full-Stack Productivity & Task Management App',
    bullets: [
      'Full-Stack Architecture: React Native frontend backed by Node.js + Express REST API with MongoDB persistence.',
      'Auth & Gamification: JWT token authentication with gamified Focus Garden state animations for daily streaks.',
      'Cross-Platform Deployment: Deployed and live on Vercel and Render.',
    ],
    stack: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'TypeScript', 'Vercel'],
    github: 'https://github.com/Sanskrutiraka/FocusDo',
    live: 'https://focus-do-task.vercel.app',
    image: '/projects/FocusDo.png',
    badge: 'Full-Stack App',
    badgeColor: '#EC4899',
  },
  {
    id: 'vehicle-plate',
    title: 'Vehicle Plate Check & Audit',
    tagline: 'Automated License Plate Verification & Audit System',
    bullets: [
      'Vision & OCR: Automated vehicle license plate query interface with real-time detection logs.',
      'Security Audit Pipeline: Entry/exit timestamp auditing, vehicle verification status, and historical logs dashboard.',
      'Production Deployment: Built with TypeScript, React, Vite, and Tailwind CSS; hosted on Vercel.',
    ],
    stack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'OCR / APIs', 'Vercel'],
    github: 'https://github.com/Sanskrutiraka/vehicle-plate-check-audit',
    live: 'https://vehicle-plate-check-audit.vercel.app',
    image: '/projects/vehicle-plate-check.png',
    badge: 'Vision & Audit',
    badgeColor: '#06B6D4',
  },
]

/* --------------------------------------------------------
   Standard Laptop Screen Frame Mockup
   Standard laptop screen ratio: 16:10
   (URL link removed from top as requested)
-------------------------------------------------------- */
function LaptopMockup({
  image,
  title,
  badge,
  badgeColor,
}: {
  image?: string
  title: string
  badge?: string
  badgeColor?: string
}) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="relative w-full pt-2 px-2 bg-[#121620] rounded-t-2xl border-t border-x border-[#2A2F3A] flex-shrink-0">
      {/* Laptop Screen Bezel */}
      <div className="relative bg-[#0A0D14] rounded-t-xl overflow-hidden border border-[#1E2330] shadow-inner">
        {/* Laptop Top Browser Bar (with Badge in horizontal space) */}
        <div className="h-7 bg-[#161B26] px-3 flex items-center justify-between border-b border-[#232938]">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#FF5F56]/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]/80 inline-block" />
            <span className="w-2 h-2 rounded-full bg-[#27C93F]/80 inline-block" />
          </div>

          {/* Subtle camera lens indicator */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#2A3142] hidden sm:inline-block" />

          {/* Badge moved to top bar horizontal space */}
          {badge ? (
            <span
              className="text-[10px] font-heading font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm"
              style={{
                background: `${badgeColor || '#E8A33D'}22`,
                color: badgeColor || '#E8A33D',
                border: `1px solid ${badgeColor || '#E8A33D'}44`,
              }}
            >
              <CheckCircle2 size={10} />
              {badge}
            </span>
          ) : (
            <div className="w-6" />
          )}
        </div>

        {/* Laptop Screen Display (16:10 standard laptop aspect ratio) - whole image fully visible */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#07090E] flex items-center justify-center p-0.5">
          {image && !imageFailed ? (
            <img
              src={image}
              alt={`${title} thumbnail`}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            /* Clean drop-in placeholder when user hasn't added the screenshot yet */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#121622] to-[#0A0D14]">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-2 border"
                style={{
                  background: `${badgeColor || '#E8A33D'}15`,
                  borderColor: `${badgeColor || '#E8A33D'}35`,
                  color: badgeColor || '#E8A33D',
                }}
              >
                <Laptop size={20} />
              </div>
              <p className="text-xs font-heading font-semibold text-[#F3EFE7] tracking-wide">
                {title}
              </p>
              <p className="text-[11px] text-[#6B7280] mt-1 font-mono">
                {image ? image.replace('/projects/', '') : 'Add screenshot in public/projects/'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Laptop Hinge / Lower Lip */}
      <div className="h-1.5 w-full bg-[#1A1F2C] border-t border-[#262D3D] rounded-b-sm flex items-center justify-center">
        <div className="w-10 h-0.5 bg-[#0B0E14] rounded-full opacity-60" />
      </div>
    </div>
  )
}

/* --------------------------------------------------------
   Unified Project Card
   Standard structure across every project:
   - Laptop mockup with thumbnail
   - Title & tagline
   - Structured bullet points
   - Clickable tech stack (7 initial + clickable "+N more" to expand)
   - Exactly TWO action buttons: Source Code (Github) + Live Link
-------------------------------------------------------- */
function ProjectCard({ project }: { project: Project }) {
  const [showAllStack, setShowAllStack] = useState(false)
  const INITIAL_STACK_COUNT = 7

  const visibleStack = showAllStack
    ? project.stack
    : project.stack.slice(0, INITIAL_STACK_COUNT)
  const remainingCount = project.stack.length - INITIAL_STACK_COUNT

  return (
    <div className="card overflow-hidden flex flex-col h-full group transition-all duration-300 hover:border-amber-500/40">
      {/* Laptop Frame Mockup */}
      <LaptopMockup
        image={project.image}
        title={project.title}
        badge={project.badge}
        badgeColor={project.badgeColor}
      />

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title + Tagline */}
        <div>
          <h3
            className="font-heading font-bold text-lg leading-tight transition-colors duration-200 group-hover:text-amber-400"
            style={{ color: '#F3EFE7', letterSpacing: '-0.01em' }}
          >
            {project.title}
          </h3>
          <p className="text-xs font-medium mt-1" style={{ color: '#E8A33D' }}>
            {project.tagline}
          </p>
        </div>

        {/* Structured Bullets (or fallback description) */}
        {project.bullets ? (
          <ul className="space-y-1.5 text-xs text-[#A6ADBB] leading-relaxed my-1 flex-1">
            {project.bullets.map((b, idx) => {
              const parts = b.split(': ')
              const hasPrefix = parts.length > 1
              return (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0 text-[11px]">▹</span>
                  <span>
                    {hasPrefix ? (
                      <>
                        <strong className="text-[#F3EFE7] font-semibold">
                          {parts[0]}:{' '}
                        </strong>
                        <span>{parts.slice(1).join(': ')}</span>
                      </>
                    ) : (
                      b
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
        ) : (
          <p
            className="text-xs sm:text-sm leading-relaxed flex-1"
            style={{ color: '#A6ADBB', lineHeight: 1.65 }}
          >
            {project.description}
          </p>
        )}

        {/* Tech Stack Chips: initially 7, then clickable "+N more" to expand */}
        <div className="flex flex-wrap gap-1.5 pt-1 items-center">
          {visibleStack.map(tech => (
            <span key={tech} className="tag-chip text-[11px] py-0.5 px-2">
              {tech}
            </span>
          ))}
          {project.stack.length > INITIAL_STACK_COUNT && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation()
                setShowAllStack(prev => !prev)
              }}
              className="text-[11px] font-heading font-semibold text-amber-400/90 hover:text-amber-300 py-0.5 px-2 rounded bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 transition-all cursor-pointer"
              aria-label={
                showAllStack
                  ? 'Show fewer technologies'
                  : `Show ${remainingCount} more technologies`
              }
            >
              {showAllStack ? 'Show less' : `+${remainingCount} more`}
            </button>
          )}
        </div>

        {/* EXACTLY TWO Action Buttons: Source Code (GitHub icon) & Live Link */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[#2A2F3A]">
          {/* 1. Source Code */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-heading font-semibold transition-all duration-200 border border-[#2A2F3A] bg-[#12161F] text-[#A6ADBB] hover:text-[#F3EFE7] hover:border-amber-400/40 hover:bg-[#1A1F2B]"
            aria-label={`${project.title} Source Code`}
          >
            <Github size={14} />
            <span>Source Code</span>
          </a>

          {/* 2. Live Link */}
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-heading font-semibold transition-all duration-200 border border-amber-500/30 bg-amber-500/10 text-[#E8A33D] hover:bg-[#E8A33D] hover:text-[#0B0E14] hover:shadow-[0_0_16px_rgba(232,163,61,0.35)]"
            aria-label={`${project.title} Live Link`}
          >
            <ExternalLink size={13} />
            <span>Live Link</span>
          </a>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------
   Reusable Horizontal Sliding Carousel
   - Auto-scrolls smoothly every 3.5 seconds
   - Pause on hover / touch
   - Snappy drag & swipe
   - Arrow navigation & pagination dots
-------------------------------------------------------- */
function ProjectCarousel({
  items,
  sectionId,
}: {
  items: Project[]
  sectionId: string
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: false,
    containScroll: 'trimSnaps',
  })

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
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    if (emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev()
    } else {
      emblaApi.scrollTo(scrollSnaps.length - 1)
    }
  }, [emblaApi, scrollSnaps])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext()
    } else {
      emblaApi.scrollTo(0)
    }
  }, [emblaApi])

  return (
    <div className="relative">
      {/* Controls Bar for this Carousel */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-[#8E96A4]">
          Swipe or drag to browse · Use arrows to navigate
        </p>
        <div className="flex items-center gap-2">
          <button
            id={`${sectionId}-prev`}
            onClick={scrollPrev}
            className="social-btn"
            style={{ width: '36px', height: '36px' }}
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            id={`${sectionId}-next`}
            onClick={scrollNext}
            className="social-btn"
            style={{ width: '36px', height: '36px' }}
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Embla Carousel Viewport */}
      <div
        className="embla overflow-hidden -mx-2 px-2 py-2"
        ref={emblaRef}
      >
        <div className="embla__container flex gap-5">
          {items.map(project => (
            <div
              key={project.id}
              className="embla__slide w-[88vw] sm:w-[380px] md:w-[420px] lg:w-[460px] flex-shrink-0"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            id={`${sectionId}-dot-${i}`}
            className={`embla-dot transition-all duration-300 ${i === selectedIndex ? 'embla-dot--active' : ''
              }`}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* --------------------------------------------------------
   Main Projects Section Component
-------------------------------------------------------- */
export default function Projects() {
  const { ref: headingRef, inView: headingInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div className="section-padding" style={{ backgroundColor: '#0B0E14' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headingRef}
          className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="kicker mb-3">( 03 ) PROJECTS</p>
            <h2 className="section-heading">
              Featured Projects &{' '}
              <span className="text-amber-gradient">Engineering Work</span>
            </h2>
            <p className="mt-2 text-sm" style={{ color: '#A6ADBB' }}>
              Microservices platforms, full-stack systems, internship deliverables, and hackathon architectures.
            </p>
          </div>
        </motion.div>

        {/* Main Projects Horizontal Slider */}
        <div className="mb-14">
          <ProjectCarousel items={mainProjects} sectionId="featured-projects" />
        </div>

        {/* Other Projects Section with Horizontal Slider */}
        <div className="pt-8 border-t border-[#1E2330]">
          <div className="mb-4">
            <h3
              className="font-heading font-semibold text-lg"
              style={{ color: '#F3EFE7' }}
            >
              Other Projects & Experiments
            </h3>
            <p className="text-xs text-[#8E96A4] mt-0.5">
              Production web applications, mobile task managers, and computer vision systems.
            </p>
          </div>

          <ProjectCarousel items={otherProjects} sectionId="other-projects" />
        </div>
      </div>
    </div>
  )
}
