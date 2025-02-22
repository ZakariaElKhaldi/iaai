import React, { createContext, useContext, useReducer } from 'react'

// Types
interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'admin'
}

interface AppState {
  isAuthenticated: boolean
  user: User | null
  preferences: {
    reducedMotion: boolean
    highContrast: boolean
    fontSize: 'small' | 'medium' | 'large'
  }
  notifications: {
    id: string
    type: 'info' | 'success' | 'warning' | 'error'
    message: string
  }[]
  isLoading: boolean
}

type Action =
  | { type: 'SET_AUTH'; payload: { isAuthenticated: boolean; user: User | null } }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_NOTIFICATIONS'; payload: AppState['notifications'] }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AppState['preferences']> }
  | { type: 'RESET_STATE' }

// Initial state
const initialState: AppState = {
  isAuthenticated: false,
  user: null,
  preferences: {
    reducedMotion: false,
    highContrast: false,
    fontSize: 'medium'
  },
  notifications: [],
  isLoading: false
}

// Reducer
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload
      }
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      }
    case 'RESET_STATE':
      return initialState
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null
})

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Action creators
export const actions = {
  setUser: (user: User | null) => ({
    type: 'SET_USER' as const,
    payload: user
  }),
  setLoading: (isLoading: boolean) => ({
    type: 'SET_LOADING' as const,
    payload: isLoading
  }),
  setNotifications: (notifications: AppState['notifications']) => ({
    type: 'SET_NOTIFICATIONS' as const,
    payload: notifications
  }),
  updatePreferences: (preferences: Partial<AppState['preferences']>) => ({
    type: 'UPDATE_PREFERENCES' as const,
    payload: preferences
  }),
  resetState: () => ({
    type: 'RESET_STATE' as const
  })
}

export default AppContext 