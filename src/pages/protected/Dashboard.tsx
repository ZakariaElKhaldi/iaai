import { motion } from 'framer-motion'

// Temporary mock data
const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to AI",
    progress: 65,
    nextLesson: "Neural Networks Basics",
    instructor: "Dr. Sarah Chen",
    thumbnail: "https://placehold.co/600x400/2563eb/ffffff?text=AI+Course"
  },
  {
    id: 2,
    title: "Web Development",
    progress: 32,
    nextLesson: "React Hooks",
    instructor: "Alex Johnson",
    thumbnail: "https://placehold.co/600x400/2563eb/ffffff?text=Web+Dev"
  },
  {
    id: 3,
    title: "Data Science",
    progress: 89,
    nextLesson: "Advanced Statistics",
    instructor: "Dr. Michael Brown",
    thumbnail: "https://placehold.co/600x400/2563eb/ffffff?text=Data+Science"
  }
]

const upcomingDeadlines = [
  {
    id: 1,
    title: "AI Project Submission",
    course: "Introduction to AI",
    dueDate: "2024-02-15",
    type: "Project"
  },
  {
    id: 2,
    title: "React Components Quiz",
    course: "Web Development",
    dueDate: "2024-02-18",
    type: "Quiz"
  },
  {
    id: 3,
    title: "Statistical Analysis Report",
    course: "Data Science",
    dueDate: "2024-02-20",
    type: "Assignment"
  }
]

const achievements = [
  {
    id: 1,
    title: "Fast Learner",
    description: "Completed 5 lessons in one day",
    icon: "🚀",
    date: "2024-02-01"
  },
  {
    id: 2,
    title: "Perfect Score",
    description: "Achieved 100% in a quiz",
    icon: "🎯",
    date: "2024-02-05"
  },
  {
    id: 3,
    title: "Team Player",
    description: "Helped 10 students in discussions",
    icon: "🤝",
    date: "2024-02-10"
  }
]

const recentActivity = [
  {
    id: 1,
    action: "Completed lesson",
    subject: "Neural Networks Basics",
    course: "Introduction to AI",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    action: "Submitted assignment",
    subject: "React Components",
    course: "Web Development",
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    action: "Earned achievement",
    subject: "Perfect Score",
    course: "Data Science",
    timestamp: "1 day ago"
  }
]

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Welcome back, Student!</h1>
          <p className="text-slate-400 mt-2">Track your progress and continue learning</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Courses Enrolled", value: "3", icon: "📚" },
            { label: "Assignments Due", value: "5", icon: "📝" },
            { label: "Average Score", value: "92%", icon: "📊" },
            { label: "Study Streak", value: "7 days", icon: "🔥" }
          ].map((stat, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-6">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Enrolled Courses</h2>
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="bg-slate-800/50 rounded-xl p-6 hover:bg-slate-800/75 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                      <p className="text-sm text-slate-400 mb-2">Instructor: {course.instructor}</p>
                      <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-blue-500 rounded-full h-2"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress: {course.progress}%</span>
                        <span className="text-blue-400">Next: {course.nextLesson}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Upcoming Deadlines */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Upcoming Deadlines</h2>
              <div className="bg-slate-800/50 rounded-xl p-4 space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    <div>
                      <h4 className="text-white font-medium">{deadline.title}</h4>
                      <p className="text-sm text-slate-400">{deadline.course}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                          {deadline.type}
                        </span>
                        <span className="text-xs text-slate-400">Due: {deadline.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              <div className="bg-slate-800/50 rounded-xl p-4 space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                    <div>
                      <h4 className="text-white font-medium">{activity.action}</h4>
                      <p className="text-sm text-slate-400">{activity.subject}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-slate-400">{activity.course}</span>
                        <span className="text-xs text-slate-500">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Recent Achievements</h2>
              <div className="bg-slate-800/50 rounded-xl p-4 space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xl">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{achievement.title}</h4>
                      <p className="text-sm text-slate-400">{achievement.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 