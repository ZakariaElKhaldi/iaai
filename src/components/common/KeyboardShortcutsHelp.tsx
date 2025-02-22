import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const shortcuts = [
  { key: '⌘/Ctrl + K', description: 'Open search' },
  { key: 'Alt + H', description: 'Go to home' },
  { key: 'Alt + D', description: 'Go to dashboard' },
  { key: 'Alt + P', description: 'Go to practice' },
  { key: 'Alt + L', description: 'Go to learn' },
  { key: 'Alt + A', description: 'Go to assignments' },
  { key: 'Alt + X', description: 'Go to debug' },
  { key: 'Esc', description: 'Go back / Close modal' }
]

const KeyboardShortcutsHelp = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-slate-800 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Keyboard Shortcuts</h2>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-slate-300">{shortcut.description}</span>
                    <kbd className="px-3 py-1 bg-slate-700 text-slate-300 rounded-md font-mono text-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-sm text-slate-400">
                  Press <kbd className="px-2 py-1 bg-slate-700 rounded-md font-mono text-sm">⌘/Ctrl + ?</kbd> to toggle this help menu
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default KeyboardShortcutsHelp 