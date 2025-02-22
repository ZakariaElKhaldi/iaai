import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { AppProvider, useApp } from './context/AppContext'
import { ToastProvider } from './components/common/Toast'
import ErrorBoundary from './components/common/ErrorBoundary'
import GlobalSearch from './components/common/GlobalSearch'
import PerformanceOptimizer from './components/common/PerformanceOptimizer'
import { publicRoutes, protectedRoutes, adminRoutes } from './config/routes'
import { RouteConfig } from './types/routes'

// Public Pages
import Home from './pages/Home'
import Auth from './pages/auth/Auth'
import NotFound from './pages/NotFound'
import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'
import FAQ from './pages/help/FAQ'
import Debug from './pages/Debug'

// Protected Pages
import Dashboard from './pages/protected/Dashboard'
import Learn from './pages/protected/Learn'
import Assignments from './pages/protected/Assignments'
import Progress from './pages/protected/Progress'
import Discussions from './pages/protected/Discussions'
import Practice from './pages/protected/Practice'
import CodeEditorPage from './pages/editor/CodeEditorPage'
import Profile from './pages/profile/Profile'
import ChatbotPage from './pages/protected/ChatbotPage'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import Courses from './pages/admin/Courses'
import Analytics from './pages/admin/Analytics'
import Settings from './pages/admin/Settings'

// Service Pages
import TrainingPage from './pages/services/Training'
import AcademicPage from './pages/services/Academic'
import TechnicalPage from './pages/services/Technical'
import ConsultingPage from './pages/services/Consulting'
import SupportPage from './pages/services/Support'
import ClubsPage from './pages/services/Clubs'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useApp()
  const location = useLocation()
  const isFromDebug = location.state?.from === '/debug'

  if (!state.isAuthenticated && !isFromDebug) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useApp()
  const location = useLocation()
  const isFromDebug = location.state?.from === '/debug'

  // Allow access if coming from debug page OR if properly authenticated as admin
  if (isFromDebug || (state.isAuthenticated && state.user?.role === 'admin')) {
    return <>{children}</>
  }

  return <Navigate to="/auth" state={{ from: location.pathname }} replace />
}

const getComponentForRoute = (path: string) => {
  switch (path) {
    // Public Routes
    case '/':
      return <Home />
    case '/auth':
    case '/auth/login':
    case '/auth/register':
    case '/auth/forgot-password':
    case '/auth/reset-password':
      return <Auth />
    case '/terms':
      return <Terms />
    case '/privacy':
      return <Privacy />
    case '/help':
    case '/help/faq':
    case '/help/support':
    case '/help/contact':
      return <FAQ />
    case '/debug':
      return <Debug />

    // Service Routes
    case '/services/training':
      return <TrainingPage />
    case '/services/academic':
      return <AcademicPage />
    case '/services/technical':
      return <TechnicalPage />
    case '/services/consulting':
      return <ConsultingPage />
    case '/services/support':
      return <SupportPage />
    case '/services/clubs':
      return <ClubsPage />

    // Protected Routes
    case '/profile':
      return <Profile />
    case '/dashboard':
    case '/dashboard/:section':
      return <Dashboard />
    case '/learn':
    case '/learn/:courseId':
    case '/learn/:courseId/:lessonId':
      return <Learn />
    case '/assignments':
    case '/assignments/:assignmentId':
      return <Assignments />
    case '/progress':
    case '/progress/:section':
      return <Progress />
    case '/discussions':
    case '/discussions/:topicId':
      return <Discussions />
    case '/practice':
    case '/practice/:exerciseId':
      return <Practice />
    case '/editor':
    case '/editor/:fileId':
      return <CodeEditorPage />
    case '/chat':
      return <ChatbotPage />

    // Admin Routes
    case '/admin':
    case '/admin/dashboard':
    case '/admin/dashboard/:section':
      return <AdminDashboard />
    case '/admin/users':
    case '/admin/users/:userId':
    case '/admin/users/new':
      return <Users />
    case '/admin/courses':
    case '/admin/courses/:courseId':
    case '/admin/courses/new':
      return <Courses />
    case '/admin/analytics':
    case '/admin/analytics/:report':
      return <Analytics />
    case '/admin/settings':
    case '/admin/settings/:section':
      return <Settings />

    default:
      return <NotFound />
  }
}

const renderRoutes = (routes: RouteConfig[], wrapper?: (children: React.ReactNode) => React.ReactElement) => {
  return routes.map(route => {
    const component = getComponentForRoute(route.path)
    const wrappedComponent = wrapper ? wrapper(component) : component

    return (
      <React.Fragment key={route.path}>
        <Route path={route.path} element={wrappedComponent} />
      </React.Fragment>
    )
  })
}

const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ToastProvider>
          <Router>
            <GlobalSearch />
            <PerformanceOptimizer />
            <Layout>
              <Routes>
                {renderRoutes(publicRoutes)}
                {renderRoutes(protectedRoutes, children => (
                  <ProtectedRoute>{children}</ProtectedRoute>
                ))}
                {renderRoutes(adminRoutes, children => (
                  <AdminRoute>{children}</AdminRoute>
                ))}
              </Routes>
            </Layout>
          </Router>
        </ToastProvider>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
