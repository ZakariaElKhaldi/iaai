import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type QuestionType = 'multiple-choice' | 'true-false' | 'coding' | 'text'

interface Choice {
  id: string
  text: string
  isCorrect: boolean
}

interface Question {
  id: string
  type: QuestionType
  text: string
  code?: string
  choices?: Choice[]
  correctAnswer?: string
  explanation?: string
  points: number
}

interface QuizProps {
  questions: Question[]
  onComplete?: (results: QuizResults) => void
  showResults?: boolean
  timeLimit?: number // in seconds
  className?: string
}

interface QuizResults {
  score: number
  totalPoints: number
  percentage: number
  answers: {
    questionId: string
    isCorrect: boolean
    points: number
    userAnswer: string
  }[]
  timeSpent: number
}

const Quiz = ({
  questions,
  onComplete,
  showResults = true,
  timeLimit,
  className = ''
}: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [results, setResults] = useState<QuizResults | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 0)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    if (timeLimit && !isCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            handleComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLimit, isCompleted])

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (answer: string) => {
    if (hasSubmitted) return

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }))
  }

  const calculateResults = (): QuizResults => {
    let score = 0
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)
    const detailedAnswers = questions.map(question => {
      const userAnswer = answers[question.id] || ''
      const isCorrect = question.type === 'multiple-choice'
        ? question.choices?.find(c => c.id === userAnswer)?.isCorrect || false
        : userAnswer === question.correctAnswer

      if (isCorrect) {
        score += question.points
      }

      return {
        questionId: question.id,
        isCorrect,
        points: isCorrect ? question.points : 0,
        userAnswer
      }
    })

    return {
      score,
      totalPoints,
      percentage: (score / totalPoints) * 100,
      answers: detailedAnswers,
      timeSpent: timeLimit ? timeLimit - timeRemaining : 0
    }
  }

  const handleSubmit = () => {
    setHasSubmitted(true)
    setShowExplanation(true)
  }

  const handleNext = () => {
    setHasSubmitted(false)
    setShowExplanation(false)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    const quizResults = calculateResults()
    setResults(quizResults)
    setIsCompleted(true)
    onComplete?.(quizResults)
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (isCompleted && showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-slate-800/50 rounded-xl p-6 ${className}`}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Quiz Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{results?.score}</div>
            <div className="text-slate-400">Points Earned</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">
              {results?.percentage.toFixed(1)}%
            </div>
            <div className="text-slate-400">Score</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">
              {formatTime(results?.timeSpent || 0)}
            </div>
            <div className="text-slate-400">Time Spent</div>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const answer = results?.answers.find(a => a.questionId === question.id)
            return (
              <div
                key={question.id}
                className="bg-slate-700/30 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Question {index + 1}
                    </h3>
                    <p className="text-slate-300">{question.text}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    answer?.isCorrect
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {answer?.isCorrect ? 'Correct' : 'Incorrect'}
                  </div>
                </div>
                {question.explanation && (
                  <p className="text-sm text-slate-400 mt-2">
                    {question.explanation}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`bg-slate-800/50 rounded-xl p-6 ${className}`}>
      {/* Progress and Timer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-slate-300">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="w-32 h-2 bg-slate-700 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
              }}
            />
          </div>
        </div>
        {timeLimit && (
          <div className={`text-lg font-medium ${
            timeRemaining < 30 ? 'text-red-400' : 'text-slate-300'
          }`}>
            {formatTime(timeRemaining)}
          </div>
        )}
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            {currentQuestion.text}
          </h2>

          {currentQuestion.code && (
            <pre className="bg-slate-900 rounded-lg p-4 mb-4 overflow-x-auto">
              <code className="text-slate-300">{currentQuestion.code}</code>
            </pre>
          )}

          {/* Multiple Choice */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.choices && (
            <div className="space-y-3">
              {currentQuestion.choices.map(choice => (
                <button
                  key={choice.id}
                  onClick={() => handleAnswer(choice.id)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    answers[currentQuestion.id] === choice.id
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  } ${hasSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                  disabled={hasSubmitted}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {/* True/False */}
          {currentQuestion.type === 'true-false' && (
            <div className="flex space-x-4">
              {['true', 'false'].map(value => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className={`flex-1 p-4 rounded-lg transition-colors ${
                    answers[currentQuestion.id] === value
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  } ${hasSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                  disabled={hasSubmitted}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </button>
              ))}
            </div>
          )}

          {/* Text Input */}
          {currentQuestion.type === 'text' && (
            <input
              type="text"
              value={answers[currentQuestion.id] || ''}
              onChange={e => handleAnswer(e.target.value)}
              disabled={hasSubmitted}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              placeholder="Type your answer..."
            />
          )}

          {/* Coding */}
          {currentQuestion.type === 'coding' && (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={e => handleAnswer(e.target.value)}
              disabled={hasSubmitted}
              rows={6}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              placeholder="Write your code here..."
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && currentQuestion.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-slate-700/30 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">Explanation</h3>
              <p className="text-slate-300">{currentQuestion.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          className="px-4 py-2 text-slate-300 hover:text-white disabled:opacity-50"
          disabled={currentQuestionIndex === 0 || hasSubmitted}
        >
          Previous
        </button>
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={!answers[currentQuestion.id]}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Quiz 