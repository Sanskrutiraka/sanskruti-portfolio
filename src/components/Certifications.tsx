import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/* --------------------------------------------------------
   Certification Data
-------------------------------------------------------- */
interface Cert {
  id: string
  title: string
  issuer: string
  platform: string
  icon: string
  color: string
  link?: string
  image?: string
  year?: string
}

const certifications: Cert[] = [
  {
    id: 'fortune-fullstack',
    title: 'Full Stack Java Developer',
    issuer: 'Fortune Cloud',
    platform: 'Fortune Cloud Technology',
    icon: '☕',
    color: '#E8A33D',
    year: '2023',
    image: '/Docs/certifications/fortune-fullstack.jpeg',
    link: 'https://drive.google.com/file/d/1fortune-fullstack/view',
  },
  {
    id: 'linkedin-prompt',
    title: 'Prompt Engineering',
    issuer: 'LinkedIn Learning',
    platform: 'LinkedIn Learning — August 2025',
    icon: '💬',
    color: '#9B59B6',
    year: '2025',
    image: '/Docs/certifications/prompt-eng.png',
    link: 'https://www.linkedin.com/learning/certificates/',
  },
  {
    id: 'ms-genai',
    title: 'Generative AI',
    issuer: 'Microsoft',
    platform: 'Microsoft — Generative AI Program',
    icon: '🤖',
    color: '#0078D4',
    year: '2025',
    image: '/Docs/certifications/generative-ai-microsoft.png',
    link: 'https://www.linkedin.com/learning/certificates/generative-ai-fundamentals',
  },
  {
    id: 'nptel-java',
    title: 'Programming in Java',
    issuer: 'IIT / NPTEL',
    platform: 'NPTEL — Jan–Apr 2025 · Score: 71%',
    icon: '🎓',
    color: '#6FCF97',
    year: '2025',
    image: '/Docs/certifications/NPTEL-java.png',
    link: 'https://nptel.ac.in/noc/Ecertificate/',
  },
  {
    id: 'jpmorgan-forage',
    title: 'Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase & Co.',
    platform: 'Forage — August 2025',
    icon: '🏦',
    color: '#E8A33D',
    year: '2025',
    image: '/Docs/certifications/soft-eng-jpmorgan.png',
    link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/R5iK7HMxJGBgaSbvk_J.P.%20Morgan_certificate.pdf',
  },
  {
    id: 'jpmorgan-forage',
    title: 'Software Engineering Job Simulation',
    issuer: 'Accenture',
    platform: 'Forage — August 2025',
    icon: '🏦',
    color: '#9B59B6',
    year: '2025',
    image: '/Docs/certifications/soft-eng-accenture.png',
    link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/R5iK7HMxJGBgaSbvk_J.P.%20Morgan_certificate.pdf',
  },
  {
    id: 'simplilearn-java',
    title: 'Java Programming',
    issuer: 'Simplilearn SkillUp',
    platform: 'SkillUp by Simplilearn — February 2023',
    icon: '🔷',
    color: '#0078D4',
    year: '2023',
    image: '/Docs/certifications/skillup-java.png',
    link: 'https://simplilearn.com/skillup-certificate-landing',
  },
  {
    id: 'outskill-genai',
    title: 'Generative AI',
    issuer: 'Outskill',
    platform: 'Outskill — GenAI Training',
    icon: '✨',
    color: '#6FCF97',
    year: '2025',
    image: '/Docs/certifications/gen-ai-outskill.png',
  },
]

/* --------------------------------------------------------
   Responsive card width hook
   xs  < 480  → 1 card  fills ~90vw
   sm  < 768  → 1.2 cards visible  (each ~75vw)
   md  < 1024 → 2 cards visible    (each ~44vw)
   lg  ≥ 1024 → 3 cards visible    (each ~30vw, max 340px)
-------------------------------------------------------- */
function useCardWidth() {
  const [width, setWidth] = useState(300)

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth
      if (vw < 480) setWidth(Math.min(vw - 48, 320))   // 1 card, 24px side padding each
      else if (vw < 768) setWidth(Math.round(vw * 0.75))     // ~1.2 visible
      else if (vw < 1024) setWidth(Math.round(vw * 0.44))     // ~2 visible
      else setWidth(Math.min(340, Math.round(vw * 0.28))) // ~3 visible, max 340
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return width
}

