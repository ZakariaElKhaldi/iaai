import React from 'react'
import { theme } from '../../config/theme'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-8 h-8'
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium',
  color = theme.colors.text.primary.replace('text-', 'border-t-')
}) => {
  return (
    <div
      className={`
        ${sizeClasses[size]}
        border-2
        ${color}
        border-transparent
        rounded-full
        animate-spin
      `}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner 