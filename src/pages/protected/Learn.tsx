import { motion } from 'framer-motion'
import { useState } from 'react'

// Mock data
const courseContent = {
  title: "Introduction to AI",
  description: "Learn the fundamentals of Artificial Intelligence and Machine Learning",
  instructor: "Dr. Sarah Chen",
  duration: "12 weeks",
  modules: [
    {
      id: 1,
      title: "Foundations of AI",
      completed: true,
      lessons: [
        { id: 1, title: "What is Artificial Intelligence?", duration: "45 min", completed: true },
        { id: 2, title: "History of AI", duration: "30 min", completed: true },
        { id: 3, title: "Types of AI Systems", duration: "40 min", completed: true }
      ]
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      completed: true,
      lessons: [
        { id: 4, title: "Introduction to Machine Learning", duration: "50 min", completed: true },
        { id: 5, title: "Supervised vs Unsupervised Learning", duration: "45 min", completed: true },
        { id: 6, title: "Training Models", duration: "60 min", completed: true }
      ]
    },
    {
      id: 3,
      title: "Neural Networks",
      completed: false,
      lessons: [
        { id: 7, title: "Neural Networks Basics", duration: "55 min", completed: false },
        { id: 8, title: "Activation Functions", duration: "40 min", completed: false },
        { id: 9, title: "Backpropagation", duration: "60 min", completed: false }
      ]
    },
    {
      id: 4,
      title: "Deep Learning",
      completed: false,
      lessons: [
        { id: 10, title: "Introduction to Deep Learning", duration: "45 min", completed: false },
        { id: 11, title: "Convolutional Neural Networks", duration: "60 min", completed: false },
        { id: 12, title: "Recurrent Neural Networks", duration: "55 min", completed: false }
      ]
    }
  ]
}

const Learn = () => {
  const [selectedModule, setSelectedModule] = useState(courseContent.modules[0])
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const totalLessons = courseContent.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  )
  const completedLessons = courseContent.modules.reduce(
    (acc, module) => acc + module.lessons.filter(lesson => lesson.completed).length,
    0
  )
  const progress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">{courseContent.title}</h1>
          <p className="text-slate-400">{courseContent.description}</p>
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center text-slate-400">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {courseContent.instructor}
            </div>
            <div className="flex items-center text-slate-400">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {courseContent.duration}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Video Player */}
            <div className="bg-slate-800/50 rounded-xl aspect-video mb-8 relative overflow-hidden">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                  <p className="text-slate-400">Video player placeholder</p>
                </div>
              )}
            </div>

            {/* Lesson Content */}
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                {selectedModule.title}
              </h2>
              <div className="space-y-4">
                {selectedModule.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/75 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${
                        lesson.completed ? 'bg-green-500' : 'bg-slate-600'
                      }`}>
                        {lesson.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{lesson.title}</h3>
                        <p className="text-sm text-slate-400">{lesson.duration}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                      {lesson.completed ? 'Review' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Progress */}
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Your Progress</h2>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-500 rounded-full h-2"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>{completedLessons} of {totalLessons} lessons completed</span>
                <span>{progress}%</span>
              </div>
            </div>

            {/* Course Modules */}
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Course Modules</h2>
              <div className="space-y-4">
                {courseContent.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(module)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedModule.id === module.id
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{module.title}</span>
                      {module.completed && (
                        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-slate-800/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Resources</h2>
              <div className="space-y-3">
                {[
                  { icon: "📚", title: "Course Materials" },
                  { icon: "📝", title: "Assignment Guidelines" },
                  { icon: "💡", title: "Additional Reading" },
                  { icon: "🔗", title: "Useful Links" }
                ].map((resource, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700/75 transition-colors text-slate-300"
                  >
                    <span className="text-xl mr-3">{resource.icon}</span>
                    <span>{resource.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Learn 