import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { Menu, X, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home',           to: 'home'           },
  { label: 'About',          to: 'about'          },
  { label: 'Skills',         to: 'skills'         },
  { label: 'Projects',       to: 'projects'       },
  { label: 'Experience',     to: 'experience'     },
  { label: 'Education',      to: 'education'      },
  { label: 'Certifications', to: 'certifications' },
  { label: 'Contact',        to: 'contact'        },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const navStyle = scrolled
    ? 'backdrop-blur-md border-b border-[#2A2F3A]'
    : 'border-b border-transparent'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navStyle}`}
        style={{ backgroundColor: scrolled ? 'rgba(11,14,20,0.85)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo / Wordmark */}
            <Link
              to="home"
              smooth
              duration={600}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0B0E14] font-bold font-heading text-sm"
                style={{ backgroundColor: '#E8A33D' }}
              >
                {'<'}
              </span>
              <span
                className="font-heading font-bold text-sm tracking-tight"
                style={{ color: '#F3EFE7' }}
              >
                Sanskruti Raka
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={600}
                  spy
                  offset={-70}
                  activeClass="active"
                  className="nav-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <a
                href="/Docs/Sanskruti Software Engineer Resume.pdf"
                download
                className="btn-resume"
              >
                <Download size={13} />
                Resume
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#A6ADBB' }}
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-72 z-50 md:hidden flex flex-col"
              style={{ backgroundColor: '#12151C', borderLeft: '1px solid #2A2F3A' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#2A2F3A' }}>
                <span className="font-heading font-bold" style={{ color: '#F3EFE7' }}>Sanskruti Raka</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded"
                  style={{ color: '#A6ADBB' }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col gap-1 p-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      smooth
                      duration={600}
                      spy
                      offset={-70}
                      activeClass="active"
                      className="nav-link block py-3 text-base"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Resume Button */}
              <div className="p-6 border-t" style={{ borderColor: '#2A2F3A' }}>
                <a
                  href="/Docs/Sanskruti Software Engineer Resume.pdf"
                  download
                  className="btn-outline w-full justify-center"
                >
                  <Download size={15} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
