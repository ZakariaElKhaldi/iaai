import { motion } from 'framer-motion'
import Chatbot from '../../components/common/Chatbot'
import Breadcrumb from '../../components/common/Breadcrumb'

const ChatbotPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'AI Assistant', path: '/chat' }
          ]}
          className="mb-12 opacity-60 hover:opacity-100 transition-opacity"
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">AI Learning Assistant</h1>
          <p className="text-xl text-slate-400">
            Get help with your coursework, assignments, and coding challenges
          </p>
        </motion.div>

        {/* Chatbot */}
        <Chatbot variant="fullpage" isOpen={true} />
      </div>
    </div>
  )
}

export default ChatbotPage 