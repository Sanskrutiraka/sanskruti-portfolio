import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react'

/* --------------------------------------------------------
   Experience Data
-------------------------------------------------------- */
const experiences = [
  {
    id: 'intern-1',
    role: 'Software Development Intern',
    company: 'AmbuGrid System LLP',
    duration: 'Jun 2026 – Oct 2026',
    location: 'Pune, MH (Hybrid)',
    type: 'Internship',
    bullets: [
      'Built and shipped ParkVahan — a full-stack smart parking management platform with Spring Boot REST APIs, role-based access (driver/owner/guard), JWT authentication, and a React dashboard; reduced manual parking-slot lookup time by ~60%.',
      'Implemented a PostgreSQL-backed slot booking engine with real-time availability tracking and maps integration (geolocation + EV charging overlays), handling concurrent booking with Spring Boot transactional guarantees.',
      'Collaborated with a team of 4, followed agile sprint cycles, performed code reviews, wrote Swagger/OpenAPI docs, and deployed services via Docker Compose on an on-premise Linux server.',
    ],
    stack: ['React Native', 'Node.js ', 'Express.js', 'PostgreSQL', 'React', 'Docker', 'JWT', 'Swagger'],
  },
]

/* --------------------------------------------------------
   Timeline Entry
-------------------------------------------------------- */
function TimelineEntry({
  experience,
  delay,
}: {
  experience: typeof experiences[0]
  delay: number
}) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-8"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center pt-1 flex-shrink-0">
        <div className="timeline-dot" />
        <div
          className="flex-1 w-px mt-3"
          style={{ background: 'linear-gradient(to bottom, rgba(232,163,61,0.4), transparent)' }}
        />
      </div>

      {/* Content Card */}
      <div className="card p-7 mb-10 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <h3
              className="font-heading font-bold text-xl"
              style={{ color: '#F3EFE7', letterSpacing: '-0.01em' }}
            >
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Briefcase size={13} style={{ color: '#E8A33D' }} />
              <span className="font-heading font-semibold text-sm" style={{ color: '#E8A33D' }}>
                {experience.company}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full font-heading"
              style={{
                background: 'rgba(232,163,61,0.1)',
                color: '#E8A33D',
                border: '1px solid rgba(232,163,61,0.25)',
              }}
            >
              {experience.type}
            </span>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#A6ADBB' }}>
              <Calendar size={11} />
              {experience.duration}
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: '#A6ADBB' }}>
              <MapPin size={11} />
              {experience.location}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-5" style={{ background: '#2A2F3A' }} />

        {/* Bullets */}
        <ul className="space-y-3.5">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: '#A6ADBB', lineHeight: 1.7 }}>
              <CheckCircle2
                size={15}
                className="flex-shrink-0 mt-0.5"
                style={{ color: '#E8A33D' }}
              />
              {bullet}
            </li>
          ))}
        </ul>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4" style={{ borderTop: '1px solid #2A2F3A' }}>
          {experience.stack.map(tech => (
            <span key={tech} className="tag-chip">{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* --------------------------------------------------------
   Experience Section
-------------------------------------------------------- */
export default function Experience() {
  const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="section-padding" style={{ backgroundColor: '#12151C' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          ref={headingRef}
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="kicker mb-3">( 04 ) EXPERIENCE</p>
          <h2 className="section-heading max-w-lg">
            Where I've <span className="text-amber-gradient">shipped things</span>
          </h2>
          <p className="mt-3 text-sm" style={{ color: '#A6ADBB' }}>
            Real-world, production-context engineering work.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {experiences.map((exp, i) => (
            <TimelineEntry key={exp.id} experience={exp} delay={i * 0.1} />
          ))}

          {/* "More to come" end cap */}
          <motion.div
            className="flex gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col items-center pt-1 flex-shrink-0">
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{ background: '#2A2F3A', border: '1.5px solid #2A2F3A' }}
              />
            </div>
            <p className="pb-4 text-sm" style={{ color: '#2A2F3A', fontStyle: 'italic' }}>
              More entries coming — actively looking for FTE roles
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
