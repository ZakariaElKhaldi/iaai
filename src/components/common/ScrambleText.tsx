import { useState, useEffect } from 'react'

interface ScrambleTextProps {
  text: string
  className?: string
  scrambleSpeed?: number
  delay?: number
}

const ScrambleText = ({ 
  text, 
  className = '',
  scrambleSpeed = 50,
  delay = 0 
}: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const characters = '!<>-_\\/[]{}—=+*^?#'

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let interval: ReturnType<typeof setInterval>
    let iteration = 0
    
    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(prev => {
          const result = text.split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join('')
          
          if (iteration >= text.length) {
            clearInterval(interval)
          }
          
          iteration += 1/3
          return result
        })
      }, scrambleSpeed)
    }, delay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, scrambleSpeed, delay])

  return (
    <span className={className}>
      {displayText}
    </span>
  )
}

export default ScrambleText 