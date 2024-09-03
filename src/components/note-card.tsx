import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Note } from '@/lib/types'
import Image from 'next/image'

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: note.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 cursor-move"
    >
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-32 mb-2">
          <Image
            src={note.imageUrl}
            alt={note.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-md"
          />
        </div>
        <p className="text-sm">{note.content.substring(0, 100)}...</p>
      </CardContent>
    </Card>
  )
}