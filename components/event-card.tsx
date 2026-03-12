import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, User } from 'lucide-react'

interface EventCardProps {
  id: string
  name: string
  date: string
  venue: string
  category: 'Technical' | 'Cultural' | 'Sports'
  organizer?: string
  onEdit?: (id: string) => void
  onViewDetails?: (id: string) => void
}

const categoryColors: Record<string, { bg: string; border: string }> = {
  Technical: { bg: 'bg-blue-50 border-blue-200', border: 'border-l-4 border-l-blue-500' },
  Cultural: { bg: 'bg-purple-50 border-purple-200', border: 'border-l-4 border-l-purple-500' },
  Sports: { bg: 'bg-green-50 border-green-200', border: 'border-l-4 border-l-green-500' },
}

export default function EventCard({
  id,
  name,
  date,
  venue,
  category,
  organizer,
  onEdit,
  onViewDetails,
}: EventCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${categoryColors[category].border}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight">{name}</CardTitle>
            <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[category].bg}`}>
              {category}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{venue}</span>
        </div>
        {organizer && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{organizer}</span>
          </div>
        )}
        <div className="flex gap-2 pt-4">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit(id)}
            >
              Edit
            </Button>
          )}
          {onViewDetails && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails(id)}
            >
              Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
