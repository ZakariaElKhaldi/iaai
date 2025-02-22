import React from 'react'
import ServicePage from '../../components/templates/ServicePage'
import { services } from '../../config/theme'

const features = [
  {
    title: 'Research Support',
    description: 'Expert assistance with academic research projects',
    icon: '🔍'
  },
  {
    title: 'Thesis Guidance',
    description: 'Comprehensive support for thesis development',
    icon: '📚'
  },
  {
    title: 'Paper Writing',
    description: 'Professional academic paper writing assistance',
    icon: '✍️'
  },
  {
    title: 'Data Analysis',
    description: 'Advanced statistical analysis and interpretation',
    icon: '📊'
  },
  {
    title: 'Literature Review',
    description: 'Thorough review of academic literature',
    icon: '📖'
  },
  {
    title: 'Publication Support',
    description: 'Assistance with academic publication process',
    icon: '📰'
  }
]

const benefits = [
  {
    title: 'Academic Excellence',
    description: 'Achieve higher academic standards',
    icon: '🎓'
  },
  {
    title: 'Time Management',
    description: 'Better balance of academic responsibilities',
    icon: '⏰'
  },
  {
    title: 'Expert Guidance',
    description: 'Learn from experienced academics',
    icon: '👨‍🏫'
  },
  {
    title: 'Research Quality',
    description: 'Produce high-quality research work',
    icon: '⭐'
  }
]

const AcademicPage: React.FC = () => {
  return (
    <ServicePage
      type="academic"
      title={services.academic.title}
      description={services.academic.description}
      icon={services.academic.icon}
      features={features}
      benefits={benefits}
    />
  )
}

export default AcademicPage 