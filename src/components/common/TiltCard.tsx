import { useState, useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  glareEnabled?: boolean
  tiltAmount?: number
}

const TiltCard = ({ 
  children, 
  className = '', 
  glareEnabled = true,
  tiltAmount = 15 
}: TiltCardProps) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateX = (mouseY / (rect.height / 2)) * -tiltAmount
    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount

    setRotation({ x: rotateX, y: rotateY })
    setGlarePosition({ 
      x: (mouseX / rect.width) * 100 + 50,
      y: (mouseY / rect.height) * 100 + 50
    })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setGlarePosition({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
      {glareEnabled && (
        <div 
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]"
          style={{
            transform: 'translateZ(1px)'
          }}
        >
          <div
            className="absolute w-[200%] h-[200%] bg-gradient-to-br from-white/30 to-transparent blur-2xl"
            style={{
              top: `${glarePosition.y - 100}%`,
              left: `${glarePosition.x - 100}%`,
              transition: 'opacity 0.3s ease'
            }}
          />
        </div>
      )}
    </motion.div>
  )
}

export default TiltCard 