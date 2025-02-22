import { motion } from 'framer-motion'
import { useState } from 'react'

// Mock data
const progressData = {
  overallProgress: 68,
  totalCourses: 5,
  completedCourses: 2,
  totalAssignments: 15,
  completedAssignments: 10,
  learningTime: 45,
  streak: 7,
  skills: [
    { name: "Python", level: 75 },
    { name: "Machine Learning", level: 60 },
    { name: "Data Analysis", level: 85 },
    { name: "Neural Networks", level: 45 }
  ],
  recentActivities: [
    {
      type: "course",
      title: "Completed Neural Networks Lesson",
      date: "2024-02-10",
      points: 100
    },
    {
      type: "assignment",
      title: "Submitted ML Project",
      date: "2024-02-09",
      points: 85
    },
    {
      type: "quiz",
      title: "Passed Python Basics Quiz",
      date: "2024-02-08",
      points: 95
    }
  ],
  certificates: [
    {
      title: "AI Fundamentals",
      issueDate: "2024-01-15",
      credential: "CERT-AI-2024-001"
    },
    {
      title: "Python Programming",
      issueDate: "2023-12-20",
      credential: "CERT-PY-2023-089"
    }
  ]
}

const Progress = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')

  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Learning Progress
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Track your learning journey and monitor your achievements.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            {
              title: "Overall Progress",
              value: `${progressData.overallProgress}%`,
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              )
            },
            {
              title: "Learning Streak",
              value: `${progressData.streak} days`,
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              )
            },
            {
              title: "Hours Learned",
              value: `${progressData.learningTime}h`,
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
            {
              title: "Assignments",
              value: `${progressData.completedAssignments}/${progressData.totalAssignments}`,
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              )
            }
          ].map((stat, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                  {stat.icon}
                </div>
                <span className="text-2xl font-bold text-white">{stat.value}</span>
              </div>
              <h3 className="text-slate-400">{stat.title}</h3>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Skills Progress</h2>
              <div className="space-y-6">
                {progressData.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Certificates</h2>
              <div className="space-y-4">
                {progressData.certificates.map((cert, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-2">{cert.title}</h3>
                    <div className="text-sm text-slate-400">
                      <p>Issued: {cert.issueDate}</p>
                      <p className="font-mono mt-1">{cert.credential}</p>
                    </div>
                    <button className="mt-3 text-blue-400 text-sm hover:text-blue-300 transition-colors">
                      View Certificate →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-slate-800/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              <div className="flex space-x-2">
                {['week', 'month', 'year'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      selectedTimeframe === timeframe
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700/75'
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {progressData.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                      activity.type === 'course' ? 'bg-green-500/20 text-green-400'
                      : activity.type === 'assignment' ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {activity.type === 'course' ? '📚' : activity.type === 'assignment' ? '📝' : '✓'}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{activity.title}</h3>
                      <p className="text-sm text-slate-400">{activity.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 font-medium">+{activity.points} points</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Progress 