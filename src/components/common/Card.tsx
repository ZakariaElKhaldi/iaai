interface CardProps {
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}

const Card = ({ title, description, icon, className = '' }: CardProps) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl bg-slate-800/50 p-8 hover:bg-slate-800/75 transition-all duration-300 ${className}`}
    >
      <div className="relative z-10">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-colors" />
    </div>
  )
}

export default Card 