import { useState } from 'react'
import { motion } from 'framer-motion'

// Mock data
const overallStats = [
  { name: 'Total Revenue', value: '$45,678', change: '+15%', trend: 'up' },
  { name: 'Active Users', value: '1,234', change: '+8%', trend: 'up' },
  { name: 'Course Completions', value: '456', change: '+12%', trend: 'up' },
  { name: 'Avg. Engagement', value: '85%', change: '-2%', trend: 'down' }
]

const topCourses = [
  { name: 'Introduction to AI', enrollments: 156, revenue: '$7,800', rating: 4.8 },
  { name: 'Web Development', enrollments: 134, revenue: '$6,700', rating: 4.6 },
  { name: 'Data Science', enrollments: 98, revenue: '$4,900', rating: 4.9 }
]

const recentTransactions = [
  { id: 1, user: 'John Doe', course: 'Introduction to AI', amount: '$49', date: '2024-02-15' },
  { id: 2, user: 'Jane Smith', course: 'Web Development', amount: '$59', date: '2024-02-14' },
  { id: 3, user: 'Mike Johnson', course: 'Data Science', amount: '$69', date: '2024-02-13' }
]

const timeRanges = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last Year', 'All Time']

const Analytics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('Last 30 Days')

  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Analytics</h1>
              <p className="text-slate-400 mt-2">Track your platform's performance</p>
            </div>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {overallStats.map((stat) => (
            <div
              key={stat.name}
              className="bg-slate-800/50 rounded-xl p-6"
            >
              <h3 className="text-sm font-medium text-slate-400">{stat.name}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                  <span className="ml-1">
                    {stat.trend === 'up' ? '↑' : '↓'}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Revenue Overview</h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-slate-400">Revenue chart will be implemented here</p>
            </div>
          </motion.div>

          {/* Top Performing Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-800/50 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Top Courses</h2>
            <div className="space-y-4">
              {topCourses.map((course) => (
                <div
                  key={course.name}
                  className="p-4 bg-slate-700/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{course.name}</span>
                    <span className="text-yellow-400">⭐ {course.rating}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>{course.enrollments} students</span>
                    <span>{course.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Engagement and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* User Engagement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">User Engagement</h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-slate-400">Engagement chart will be implemented here</p>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800/50 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 bg-slate-700/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{transaction.user}</span>
                    <span className="text-green-400">{transaction.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>{transaction.course}</span>
                    <span>{transaction.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Analytics 