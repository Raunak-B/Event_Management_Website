'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import EventCard from './event-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Calendar, MapPin, User, Users, IndianRupee, Trophy, Palette, AlignLeft, CheckCircle2 } from 'lucide-react'

interface Event {
  id: string
  name: string
  date: string
  venue: string
  category: 'Technical' | 'Cultural' | 'Sports'
  organizer: string
  description?: string
  budget?: number
  expected_participants?: number
  cultural_form?: string
  sports_type?: string
}

export default function DashboardTab() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Registration Form States
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [isSubmittingReg, setIsSubmittingReg] = useState(false)
  const [regSuccess, setRegSuccess] = useState(false)

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (error) {
        console.error('Error fetching events:', error)
      } else if (data) {
        setEvents(data as Event[])
      }
      setIsLoading(false)
    }

    fetchEvents()
  }, [])

  const categories = ['Technical', 'Cultural', 'Sports'] as const
  const eventsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = events.filter((e) => e.category === cat)
    return acc
  }, {} as Record<string, Event[]>)

  const selectedEvent = events.find(e => e.id === selectedEventId)

  // Handle closing the modal and resetting the form
  const handleCloseModal = () => {
    setSelectedEventId(null)
    setRegSuccess(false)
    setRegName('')
    setRegEmail('')
  }

  // Handle the registration submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEvent) return

    setIsSubmittingReg(true)
    
    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            student_name: regName,
            email: regEmail,
            event_name: selectedEvent.name,
            status: 'Pending' // Set as Pending so admins can approve it later
          }
        ])

      if (error) throw error

      setRegSuccess(true)
      setRegName('')
      setRegEmail('')
    } catch (error) {
      console.error('Error registering:', error)
      alert('Failed to register. Please try again.')
    } finally {
      setIsSubmittingReg(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Event Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage and view all upcoming events organized by the CS Society
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <p className="text-muted-foreground animate-pulse">Loading events...</p>
        </div>
      ) : (
        categories.map((category) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-4 text-foreground">{category} Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventsByCategory[category].map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onViewDetails={setSelectedEventId}
                />
              ))}
            </div>
            {eventsByCategory[category].length === 0 && (
              <Card className="p-8 text-center bg-muted/30">
                <p className="text-muted-foreground">No {category.toLowerCase()} events scheduled</p>
              </Card>
            )}
          </div>
        ))
      )}

      {/* The Dynamic Event Details Modal */}
      <Dialog open={!!selectedEventId} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[90vh]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                    ${selectedEvent.category === 'Technical' ? 'bg-blue-100 text-blue-800' : 
                      selectedEvent.category === 'Cultural' ? 'bg-purple-100 text-purple-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {selectedEvent.category} Event
                  </span>
                </div>
                <DialogTitle className="text-2xl">{selectedEvent.name}</DialogTitle>
                <DialogDescription className="pt-2 flex flex-col gap-2">
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(selectedEvent.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {selectedEvent.venue}</span>
                  <span className="flex items-center gap-2"><User className="h-4 w-4" /> Organized by: {selectedEvent.organizer}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4 border-y border-border my-2">
                {/* Specific Event Details... */}
                {selectedEvent.description && (
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      <AlignLeft className="h-4 w-4 text-muted-foreground" /> 
                      {selectedEvent.category === 'Technical' ? 'Technologies' : selectedEvent.category === 'Cultural' ? 'Theme' : 'Details'}
                    </h4>
                    <p className="text-sm text-muted-foreground pl-6">{selectedEvent.description}</p>
                  </div>
                )}
                {/* Expected Participants */}
                {selectedEvent.expected_participants && (
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /> Expected Attendance</h4>
                    <p className="text-sm text-muted-foreground pl-6">{selectedEvent.expected_participants} people</p>
                  </div>
                )}
              </div>

              {/* Quick Registration Section */}
              <div className="bg-muted/30 p-4 rounded-lg mt-2">
                <h3 className="font-semibold text-lg mb-4">Quick Register</h3>
                
                {regSuccess ? (
                  <div className="flex flex-col items-center justify-center py-4 text-center space-y-2">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                    <p className="font-medium text-green-700">Successfully registered!</p>
                    <p className="text-sm text-muted-foreground">You can view this in the Registrations tab.</p>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3">
                    <Input
                      placeholder="Full Name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Student Email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                    <div className="flex gap-2 pt-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1" 
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1" 
                        disabled={isSubmittingReg}
                      >
                        {isSubmittingReg ? 'Submitting...' : 'Register'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}