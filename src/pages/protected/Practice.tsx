import { useState } from 'react'
import { motion } from 'framer-motion'
import CodeEditor from '../../components/common/CodeEditor'
import Chatbot from '../../components/common/Chatbot'

// Temporary mock data
const exercises = [
  {
    id: 1,
    title: "Neural Network Implementation",
    difficulty: "Advanced",
    points: 100,
    timeEstimate: "45 mins",
    category: "AI",
    completionRate: "65%",
    description: "Implement a basic neural network from scratch using Python"
  },
  {
    id: 2,
    title: "React Custom Hooks",
    difficulty: "Intermediate",
    points: 75,
    timeEstimate: "30 mins",
    category: "Web Development",
    completionRate: "78%",
    description: "Create custom hooks for state management in React"
  },
  {
    id: 3,
    title: "Data Visualization",
    difficulty: "Beginner",
    points: 50,
    timeEstimate: "20 mins",
    category: "Data Science",
    completionRate: "92%",
    description: "Create interactive data visualizations using Python libraries"
  }
]

const categories = [
  { name: "All Exercises", count: 50 },
  { name: "AI & Machine Learning", count: 15 },
  { name: "Web Development", count: 20 },
  { name: "Data Science", count: 15 }
]

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

const Practice = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Exercises")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null)
  const [code, setCode] = useState("")
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const handleExerciseClick = (exercise: typeof exercises[0]) => {
    setSelectedExercise(exercise)
    setCode("// Write your solution here\n\n")
  }

  const handleCloseEditor = () => {
    setSelectedExercise(null)
    setCode("")
  }

  if (selectedExercise) {
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
                <h1 className="text-3xl font-bold text-white">{selectedExercise.title}</h1>
                <p className="text-slate-400 mt-2">{selectedExercise.description}</p>
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
                  onClick={handleCloseEditor}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                >
                  ← Back to Exercises
                </button>
              </div>
            </div>
          </motion.div>

          {/* Exercise Details */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-3">
              <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Instructions</h2>
                <p className="text-slate-300">{selectedExercise.description}</p>
              </div>
              
              {/* Code Editor */}
              <CodeEditor
                value={code}
                onChange={(value: string | undefined) => setCode(value || '')}
                language="python"
                className="min-h-[500px]"
              />

              {/* Submit Button */}
              <div className="mt-6 flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Submit Solution
                </button>
              </div>
            </div>

            {/* Exercise Info Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Exercise Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400">Difficulty</label>
                    <div className={`mt-1 text-sm ${
                      selectedExercise.difficulty === 'Advanced'
                        ? 'text-red-400'
                        : selectedExercise.difficulty === 'Intermediate'
                        ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}>
                      {selectedExercise.difficulty}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Points</label>
                    <div className="mt-1 text-sm text-white">{selectedExercise.points} XP</div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Estimated Time</label>
                    <div className="mt-1 text-sm text-white">{selectedExercise.timeEstimate}</div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Category</label>
                    <div className="mt-1 text-sm text-white">{selectedExercise.category}</div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400">Completion Rate</label>
                    <div className="mt-1 text-sm text-white">{selectedExercise.completionRate}</div>
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
          <h1 className="text-3xl font-bold text-white">Practice Area</h1>
          <p className="text-slate-400 mt-2">Sharpen your skills with hands-on exercises</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Categories */}
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

            {/* Difficulty Filter */}
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Difficulty</h2>
              <div className="space-y-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`w-full p-3 rounded-lg transition-colors ${
                      selectedDifficulty === difficulty
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    {difficulty}
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
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Exercises Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {exercises.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800/50 rounded-xl p-6 hover:bg-slate-800/75 transition-colors cursor-pointer"
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      {exercise.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-sm ${
                      exercise.difficulty === 'Advanced'
                        ? 'bg-red-500/20 text-red-400'
                        : exercise.difficulty === 'Intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    {exercise.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-slate-400">
                      <div className="mb-1">Category</div>
                      <div className="text-white">{exercise.category}</div>
                    </div>
                    <div className="text-slate-400">
                      <div className="mb-1">Points</div>
                      <div className="text-white">{exercise.points} XP</div>
                    </div>
                    <div className="text-slate-400">
                      <div className="mb-1">Time</div>
                      <div className="text-white">{exercise.timeEstimate}</div>
                    </div>
                    <div className="text-slate-400">
                      <div className="mb-1">Completion Rate</div>
                      <div className="text-white">{exercise.completionRate}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Chatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  )
}

export default Practice 