'use client'

import { useState } from 'react'
import AppLayout from '@/components/app-layout'
import DashboardTab from '@/components/dashboard-tab'
import ManageEventsTab from '@/components/manage-events-tab'
import RegistrationsTab from '@/components/registrations-tab'
import OOPArchitectureTab from '@/components/oop-architecture-tab'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />
      case 'manage-events':
        return <ManageEventsTab />
      case 'registrations':
        return <RegistrationsTab />
      case 'oop-architecture':
        return <OOPArchitectureTab />
      default:
        return <DashboardTab />
    }
  }

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTab()}
    </AppLayout>
  )
}
