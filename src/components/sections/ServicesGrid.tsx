import React from 'react'
import { motion } from 'framer-motion'
import { theme, services } from '../../config/theme'
import ServiceCard from '../common/ServiceCard'

interface ServicesGridProps {
  title?: string
  subtitle?: string
}

const ServicesGrid: React.FC<ServicesGridProps> = ({
  title = 'Our Services',
  subtitle = 'Discover our comprehensive range of AI-powered services and solutions'
}) => {
  return (
    <section className={`
      ${theme.spacing.section.padding.y}
      ${theme.spacing.section.padding.x}
      bg-slate-900
    `}>
      <div className={`${theme.layout.maxWidth} ${theme.layout.container}`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={theme.typography.heading.primary}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`
              ${theme.typography.size.lg}
              ${theme.colors.text.secondary}
              mt-4 max-w-2xl mx-auto
            `}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className={theme.layout.grid.services}>
          {Object.entries(services).map(([key, service], index) => (
            <ServiceCard
              key={key}
              type={key as keyof typeof services}
              title={service.title}
              description={service.description}
              icon={service.icon}
              path={service.path}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesGrid 