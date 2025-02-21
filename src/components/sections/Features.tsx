import AnimateOnScroll from '../common/AnimateOnScroll'

const features = [
  {
    stat: '95%',
    title: 'Success Rate',
    description: 'Of our students successfully transition into tech careers'
  },
  {
    stat: '50+',
    title: 'Expert Instructors',
    description: 'Industry professionals with real-world experience'
  },
  {
    stat: '24/7',
    title: 'Learning Support',
    description: 'Access to resources and support whenever you need'
  },
  {
    stat: '1000+',
    title: 'Students Trained',
    description: 'Across various programs and specializations'
  }
]

const Features = () => {
  return (
    <section className="relative py-20" id="features">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose IAAI Academy?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              We combine cutting-edge technology with expert instruction to deliver unparalleled educational experiences.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimateOnScroll key={index} delay={index * 0.1}>
              <div className="relative group bg-slate-800/50 rounded-2xl p-8 hover:bg-slate-800/75 transition-all duration-300">
                {/* Stat */}
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  {feature.stat}
                </div>
                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                {/* Description */}
                <p className="text-slate-300">
                  {feature.description}
                </p>
                {/* Decorative Element */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Cutting-edge Curriculum',
              description: 'Our programs are constantly updated to reflect the latest advancements in AI and technology.'
            },
            {
              title: 'Hands-on Experience',
              description: 'Practice with real-world projects and gain practical experience in your field of study.'
            },
            {
              title: 'Career Support',
              description: 'Get guidance on career paths, job placement, and professional development opportunities.'
            }
          ].map((feature, index) => (
            <AnimateOnScroll key={index} delay={0.4 + index * 0.1}>
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-300">
                  {feature.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features 