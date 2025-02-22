import Card from '../common/Card'
import { Icons } from '../common/Icons'
import AnimateOnScroll from '../common/AnimateOnScroll'
import TiltCard from '../common/TiltCard'

const programs = [
  {
    title: 'IT & AI Training',
    description: 'Professional training programs focused on AI development, machine learning, and advanced IT skills.',
    icon: <Icons.Training />,
  },
  {
    title: 'Academic Support',
    description: 'Comprehensive academic assistance for theses, articles, and research projects with innovative AI methodologies.',
    icon: <Icons.Academic />,
  },
  {
    title: 'Consulting Services',
    description: 'Personalized consulting to help businesses integrate AI solutions and optimize performance.',
    icon: <Icons.Consulting />,
  },
  {
    title: 'Learning Clubs',
    description: 'Interactive clubs for coding, music, languages, and robotics in an engaging learning environment.',
    icon: <Icons.Club />,
  },
]

const Programs = () => {
  return (
    <section className="relative py-20 overflow-hidden" id="programs">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimateOnScroll>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Discover our comprehensive range of educational programs designed to prepare you for the future of technology.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <AnimateOnScroll key={index} delay={index * 0.1}>
              <TiltCard className="h-full">
                <Card
                  title={program.title}
                  description={program.description}
                  icon={program.icon}
                  className="h-full hover:transform-none"
                />
              </TiltCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs 