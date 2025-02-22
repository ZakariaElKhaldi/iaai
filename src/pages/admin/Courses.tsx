import { useState } from 'react'
import { motion } from 'framer-motion'

// Mock data
const courses = [
  {
    id: 1,
    title: 'Introduction to AI',
    instructor: 'Dr. Sarah Chen',
    category: 'Artificial Intelligence',
    level: 'Beginner',
    students: 156,
    rating: 4.8,
    status: 'Active',
    lastUpdated: '2024-02-15'
  },
  {
    id: 2,
    title: 'Advanced Web Development',
    instructor: 'Alex Johnson',
    category: 'Web Development',
    level: 'Advanced',
    students: 89,
    rating: 4.6,
    status: 'Draft',
    lastUpdated: '2024-02-10'
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    instructor: 'Michael Brown',
    category: 'Data Science',
    level: 'Intermediate',
    students: 234,
    rating: 4.9,
    status: 'Active',
    lastUpdated: '2024-02-01'
  }
]

const categories = ['All Categories', 'Artificial Intelligence', 'Web Development', 'Data Science', 'Machine Learning']
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
const statuses = ['All Statuses', 'Active', 'Draft', 'Archived']

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')

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
              <h1 className="text-3xl font-bold text-white">Courses</h1>
              <p className="text-slate-400 mt-2">Manage your platform courses</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create New Course
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {levels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-800/50 rounded-xl p-6 hover:bg-slate-800/75 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  course.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  course.status === 'Draft' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {course.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-400">
                  <span className="mr-2">👤</span>
                  {course.instructor}
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <span className="mr-2">📚</span>
                  {course.category}
                </div>
                <div className="flex items-center text-sm text-slate-400">
                  <span className="mr-2">🎯</span>
                  {course.level}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    <span className="mr-2">👥</span>
                    {course.students} Students
                  </span>
                  <span className="text-yellow-400">
                    ⭐ {course.rating}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                  <span>Last updated: {course.lastUpdated}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors">
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center justify-between"
        >
          <div className="text-sm text-slate-400">
            Showing 1 to 3 of 3 results
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-slate-800/50 text-white rounded-lg hover:bg-slate-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-slate-800/50 text-white rounded-lg hover:bg-slate-700 transition-colors">
              Next
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Courses 