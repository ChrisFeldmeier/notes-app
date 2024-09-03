'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { getNotes } from '@/lib/api'
import NoteItem from './note-item'
import { Note } from '@/lib/types'

export default function NoteList() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const filter = searchParams.get('filter') || ''
  const sort = searchParams.get('sort') || 'createdAt'
  const page = parseInt(searchParams.get('page') || '1', 10)

  const { data: notes = [], isLoading, error } = useQuery<Note[]>({
    queryKey: ['notes', search, filter, sort, page],
    queryFn: () => getNotes({ search, filter, sort, page }),
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      // Note: This won't persist the order change, it's just for UI demonstration
      // You'd need to implement an API call to persist the order change
      console.log(`Moved note ${active.id} to position of note ${over.id}`)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {(error as Error).message}</div>

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={notes} strategy={verticalListSortingStrategy}>
        <ul className="space-y-4">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}