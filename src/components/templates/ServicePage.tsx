import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { theme } from '../../config/theme'
import type { Service } from '../../config/theme'

interface ServicePageProps {
  type: Service
  title: string
  description: string
  icon: string
  features?: {
    title: string
    description: string
    icon: string
  }[]
  benefits?: {
    title: string
    description: string
    icon: string
  }[]
}

const ServicePage: React.FC<ServicePageProps> = ({
  type,
  title,
  description,
  icon,
  features = [],
  benefits = []
}) => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className={`
        ${theme.spacing.section.padding.y}
        ${theme.spacing.section.padding.x}
        relative overflow-hidden
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
        </div>

        <div className={`${theme.layout.maxWidth} ${theme.layout.container} relative`}>
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2">
              <li>
                <Link
                  to="/"
                  className={`${theme.colors.text.secondary} hover:text-white transition-colors`}
                >
                  Home
                </Link>
              </li>
              <li className={theme.colors.text.secondary}>/</li>
              <li>
                <Link
                  to="/#services"
                  className={`${theme.colors.text.secondary} hover:text-white transition-colors`}
                >
                  Services
                </Link>
              </li>
              <li className={theme.colors.text.secondary}>/</li>
              <li className={theme.colors.services[type].text}>
                {title}
              </li>
            </ol>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`
                ${theme.components.icon.large}
                ${theme.colors.services[type].light}
                mb-6
              `}
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {icon}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={theme.typography.heading.primary}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`
                ${theme.typography.size.lg}
                ${theme.colors.text.secondary}
                mt-4
              `}
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <Link
                to="/contact"
                className={`
                  inline-flex items-center px-6 py-3 rounded-lg
                  ${theme.colors.services[type].bg}
                  ${theme.colors.services[type].hover}
                  ${theme.colors.text.primary}
                  ${theme.typography.size.base}
                  ${theme.typography.weight.medium}
                  transition-all duration-200
                `}
              >
                Get Started
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {features.length > 0 && (
        <section className={`
          ${theme.spacing.section.padding.y}
          ${theme.spacing.section.padding.x}
          bg-slate-800/50
        `}>
          <div className={`${theme.layout.maxWidth} ${theme.layout.container}`}>
            <h2 className={`${theme.typography.heading.secondary} text-center mb-12`}>
              Key Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`
                    ${theme.components.card.base}
                    ${theme.colors.secondary.main}
                    ${theme.components.card.content}
                  `}
                >
                  <div className={`
                    ${theme.components.icon.base}
                    ${theme.colors.services[type].light}
                    mb-4
                  `}>
                    <span className="text-xl" role="img" aria-hidden="true">
                      {feature.icon}
                    </span>
                  </div>

                  <h3 className={`
                    ${theme.typography.size.lg}
                    ${theme.typography.weight.bold}
                    ${theme.colors.text.primary}
                    mb-2
                  `}>
                    {feature.title}
                  </h3>

                  <p className={`
                    ${theme.typography.size.sm}
                    ${theme.colors.text.secondary}
                  `}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {benefits.length > 0 && (
        <section className={`
          ${theme.spacing.section.padding.y}
          ${theme.spacing.section.padding.x}
          bg-slate-900
        `}>
          <div className={`${theme.layout.maxWidth} ${theme.layout.container}`}>
            <h2 className={`${theme.typography.heading.secondary} text-center mb-12`}>
              Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className={`
                    ${theme.components.icon.base}
                    ${theme.colors.services[type].light}
                    flex-shrink-0
                  `}>
                    <span className="text-xl" role="img" aria-hidden="true">
                      {benefit.icon}
                    </span>
                  </div>

                  <div>
                    <h3 className={`
                      ${theme.typography.size.lg}
                      ${theme.typography.weight.bold}
                      ${theme.colors.text.primary}
                      mb-2
                    `}>
                      {benefit.title}
                    </h3>

                    <p className={`
                      ${theme.typography.size.sm}
                      ${theme.colors.text.secondary}
                    `}>
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`
        ${theme.spacing.section.padding.y}
        ${theme.spacing.section.padding.x}
        bg-slate-800/50
      `}>
        <div className={`${theme.layout.maxWidth} ${theme.layout.container}`}>
          <div className="text-center">
            <h2 className={`${theme.typography.heading.secondary} mb-4`}>
              Ready to Get Started?
            </h2>
            <p className={`
              ${theme.typography.size.lg}
              ${theme.colors.text.secondary}
              mb-8 max-w-2xl mx-auto
            `}>
              Contact us today to learn more about our {title.toLowerCase()} services
              and how we can help you achieve your goals.
            </p>
            <Link
              to="/contact"
              className={`
                inline-flex items-center px-8 py-4 rounded-lg
                ${theme.colors.services[type].bg}
                ${theme.colors.services[type].hover}
                ${theme.colors.text.primary}
                ${theme.typography.size.base}
                ${theme.typography.weight.medium}
                transition-all duration-200
              `}
            >
              Contact Us
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicePage 