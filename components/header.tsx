import { UserCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header 
      className="flex flex-col sm:flex-row justify-between items-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4 sm:mb-0">RBAC Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span>Admin User</span>
        <UserCircle className="h-8 w-8" />
      </div>
    </motion.header>
  )
}

