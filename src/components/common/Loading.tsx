import { motion } from 'framer-motion'

interface LoadingProps {
  variant?: 'full' | 'inline' | 'overlay'
  size?: 'small' | 'medium' | 'large'
  text?: string
}

const Loading = ({ variant = 'inline', size = 'medium', text = 'Loading...' }: LoadingProps) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  const Spinner = () => (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-slate-600 border-t-blue-500 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )

  if (variant === 'full') {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <Spinner />
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300"
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  if (variant === 'overlay') {
    return (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <Spinner />
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300"
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  // Inline variant (default)
  return (
    <div className="flex items-center space-x-3">
      <Spinner />
      {text && <span className="text-slate-300">{text}</span>}
    </div>
  )
}

export default Loading 