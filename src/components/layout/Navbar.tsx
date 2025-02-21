import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Programs', href: 'programs' },
  { name: 'Features', href: 'features' },
  { name: 'Contact', href: 'contact' }
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const isScrolled = currentScrollPos > 50
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50)
      setPrevScrollPos(currentScrollPos)
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <motion.nav 
      className="fixed w-full z-50"
      initial={{ y: -100 }}
      animate={{ 
        y: visible ? 0 : -100,
        backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="text-xl font-medium text-white cursor-pointer"
          >
            IAAI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                smooth={true}
                duration={500}
                className="text-sm text-slate-300 hover:text-white transition-colors"
                activeClass="text-white"
                spy={true}
              >
                {item.name}
              </Link>
            ))}
            <button className="text-sm text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Contact Us
            </button>
            <button className="text-sm text-slate-300 hover:text-white transition-colors">
              FR | EN
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            <span className="sr-only">Open menu</span>
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {!isOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pt-2 pb-3 space-y-1 bg-slate-800/80 backdrop-blur-sm">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  smooth={true}
                  duration={500}
                  className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-md transition-colors"
                  activeClass="text-white bg-slate-700/50"
                  spy={true}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="w-full text-left text-sm text-white bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Contact Us
              </button>
              <button className="w-full text-left text-sm text-slate-300 px-3 py-2 hover:text-white transition-colors">
                FR | EN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar 