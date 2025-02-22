import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from '../common/ScrollProgress'
import ScrollToTop from '../common/ScrollToTop'
import KeyboardShortcuts from '../common/KeyboardShortcuts'
import KeyboardShortcutsHelp from '../common/KeyboardShortcutsHelp'
import PageTransition from '../common/PageTransition'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/auth'
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isProtectedRoute = [
    '/dashboard',
    '/learn',
    '/assignments',
    '/progress',
    '/discussions',
    '/practice',
    '/editor',
    '/profile'
  ].some(path => location.pathname.startsWith(path))

  // Determine which navigation to show
  const showNav = !isAuthPage
  const showFooter = !isAuthPage && !isAdminRoute && !isProtectedRoute

  return (
    <div className="relative min-h-screen bg-slate-900">
      {/* Global UX Components */}
      {showNav && (
        <>
          <ScrollProgress />
          <ScrollToTop />
          <KeyboardShortcuts />
          <KeyboardShortcutsHelp />
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation */}
        {showNav && (
          <Navbar 
            variant={
              isAdminRoute ? 'admin' : 
              isProtectedRoute ? 'protected' : 
              'public'
            } 
          />
        )}

        {/* Page Content with Transitions */}
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            {children}
          </PageTransition>
        </AnimatePresence>

        {/* Footer */}
        {showFooter && <Footer />}
      </div>
    </div>
  )
}

export default Layout 