import React from 'react'
import ServicePage from '../../components/templates/ServicePage'
import { services } from '../../config/theme'

const features = [
  {
    title: 'AI Fundamentals',
    description: 'Learn the core concepts and principles of artificial intelligence and machine learning.',
    icon: '🧠'
  },
  {
    title: 'Hands-on Projects',
    description: 'Apply your knowledge through practical projects using real-world datasets and scenarios.',
    icon: '💻'
  },
  {
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with extensive experience in AI and machine learning.',
    icon: '👨‍🏫'
  },
  {
    title: 'Personalized Learning',
    description: 'Tailored curriculum based on your current skill level and learning objectives.',
    icon: '📝'
  },
  {
    title: 'Industry Tools',
    description: 'Get hands-on experience with popular AI frameworks and development tools.',
    icon: '🛠️'
  },
  {
    title: 'Career Support',
    description: 'Receive guidance on career opportunities and professional development in AI.',
    icon: '🎯'
  }
]

const benefits = [
  {
    title: 'Career Advancement',
    description: 'Gain in-demand skills that can help you advance your career in the growing field of AI.',
    icon: '📈'
  },
  {
    title: 'Practical Experience',
    description: 'Build a portfolio of real-world projects that demonstrate your AI capabilities.',
    icon: '🏆'
  },
  {
    title: 'Industry Network',
    description: 'Connect with other professionals and expand your network in the AI community.',
    icon: '🤝'
  },
  {
    title: 'Flexible Learning',
    description: 'Learn at your own pace with a combination of online and in-person training options.',
    icon: '⏰'
  }
]

const TrainingPage: React.FC = () => {
  const { training } = services

  return (
    <ServicePage
      type="training"
      title={training.title}
      description={training.description}
      icon={training.icon}
      features={features}
      benefits={benefits}
    />
  )
}

export default TrainingPage 