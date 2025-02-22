import { useState } from 'react'
import { motion } from 'framer-motion'

// Temporary mock data
const discussions = [
  {
    id: 1,
    title: "Understanding Neural Networks",
    course: "Introduction to AI",
    author: "Sarah Chen",
    replies: 15,
    lastActivity: "2 hours ago",
    tags: ["AI", "Neural Networks", "Deep Learning"]
  },
  {
    id: 2,
    title: "React Hooks Best Practices",
    course: "Web Development",
    author: "Alex Johnson",
    replies: 8,
    lastActivity: "5 hours ago",
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    id: 3,
    title: "Statistical Analysis Methods",
    course: "Data Science",
    author: "Michael Brown",
    replies: 12,
    lastActivity: "1 day ago",
    tags: ["Statistics", "Data Analysis", "Python"]
  }
]

const categories = [
  { name: "All Topics", count: 35 },
  { name: "Course Help", count: 12 },
  { name: "General Discussion", count: 8 },
  { name: "Project Collaboration", count: 15 }
]

const Discussions = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Topics")
  const [searchQuery, setSearchQuery] = useState("")

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
          <h1 className="text-3xl font-bold text-white">Discussion Forums</h1>
          <p className="text-slate-400 mt-2">Engage with your peers and instructors</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm bg-slate-700/50 px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Search and New Discussion */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                New Discussion
              </button>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800/50 rounded-xl p-6 hover:bg-slate-800/75 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors cursor-pointer">
                        {discussion.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {discussion.course} • Posted by {discussion.author}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {discussion.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">
                        {discussion.replies} replies
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Last activity {discussion.lastActivity}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Discussions 