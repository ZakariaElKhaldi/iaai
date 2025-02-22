import React from 'react'
import ServicePage from '../../components/templates/ServicePage'
import { services } from '../../config/theme'

const features = [
  {
    title: 'One-on-One Support',
    description: 'Get personalized academic support from expert tutors',
    icon: '👨‍🏫'
  },
  {
    title: 'Flexible Scheduling',
    description: 'Book sessions at times that work best for you',
    icon: '📅'
  },
  {
    title: 'Subject Expertise',
    description: 'Support across all major academic subjects',
    icon: '📚'
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your academic improvement over time',
    icon: '📈'
  },
  {
    title: 'Study Resources',
    description: 'Access to comprehensive study materials and guides',
    icon: '📝'
  },
  {
    title: 'Exam Preparation',
    description: 'Targeted help for test and exam preparation',
    icon: '✅'
  }
]

const benefits = [
  {
    title: 'Improved Grades',
    description: 'See measurable improvement in your academic performance',
    icon: '🎯'
  },
  {
    title: 'Increased Confidence',
    description: 'Build confidence in your academic abilities',
    icon: '💪'
  },
  {
    title: 'Better Understanding',
    description: 'Develop deeper understanding of subject matter',
    icon: '🧠'
  },
  {
    title: 'Stress Reduction',
    description: 'Reduce academic stress with reliable support',
    icon: '🌟'
  }
]

const SupportPage: React.FC = () => {
  return (
    <ServicePage
      type="support"
      title={services.support.title}
      description={services.support.description}
      icon={services.support.icon}
      features={features}
      benefits={benefits}
    />
  )
}

export default SupportPage;