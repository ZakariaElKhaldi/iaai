import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showClose?: boolean
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showClose = true
}: ModalProps) => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className={`w-full ${sizeClasses[size]} bg-slate-800 rounded-xl shadow-xl`}>
              {/* Header */}
              {(title || showClose) && (
                <div className="flex items-center justify-between p-4 border-b border-slate-700">
                  {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
                  {showClose && (
                    <button
                      onClick={onClose}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-4">{children}</div>

              {/* Optional footer slot can be passed as children */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Modal

// Example Footer Component for Modal
export const ModalFooter = ({ children }: { children: ReactNode }) => (
  <div className="flex justify-end space-x-2 p-4 border-t border-slate-700">
    {children}
  </div>
)

// Example Button Components for Modal
export const ModalButton = ({
  children,
  variant = 'primary',
  onClick
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  onClick?: () => void
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  }

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${variantClasses[variant]}`}
    >
      {children}
    </button>
  )
} 