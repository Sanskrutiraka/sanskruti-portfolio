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

/**
 * Skills verified against completed implementations:
 *   - CivicPulse+ (MCA Major Project): Java 17, Spring Boot 3.2, Spring Cloud, Kafka, PostgreSQL, Redis, Docker, FastAPI, React
 *   - ParkVahan (Internship): React Native, Expo, React, Node.js, Express, Supabase, PostgreSQL, REST APIs
 *   - Smart Complaint Routing System: Java, Spring Boot, MySQL, REST APIs, Postman
 *   - ShopSphere (Hackathon): React, Gemini API, Tailwind CSS
 *   - FocusDo: React Native, Node.js, Express, MongoDB, JWT
 */
const skillGroups: SkillGroup[] = [
  {
    category: 'Backend & Microservices',
    icon: '⚙️',
    skills: [
      { name: 'Java',                  icon: '☕', accent: true },
      { name: 'Spring Boot',           icon: '🌱', accent: true },
      { name: 'Spring Cloud Gateway',  icon: '🌐', accent: true },
      { name: 'REST APIs',             icon: '🔌', accent: true },
      { name: 'Apache Kafka',          icon: '📬', accent: true },
      { name: 'Node.js',               icon: '🟢' },
      { name: 'Express.js',            icon: '⚡' },
      { name: 'Python FastAPI',        icon: '🐍' },
    ],
  },
  {
    category: 'Databases & Caching',
    icon: '🗃️',
    skills: [
      { name: 'SQL',           icon: '📊', accent: true },
      { name: 'PostgreSQL',    icon: '🐘', accent: true },
      { name: 'MySQL',         icon: '🐬', accent: true },
      { name: 'Redis',         icon: '🔴' },
      { name: 'Supabase',      icon: '⚡' },
      { name: 'MongoDB',       icon: '🍃' },
    ],
  },
  {
    category: 'Frontend & Mobile',
    icon: '🎨',
    skills: [
      { name: 'React',         icon: '⚛️', accent: true },
      { name: 'React Native',  icon: '📱', accent: true },
      { name: 'JavaScript',    icon: '🟨', accent: true },
      { name: 'HTML / CSS',    icon: '🌐' },
      { name: 'Expo',          icon: '🚀' },
      { name: 'Tailwind CSS',  icon: '🌊' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: '🛠️',
    skills: [
      { name: 'Git / GitHub',       icon: '🔀', accent: true },
      { name: 'Postman',            icon: '📮', accent: true },
      { name: 'Docker & Compose',   icon: '🐳', accent: true },
      { name: 'API Testing',        icon: '🧪' },
      { name: 'Debugging',          icon: '🔍' },
      { name: 'Integration Testing', icon: '✅' },
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
   AI & NLP Implementation Note
-------------------------------------------------------- */
function AIExposureNote() {
  return (
    <motion.div
      className="mt-6 p-5 rounded-xl flex flex-wrap items-start gap-4"
      style={{ background: '#1A1E27', border: '1px solid #2A2F3A' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-lg">🤖</span>
        <span className="font-heading font-semibold text-sm" style={{ color: '#F3EFE7' }}>
          AI & NLP Implementation
        </span>
      </div>
      <p className="text-sm flex-1" style={{ color: '#A6ADBB', lineHeight: 1.6 }}>
        Implemented <span style={{ color: '#E8A33D' }}>Zero-Shot NLP classification</span> and{' '}
        <span style={{ color: '#E8A33D' }}>embedding-based duplicate detection</span> in{' '}
        <span style={{ color: '#F3EFE7' }}>CivicPulse+</span> using Python FastAPI with Hugging Face Inference
        APIs. Also integrated the <span style={{ color: '#E8A33D' }}>Gemini API</span> for AI features
        in the ShopSphere hackathon project, and completed generative AI coursework through Microsoft and LinkedIn Learning.
      </p>
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
      style={{ backgroundColor: '#0B0E14' }}
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
          <p className="kicker mb-3">( 02 ) TECHNICAL SKILLS</p>
          <h2 className="section-heading">
            Technologies I work with — <span className="text-amber-gradient">verified by code</span>
          </h2>
          <p className="mt-2 text-sm" style={{ color: '#A6ADBB' }}>
            Technologies applied across my MCA major project, software internship, personal backend projects, and hackathons.
          </p>
        </motion.div>

        {/* 4-column grid for primary skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} delay={i * 0.1} />
          ))}
        </div>

        {/* AI & NLP Note */}
        <AIExposureNote />

        {/* Currently Learning / Deepening strip */}
        <motion.div
          className="mt-6 p-4 rounded-xl flex flex-wrap items-center gap-3 text-xs"
          style={{ background: 'rgba(232,163,61,0.04)', border: '1px solid rgba(232,163,61,0.15)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="font-heading font-semibold" style={{ color: '#E8A33D' }}>
            Currently Deepening:
          </span>
          {[
            'Advanced Spring Boot & Microservices Patterns',
            'Distributed Transactions',
            'SQL Optimization & Indexing',
            'System Design & Low-Level Design (LLD)',
            'Data Structures & Algorithms',
          ].map(topic => (
            <span
              key={topic}
              className="px-2.5 py-1 rounded-md"
              style={{ background: '#12161F', color: '#A6ADBB', border: '1px solid #232834' }}
            >
              {topic}
            </span>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
