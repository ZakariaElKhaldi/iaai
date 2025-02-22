import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../config/theme'
import type { Service } from '../../config/theme'

interface ServiceCardProps {
  type: Service
  title: string
  description: string
  icon: string
  path: string
  index?: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  type,
  title,
  description,
  icon,
  path,
  index = 0
}) => {
  return (
    <motion.div
      initial={theme.animation.service.initial}
      animate={theme.animation.service.animate}
      whileHover={theme.animation.service.hover}
      transition={{ delay: index * 0.1 }}
      className={`
        ${theme.components.card.base}
        ${theme.components.card.hover}
        ${theme.colors.secondary.main}
        group
      `}
    >
      <Link to={path} className="block">
        <div className={theme.components.card.content}>
          {/* Service Icon */}
          <div className={`
            ${theme.components.icon.large}
            ${theme.colors.services[type].light}
            mb-4
          `}>
            <span className="text-2xl" role="img" aria-hidden="true">
              {icon}
            </span>
          </div>

          {/* Service Title */}
          <h3 className={`
            ${theme.typography.size.xl}
            ${theme.typography.weight.bold}
            ${theme.colors.text.primary}
            mb-2
          `}>
            {title}
          </h3>

          {/* Service Description */}
          <p className={`
            ${theme.typography.size.sm}
            ${theme.colors.text.secondary}
            group-hover:text-white
            transition-colors duration-200
          `}>
            {description}
          </p>

          {/* Learn More Link */}
          <div className={`
            mt-4 inline-flex items-center space-x-2
            ${theme.typography.size.sm}
            ${theme.colors.services[type].text}
            group-hover:translate-x-1
            transition-transform duration-200
          `}>
            <span>Learn more</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ServiceCard 