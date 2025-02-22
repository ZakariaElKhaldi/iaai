import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { theme, services } from '../config/theme'
import { publicRoutes, protectedRoutes, adminRoutes } from '../config/routes'
import { useApp } from '../context/AppContext'

const Debug: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'theme' | 'routes' | 'services' | 'navigation'>('routes')
  const navigate = useNavigate()
  const location = useLocation()
  const { state, dispatch } = useApp()

  const renderThemeSection = () => (
    <div className="space-y-8">
      {/* Colors */}
      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Primary Colors */}
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-4`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-2`}>Primary</h4>
            <div className="space-y-2">
              <div className={`h-10 rounded ${theme.colors.primary.main}`} />
              <div className={`h-10 rounded ${theme.colors.primary.light}`} />
            </div>
          </div>

          {/* Secondary Colors */}
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-4`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-2`}>Secondary</h4>
            <div className="space-y-2">
              <div className={`h-10 rounded ${theme.colors.secondary.main}`} />
              <div className={`h-10 rounded ${theme.colors.secondary.light}`} />
            </div>
          </div>

          {/* Service Colors */}
          {Object.entries(theme.colors.services).map(([name, colors]) => (
            <div key={name} className={`${theme.components.card.base} ${theme.colors.secondary.main} p-4`}>
              <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-2`}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </h4>
              <div className="space-y-2">
                <div className={`h-10 rounded ${colors.bg}`} />
                <div className={`h-10 rounded ${colors.light}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Typography</h3>
        <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6 space-y-4`}>
          <h1 className={theme.typography.heading.primary}>Primary Heading</h1>
          <h2 className={theme.typography.heading.secondary}>Secondary Heading</h2>
          <h3 className={theme.typography.heading.section}>Section Heading</h3>
          <div className="space-y-2">
            {Object.entries(theme.typography.size).map(([name, size]) => (
              <p key={name} className={`${size} ${theme.colors.text.primary}`}>
                {name}: The quick brown fox jumps over the lazy dog
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Components */}
      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Components</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cards */}
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-4`}>Cards</h4>
            <div className={`${theme.components.card.base} ${theme.colors.primary.light} p-4`}>
              <p className={theme.colors.text.primary}>Sample Card Content</p>
            </div>
          </div>

          {/* Icons */}
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-4`}>Icons</h4>
            <div className="flex space-x-4">
              <div className={`${theme.components.icon.base} ${theme.colors.primary.light}`}>
                <span role="img" aria-label="icon">🔍</span>
              </div>
              <div className={`${theme.components.icon.large} ${theme.colors.primary.light}`}>
                <span role="img" aria-label="icon">📚</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderRouteCard = (route: typeof publicRoutes[0], type: 'public' | 'protected' | 'admin') => {
    const isActive = location.pathname === route.path
    const colorScheme = {
      public: theme.colors.secondary.light,
      protected: theme.colors.primary.light,
      admin: theme.colors.error.main
    }
    const statusColors = {
      active: 'bg-green-500/20 text-green-400',
      beta: 'bg-yellow-500/20 text-yellow-400',
      deprecated: 'bg-red-500/20 text-red-400'
    }

    return (
      <div
        key={route.path}
        className={`
          ${theme.components.card.base}
          ${theme.colors.secondary.main}
          ${theme.components.card.content}
          ${isActive ? 'ring-2 ring-blue-500' : ''}
        `}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className={`${theme.typography.size.base} ${theme.colors.text.primary} font-medium`}>
              {route.name}
            </h4>
            <p className={`${theme.typography.size.xs} ${theme.colors.text.secondary} mt-1`}>
              {route.path}
            </p>
          </div>
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${statusColors[route.status]}
          `}>
            {route.status}
          </span>
        </div>
        
        <p className={`${theme.typography.size.sm} ${theme.colors.text.secondary} mb-4`}>
          {route.description}
        </p>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(route.path, { state: { from: '/debug' } })}
            className={`
              px-3 py-1.5 rounded-md text-xs font-medium
              ${colorScheme[type]}
              ${theme.colors.text.primary}
              transition-colors duration-200
            `}
          >
            Visit Route
          </button>
          {route.children && (
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${theme.colors.secondary.light}
              ${theme.colors.text.secondary}
            `}>
              {route.children.length} subroutes
            </span>
          )}
        </div>
      </div>
    )
  }

  const renderRoutesSection = () => (
    <div className="space-y-8">
      {/* Route Stats */}
      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Route Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.secondary} mb-2`}>Public Routes</h4>
            <p className={`${theme.typography.size.xl} ${theme.colors.text.primary}`}>
              {publicRoutes.length}
            </p>
          </div>
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.secondary} mb-2`}>Protected Routes</h4>
            <p className={`${theme.typography.size.xl} ${theme.colors.text.primary}`}>
              {protectedRoutes.length}
            </p>
          </div>
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.secondary} mb-2`}>Admin Routes</h4>
            <p className={`${theme.typography.size.xl} ${theme.colors.text.primary}`}>
              {adminRoutes.length}
            </p>
          </div>
        </div>
      </section>

      {/* Public Routes */}
      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Public Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {publicRoutes.map(route => renderRouteCard(route, 'public'))}
        </div>
      </section>

      {/* Protected Routes */}
      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Protected Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {protectedRoutes.map(route => renderRouteCard(route, 'protected'))}
        </div>
      </section>

      {/* Admin Routes */}
      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Admin Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminRoutes.map(route => renderRouteCard(route, 'admin'))}
        </div>
      </section>
    </div>
  )

  const renderServicesSection = () => (
    <div className="space-y-8">
      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(services).map(([key, service]) => (
            <motion.div
              key={key}
              className={`
                ${theme.components.card.base}
                ${theme.colors.secondary.main}
                ${theme.components.card.content}
              `}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`
                ${theme.components.icon.large}
                ${theme.colors.services[key as keyof typeof services].light}
                mb-4
              `}>
                <span className="text-2xl" role="img" aria-label={service.title}>
                  {service.icon}
                </span>
              </div>
              <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-2`}>
                {service.title}
              </h4>
              <p className={`${theme.typography.size.sm} ${theme.colors.text.secondary} mb-4`}>
                {service.description}
              </p>
              <p className={`${theme.typography.size.sm} ${theme.colors.services[key as keyof typeof services].text}`}>
                Path: {service.path}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )

  const renderNavigationSection = () => (
    <div className="space-y-8">
      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Navigation State</h3>
        <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
          <div className="space-y-4">
            <div>
              <h4 className={`${theme.typography.size.base} ${theme.colors.text.primary} font-medium mb-2`}>
                Current Location
              </h4>
              <pre className={`
                p-3 rounded-md bg-slate-800
                ${theme.typography.size.xs} ${theme.colors.text.secondary}
                overflow-auto
              `}>
                {JSON.stringify(location, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className={`${theme.typography.size.base} ${theme.colors.text.primary} font-medium mb-2`}>
                Auth State
              </h4>
              <pre className={`
                p-3 rounded-md bg-slate-800
                ${theme.typography.size.xs} ${theme.colors.text.secondary}
                overflow-auto
              `}>
                {JSON.stringify(state, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Quick Navigation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Public Routes */}
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-4`}>
              Public Routes
            </h4>
            <div className="space-y-2">
              {publicRoutes.map(route => (
                <button
                  key={route.path}
                  onClick={() => navigate(route.path, { state: { from: '/debug' } })}
                  className={`
                    w-full px-4 py-2 rounded-md text-sm font-medium
                    ${theme.colors.secondary.light} ${theme.colors.text.primary}
                    transition-colors duration-200
                  `}
                >
                  {route.name}
                </button>
              ))}
            </div>
          </div>

          {/* Protected Routes */}
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-4`}>
              Protected Routes
            </h4>
            <div className="space-y-2">
              {protectedRoutes.map(route => (
                <button
                  key={route.path}
                  onClick={() => navigate(route.path, { state: { from: '/debug' } })}
                  className={`
                    w-full px-4 py-2 rounded-md text-sm font-medium
                    ${theme.colors.primary.light} ${theme.colors.text.primary}
                    transition-colors duration-200
                  `}
                >
                  {route.name}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Routes */}
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-4`}>
              Admin Routes
            </h4>
            <div className="space-y-2">
              {adminRoutes.map(route => (
                <button
                  key={route.path}
                  onClick={() => navigate(route.path, { state: { from: '/debug' } })}
                  className={`
                    w-full px-4 py-2 rounded-md text-sm font-medium
                    ${theme.colors.error.main} ${theme.colors.text.primary}
                    transition-colors duration-200
                  `}
                >
                  {route.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className={`${theme.typography.heading.section} mb-4`}>Auth Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-4`}>
              User Actions
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  dispatch({
                    type: 'SET_AUTH',
                    payload: {
                      isAuthenticated: true,
                      user: { 
                        id: '1', 
                        name: 'Debug User', 
                        role: 'student',
                        email: 'student@debug.com'
                      }
                    }
                  })
                }}
                className={`
                  w-full px-4 py-2 rounded-md text-sm font-medium
                  ${theme.colors.primary.main} ${theme.colors.text.primary}
                  transition-colors duration-200
                `}
              >
                Login as Student
              </button>
              <button
                onClick={() => {
                  dispatch({
                    type: 'SET_AUTH',
                    payload: {
                      isAuthenticated: true,
                      user: { 
                        id: '2', 
                        name: 'Debug Admin', 
                        role: 'admin',
                        email: 'admin@debug.com'
                      }
                    }
                  })
                }}
                className={`
                  w-full px-4 py-2 rounded-md text-sm font-medium
                  ${theme.colors.error.main} ${theme.colors.text.primary}
                  transition-colors duration-200
                `}
              >
                Login as Admin
              </button>
              <button
                onClick={() => dispatch({ type: 'RESET_STATE' })}
                className={`
                  w-full px-4 py-2 rounded-md text-sm font-medium
                  ${theme.colors.secondary.light} ${theme.colors.text.primary}
                  transition-colors duration-200
                `}
              >
                Logout
              </button>
            </div>
          </div>

          <div className={`${theme.components.card.base} ${theme.colors.secondary.main} p-6`}>
            <h4 className={`${theme.typography.size.lg} ${theme.colors.text.primary} mb-4`}>
              App Actions
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  dispatch({ type: 'RESET_STATE' })
                  navigate('/')
                }}
                className={`
                  w-full px-4 py-2 rounded-md text-sm font-medium
                  ${theme.colors.error.main} ${theme.colors.text.primary}
                  transition-colors duration-200
                `}
              >
                Reset App State & Go Home
              </button>
              <button
                onClick={() => navigate(-1)}
                className={`
                  w-full px-4 py-2 rounded-md text-sm font-medium
                  ${theme.colors.secondary.light} ${theme.colors.text.primary}
                  transition-colors duration-200
                `}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900">
      <div className={`${theme.layout.maxWidth} ${theme.layout.container} py-8`}>
        <div className="px-4">
          <h1 className={`${theme.typography.heading.primary} mb-8`}>Debug Panel</h1>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            {(['routes', 'navigation', 'theme', 'services'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-2 rounded-lg
                  ${activeTab === tab ? theme.colors.primary.main : theme.colors.secondary.main}
                  ${theme.colors.text.primary}
                  transition-colors
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'theme' && renderThemeSection()}
          {activeTab === 'routes' && renderRoutesSection()}
          {activeTab === 'services' && renderServicesSection()}
          {activeTab === 'navigation' && renderNavigationSection()}
        </div>
      </div>
    </div>
  )
}

export default Debug 