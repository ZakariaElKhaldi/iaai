import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useToast } from './Toast'

const KeyboardShortcuts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if Ctrl/Cmd + K is pressed
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        showToast('Search feature coming soon!', 'info')
      }

      // Navigation shortcuts (with Alt/Option key)
      if (e.altKey) {
        switch (e.key) {
          case 'h':
            e.preventDefault()
            navigate('/')
            break
          case 'd':
            e.preventDefault()
            navigate('/dashboard')
            break
          case 'p':
            e.preventDefault()
            navigate('/practice')
            break
          case 'l':
            e.preventDefault()
            navigate('/learn')
            break
          case 'a':
            e.preventDefault()
            navigate('/assignments')
            break
          case 'x':
            e.preventDefault()
            navigate('/debug')
            break
        }
      }

      // Escape key for closing modals or going back
      if (e.key === 'Escape') {
        if (location.pathname !== '/') {
          window.history.back()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigate, location, showToast])

  return null // This is a utility component, no UI needed
}

export default KeyboardShortcuts 