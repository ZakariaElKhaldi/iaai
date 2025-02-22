import React from 'react'
import ServicePage from '../../components/templates/ServicePage'
import { services } from '../../config/theme'

const features = [
  {
    title: 'Coding Club',
    description: 'Learn programming through fun projects and challenges',
    icon: '💻'
  },
  {
    title: 'Robotics Club',
    description: 'Build and program robots in a collaborative environment',
    icon: '🤖'
  },
  {
    title: 'AI Club',
    description: 'Explore artificial intelligence and machine learning',
    icon: '🧠'
  },
  {
    title: 'Music Tech Club',
    description: 'Combine music with technology and digital production',
    icon: '🎵'
  },
  {
    title: 'Language Club',
    description: 'Practice languages with native speakers and AI tools',
    icon: '🗣️'
  },
  {
    title: 'Innovation Club',
    description: 'Work on cutting-edge technology projects',
    icon: '💡'
  }
]

const benefits = [
  {
    title: 'Hands-on Learning',
    description: 'Gain practical experience with real-world projects',
    icon: '🛠️'
  },
  {
    title: 'Social Connection',
    description: 'Build friendships with like-minded peers',
    icon: '🤝'
  },
  {
    title: 'Portfolio Building',
    description: 'Create impressive projects for your portfolio',
    icon: '📂'
  },
  {
    title: 'Expert Mentorship',
    description: 'Learn from experienced industry professionals',
    icon: '👨‍🏫'
  }
]

const ClubsPage: React.FC = () => {
  return (
    <ServicePage
      type="clubs"
      title={services.clubs.title}
      description={services.clubs.description}
      icon={services.clubs.icon}
      features={features}
      benefits={benefits}
    />
  )
}

export default ClubsPage 