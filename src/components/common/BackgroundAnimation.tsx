import { motion } from 'framer-motion'

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute w-full h-full bg-slate-900">
        {/* Simplified gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Static grid overlay */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0)_1px,transparent_1px),linear-gradient(to_right,rgba(15,23,42,0)_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{ opacity: 0.05 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,#0f172a)]" />
        </div>
      </div>
    </div>
  )
}

export default BackgroundAnimation 