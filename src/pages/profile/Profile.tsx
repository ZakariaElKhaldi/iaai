import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/common/Breadcrumb'
import { useApp } from '../../context/AppContext'

// Mock user data
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Passionate about learning and technology.',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  joinDate: '2024-01-15',
  role: 'Student',
  progress: {
    coursesCompleted: 5,
    certificatesEarned: 3,
    currentCourses: 2,
    totalHours: 45
  },
  skills: [
    { name: 'Python', level: 90 },
    { name: 'Machine Learning', level: 85 },
    { name: 'Data Analysis', level: 80 },
    { name: 'Deep Learning', level: 75 },
    { name: 'Computer Vision', level: 70 }
  ],
  projects: [
    {
      name: 'AI Image Classifier',
      description: 'Deep learning model for image classification',
      tech: ['Python', 'TensorFlow', 'OpenCV'],
      status: 'Completed'
    },
    {
      name: 'NLP Chatbot',
      description: 'Natural language processing chatbot',
      tech: ['Python', 'NLTK', 'Flask'],
      status: 'In Progress'
    }
  ],
  contributions: [
    // Last 12 months of activity (example data)
    ...Array(52).fill(0).map(() => Math.floor(Math.random() * 5))
  ],
  achievements: [
    { name: 'Fast Learner', description: 'Completed 5 courses', icon: '🚀' },
    { name: 'Problem Solver', description: 'Solved 100 exercises', icon: '🧩' },
    { name: 'Team Player', description: 'Helped 20 students', icon: '🤝' }
  ],
  recentActivity: [
    { type: 'course', action: 'Completed', target: 'Introduction to AI', date: '2 days ago' },
    { type: 'exercise', action: 'Solved', target: 'Neural Networks Lab', date: '3 days ago' },
    { type: 'discussion', action: 'Posted in', target: 'Machine Learning Forum', date: '5 days ago' }
  ]
}

interface Settings {
  notifications: {
    email: boolean
    platform: boolean
    marketing: boolean
  }
  privacy: {
    showProgress: boolean
    showActivity: boolean
    showAchievements: boolean
  }
}

const Profile = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      platform: true,
      marketing: false
    },
    privacy: {
      showProgress: true,
      showActivity: true,
      showAchievements: true
    }
  })

  const handleLogout = () => {
    dispatch({ type: 'RESET_STATE' })
    navigate('/')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (category: keyof Settings, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting as keyof Settings[typeof category]]: !prev[category][setting as keyof Settings[typeof category]]
      }
    }))
  }

  const handleSave = () => {
    // Here you would typically save the changes to the backend
    setIsEditing(false)
  }

  const renderContributionGraph = () => {
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Activity Contributions</h3>
        <div className="grid grid-cols-52 gap-1">
          {userData.contributions.map((count, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${
                count === 0 ? 'bg-slate-700' :
                count <= 2 ? 'bg-blue-900/50' :
                count <= 4 ? 'bg-blue-700/50' :
                'bg-blue-500/50'
              }`}
              title={`${count} contributions`}
            />
          ))}
        </div>
      </div>
    )
  }

  const renderSkills = () => {
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
        <div className="space-y-4">
          {userData.skills.map(skill => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{skill.name}</span>
                <span className="text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderProjects = () => {
    return (
      <div className="bg-slate-800/50 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Projects</h3>
        <div className="space-y-4">
          {userData.projects.map(project => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-700/30 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium">{project.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-slate-600/50 text-slate-300 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Content starts directly without the duplicate navbar */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { name: 'Dashboard', path: '/dashboard' },
              { name: 'Profile', path: '/profile' }
            ]}
            className="mb-12 opacity-60 hover:opacity-100 transition-opacity"
          />

          {/* Elegant Profile Header */}
          <div className="relative mb-16">
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="relative w-28 h-28 rounded-full border-4 border-white/10 shadow-2xl"
                />
                <button className="absolute bottom-0 right-0 bg-blue-500/90 hover:bg-blue-500 p-2 rounded-full shadow-lg transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{userData.name}</h1>
                <p className="text-slate-400 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  {userData.role}
                  <span className="text-slate-600">·</span>
                  Joined {new Date(userData.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-slate-700">
            {['Overview', 'Projects', 'Activity', 'Settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.toLowerCase()
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Profile Info */}
              <section className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2.5 bg-blue-500/90 hover:bg-blue-500 text-sm font-medium text-white rounded-full shadow-lg transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="space-x-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2.5 bg-slate-700/50 hover:bg-slate-700 text-sm font-medium text-white rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-blue-500/90 hover:bg-blue-500 text-sm font-medium text-white rounded-full shadow-lg transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-5 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-5 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-3">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={userData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-5 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 resize-none transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Progress Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {Object.entries(userData.progress).map(([key, value]) => (
                  <div key={key} className="bg-slate-800/50 rounded-xl p-4">
                    <h3 className="text-sm text-slate-400 mb-1">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </h3>
                    <p className="text-2xl font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>

              {renderSkills()}
              {renderContributionGraph()}
              {renderProjects()}
            </>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-8">
              {renderProjects()}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-8">
              {renderContributionGraph()}
              <div className="bg-slate-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-2xl">{
                        activity.type === 'course' ? '📚' :
                        activity.type === 'exercise' ? '💻' :
                        '💬'
                      }</div>
                      <div>
                        <p className="text-slate-300">
                          <span className="text-white font-medium">{activity.action}</span>
                          {' '}{activity.target}
                        </p>
                        <p className="text-sm text-slate-400">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              {/* Settings Card */}
              <section className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
                <h2 className="text-xl font-semibold text-white mb-10">Settings</h2>
                
                {/* Notifications */}
                <div className="mb-10">
                  <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">Notifications</h3>
                  <div className="space-y-6">
                    {Object.entries(settings.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between group">
                        <label className="text-slate-300 group-hover:text-white transition-colors">
                          {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                        </label>
                        <button
                          onClick={() => handleCheckboxChange('notifications', key)}
                          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all ${
                            value ? 'bg-blue-500/90 hover:bg-blue-500' : 'bg-slate-700/50 hover:bg-slate-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy */}
                <div>
                  <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-6">Privacy</h3>
                  <div className="space-y-6">
                    {Object.entries(settings.privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between group">
                        <label className="text-slate-300 group-hover:text-white transition-colors">
                          Show {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <button
                          onClick={() => handleCheckboxChange('privacy', key)}
                          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all ${
                            value ? 'bg-blue-500/90 hover:bg-blue-500' : 'bg-slate-700/50 hover:bg-slate-700'
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Profile 