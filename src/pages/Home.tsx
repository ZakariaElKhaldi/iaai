import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { theme } from '../config/theme'
import ServicesGrid from '../components/sections/ServicesGrid'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const Home = () => {
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="min-h-screen relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-600/20 to-indigo-500/20"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)'
            }}
          />
          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className={`
          ${theme.layout.maxWidth}
          ${theme.layout.container}
          min-h-screen
          flex flex-col justify-center
          relative
          ${theme.spacing.section.padding.x}
        `}>
          <motion.div
            style={{ scale: scaleProgress, opacity: opacityProgress }}
            className="max-w-4xl"
          >
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div
                variants={floatingAnimation}
                className="mb-8"
              >
                <span className={`
                  inline-block px-4 py-2 rounded-full
                  ${theme.colors.primary.light}
                  ${theme.colors.primary.text}
                  ${theme.typography.size.sm}
                  ${theme.typography.weight.medium}
                `}>
                  🚀 Welcome to the Future of AI Education
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className={`${theme.typography.heading.primary} mb-6`}
              >
                Transform Your Future with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> AI-Powered Learning</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className={`${theme.typography.size.lg} ${theme.colors.text.secondary} mb-8 max-w-2xl`}
              >
                Embark on a journey of innovation and excellence. Our comprehensive AI education platform combines cutting-edge technology with expert guidance to help you master the future of technology.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/services/training"
                  className={`
                    group
                    px-6 py-3 rounded-lg
                    ${theme.colors.primary.main}
                    ${theme.colors.primary.hover}
                    ${theme.colors.text.primary}
                    ${theme.typography.size.base}
                    ${theme.typography.weight.medium}
                    transition-all duration-200
                    flex items-center space-x-2
                  `}
                >
                  <span>Start Learning</span>
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </Link>
                <Link
                  to="#services"
                  className={`
                    group
                    px-6 py-3 rounded-lg
                    ${theme.colors.secondary.main}
                    ${theme.colors.secondary.hover}
                    ${theme.colors.text.primary}
                    ${theme.typography.size.base}
                    ${theme.typography.weight.medium}
                    transition-all duration-200
                    flex items-center space-x-2
                  `}
                >
                  <span>Explore Services</span>
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={fadeInUp}
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
              >
                {[
                  { number: '10K+', label: 'Active Learners' },
                  { number: '95%', label: 'Success Rate' },
                  { number: '200+', label: 'AI Projects' },
                  { number: '24/7', label: 'Expert Support' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-lg bg-slate-800/50 backdrop-blur-sm">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className={`${theme.typography.size['2xl']} ${theme.typography.weight.bold} ${theme.colors.primary.text}`}>
                        {stat.number}
                      </h3>
                      <p className={`${theme.typography.size.sm} ${theme.colors.text.secondary}`}>
                        {stat.label}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center"
            >
              <span className={`${theme.colors.text.secondary} text-sm mb-2`}>Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
                <motion.div
                  animate={{
                    y: [0, 12, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`
        ${theme.spacing.section.padding.y}
        ${theme.spacing.section.padding.x}
        bg-slate-800/50
      `}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={`${theme.layout.maxWidth} ${theme.layout.container}`}
        >
          <motion.h2
            variants={fadeInUp}
            className={`${theme.typography.heading.secondary} text-center mb-12`}
          >
            Why Choose Us
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Expert Guidance',
                description: 'Learn from industry professionals with extensive experience'
              },
              {
                icon: '💡',
                title: 'Innovative Approach',
                description: 'Stay ahead with cutting-edge technologies and methodologies'
              },
              {
                icon: '🤝',
                title: 'Personalized Support',
                description: 'Get tailored assistance for your unique learning journey'
              },
              {
                icon: '📈',
                title: 'Career Growth',
                description: 'Build skills that enhance your professional prospects'
              },
              {
                icon: '🌐',
                title: 'Global Community',
                description: 'Connect with learners and experts worldwide'
              },
              {
                icon: '🛠️',
                title: 'Practical Experience',
                description: 'Apply your knowledge through hands-on projects'
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className={`
                  ${theme.components.card.base}
                  ${theme.colors.secondary.main}
                  ${theme.components.card.content}
                `}
              >
                <div className={`
                  ${theme.components.icon.large}
                  ${theme.colors.primary.light}
                  mb-4
                `}>
                  <span className="text-2xl" role="img" aria-label={feature.title}>
                    {feature.icon}
                  </span>
                </div>
                <h3 className={`
                  ${theme.typography.size.lg}
                  ${theme.typography.weight.bold}
                  ${theme.colors.text.primary}
                  mb-2
                `}>
                  {feature.title}
                </h3>
                <p className={`
                  ${theme.typography.size.sm}
                  ${theme.colors.text.secondary}
                `}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services">
        <ServicesGrid />
      </section>

      {/* Stats Section */}
      <section className={`
        ${theme.spacing.section.padding.y}
        ${theme.spacing.section.padding.x}
        bg-slate-800/50
      `}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={`${theme.layout.maxWidth} ${theme.layout.container}`}
        >
          <motion.h2
            variants={fadeInUp}
            className={`${theme.typography.heading.secondary} text-center mb-12`}
          >
            Our Impact
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '1000+', label: 'Students Trained' },
              { number: '50+', label: 'Expert Instructors' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <h3 className={`
                  ${theme.typography.size['3xl']}
                  ${theme.typography.weight.bold}
                  ${theme.colors.primary.text}
                  mb-2
                `}>
                  {stat.number}
                </h3>
                <p className={`
                  ${theme.typography.size.base}
                  ${theme.colors.text.secondary}
                `}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className={`
        ${theme.spacing.section.padding.y}
        ${theme.spacing.section.padding.x}
        bg-slate-900
      `}>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={`${theme.layout.maxWidth} ${theme.layout.container}`}
        >
          <motion.h2
            variants={fadeInUp}
            className={`${theme.typography.heading.secondary} text-center mb-12`}
          >
            What Our Students Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The AI training program completely transformed my career path. I went from a beginner to landing a job in AI development.",
                author: "Sarah Chen",
                role: "AI Developer",
                image: "👩‍💻"
              },
              {
                quote: "The academic support services helped me excel in my research. The guidance was invaluable for my thesis completion.",
                author: "James Wilson",
                role: "PhD Candidate",
                image: "👨‍🎓"
              },
              {
                quote: "Being part of the robotics club opened up amazing opportunities. The hands-on experience was incredible.",
                author: "Emily Rodriguez",
                role: "Robotics Engineer",
                image: "👩‍🔧"
              }
            ].map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={fadeInUp}
                className={`
                  ${theme.components.card.base}
                  ${theme.colors.secondary.main}
                  ${theme.components.card.content}
                  relative
                `}
              >
                <div className="absolute -top-4 left-6 text-4xl text-blue-500 opacity-50">
                  "
                </div>
                <p className={`
                  ${theme.typography.size.base}
                  ${theme.colors.text.secondary}
                  mb-6 mt-4
                `}>
                  {testimonial.quote}
                </p>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{testimonial.image}</span>
                  <div>
                    <h4 className={`${theme.typography.size.sm} ${theme.colors.text.primary} font-medium`}>
                      {testimonial.author}
                    </h4>
                    <p className={`${theme.typography.size.xs} ${theme.colors.text.secondary}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Quotes Section */}
      <section className={`
        ${theme.spacing.section.padding.y}
        ${theme.spacing.section.padding.x}
        bg-slate-800/50 relative overflow-hidden
      `}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10" />
        
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={`${theme.layout.maxWidth} ${theme.layout.container} relative`}
        >
          <motion.h2
            variants={fadeInUp}
            className={`${theme.typography.heading.secondary} text-center mb-12`}
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Our mission is to make AI education accessible to everyone. We believe in the power of combining theoretical knowledge with practical experience.",
                author: "Dr. Maria Foster",
                role: "Chief Academic Officer",
                image: "👩‍🏫"
              },
              {
                quote: "We're not just teaching technology; we're shaping the future of education through innovative AI solutions.",
                author: "Prof. David Chang",
                role: "Head of AI Research",
                image: "👨‍🔬"
              },
              {
                quote: "Our focus on practical, hands-on learning sets our students up for real-world success in the AI industry.",
                author: "Lisa Thompson",
                role: "Technical Director",
                image: "👩‍💼"
              },
              {
                quote: "We're committed to creating an inclusive learning environment where everyone can thrive in tech.",
                author: "Michael Brooks",
                role: "Community Director",
                image: "👨‍💼"
              }
            ].map((member) => (
              <motion.div
                key={member.author}
                variants={fadeInUp}
                className={`
                  ${theme.components.card.base}
                  ${theme.colors.secondary.main}
                  ${theme.components.card.content}
                  flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6
                `}
              >
                <div className={`
                  ${theme.components.icon.large}
                  ${theme.colors.primary.light}
                  flex-shrink-0 w-20 h-20
                `}>
                  <span className="text-4xl" role="img" aria-hidden="true">
                    {member.image}
                  </span>
                </div>
                <div>
                  <p className={`
                    ${theme.typography.size.base}
                    ${theme.colors.text.secondary}
                    mb-4 italic
                  `}>
                    "{member.quote}"
                  </p>
                  <h4 className={`${theme.typography.size.base} ${theme.colors.text.primary} font-medium`}>
                    {member.author}
                  </h4>
                  <p className={`${theme.typography.size.sm} ${theme.colors.primary.text}`}>
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className={`
        ${theme.spacing.section.padding.y}
        ${theme.spacing.section.padding.x}
        relative overflow-hidden
      `}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10" />
        
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className={`${theme.layout.maxWidth} ${theme.layout.container} relative text-center`}
        >
          <motion.h2
            variants={fadeInUp}
            className={`${theme.typography.heading.secondary} mb-4`}
          >
            Ready to Start Your Journey?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className={`
              ${theme.typography.size.lg}
              ${theme.colors.text.secondary}
              mb-8 max-w-2xl mx-auto
            `}
          >
            Join our community of learners and take the first step towards mastering AI technology.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex justify-center space-x-4"
          >
            <Link
              to="/auth/register"
              className={`
                px-8 py-4 rounded-lg
                ${theme.colors.primary.main}
                ${theme.colors.primary.hover}
                ${theme.colors.text.primary}
                ${theme.typography.size.base}
                ${theme.typography.weight.medium}
                transition-all duration-200
              `}
            >
              Get Started Now
            </Link>
            <Link
              to="/contact"
              className={`
                px-8 py-4 rounded-lg
                ${theme.colors.secondary.main}
                ${theme.colors.secondary.hover}
                ${theme.colors.text.primary}
                ${theme.typography.size.base}
                ${theme.typography.weight.medium}
                transition-all duration-200
              `}
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home 