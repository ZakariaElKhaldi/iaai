import { motion, useScroll } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-blue-600 transform origin-left z-50"
      style={{ scaleX: scrollYProgress }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    />
  )
}

export default ScrollProgress 