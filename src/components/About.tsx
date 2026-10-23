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
    value: '4+',
    label: 'Projects — Backend, Mobile & Full-Stack',
    icon: <Code2 size={18} />,
    delay: 0.1,
  },
  {
    value: 'Intern',
    label: 'Software Development Intern · Jun 2026–Present · AmbuGrid System LLP',
    icon: <Briefcase size={18} />,
    delay: 0.2,
  },
  {
    value: '8.75',
    label: 'MCA CGPA · Sinhgad Institute, SPPU',
    icon: <GraduationCap size={18} />,
    delay: 0.3,
  },
  {
    value: 'Pune',
    label: 'Pune, Maharashtra · Open to Pune / Bangalore / Remote',
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
            <span className="text-amber-gradient">Junior Software Engineer</span>
          </h2>
        </RevealOnScroll>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">

          {/* ——— LEFT: Narrative ——— */}
          <RevealOnScroll delay={0.1}>
            <div className="space-y-5">
              <p className="text-base leading-relaxed" style={{ color: '#A6ADBB', lineHeight: 1.8 }}>
                I'm <span style={{ color: '#F3EFE7' }}>Sanskruti Raka</span>, an MCA graduate (2026)
                and Software Development Intern at{' '}
                <span style={{ color: '#E8A33D' }}>AmbuGrid System LLP</span>. I designed
                and built <span style={{ color: '#F3EFE7' }}>CivicPulse+</span>, an AI-augmented
                public grievance resolution platform powered by Spring Boot microservices,
                Apache Kafka, Python FastAPI, and React.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#A6ADBB', lineHeight: 1.8 }}>
                My core expertise is <span style={{ color: '#E8A33D' }}>Java, Spring Boot, REST APIs,
                and SQL</span>. Through my internship work on the ParkVahan mobility platform and my
                academic systems, I have hands-on experience designing RESTful services, integrating
                relational databases, debugging multi-service workflows, and building responsive client
                interfaces.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#A6ADBB', lineHeight: 1.8 }}>
                I'm looking for an <span style={{ color: '#F3EFE7' }}>entry-level Software Engineer
                or Java Backend Developer</span> role where I can contribute to production systems, solve
                challenging engineering problems, and continue growing.
              </p>

              {/* Highlight pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['MCA 2026', 'Java & Spring Boot', 'Microservices', 'REST APIs', 'Apache Kafka', 'SQL & PostgreSQL', 'React Native'].map(tag => (
                  <span key={tag} className="tag-chip">{tag}</span>
                ))}
              </div>

              {/* Quote / philosophy */}
              <blockquote
                className="mt-6 pl-5 py-1"
                style={{ borderLeft: '3px solid #E8A33D' }}
              >
                <p className="text-sm italic" style={{ color: '#A6ADBB' }}>
                  "I enjoy understanding how software components work together —
                  and building applications that are clear, maintainable, and reliable."
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
