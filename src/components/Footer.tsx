/** Footer.tsx
 *  Site footer with brand wordmark, social links, quick-nav,
 *  and a copyright line. Mirrors the Navbar's link set.
 */
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-scroll'

const socials = [
  {
    id: 'footer-github',
    icon: <Github size={16} />,
    href: 'https://github.com/Sanskrutiraka',
    label: 'GitHub',
  },
  {
    id: 'footer-linkedin',
    icon: <Linkedin size={16} />,
    href: 'https://linkedin.com/in/sanskruti-raka-105789261',
    label: 'LinkedIn',
  },
  {
    id: 'footer-email',
    icon: <Mail size={16} />,
    href: 'mailto:sanskrutiraka1602@gmail.com',
    label: 'Email',
  },
]

const navLinks = [
  { label: 'About',          to: 'about'          },
  { label: 'Skills',         to: 'skills'         },
  { label: 'Projects',       to: 'projects'       },
  { label: 'Experience',     to: 'experience'     },
  { label: 'Education',      to: 'education'      },
  { label: 'Certifications', to: 'certifications' },
  { label: 'Contact',        to: 'contact'        },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#12151C', borderTop: '1px solid #2A2F3A' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        <div className="grid sm:grid-cols-[1fr_auto] gap-8 mb-10">

          {/* Brand block — tagline + socials */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-[#0B0E14] font-bold font-heading text-xs"
                style={{ backgroundColor: '#E8A33D' }}
              >
                {'<'}
              </span>
              <span className="font-heading font-bold" style={{ color: '#F3EFE7' }}>
                Sanskruti Raka
              </span>
            </div>
            <p className="text-sm max-w-xs" style={{ color: '#A6ADBB', lineHeight: 1.7 }}>
              Java &amp; Spring Boot Backend Developer · MCA 2026 ·
              Building scalable systems from first principles.
            </p>

            <div className="flex items-center gap-2 pt-1">
              {socials.map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="social-btn"
                  aria-label={s.label}
                  style={{ width: '36px', height: '36px' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick nav — mirrors Navbar links for convenience */}
          <motion.nav
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="kicker mb-1" style={{ color: '#2A2F3A' }}>Navigation</p>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={600}
                className="text-sm cursor-pointer transition-colors duration-200 hover:text-amber-400"
                style={{ color: '#A6ADBB' }}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        </div>

        <div className="h-px mb-6" style={{ background: '#2A2F3A' }} />

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ color: '#2A2F3A' }}
        >
          <p>© {year} Sanskruti Raka. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed &amp; Developed by&nbsp;
            <a
              href="https://github.com/Sanskrutiraka"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors duration-200"
              style={{ color: '#A6ADBB' }}
              aria-label="GitHub profile of Sanskrutiraka"
            >
              <Github size={13} />
              Sanskrutiraka
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}
