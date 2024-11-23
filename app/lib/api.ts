import { User, Role } from './types'

// Simulated data
let users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', roleId: '1', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', roleId: '2', status: 'Active' },
]

let roles: Role[] = [
  { id: '1', name: 'Admin', permissions: ['read', 'write', 'delete'] },
  { id: '2', name: 'User', permissions: ['read'] },
]

// Simulated API calls
export const api = {
  getUsers: () => Promise.resolve(users),
  getUser: (id: string) => Promise.resolve(users.find(user => user.id === id)),
  createUser: (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: String(users.length + 1) }
    users.push(newUser)
    return Promise.resolve(newUser)
  },
  updateUser: (id: string, updates: Partial<User>) => {
    users = users.map(user => user.id === id ? { ...user, ...updates } : user)
    return Promise.resolve(users.find(user => user.id === id))
  },
  deleteUser: (id: string) => {
    users = users.filter(user => user.id !== id)
    return Promise.resolve()
  },
  getRoles: () => Promise.resolve(roles),
  getRole: (id: string) => Promise.resolve(roles.find(role => role.id === id)),
  createRole: (role: Omit<Role, 'id'>) => {
    const newRole = { ...role, id: String(roles.length + 1) }
    roles.push(newRole)
    return Promise.resolve(newRole)
  },
  updateRole: (id: string, updates: Partial<Role>) => {
    roles = roles.map(role => role.id === id ? { ...role, ...updates } : role)
    return Promise.resolve(roles.find(role => role.id === id))
  },
  deleteRole: (id: string) => {
    roles = roles.filter(role => role.id !== id)
    return Promise.resolve()
  },
}

