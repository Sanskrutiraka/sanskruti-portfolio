import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* --------------------------------------------------------
   Skill data
-------------------------------------------------------- */
interface Skill {
  name: string
  icon: string
  accent?: boolean
}

interface SkillGroup {
  category: string
  icon: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Java',            icon: '☕', accent: true },
      { name: 'Spring Boot',     icon: '🌱', accent: true },
      { name: 'Spring Security', icon: '🔒' },
      { name: 'REST APIs',       icon: '🔌' },
      { name: 'JPA / Hibernate', icon: '🗄️' },
      { name: 'Microservices',   icon: '🏗️' },
      { name: 'Node.js',         icon: '🟢' },
      { name: 'Express.js',      icon: '⚡' },
      { name: 'FastAPI',         icon: '🐍' },
    ],
  },
  {
    category: 'Databases',
    icon: '🗃️',
    skills: [
      { name: 'PostgreSQL',      icon: '🐘', accent: true },
      { name: 'MySQL',           icon: '🐬' },
      { name: 'MongoDB',         icon: '🌿' },
      { name: 'Supabase',        icon: '⚡' },
      { name: 'Redis',           icon: '🔴' },
      { name: 'Mongoose / JPA',  icon: '📋' },
    ],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React.js',        icon: '⚛️', accent: true },
      { name: 'React Native',    icon: '📱', accent: true },
      { name: 'JavaScript',      icon: '🟨' },
      { name: 'TypeScript',      icon: '🟦' },
      { name: 'Tailwind CSS',    icon: '🎨' },
      { name: 'HTML / CSS',      icon: '🌐' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: '🛠️',
    skills: [
      { name: 'Git / GitHub',    icon: '🔀', accent: true },
      { name: 'Docker',          icon: '🐳' },
      { name: 'Postman',         icon: '📮' },
      { name: 'Apache Kafka',    icon: '📨' },
      { name: 'Expo / EAS',      icon: '🚀' },
      { name: 'Maven',           icon: '📦' },
    ],
  },
]

/* --------------------------------------------------------
   Skill Card
-------------------------------------------------------- */
function SkillCard({ group, delay }: { group: SkillGroup; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      className="card p-6 flex flex-col gap-5"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
          style={{ background: 'rgba(232,163,61,0.1)' }}
        >
          {group.icon}
        </div>
        <h3
          className="font-heading font-bold text-sm tracking-wide uppercase"
          style={{ color: '#F3EFE7', letterSpacing: '0.05em' }}
        >
          {group.category}
        </h3>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, #2A2F3A, transparent)' }} />

      {/* Skill Chips */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <motion.span
            key={skill.name}
            className="skill-chip"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: delay + i * 0.05 }}
            style={
              skill.accent
                ? { borderColor: 'rgba(232,163,61,0.3)', color: '#E8A33D', background: 'rgba(232,163,61,0.06)' }
                : {}
            }
          >
            <span>{skill.icon}</span>
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

/* --------------------------------------------------------
   Skills Section
-------------------------------------------------------- */
export default function Skills() {
  const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div
      className="section-padding"
      style={{ backgroundColor: '#12151C' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          ref={headingRef}
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="kicker mb-3">( 02 ) SKILLS</p>
          <h2 className="section-heading max-w-xl">
            The stack I ship with
          </h2>
          <p className="mt-3 text-base max-w-lg" style={{ color: '#A6ADBB' }}>
            Tools I use daily — no filler, no aspirational fluff. Everything below
            has been used in a real project or internship context.
          </p>
        </motion.div>

        {/* Grid — 4 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} delay={i * 0.08} />
          ))}
        </div>

        {/* Currently Learning strip */}
        <motion.div
          className="mt-10 p-5 rounded-xl flex flex-wrap items-center gap-4"
          style={{ background: '#1A1E27', border: '1px solid #2A2F3A' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: '#6FCF97' }}
            />
            <span className="font-heading font-semibold text-sm" style={{ color: '#F3EFE7' }}>
              Currently Learning
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Java 8+ & Multithreading', 'Spring Security', 'SQL & Joins', 'DSA', 'System Design'].map(item => (
              <span key={item} className="tag-chip" style={{ borderColor: 'rgba(111,207,151,0.25)', color: '#6FCF97', background: 'rgba(111,207,151,0.08)' }}>
                {item}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
