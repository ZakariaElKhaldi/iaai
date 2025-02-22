export type RouteStatus = 'active' | 'beta' | 'deprecated'

export interface RouteConfig {
  path: string
  name: string
  description: string
  status: RouteStatus
  children?: RouteConfig[]
} 