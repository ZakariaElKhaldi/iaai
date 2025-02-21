import { motion } from 'framer-motion'
import AnimateOnScroll from '../common/AnimateOnScroll'

const formFields = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (234) 567-8900' },
  { name: 'program', label: 'Interested Program', type: 'select', options: [
    'IT & AI Training',
    'Academic Support',
    'Consulting Services',
    'Learning Clubs'
  ]},
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your learning goals...' }
]

const Contact = () => {
  return (
    <section className="relative py-20 overflow-hidden" id="contact">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Ready to start your journey? Contact us to learn more about our programs and how we can help you achieve your goals.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll>
            <motion.form 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {formFields.map((field, index) => (
                <motion.div 
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <label 
                    htmlFor={field.name}
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                    >
                      <option value="">Select a program</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 transition-all"
                    />
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: formFields.length * 0.1 }}
              >
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transform hover:scale-[1.02] transition-all"
                >
                  Send Message
                </button>
              </motion.div>
            </motion.form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

export default Contact 