import React, { Component, ErrorInfo } from 'react'
import { theme } from '../../config/theme'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
          <div className={`max-w-md w-full p-6 rounded-lg ${theme.colors.secondary.main} shadow-xl`}>
            <div className="text-center">
              <h2 className={`${theme.typography.size.lg} ${theme.typography.weight.bold} ${theme.colors.text.primary} mb-4`}>
                Oops! Something went wrong
              </h2>
              <p className={`${theme.typography.size.sm} ${theme.colors.text.secondary} mb-6`}>
                We apologize for the inconvenience. An error has occurred while rendering this component.
              </p>
              {this.state.error && (
                <pre className={`
                  text-left p-4 rounded-md bg-slate-800 overflow-auto
                  ${theme.typography.size.xs} ${theme.colors.text.secondary}
                  mb-6 max-h-40
                `}>
                  {this.state.error.toString()}
                </pre>
              )}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={this.handleRetry}
                  className={`
                    px-4 py-2 rounded-md
                    ${theme.colors.primary.main} ${theme.colors.primary.hover}
                    ${theme.typography.size.sm} ${theme.colors.text.primary}
                    transition-colors duration-200
                  `}
                >
                  Try Again
                </button>
                <a
                  href="/"
                  className={`
                    px-4 py-2 rounded-md
                    ${theme.colors.secondary.hover}
                    ${theme.typography.size.sm} ${theme.colors.text.secondary}
                    transition-colors duration-200
                  `}
                >
                  Go Home
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary 