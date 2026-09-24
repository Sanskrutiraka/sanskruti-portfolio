import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Briefcase, Code2, GraduationCap } from 'lucide-react'

/* --------------------------------------------------------
   Scroll-reveal wrapper
-------------------------------------------------------- */
function RevealOnScroll({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* --------------------------------------------------------
   Stat Card
-------------------------------------------------------- */
interface StatCardProps {
  value: string
  label: string
  icon: React.ReactNode
  delay: number
}
function StatCard({ value, label, icon, delay }: StatCardProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      className="stat-card flex flex-col gap-3"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(232,163,61,0.1)', color: '#E8A33D' }}
        >
          {icon}
        </div>
        <span
          className="text-3xl font-heading font-bold tracking-tight"
          style={{ color: '#E8A33D', letterSpacing: '-0.03em' }}
        >
          {value}
        </span>
      </div>
      <p className="text-sm font-body" style={{ color: '#A6ADBB', lineHeight: 1.5 }}>
        {label}
      </p>
    </motion.div>
  )
}

/* --------------------------------------------------------
   About Section
-------------------------------------------------------- */
const stats: StatCardProps[] = [
  {
    value: '3+',
    label: 'Full-Stack & Backend Projects',
    icon: <Code2 size={18} />,
    delay: 0.1,
  },
  {
    value: '3+Months',
    label: 'Software Development Internship Experience at AmbuGrid System',
    icon: <Briefcase size={18} />,
    delay: 0.2,
  },
  {
    value: '8.75',
    label: 'MCA CGPA',
    icon: <GraduationCap size={18} />,
    delay: 0.3,
  },
  {
    value: 'Pune',
    label: 'Open to Pune / Bangalore / Pan India Remote — available immediately',
    icon: <MapPin size={18} />,
    delay: 0.4,
  },
]

export default function About() {
  return (
    <div
      className="section-padding"
      style={{ backgroundColor: '#0B0E14' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <RevealOnScroll className="mb-14">
          <p className="kicker mb-3">( 01 ) ABOUT</p>
          <h2 className="section-heading max-w-lg">
            MCA Graduate —<br />
            <span className="text-amber-gradient">Backend Engineer in the making</span>
          </h2>
        </RevealOnScroll>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">

          {/* ——— LEFT: Narrative ——— */}
          <RevealOnScroll delay={0.1}>
            <div className="space-y-5">
              <p className="text-base leading-relaxed" style={{ color: '#A6ADBB', lineHeight: 1.8 }}>
                I'm <span style={{ color: '#F3EFE7' }}>Sanskruti Raka</span>, an MCA postgraduate
                (passout <span style={{ color: '#F3EFE7' }}>June 2026</span>) from Savitribai Phule Pune University.
                My postgraduate journey was where I went from writing basic programs to shipping
                real microservices — learning not just the "how" but the "why" behind scalable system design.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#A6ADBB', lineHeight: 1.8 }}>
                I specialize in <span style={{ color: '#E8A33D' }}>Java & Spring Boot</span> — building
                production-grade REST APIs, microservice architectures, and distributed systems using
                PostgreSQL, Redis, Kafka, and Docker. During my MCA I shipped a 4-service GovTech
                platform, completed a software development internship, and built a hackathon full-stack app.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#A6ADBB', lineHeight: 1.8 }}>
                What I'm looking for: a <span style={{ color: '#F3EFE7' }}>backend or full-stack role</span> where
                I can contribute to real products from day one, collaborate with senior engineers,
                and keep growing fast. Open to Pune, Bangalore, or fully remote.
              </p>

              {/* Highlight pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['MCA 2026', 'Java & Spring Boot', 'Microservices', 'REST APIs', 'Open Source'].map(tag => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>

              {/* Quote / philosophy */}
              <blockquote
                className="mt-6 pl-5 py-1"
                style={{ borderLeft: '3px solid #E8A33D' }}
              >
                <p className="text-sm italic" style={{ color: '#A6ADBB' }}>
                  "Every complex system is just simple, well-defined components interacting reliably.
                  That's the engineering principle I obsess over — and what MCA taught me to apply in practice."
                </p>
              </blockquote>
            </div>
          </RevealOnScroll>

          {/* ——— RIGHT: Stat Cards ——— */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map(stat => (
              <StatCard key={stat.value + stat.label} {...stat} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
