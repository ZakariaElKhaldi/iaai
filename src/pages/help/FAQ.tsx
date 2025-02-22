import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Breadcrumb from '../../components/common/Breadcrumb'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  {
    category: "Getting Started",
    question: "How do I create an account?",
    answer: "To create an account, click the 'Get Started' button on the homepage and follow the registration process. You'll need to provide your email, create a password, and verify your email address."
  },
  {
    category: "Getting Started",
    question: "What are the system requirements?",
    answer: "Our platform works best on modern browsers like Chrome, Firefox, Safari, or Edge. Make sure your browser is up to date and you have a stable internet connection."
  },
  {
    category: "Courses",
    question: "How do I enroll in a course?",
    answer: "Browse our course catalog, select a course you're interested in, and click the 'Enroll' button. You may need to complete payment if it's a paid course."
  },
  {
    category: "Courses",
    question: "Can I access course content offline?",
    answer: "Yes, you can download course materials for offline viewing through our mobile app. However, you'll need to be online to submit assignments and participate in discussions."
  },
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Some regions may have additional local payment options."
  },
  {
    category: "Payments",
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee for most courses. If you're unsatisfied, you can request a refund within 30 days of purchase through your account settings."
  },
  {
    category: "Technical Support",
    question: "What should I do if I encounter technical issues?",
    answer: "First, try clearing your browser cache and refreshing the page. If the issue persists, check our status page for any known issues, or contact our support team."
  },
  {
    category: "Technical Support",
    question: "How do I reset my password?",
    answer: "Click the 'Forgot Password' link on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
  }
]

const categories = Array.from(new Set(faqs.map(faq => faq.category)))

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Getting Started")
  const [openQuestions, setOpenQuestions] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFaqs = faqs.filter(faq =>
    (selectedCategory === "All" || faq.category === selectedCategory) &&
    (searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ name: 'Help Center', path: '/help' }]}
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-4">Help Center</h1>
            <p className="text-xl text-slate-300">
              Find answers to frequently asked questions and get support
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-3 top-3.5 w-5 h-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      openQuestions.includes(index) ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {openQuestions.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-slate-300">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Support Options */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Support</h3>
              <p className="text-slate-300 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Contact Us
              </button>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Documentation</h3>
              <p className="text-slate-300 mb-4">
                Browse our detailed documentation for in-depth guides and tutorials.
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Docs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ 