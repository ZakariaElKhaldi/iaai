import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

interface BreadcrumbItem {
  name: string
  path: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  showHome?: boolean
  className?: string
}

const Breadcrumb = ({ items = [], showHome = true, className = '' }: BreadcrumbProps) => {
  const location = useLocation()
  
  // Generate breadcrumb items from current path if none provided
  const breadcrumbItems = items.length > 0 ? items : location.pathname
    .split('/')
    .filter(Boolean)
    .map((path, index, array) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1),
      path: '/' + array.slice(0, index + 1).join('/')
    }))

  // Add home item if showHome is true
  const allItems = showHome
    ? [{ name: 'Home', path: '/' }, ...breadcrumbItems]
    : breadcrumbItems

  return (
    <nav className={`flex items-center space-x-2 ${className}`}>
      {allItems.map((item, index) => (
        <motion.div
          key={item.path}
          className="flex items-center"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {index > 0 && (
            <svg
              className="w-5 h-5 text-slate-400 mx-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          {index === allItems.length - 1 ? (
            <span className="text-slate-300">{item.name}</span>
          ) : (
            <Link
              to={item.path}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          )}
        </motion.div>
      ))}
    </nav>
  )
}

export default Breadcrumb 