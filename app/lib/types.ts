import { HTMLMotionProps } from 'framer-motion'

export type User = {
  id: string
  name: string
  email: string
  roleId: string
  status: 'Active' | 'Inactive'
}

export type Role = {
  id: string
  name: string
  permissions: string[]
}

export type MotionProps = HTMLMotionProps<'div'>

