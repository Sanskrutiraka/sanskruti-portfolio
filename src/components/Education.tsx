/** Education.tsx
 *  Renders the Education section with a vertical amber timeline (desktop)
 *  and stacked cards (mobile). Four entries in reverse-chronological order.
 *  GraduationCap icon for degree-level, BookOpen for secondary/higher-secondary.
 */
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, BookOpen } from 'lucide-react'

interface EducationEntry {
  id: string
  icon: 'degree' | 'school'
  qualification: string
  field: string
  institution: string
  board: string
  duration: string
  score: string
}

const entries: EducationEntry[] = [
  {
    id: 'mca',
    icon: 'degree',
    qualification: 'Post-Graduation — MCA',
    field: 'Master of Computer Applications',
    institution: 'Sinhgad Institute of Management, Pune',
    board: 'Pune University',
    duration: '2024–2026',
    score: 'CGPA: 8.75',
  },
  {
    id: 'bsc',
    icon: 'degree',
    qualification: 'Graduation — B.Sc.',
    field: 'Bachelor of Science (Physics)',
    institution: 'Padmashri Vikhe Patil College of Arts, Commerce and Science, Ahilyananger',
    board: 'Pune University',
    duration: '2019–2022',
    score: 'CGPA: 8.9',
  },
  {
    id: 'hsc',
    icon: 'school',
    qualification: '12th — Higher Secondary',
    field: 'Science',
    institution: 'MG Junior College, Pravaranagar',
    board: 'Maharashtra State Board',
    duration: '2017–2019',
    score: '62.31%',
  },
  {
    id: 'ssc',
    icon: 'school',
    qualification: '10th — Secondary',
    field: 'General Studies',
    institution: 'New English School, Kolhar',
    board: 'Maharashtra State Board',
    duration: '2016–2017',
    score: '77.80%',
  },
]

/** Scroll-reveal wrapper — fades in and slides up 20px on viewport entry. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })
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

/** Individual education card with icon, qualification, score badge, institution, and board. */
function EduCard({ entry, delay }: { entry: EducationEntry; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })
  const Icon = entry.icon === 'degree' ? GraduationCap : BookOpen

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(232,163,61,0.12)' }}
      className="relative flex flex-col gap-3 p-5 rounded-xl cursor-default"
      style={{
        background: '#12151C',
        border: '1px solid #2A2F3A',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
            style={{ background: 'rgba(232,163,61,0.1)', color: '#E8A33D' }}
          >
            <Icon size={18} />
          </div>
          <div>
            <h3
              className="font-heading font-semibold text-base leading-tight"
              style={{ color: '#F3EFE7', letterSpacing: '-0.01em' }}
            >
              {entry.qualification}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: '#E8A33D' }}>
              {entry.field}
            </p>
          </div>
        </div>

        <span
          className="flex-shrink-0 text-xs font-heading font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{
            background: 'rgba(232,163,61,0.12)',
            color: '#E8A33D',
            border: '1px solid rgba(232,163,61,0.25)',
          }}
        >
          {entry.score}
        </span>
      </div>

      <div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 pt-2"
        style={{ borderTop: '1px solid #2A2F3A' }}
      >
        <div>
          <p className="text-sm font-medium" style={{ color: '#F3EFE7' }}>
            {entry.institution}
          </p>
          <p className="text-xs mt-0.5" style={{ color: '#A6ADBB' }}>
            {entry.board}
          </p>
        </div>
        <span
          className="text-xs font-heading font-medium whitespace-nowrap"
          style={{ color: '#A6ADBB' }}
        >
          {entry.duration}
        </span>
      </div>
    </motion.div>
  )
}

export default function Education() {
  const { ref: headingRef, inView: headingInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <div className="section-padding" style={{ backgroundColor: '#0B0E14' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          ref={headingRef}
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="kicker mb-3">( 05 ) EDUCATION</p>
          <h2 className="section-heading max-w-lg">
            Academic{' '}
            <span className="text-amber-gradient">foundation</span>
          </h2>
          <p className="mt-3 text-sm max-w-md" style={{ color: '#A6ADBB', lineHeight: 1.7 }}>
            From secondary school to postgraduate — the academic journey that
            shaped my engineering thinking.
          </p>
        </motion.div>

        <div className="relative">
          {/* Amber timeline line — visible on md+, fades to transparent at bottom */}
          <div
            className="hidden md:block absolute left-0 top-2 bottom-2 w-px"
            style={{ background: 'linear-gradient(to bottom, #E8A33D, rgba(232,163,61,0.1))' }}
          />

          <div className="flex flex-col gap-8">
            {entries.map((entry, i) => (
              <div key={entry.id} className="relative md:pl-10">
                {/* Timeline dot — aligned to the amber line, hidden on mobile */}
                <Reveal delay={i * 0.1}>
                  <div
                    className="hidden md:block absolute left-0 top-5 w-3 h-3 rounded-full -translate-x-[5px]"
                    style={{
                      background: '#E8A33D',
                      boxShadow: '0 0 0 3px rgba(232,163,61,0.2)',
                    }}
                  />
                </Reveal>

                <EduCard entry={entry} delay={i * 0.1 + 0.05} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
