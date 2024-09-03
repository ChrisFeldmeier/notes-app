'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import { Note } from '@/lib/types'

interface NoteItemProps {
  note: Note
}

export default function NoteItem({ note }: NoteItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: note.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{note.content.substring(0, 100)}...</p>
          <div className="mt-4 space-x-2">
            <Button asChild>
              <Link href={`/notes/${note.id}`}>View</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/notes/${note.id}/edit`}>Edit</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </li>
  )
}