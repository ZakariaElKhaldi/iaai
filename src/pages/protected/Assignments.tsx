import { motion } from 'framer-motion'
import { useState } from 'react'
import Chatbot from '../../components/common/Chatbot'

// Mock data
const assignments = [
  {
    id: 1,
    title: "Neural Network Implementation",
    course: "Introduction to AI",
    dueDate: "2024-02-15",
    status: "pending",
    type: "Project",
    points: 100,
    description: "Implement a basic neural network from scratch using Python. The network should be able to perform basic classification tasks.",
    requirements: [
      "Implementation in Python",
      "Documentation of the code",
      "Test results and analysis",
      "Performance evaluation"
    ]
  },
  {
    id: 2,
    title: "React Components Quiz",
    course: "Web Development",
    dueDate: "2024-02-18",
    status: "completed",
    type: "Quiz",
    points: 50,
    score: 45,
    description: "Online quiz covering React components, props, state, and lifecycle methods.",
    submittedDate: "2024-02-16"
  },
  {
    id: 3,
    title: "Statistical Analysis Report",
    course: "Data Science",
    dueDate: "2024-02-20",
    status: "in_progress",
    type: "Assignment",
    points: 75,
    description: "Analyze the provided dataset using statistical methods and prepare a comprehensive report.",
    progress: 60
  }
]

const Assignments = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignments[0] | null>(null)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [filter, setFilter] = useState('all')

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true
    return assignment.status === filter
  })

  const handleAssignmentClick = (assignment: typeof assignments[0]) => {
    setSelectedAssignment(assignment)
  }

  const handleCloseAssignment = () => {
    setSelectedAssignment(null)
  }

  if (selectedAssignment) {
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">{selectedAssignment.title}</h1>
                <p className="text-slate-400 mt-2">{selectedAssignment.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsChatbotOpen(!isChatbotOpen)}
                  className="px-4 py-2 bg-blue-600/90 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>AI Assistant</span>
                  {isChatbotOpen ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={handleCloseAssignment}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  ← Back to Assignments
                </button>
              </div>
            </div>
          </motion.div>

          {/* Assignment Details */}
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              {/* Assignment Content */}
              <div className="bg-slate-800/50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                  {selectedAssignment.requirements?.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-1">
              {/* Assignment Info */}
              <div className="bg-slate-800/50 rounded-xl p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400">Course</label>
                    <div className="mt-1 text-white">{selectedAssignment.course}</div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Due Date</label>
                    <div className="mt-1 text-white">
                      {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Type</label>
                    <div className="mt-1 text-white">{selectedAssignment.type}</div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Points</label>
                    <div className="mt-1 text-white">{selectedAssignment.points} XP</div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Status</label>
                    <div className={`mt-1 ${
                      selectedAssignment.status === 'completed'
                        ? 'text-green-400'
                        : selectedAssignment.status === 'in_progress'
                        ? 'text-yellow-400'
                        : 'text-blue-400'
                    }`}>
                      {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Chatbot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />
      </div>
    )
  }

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
          <h1 className="text-3xl font-bold text-white">Assignments</h1>
          <p className="text-slate-400 mt-2">View and manage your course assignments</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-4">
            {[
              { value: 'all', label: 'All' },
              { value: 'pending', label: 'Pending' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800/75'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-800/50 rounded-xl p-6 hover:bg-slate-800/75 transition-colors cursor-pointer"
              onClick={() => handleAssignmentClick(assignment)}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {assignment.title}
                </h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  assignment.status === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : assignment.status === 'in_progress'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                {assignment.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-slate-400">
                  <div className="mb-1">Course</div>
                  <div className="text-white">{assignment.course}</div>
                </div>
                <div className="text-slate-400">
                  <div className="mb-1">Due Date</div>
                  <div className="text-white">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-slate-400">
                  <div className="mb-1">Type</div>
                  <div className="text-white">{assignment.type}</div>
                </div>
                <div className="text-slate-400">
                  <div className="mb-1">Points</div>
                  <div className="text-white">{assignment.points} XP</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Assignments 