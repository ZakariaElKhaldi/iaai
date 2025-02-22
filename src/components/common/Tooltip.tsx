import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TooltipProps {
  children: ReactNode
  content: string
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <div className="group relative inline-block">
      {children}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute z-10 invisible group-hover:visible bg-slate-800 text-white text-sm px-2 py-1 rounded-md whitespace-nowrap -bottom-8 left-1/2 transform -translate-x-1/2"
      >
        {content}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-slate-800" />
      </motion.div>
    </div>
  )
} 