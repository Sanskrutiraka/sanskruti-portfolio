import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Mail, Phone, Linkedin, Github, CheckCircle2, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

/**
 * EmailJS credentials are loaded from environment variables at runtime.
 * Copy .env.example to .env and fill in your keys before running locally.
 * See: https://www.emailjs.com/docs/sdk/send-form/
 */
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string

/** Minimum ms between submissions (60 seconds) */
const RATE_LIMIT_MS = 60_000

/* --------------------------------------------------------
   Contact Links
-------------------------------------------------------- */
const contactLinks = [
  {
    id: 'contact-email',
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'sanskrutiraka1602@gmail.com',
    href: 'mailto:sanskrutiraka1602@gmail.com',
  },
  {
    id: 'contact-phone',
    icon: <Phone size={18} />,
    label: 'Phone',
    value: '+91 93221 64303',
    href: 'tel:+919322164303',
  },
  {
    id: 'contact-linkedin',
    icon: <Linkedin size={18} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/sanskruti-raka-105789261',
    href: 'https://www.linkedin.com/in/sanskruti-raka-105789261',
  },
  {
    id: 'contact-github',
    icon: <Github size={18} />,
    label: 'GitHub',
    value: 'github.com/Sanskrutiraka',
    href: 'https://github.com/Sanskrutiraka',
  },
]

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

/* --------------------------------------------------------
   Contact Section
-------------------------------------------------------- */
export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  // Honeypot: must stay empty — bots fill it, real users never see it
  const [honeypot, setHoneypot] = useState('')
  // Rate-limit: track last submission timestamp
  const lastSentAt = useRef<number>(0)

  const { ref: headingRef, inView: headingInView } = useInView({ threshold: 0.1, triggerOnce: true })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    // Anti-spam: honeypot filled → silently succeed without sending
    if (honeypot) {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    // Rate-limit: prevent more than one send per 60 seconds
    const now = Date.now()
    if (now - lastSentAt.current < RATE_LIMIT_MS) {
      const secondsLeft = Math.ceil((RATE_LIMIT_MS - (now - lastSentAt.current)) / 1000)
      alert(`Please wait ${secondsLeft}s before sending another message.`)
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      lastSentAt.current = Date.now()
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <div className="section-padding" style={{ backgroundColor: '#12151C' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          ref={headingRef}
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="kicker mb-3">( 07 ) CONTACT</p>
          <h2 className="section-heading">
            Let's build{' '}
            <span className="text-amber-gradient">something.</span>
          </h2>
          <p className="mt-4 text-base max-w-md mx-auto" style={{ color: '#A6ADBB' }}>
            Whether you have a role in mind, a project to discuss, or just want to say hi —
            I'm always happy to connect.
          </p>
        </motion.div>

        {/* Grid: form + contact info */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 max-w-5xl mx-auto">

          {/* ——— Contact Form ——— */}
          <motion.div
            className="card p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-heading font-bold text-lg mb-6" style={{ color: '#F3EFE7' }}>
              Send a message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* ── Honeypot field: hidden from real users, bots fill it ── */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="contact-website">Website (leave this blank)</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                />
              </div>
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-heading font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: '#A6ADBB' }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Sanskruti Raka"
                  className="form-input"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-heading font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: '#A6ADBB' }}
                >
                  Email
                </label>
                <input
                  id="contact-email-input"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="form-input"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-heading font-semibold mb-2 uppercase tracking-wide"
                  style={{ color: '#A6ADBB' }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  className="form-input"
                />
              </div>

              {/* Submit */}
              <button
                id="contact-submit"
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary w-full justify-center mt-2"
                style={{ opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status messages */}
              {status === 'success' && (
                <motion.div
                  className="flex items-center gap-2 text-sm p-3 rounded-lg"
                  style={{ background: 'rgba(111,207,151,0.1)', color: '#6FCF97', border: '1px solid rgba(111,207,151,0.2)' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle2 size={16} />
                  Message sent! I'll reply within 24 hours.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  className="flex items-center gap-2 text-sm p-3 rounded-lg"
                  style={{ background: 'rgba(235,87,87,0.1)', color: '#EB5757', border: '1px solid rgba(235,87,87,0.2)' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* ——— Contact Info ——— */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card p-6 space-y-4">
              <h3 className="font-heading font-bold text-base mb-2" style={{ color: '#F3EFE7' }}>
                Reach me directly
              </h3>

              {contactLinks.map(link => (
                <a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{
                      background: '#1A1E27',
                      border: '1px solid #2A2F3A',
                      color: '#A6ADBB',
                    }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wide" style={{ color: '#2A2F3A' }}>
                      {link.label}
                    </p>
                    <p
                      className="text-sm transition-colors duration-200 group-hover:text-amber-400"
                      style={{ color: '#A6ADBB' }}
                    >
                      {link.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability card */}
            <div
              className="p-5 rounded-xl"
              style={{ background: 'rgba(232,163,61,0.06)', border: '1px solid rgba(232,163,61,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-block w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#6FCF97' }}
                />
                <span className="font-heading font-semibold text-sm" style={{ color: '#F3EFE7' }}>
                  Currently Available
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#A6ADBB' }}>
                Actively seeking full-time backend / full-stack roles.
                Available to join immediately after graduation (2026).
                Open to Pune, Bangalore, or fully remote.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
