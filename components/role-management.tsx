'use client'

import { useState, useEffect } from 'react'
import { Role } from '././../app/lib/types'
import { api } from '././../app/lib/api'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2 } from 'lucide-react'

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([])
  const [newRole, setNewRole] = useState<Omit<Role, 'id'>>({ name: '', permissions: [] })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    const fetchedRoles = await api.getRoles()
    setRoles(fetchedRoles)
  }

  const handleCreateRole = async () => {
    await api.createRole(newRole)
    setNewRole({ name: '', permissions: [] })
    setIsDialogOpen(false)
    fetchRoles()
  }

  const handleUpdateRolePermissions = async (id: string, permission: string) => {
    const role = roles.find(r => r.id === id)
    if (role) {
      const updatedPermissions = role.permissions.includes(permission)
        ? role.permissions.filter(p => p !== permission)
        : [...role.permissions, permission]
      await api.updateRole(id, { permissions: updatedPermissions })
      fetchRoles()
    }
  }

  const handleDeleteRole = async (id: string) => {
    await api.deleteRole(id)
    fetchRoles()
  }

  const allPermissions = ['read', 'write', 'delete']

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Role</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Permissions</Label>
                <div className="col-span-3">
                  {allPermissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission}
                        checked={newRole.permissions.includes(permission)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewRole({ ...newRole, permissions: [...newRole.permissions, permission] })
                          } else {
                            setNewRole({ ...newRole, permissions: newRole.permissions.filter(p => p !== permission) })
                          }
                        }}
                      />
                      <label
                        htmlFor={permission}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button onClick={handleCreateRole}>Create Role</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {roles.map((role) => (
                <motion.tr
                  key={role.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {allPermissions.map((permission) => (
                        <motion.div
                          key={permission}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Checkbox
                            id={`${role.id}-${permission}`}
                            checked={role.permissions.includes(permission)}
                            onCheckedChange={() => handleUpdateRolePermissions(role.id, permission)}
                            className="mr-2
"
                          />
                          <label
                            htmlFor={`${role.id}-${permission}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {permission}
                          </label>
                        </motion.div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