/* --------------------------------------------------------
   Flip Card
-------------------------------------------------------- */
function CertCard({ cert, cardWidth }: { cert: Cert; cardWidth: number }) {
  const [flipped, setFlipped] = useState(false)
  // A4 landscape ratio ≈ 1.414 : 1  →  height = width / 1.414
  const cardHeight = Math.round(cardWidth / 1.42)

  return (
    <div
      className="embla__slide"
      style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px`, marginRight: '10px' }}
    >
      {/* 3-D flip container */}
      <div style={{ width: `${cardWidth}px`, height: `${cardHeight}px`, perspective: '1200px' }}>
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* ── FRONT FACE ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <motion.div
              className="card p-5 flex flex-col gap-3 h-full"
              whileHover={flipped ? {} : { scale: 1.02, y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              {/* Top row: icon + year */}
              <div className="flex items-start justify-between">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: `${cert.color}18`,
                    border: `1px solid ${cert.color}30`,
                  }}
                >
                  {cert.icon}
                </div>
                {cert.year && (
                  <span
                    className="text-xs font-body font-semibold px-2 py-0.5 rounded-md"
                    style={{
                      color: cert.color,
                      background: `${cert.color}15`,
                      border: `1px solid ${cert.color}30`,
                    }}
                  >
                    {cert.year}
                  </span>
                )}
              </div>

              {/* Title + issuer + platform */}
              <div className="flex flex-col gap-1 flex-1 min-h-0">
                <h3
                  className="font-heading font-bold text-sm leading-tight"
                  style={{ color: '#F3EFE7', letterSpacing: '-0.01em' }}
                >
                  {cert.title}
                </h3>
                <p className="font-heading font-semibold text-xs" style={{ color: cert.color }}>
                  {cert.issuer}
                </p>
                <p
                  className="text-xs mt-auto pt-2 truncate"
                  style={{ color: '#A6ADBB', borderTop: '1px solid #2A2F3A' }}
                >
                  {cert.platform}
                </p>
              </div>

              {/* Open Certificate — flips card */}
              <button
                onClick={() => setFlipped(true)}
                className="flex items-center justify-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-80 hover:scale-105 w-full"
                style={{
                  background: `${cert.color}22`,
                  border: `1px solid ${cert.color}55`,
                  color: cert.color,
                  cursor: 'pointer',
                }}
                aria-label={`Open ${cert.title} certificate`}
              >
                Open Certificate
              </button>
            </motion.div>
          </div>

          {/* ── BACK FACE — full-bleed image + ✕ top-right ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {cert.image ? (
              /* Click image → open in same tab */
              <a
                href={cert.image}
                target="_self"
                aria-label={`View full ${cert.title} certificate`}
                style={{ display: 'block', width: '100%', height: '100%' }}
              >
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    cursor: 'zoom-in',
                  }}
                />
              </a>
            ) : (
              /* No image — styled fallback */
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, #12151C 0%, ${cert.color}18 100%)`,
                  border: `1px solid ${cert.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '28px', opacity: 0.45 }}>{cert.icon}</span>
                <p className="text-xs" style={{ color: `${cert.color}80` }}>No image available</p>
              </div>
            )}

            {/* ✕ close button — floats above everything */}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFlipped(false) }}
              aria-label="Flip back"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(11,14,20,0.80)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#F3EFE7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={12} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------
   Certifications Section
-------------------------------------------------------- */
export default function Certifications() {
  const cardWidth = useCardWidth()

  // No autoplay — mouse drag + touch scroll only
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
    watchDrag: true,   // enable mouse & touch drag
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
            <p className="kicker mb-3">( 06 ) CERTIFICATIONS</p>
            <h2 className="section-heading max-w-lg">
              Credentials &{' '}
              <span className="text-amber-gradient">learning milestones</span>
            </h2>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center gap-2">
            <button
              id="certs-prev"
              onClick={scrollPrev}
              className="social-btn"
              aria-label="Previous certification"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              id="certs-next"
              onClick={scrollNext}
              className="social-btn"
              aria-label="Next certification"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Carousel — drag / touch / button nav, no autoplay */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container py-4">
            {certifications.map(cert => (
              <CertCard key={cert.id} cert={cert} cardWidth={cardWidth} />
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              id={`cert-dot-${i}`}
              className={`embla-dot transition-all duration-300 ${i === selectedIndex ? 'embla-dot--active' : ''}`}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to cert ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
