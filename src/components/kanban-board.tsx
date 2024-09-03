'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { getNotes, updateNoteStatus } from '@/lib/api'
import { Note, StatusOption } from '@/lib/types'
import KanbanColumn from './kanban-column'
import NoteCard from './note-card'

const statusColumns: StatusOption[] = ['todo', 'in-progress', 'review', 'done']

export default function KanbanBoard() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: () => getNotes({ search: '', filter: '', sort: 'createdAt', page: 1 }),
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: StatusOption }) => updateNoteStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragStart(event: any) {
    const { active } = event
    setActiveId(active.id)
  }

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const activeNote = notes.find(note => note.id === active.id)
      const newStatus = over.id as StatusOption

      if (activeNote && activeNote.status !== newStatus) {
        updateStatusMutation.mutate({ id: active.id, status: newStatus })
      }
    }

    setActiveId(null)
  }

  const groupedNotes = statusColumns.reduce((acc, status) => {
    acc[status] = notes.filter(note => note.status === status)
    return acc
  }, {} as Record<StatusOption, Note[]>)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {statusColumns.map(status => (
          <KanbanColumn key={status} status={status} notes={groupedNotes[status] || []} />
        ))}
      </div>
      <DragOverlay>
        {activeId ? <NoteCard note={notes.find(note => note.id === activeId)!} /> : null}
      </DragOverlay>
    </DndContext>
  )
}