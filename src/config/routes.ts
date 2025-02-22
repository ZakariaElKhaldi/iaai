import { services } from './theme'
import type { RouteConfig } from '../types/routes'

export type { RouteConfig }

// Public routes accessible without authentication
export const publicRoutes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    description: 'Welcome to our AI platform',
    status: 'active'
  },
  {
    path: '/auth',
    name: 'Authentication',
    description: 'Login and registration',
    status: 'active',
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        description: 'Sign in to your account',
        status: 'active'
      },
      {
        path: '/auth/register',
        name: 'Register',
        description: 'Create a new account',
        status: 'active'
      },
      {
        path: '/auth/forgot-password',
        name: 'Forgot Password',
        description: 'Reset your password',
        status: 'active'
      },
      {
        path: '/auth/reset-password',
        name: 'Reset Password',
        description: 'Set a new password',
        status: 'active'
      }
    ]
  },
  {
    path: '/terms',
    name: 'Terms of Service',
    description: 'Our terms and conditions',
    status: 'active'
  },
  {
    path: '/privacy',
    name: 'Privacy Policy',
    description: 'Our privacy policy',
    status: 'active'
  },
  {
    path: '/help',
    name: 'Help Center',
    description: 'Get support and answers',
    status: 'active',
    children: [
      {
        path: '/help/faq',
        name: 'FAQ',
        description: 'Frequently asked questions',
        status: 'active'
      },
      {
        path: '/help/support',
        name: 'Support',
        description: 'Contact our support team',
        status: 'active'
      },
      {
        path: '/help/contact',
        name: 'Contact',
        description: 'Get in touch with us',
        status: 'active'
      }
    ]
  },
  {
    path: '/debug',
    name: 'Debug',
    description: 'Debug and development tools',
    status: 'beta'
  },
  ...Object.entries(services).map(([key, service]) => ({
    path: `/services/${key}`,
    name: service.title,
    description: service.description,
    status: 'active' as const
  }))
]

// Protected routes requiring user authentication
export const protectedRoutes: RouteConfig[] = [
  {
    path: '/profile',
    name: 'Profile',
    description: 'Manage your account',
    status: 'active'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    description: 'Your personal dashboard',
    status: 'active',
    children: [
      {
        path: '/dashboard/:section',
        name: 'Dashboard Section',
        description: 'View specific dashboard section',
        status: 'active'
      }
    ]
  },
  {
    path: '/learn',
    name: 'Learning',
    description: 'Access learning materials',
    status: 'active',
    children: [
      {
        path: '/learn/:courseId',
        name: 'Course',
        description: 'View course details',
        status: 'active'
      },
      {
        path: '/learn/:courseId/:lessonId',
        name: 'Lesson',
        description: 'View lesson content',
        status: 'active'
      }
    ]
  },
  {
    path: '/assignments',
    name: 'Assignments',
    description: 'View and submit assignments',
    status: 'active',
    children: [
      {
        path: '/assignments/:assignmentId',
        name: 'Assignment',
        description: 'View assignment details',
        status: 'active'
      }
    ]
  },
  {
    path: '/progress',
    name: 'Progress',
    description: 'Track your learning progress',
    status: 'active',
    children: [
      {
        path: '/progress/:section',
        name: 'Progress Section',
        description: 'View specific progress section',
        status: 'active'
      }
    ]
  },
  {
    path: '/discussions',
    name: 'Discussions',
    description: 'Participate in discussions',
    status: 'active',
    children: [
      {
        path: '/discussions/:topicId',
        name: 'Topic',
        description: 'View discussion topic',
        status: 'active'
      }
    ]
  },
  {
    path: '/practice',
    name: 'Practice',
    description: 'Practice exercises',
    status: 'active',
    children: [
      {
        path: '/practice/:exerciseId',
        name: 'Exercise',
        description: 'View exercise details',
        status: 'active'
      }
    ]
  },
  {
    path: '/editor',
    name: 'Code Editor',
    description: 'Write and edit code',
    status: 'active',
    children: [
      {
        path: '/editor/:fileId',
        name: 'File Editor',
        description: 'Edit specific file',
        status: 'active'
      }
    ]
  },
  {
    path: '/chat',
    name: 'AI Chat',
    description: 'Chat with AI assistant',
    status: 'beta'
  }
]

// Admin routes requiring admin privileges
export const adminRoutes: RouteConfig[] = [
  {
    path: '/admin',
    name: 'Admin',
    description: 'Admin dashboard',
    status: 'active'
  },
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    description: 'Admin overview',
    status: 'active',
    children: [
      {
        path: '/admin/dashboard/:section',
        name: 'Dashboard Section',
        description: 'View specific admin section',
        status: 'active'
      }
    ]
  },
  {
    path: '/admin/users',
    name: 'User Management',
    description: 'Manage users',
    status: 'active',
    children: [
      {
        path: '/admin/users/:userId',
        name: 'User Details',
        description: 'View user details',
        status: 'active'
      },
      {
        path: '/admin/users/new',
        name: 'New User',
        description: 'Create new user',
        status: 'active'
      }
    ]
  },
  {
    path: '/admin/courses',
    name: 'Course Management',
    description: 'Manage courses',
    status: 'active',
    children: [
      {
        path: '/admin/courses/:courseId',
        name: 'Course Details',
        description: 'View course details',
        status: 'active'
      },
      {
        path: '/admin/courses/new',
        name: 'New Course',
        description: 'Create new course',
        status: 'active'
      }
    ]
  },
  {
    path: '/admin/analytics',
    name: 'Analytics',
    description: 'View analytics',
    status: 'active',
    children: [
      {
        path: '/admin/analytics/:report',
        name: 'Analytics Report',
        description: 'View specific report',
        status: 'active'
      }
    ]
  },
  {
    path: '/admin/settings',
    name: 'Settings',
    description: 'Admin settings',
    status: 'active',
    children: [
      {
        path: '/admin/settings/:section',
        name: 'Settings Section',
        description: 'View specific settings',
        status: 'active'
      }
    ]
  }
] 