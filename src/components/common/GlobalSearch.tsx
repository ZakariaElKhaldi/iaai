import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '../../config/theme'
import LoadingSpinner from './LoadingSpinner'

interface SearchResult {
  title: string
  path: string
  description: string
  icon?: string
}

const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle search with Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      // Mock search results - replace with actual search implementation
      const mockResults: SearchResult[] = [
        {
          title: 'Dashboard',
          path: '/dashboard',
          description: 'View your personal dashboard',
          icon: '📊'
        },
        {
          title: 'Profile Settings',
          path: '/profile',
          description: 'Manage your account settings',
          icon: '👤'
        },
        // Add more mock results as needed
      ]

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      setResults(mockResults)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setSelectedIndex(0)
    performSearch(newQuery)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % results.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length)
        break
      case 'Enter':
        if (results[selectedIndex]) {
          navigate(results[selectedIndex].path)
          setIsOpen(false)
        }
        break
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={searchRef}
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={theme.animation.transition.fast}
        >
          <div className="min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            
            <motion.div
              className={`
                relative inline-block w-full max-w-2xl p-6 my-16 text-left
                ${theme.colors.secondary.main} rounded-xl shadow-2xl
                transform transition-all
              `}
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              transition={theme.animation.transition.default}
            >
              {/* Search Input */}
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleQueryChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Search anything... (Press '/' to focus)"
                  className={`
                    w-full px-4 py-3 rounded-lg
                    ${theme.colors.secondary.light}
                    ${theme.colors.text.primary}
                    ${theme.typography.size.base}
                    border border-slate-700 focus:border-blue-500
                    focus:ring-2 focus:ring-blue-500/20
                    placeholder:text-slate-500
                    transition-all duration-200
                  `}
                  aria-label="Search"
                />
                
                {/* Search Icon or Loading Spinner */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {isLoading ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <span className="text-slate-400">⌘K</span>
                  )}
                </div>
              </div>

              {/* Search Results */}
              {results.length > 0 && (
                <div className="mt-4 space-y-2">
                  {results.map((result, index) => (
                    <motion.button
                      key={result.path}
                      onClick={() => {
                        navigate(result.path)
                        setIsOpen(false)
                      }}
                      className={`
                        w-full p-3 rounded-lg flex items-start space-x-3
                        ${index === selectedIndex ? theme.colors.primary.light : 'hover:bg-slate-800'}
                        transition-colors duration-150
                      `}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {result.icon && (
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                          {result.icon}
                        </span>
                      )}
                      <div className="flex-1 text-left">
                        <h3 className={`${theme.typography.size.sm} ${theme.colors.text.primary} font-medium`}>
                          {result.title}
                        </h3>
                        <p className={`${theme.typography.size.xs} ${theme.colors.text.secondary} mt-0.5`}>
                          {result.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* No Results */}
              {query && !isLoading && results.length === 0 && (
                <div className="mt-4 text-center py-8">
                  <p className={`${theme.typography.size.sm} ${theme.colors.text.secondary}`}>
                    No results found for "{query}"
                  </p>
                </div>
              )}

              {/* Search Tips */}
              {!query && (
                <div className="mt-4 border-t border-slate-700/50 pt-4">
                  <p className={`${theme.typography.size.xs} ${theme.colors.text.secondary}`}>
                    Search tips:
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {[
                      { key: '↑↓', desc: 'Navigate' },
                      { key: 'Enter', desc: 'Select' },
                      { key: 'Esc', desc: 'Close' },
                      { key: '⌘K', desc: 'Open search' }
                    ].map(tip => (
                      <div key={tip.key} className="flex items-center space-x-2">
                        <kbd className={`
                          px-2 py-1 rounded
                          ${theme.colors.secondary.light}
                          ${theme.typography.size.xs}
                          ${theme.colors.text.secondary}
                        `}>
                          {tip.key}
                        </kbd>
                        <span className={`${theme.typography.size.xs} ${theme.colors.text.secondary}`}>
                          {tip.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GlobalSearch 