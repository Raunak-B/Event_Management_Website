'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

type EventCategory = 'Technical' | 'Cultural' | 'Sports'

interface EventFormData {
  name: string
  date: string
  venue: string
  category: EventCategory
  organizer: string
  description?: string
  budget?: string
  expectedParticipants?: string
  culturalForm?: string
  sportsType?: string
}

export default function ManageEventsTab() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('Technical')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const form = useForm<EventFormData>({
    defaultValues: {
      name: '',
      date: '',
      venue: '',
      category: 'Technical',
      organizer: '',
    },
  })

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)
    
    try {
      const { error } = await supabase
        .from('events')
        .insert([
          {
            name: data.name,
            date: data.date,
            venue: data.venue,
            category: data.category,
            organizer: data.organizer,
            description: data.description || null,
            budget: data.budget ? parseFloat(data.budget) : null,
            expected_participants: data.expectedParticipants ? parseInt(data.expectedParticipants, 10) : null,
            cultural_form: data.culturalForm || null,
            sports_type: data.sportsType || null,
          }
        ])

      if (error) throw error

      alert('Event created successfully!')
      form.reset()
      setSelectedCategory('Technical')
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event. Please check the console for details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Events</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage events with category-specific details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>
            Fill in the event details. Additional fields will appear based on the selected category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Base Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event  </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event name" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter venue location" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedCategory(value as EventCategory)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technical">Technical</SelectItem>
                          <SelectItem value="Cultural">Cultural</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organizer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter organizer name" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category-Specific Fields */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">
                  {selectedCategory} Event Details
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fill in the details specific to {selectedCategory.toLowerCase()} events
                </p>

                {selectedCategory === 'Technical' && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technologies to be Covered</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., React, Node.js, C++"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget (INR)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expectedParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Participants</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {selectedCategory === 'Cultural' && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="culturalForm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Art Form</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Dance, Music, Theater"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Theme</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe the theme" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expectedParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Audience</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {selectedCategory === 'Sports' && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="sportsType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sport Type</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Cricket, Football, Table Tennis"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Teams</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expectedParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Participants</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Event...' : 'Create Event'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}