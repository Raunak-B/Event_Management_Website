'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDown } from 'lucide-react'

export default function OOPArchitectureTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">OOP Architecture</h1>
        <p className="text-muted-foreground mt-2">
          Understanding the object-oriented design of the Event Management System
        </p>
      </div>

      {/* Main Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Class Hierarchy and Relationships</CardTitle>
          <CardDescription>
            Demonstrates inheritance, polymorphism, and encapsulation in action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-8">
            {/* Base Class */}
            <div className="w-full max-w-xs">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-blue-600 uppercase">Base Class</div>
                    <CardTitle className="text-lg">Event</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-700">Properties:</p>
                    <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                      <li>name: string</li>
                      <li>date: string</li>
                      <li>venue: string</li>
                      <li>organizer: string</li>
                    </ul>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-blue-200">
                    <p className="font-semibold text-gray-700">Methods:</p>
                    <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                      <li>getEventDetails()</li>
                      <li>calculateBudget()</li>
                      <li>getParticipantCount()</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-center py-3">
                <ArrowDown className="h-6 w-6 text-gray-400" />
              </div>
            </div>

            {/* Inheritance Note */}
            <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
              <span className="font-semibold">Inheritance:</span> Derived classes inherit all properties and methods from Event base class
            </div>

            {/* Derived Classes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
              {/* Technical Event */}
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader className="pb-3">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-purple-600 uppercase">Derived Class</div>
                    <CardTitle className="text-lg">TechnicalEvent</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-700">Additional Properties:</p>
                    <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                      <li>technologies: string[]</li>
                      <li>budget: number</li>
                      <li>expectedParticipants: number</li>
                    </ul>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-purple-200">
                    <p className="font-semibold text-gray-700">Overridden Methods:</p>
                    <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                      <li>calculateBudget() - tech specific</li>
                      <li>validateEvent()</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Cultural Event */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="pb-3">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-green-600 uppercase">Derived Class</div>
                    <CardTitle className="text-lg">CulturalEvent</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-700">Additional Properties:</p>
                    <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                      <li>artForm: string</li>
                      <li>theme: string</li>
                      <li>expectedAudience: number</li>
                    </ul>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-green-200">
                    <p className="font-semibold text-gray-700">Overridden Methods:</p>
                    <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                      <li>getEventDetails() - cultural</li>
                      <li>scheduleVenues()</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Sports Event */}
              <Card className="bg-red-50 border-red-200">
                <CardHeader className="pb-3">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-red-600 uppercase">Derived Class</div>
                    <CardTitle className="text-lg">SportsEvent</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-700">Additional Properties:</p>
                    <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                      <li>sportType: string</li>
                      <li>numberOfTeams: number</li>
                      <li>expectedParticipants: number</li>
                    </ul>
                  </div>
                  <div className="space-y-1 pt-2 border-t border-red-200">
                    <p className="font-semibold text-gray-700">Overridden Methods:</p>
                    <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                      <li>calculateBudget() - sports</li>
                      <li>generateSchedule()</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* OOP Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Encapsulation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Event data is encapsulated within class properties, with controlled access through methods.</p>
            <p className="text-xs pt-2 text-foreground font-medium">Example: Private budget validation before assignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Polymorphism</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Each event type overrides base methods differently. Same method call, different behaviors.</p>
            <p className="text-xs pt-2 text-foreground font-medium">Example: calculateBudget() varies by event type</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inheritance</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Derived classes inherit common functionality from the Event base class.</p>
            <p className="text-xs pt-2 text-foreground font-medium">Example: All events share name, date, and venue</p>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Notes</CardTitle>
          <CardDescription>How OOP principles are applied in the Event Management System</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Dynamic Form Fields</h4>
            <p className="text-sm text-muted-foreground">
              The Manage Events form demonstrates polymorphism in practice. When you select a category,
              different fields appear based on the event type. This mirrors how each derived class has
              its own specific properties and methods.
            </p>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Data Organization</h4>
            <p className="text-sm text-muted-foreground">
              Events are filtered and displayed by category on the dashboard, showing how a single base
              type can be specialized into multiple concrete types, each with their own behavior.
            </p>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Extensibility</h4>
            <p className="text-sm text-muted-foreground">
              New event types can be easily added by creating new derived classes without modifying
              existing code, demonstrating the Open/Closed Principle of SOLID design.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
