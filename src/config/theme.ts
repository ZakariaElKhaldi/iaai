export const theme = {
  colors: {
    primary: {
      main: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      light: 'bg-blue-500/20',
      text: 'text-blue-400'
    },
    secondary: {
      main: 'bg-slate-800',
      hover: 'hover:bg-slate-700',
      light: 'bg-slate-800/80',
      text: 'text-slate-300'
    },
    text: {
      primary: 'text-white',
      secondary: 'text-slate-300',
      hover: 'hover:text-white'
    },
    error: {
      main: 'bg-red-600/90',
      hover: 'hover:bg-red-600',
      text: 'text-red-400'
    },
    border: {
      primary: 'border-slate-800',
      admin: 'border-red-900/20'
    },
    services: {
      training: {
        bg: 'bg-indigo-600',
        hover: 'hover:bg-indigo-700',
        light: 'bg-indigo-500/20',
        text: 'text-indigo-400'
      },
      academic: {
        bg: 'bg-emerald-600',
        hover: 'hover:bg-emerald-700',
        light: 'bg-emerald-500/20',
        text: 'text-emerald-400'
      },
      technical: {
        bg: 'bg-cyan-600',
        hover: 'hover:bg-cyan-700',
        light: 'bg-cyan-500/20',
        text: 'text-cyan-400'
      },
      consulting: {
        bg: 'bg-violet-600',
        hover: 'hover:bg-violet-700',
        light: 'bg-violet-500/20',
        text: 'text-violet-400'
      },
      support: {
        bg: 'bg-amber-600',
        hover: 'hover:bg-amber-700',
        light: 'bg-amber-500/20',
        text: 'text-amber-400'
      },
      clubs: {
        bg: 'bg-rose-600',
        hover: 'hover:bg-rose-700',
        light: 'bg-rose-500/20',
        text: 'text-rose-400'
      }
    }
  },
  spacing: {
    nav: {
      height: 'h-12',
      padding: {
        default: 'py-2',
        scrolled: 'py-1'
      }
    },
    container: {
      padding: {
        sm: 'px-4',
        md: 'sm:px-6',
        lg: 'lg:px-8'
      }
    },
    section: {
      padding: {
        y: 'py-16 md:py-24',
        x: 'px-4 sm:px-6 lg:px-8'
      },
      gap: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8'
      }
    }
  },
  animation: {
    transition: {
      default: { duration: 0.2 },
      fast: { duration: 0.15 },
      slow: { duration: 0.3 }
    },
    navbar: {
      initial: { y: -100 },
      visible: { y: 0 },
      hidden: { y: -100 }
    },
    service: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      hover: { scale: 1.02, transition: { duration: 0.2 } }
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  typography: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl'
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold'
    },
    heading: {
      primary: 'text-3xl md:text-4xl font-bold text-white',
      secondary: 'text-2xl md:text-3xl font-bold text-white',
      section: 'text-xl md:text-2xl font-bold text-white'
    }
  },
  layout: {
    maxWidth: 'max-w-7xl',
    container: 'mx-auto',
    grid: {
      services: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
    }
  },
  components: {
    card: {
      base: 'rounded-xl shadow-xl overflow-hidden transition-all duration-200',
      hover: 'hover:shadow-2xl hover:scale-[1.02]',
      content: 'p-6'
    },
    icon: {
      base: 'w-12 h-12 rounded-lg flex items-center justify-center',
      large: 'w-16 h-16 rounded-xl flex items-center justify-center'
    }
  }
} as const

export type Theme = typeof theme

export const services = {
  training: {
    title: 'Professional Training',
    description: 'IT training focused on AI to develop advanced technical skills',
    icon: '🎓',
    path: '/services/training'
  },
  academic: {
    title: 'Academic Assistance',
    description: 'Support for theses, articles, PFEs, and academic projects with innovative AI methods',
    icon: '📚',
    path: '/services/academic'
  },
  technical: {
    title: 'Technical Services',
    description: 'Customized technical solutions in development and digitalization based on AI',
    icon: '⚙️',
    path: '/services/technical'
  },
  consulting: {
    title: 'Consulting',
    description: 'Personalized consulting services to integrate AI solutions and optimize business performance',
    icon: '💡',
    path: '/services/consulting'
  },
  support: {
    title: 'Academic Support',
    description: 'Personalized courses to strengthen academic skills of students at all levels',
    icon: '📝',
    path: '/services/support'
  },
  clubs: {
    title: 'Learning Clubs',
    description: 'Clubs for children in coding, music, languages, and robotics in an interactive environment',
    icon: '🤖',
    path: '/services/clubs'
  }
} as const

export type Service = keyof typeof services 