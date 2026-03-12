'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

interface Registration {
  id: string
  studentName: string
  email: string
  eventName: string
  registrationDate: string
  status: 'Confirmed' | 'Pending' | 'Cancelled'
}

// Updated to include border and background colors for the dropdown trigger
const statusStyles: Record<string, string> = {
  Confirmed: 'text-green-700 bg-green-50 border-green-200',
  Pending: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  Cancelled: 'text-red-700 bg-red-50 border-red-200',
}

export default function RegistrationsTab() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'All' | 'Confirmed' | 'Pending' | 'Cancelled'>('All')

  // 1. Fetch live registrations from Supabase
  useEffect(() => {
    async function fetchRegistrations() {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching registrations:', error)
      } else if (data) {
        // Map the database snake_case columns to our camelCase interface
        const formattedData = data.map((row) => ({
          id: row.id,
          studentName: row.student_name,
          email: row.email,
          eventName: row.event_name,
          registrationDate: row.registration_date,
          status: row.status as 'Confirmed' | 'Pending' | 'Cancelled',
        }))
        setRegistrations(formattedData)
      }
      setIsLoading(false)
    }

    fetchRegistrations()
  }, [])

  // 2. Handle updating the status in the database
  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistically update the UI so it feels instant
    setRegistrations((current) =>
      current.map((reg) =>
        reg.id === id ? { ...reg, status: newStatus as 'Confirmed' | 'Pending' | 'Cancelled' } : reg
      )
    )

    // Send the update to Supabase
    const { error } = await supabase
      .from('registrations')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status. Please try again.')
    }
  }

  // 3. Filter logic for the search bar and status buttons
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.eventName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || reg.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Event Registrations</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track student registrations for all events
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registration List</CardTitle>
          <CardDescription>
            {filteredRegistrations.length} registration{filteredRegistrations.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name, email, or event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['All', 'Confirmed', 'Pending', 'Cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-2 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Student Name</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Email</TableHead>
                  <TableHead className="text-xs sm:text-sm">Event</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-xs sm:text-sm">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8 animate-pulse">
                      Loading registrations...
                    </TableCell>
                  </TableRow>
                ) : filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell className="font-medium text-xs sm:text-sm">{registration.studentName}</TableCell>
                      <TableCell className="text-xs sm:text-sm hidden sm:table-cell">{registration.email}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{registration.eventName}</TableCell>
                      <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                        {new Date(registration.registrationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {/* Interactive Status Dropdown */}
                        <Select
                          defaultValue={registration.status}
                          onValueChange={(value) => handleStatusChange(registration.id, value)}
                        >
                          <SelectTrigger 
                            className={`w-[110px] h-8 text-xs font-medium focus:ring-0 focus:ring-offset-0 ${statusStyles[registration.status]}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8 text-sm">
                      No registrations found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}