import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { debounce } from 'lodash'
import { theme } from '../../config/theme'
import LoadingSpinner from '../common/LoadingSpinner'

// Types for navigation items
interface NavItem {
  name: string
  path: string
  icon?: string
  ariaLabel: string
}

// Navigation items with proper aria labels
const publicNavItems: NavItem[] = [
  { name: 'Programs', path: '#programs', ariaLabel: 'View our programs' },
  { name: 'Features', path: '#features', ariaLabel: 'Explore features' },
  { name: 'Contact', path: '#contact', ariaLabel: 'Contact us' }
]

const protectedNavItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊', ariaLabel: 'Go to dashboard' },
  { name: 'Learn', path: '/learn', icon: '📚', ariaLabel: 'Access learning materials' },
  { name: 'Assignments', path: '/assignments', icon: '📝', ariaLabel: 'View assignments' },
  { name: 'Progress', path: '/progress', icon: '📈', ariaLabel: 'Check your progress' },
  { name: 'Practice', path: '/practice', icon: '🎯', ariaLabel: 'Practice exercises' }
]

const adminNavItems: NavItem[] = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: '📊', ariaLabel: 'Go to admin dashboard' },
  { name: 'Users', path: '/admin/users', icon: '👥', ariaLabel: 'Manage users' },
  { name: 'Courses', path: '/admin/courses', icon: '📚', ariaLabel: 'Manage courses' },
  { name: 'Analytics', path: '/admin/analytics', icon: '📈', ariaLabel: 'View analytics' },
  { name: 'Settings', path: '/admin/settings', icon: '⚙️', ariaLabel: 'Manage settings' }
]

interface NavbarProps {
  variant?: 'public' | 'protected' | 'admin'
}

const Navbar = ({ variant = 'public' }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { dispatch } = useApp()

  // Debounced scroll handler
  const handleScroll = useCallback(
    debounce(() => {
      const currentScrollPos = window.scrollY
      const isScrolled = currentScrollPos > 20
      // Hide when scrolling down, show when scrolling up or at top
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 20)
      setPrevScrollPos(currentScrollPos)
      setScrolled(isScrolled)
    }, 50), // Reduced debounce time for more responsive hiding
    [prevScrollPos]
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      handleScroll.cancel()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulated logout delay
      dispatch({ type: 'RESET_STATE' })
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const renderLogo = () => (
    <Link
      to={variant === 'public' ? '/' : variant === 'admin' ? '/admin/dashboard' : '/dashboard'}
      className="flex items-center space-x-2"
    >
      <span className="text-lg font-bold text-white">IAAI</span>
      <span className="text-xs text-slate-400">Academy</span>
    </Link>
  )

  const renderDesktopMenu = () => {
    if (variant === 'public') {
      return (
        <div className="hidden md:flex items-center space-x-8">
          {publicNavItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="text-xs text-slate-300 hover:text-white transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
          <Link 
            to="/auth"
            className="text-xs text-white bg-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </div>
      )
    }

    const navItems = variant === 'protected' ? protectedNavItems : adminNavItems
    return (
      <div className="hidden md:flex items-center space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </span>
          </Link>
        ))}
        {/* User Menu for protected and admin */}
        {(variant === 'protected' || variant === 'admin') && (
          <div className="flex items-center space-x-4 ml-4">
            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/profile'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>👤</span>
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white bg-red-600/90 hover:bg-red-600 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderNavLink = (item: NavItem, isMobile = false) => {
    const isActive = location.pathname === item.path
    const baseClasses = isMobile
      ? 'block w-full px-3 py-2 rounded-md transition-all duration-200'
      : 'px-3 py-2 rounded-md transition-all duration-200'
    const activeClasses = isActive
      ? `${theme.colors.primary.light} ${theme.colors.primary.text}`
      : `${theme.colors.text.secondary} ${theme.colors.text.hover} ${theme.colors.secondary.hover}`
    
    return (
      <Link
        key={item.name}
        to={item.path}
        aria-label={item.ariaLabel}
        className={`${baseClasses} ${activeClasses} ${theme.typography.size.sm} ${theme.typography.weight.medium}`}
        onClick={() => isMobile && setIsOpen(false)}
      >
        <span className="flex items-center space-x-2">
          {item.icon && <span role="img" aria-hidden="true">{item.icon}</span>}
          <span>{item.name}</span>
        </span>
      </Link>
    )
  }

  const renderMobileMenu = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={theme.animation.transition.default}
        >
          <div className={`px-2 pt-2 pb-3 space-y-1 ${theme.colors.secondary.light} backdrop-blur-sm`}>
            {(variant === 'public' ? publicNavItems : variant === 'protected' ? protectedNavItems : adminNavItems)
              .map(item => renderNavLink(item, true))}
            
            {variant !== 'public' && (
              <>
                {renderNavLink({ 
                  name: 'Profile',
                  path: '/profile',
                  icon: '👤',
                  ariaLabel: 'View your profile'
                }, true)}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`
                    block w-full text-center ${theme.typography.size.sm} ${theme.colors.error.main} 
                    ${!isLoggingOut && theme.colors.error.hover} px-3 py-2 rounded-md transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {isLoggingOut ? (
                    <span className="flex items-center justify-center space-x-2">
                      <LoadingSpinner size="small" />
                      <span>Logging out...</span>
                    </span>
                  ) : (
                    'Logout'
                  )}
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <motion.nav 
      role="navigation"
      aria-label="Main navigation"
      className={`
        sticky top-0 w-full z-50 
        ${scrolled ? 'py-2 bg-slate-900/95' : 'py-4 bg-transparent'}
        ${variant === 'admin' ? theme.colors.border.admin : 'border-b border-slate-800/50'}
        transition-all duration-300 backdrop-blur-sm
      `}
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.2 }}
    >
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className={`
          sr-only focus:not-sr-only focus:absolute focus:z-50 
          focus:p-2 ${theme.colors.primary.main} ${theme.colors.text.primary}
        `}
      >
        Skip to main content
      </a>
      
      <div className={`${theme.layout.maxWidth} ${theme.layout.container} ${theme.spacing.container.padding.sm} ${theme.spacing.container.padding.md} ${theme.spacing.container.padding.lg}`}>
        <div className={`flex items-center justify-between ${theme.spacing.nav.height}`}>
          {renderLogo()}
          {renderDesktopMenu()}
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-all duration-200"
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
      {renderMobileMenu()}
    </motion.nav>
  )
}

export default Navbar 