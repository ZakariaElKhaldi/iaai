import React from 'react'
import ServicePage from '../../components/templates/ServicePage'
import { services } from '../../config/theme'

const features = [
  {
    title: 'AI Strategy',
    description: 'Develop comprehensive AI implementation strategies',
    icon: '🎯'
  },
  {
    title: 'Digital Transformation',
    description: 'Guide your organization through digital evolution',
    icon: '🔄'
  },
  {
    title: 'Process Optimization',
    description: 'Streamline operations with AI and automation',
    icon: '⚡'
  },
  {
    title: 'Data Strategy',
    description: 'Maximize value from your data assets',
    icon: '📊'
  },
  {
    title: 'Innovation Planning',
    description: 'Plan and implement innovative solutions',
    icon: '💡'
  },
  {
    title: 'Change Management',
    description: 'Successfully manage technological transitions',
    icon: '🔄'
  }
]

const benefits = [
  {
    title: 'Strategic Growth',
    description: 'Accelerate business growth with AI solutions',
    icon: '📈'
  },
  {
    title: 'Cost Optimization',
    description: 'Reduce operational costs through automation',
    icon: '💰'
  },
  {
    title: 'Competitive Edge',
    description: 'Stay ahead with cutting-edge technology',
    icon: '🏆'
  },
  {
    title: 'Risk Management',
    description: 'Identify and mitigate technological risks',
    icon: '🛡️'
  }
]

const ConsultingPage: React.FC = () => {
  return (
    <ServicePage
      type="consulting"
      title={services.consulting.title}
      description={services.consulting.description}
      icon={services.consulting.icon}
      features={features}
      benefits={benefits}
    />
  )
}

export default ConsultingPage 