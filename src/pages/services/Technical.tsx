import React from 'react'
import ServicePage from '../../components/templates/ServicePage'
import { services } from '../../config/theme'

const features = [
  {
    title: 'AI Integration',
    description: 'Seamlessly integrate AI solutions into your systems',
    icon: '🤖'
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and deployment',
    icon: '☁️'
  },
  {
    title: 'DevOps Services',
    description: 'Streamline development and deployment workflows',
    icon: '⚙️'
  },
  {
    title: 'Security Services',
    description: 'Comprehensive security audits and implementation',
    icon: '🔒'
  },
  {
    title: 'Data Analytics',
    description: 'Advanced data processing and visualization',
    icon: '📊'
  },
  {
    title: 'API Development',
    description: 'Custom API design and implementation',
    icon: '🔌'
  }
]

const benefits = [
  {
    title: 'Increased Efficiency',
    description: 'Optimize your technical operations and workflows',
    icon: '⚡'
  },
  {
    title: 'Scalable Solutions',
    description: 'Systems that grow with your business needs',
    icon: '📈'
  },
  {
    title: 'Enhanced Security',
    description: 'Protect your data and systems with best practices',
    icon: '🛡️'
  },
  {
    title: 'Expert Support',
    description: '24/7 technical support and maintenance',
    icon: '🔧'
  }
]

const TechnicalPage: React.FC = () => {
  return (
    <ServicePage
      type="technical"
      title={services.technical.title}
      description={services.technical.description}
      icon={services.technical.icon}
      features={features}
      benefits={benefits}
    />
  )
}

export default TechnicalPage 