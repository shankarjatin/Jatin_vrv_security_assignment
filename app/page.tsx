'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from '../components/user-management'
import { RoleManagement } from '../components/role-management'
import { Header } from '../components/header'
import { motion } from 'framer-motion'

export default function RBACDashboard() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Header />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          <TabsContent value="roles">
            <RoleManagement />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}

