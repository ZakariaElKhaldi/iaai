import { motion } from 'framer-motion'

// Mock data
const metrics = [
  { name: 'Total Users', value: '1,234', change: '+12%', icon: '👥' },
  { name: 'Active Courses', value: '45', change: '+5%', icon: '📚' },
  { name: 'Completion Rate', value: '78%', change: '+3%', icon: '📈' },
  { name: 'Revenue', value: '$12,345', change: '+8%', icon: '💰' }
]

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'Completed Course', course: 'Introduction to AI', time: '2 hours ago' },
  { id: 2, user: 'Jane Smith', action: 'Enrolled', course: 'Web Development', time: '3 hours ago' },
  { id: 3, user: 'Mike Johnson', action: 'Submitted Assignment', course: 'Data Science', time: '5 hours ago' }
]

const AdminDashboard = () => {
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
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 mt-2">Overview of your platform's performance</p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metrics.map((metric) => (
            <div
              key={metric.name}
              className="bg-slate-800/50 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{metric.icon}</span>
                <span className={`text-sm ${
                  metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-4">{metric.value}</h3>
              <p className="text-slate-400 text-sm">{metric.name}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">{activity.user}</p>
                    <p className="text-sm text-slate-400">
                      {activity.action} - {activity.course}
                    </p>
                  </div>
                  <span className="text-sm text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create New Course
              </button>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Add New User
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                View Reports
              </button>
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Manage Content
              </button>
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-800/50 rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-slate-400">Server Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-white">Operational</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-slate-400">Database Load</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-white">45% Capacity</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-slate-400">API Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-white">All Systems Go</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard 