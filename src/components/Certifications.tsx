import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

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
  },
  {
    id: 'ms-genai',
    title: 'Generative AI Fundamentals',
    issuer: 'Microsoft',
    platform: 'LinkedIn Learning by Microsoft',
    icon: '🤖',
    color: '#0078D4',
    year: '2025',
  },
  {
    id: 'jpmorgan-forage',
    title: 'Software Engineering Virtual Experience',
    issuer: 'JPMorgan Chase & Co.',
    platform: 'Forage',
    icon: '🏦',
    color: '#003087',
    year: '2024',
  },
  {
    id: 'nptel-java',
    title: 'Programming in Java',
    issuer: 'IIT / NPTEL',
    platform: 'NPTEL',
    icon: '🎓',
    color: '#5FA8A0',
    year: '2024',
  },
  {
    id: 'simplilearn-java',
    title: 'Java Programming Masterclass',
    issuer: 'Simplilearn / SkillUp',
    platform: 'SkillUp by Simplilearn',
    icon: '🔷',
    color: '#6FCF97',
    year: '2023',
  },
]

/* --------------------------------------------------------
   Cert Card
-------------------------------------------------------- */
function CertCard({ cert }: { cert: Cert }) {
  return (
    <div className="embla__slide" style={{ width: '260px' }}>
      <motion.div
        className="card p-6 flex flex-col gap-4 h-full"
        style={{ minHeight: '200px' }}
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        {/* Icon circle */}
        <div className="flex items-start justify-between">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}30` }}
          >
            {cert.icon}
          </div>
          <div className="flex items-center gap-1">
            {cert.year && (
              <span className="text-xs font-body" style={{ color: '#2A2F3A' }}>
                {cert.year}
              </span>
            )}
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                style={{ width: '28px', height: '28px' }}
                aria-label={`View ${cert.title} certificate`}
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 flex-1">
          <h3
            className="font-heading font-bold text-sm leading-tight"
            style={{ color: '#F3EFE7', letterSpacing: '-0.01em' }}
          >
            {cert.title}
          </h3>
          <p className="font-heading font-semibold text-xs" style={{ color: cert.color }}>
            {cert.issuer}
          </p>
          <p className="text-xs mt-auto pt-2" style={{ color: '#A6ADBB', borderTop: '1px solid #2A2F3A' }}>
            {cert.platform}
          </p>
        </div>

        {/* Badge indicator */}
        <div className="flex items-center gap-1.5">
          <Award size={12} style={{ color: cert.color }} />
          <span className="text-xs font-medium" style={{ color: cert.color }}>
            Verified Certificate
          </span>
        </div>
      </motion.div>
    </div>
  )
}

/* --------------------------------------------------------
   Certifications Section
-------------------------------------------------------- */
export default function Certifications() {
  const autoplay = useRef(Autoplay({ delay: 2800, stopOnInteraction: true }))
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
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
            <p className="kicker mb-3">( 06 ) CERTIFICATIONS</p>
            <h2 className="section-heading max-w-lg">
              Credentials &{' '}
              <span className="text-amber-gradient">learning milestones</span>
            </h2>
          </div>
          {/* Controls */}
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

        {/* Carousel */}
        <div
          className="embla"
          ref={emblaRef}
          onMouseEnter={() => autoplay.current.stop()}
          onMouseLeave={() => autoplay.current.play()}
        >
          <div className="embla__container py-4">
            {certifications.map(cert => (
              <CertCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>

        {/* Dots */}
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
