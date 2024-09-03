import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Note, StatusOption } from '@/lib/types'
import NoteCard from './note-card'

interface KanbanColumnProps {
  status: StatusOption
  notes: Note[]
}

export default function KanbanColumn({ status, notes }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  })

  return (
    <div className="flex-1 min-w-[250px]">
      <h2 className="text-lg font-semibold mb-2 capitalize">{status.replace('-', ' ')}</h2>
      <div
        ref={setNodeRef}
        className="bg-secondary p-2 rounded-md min-h-[200px]"
      >
        <SortableContext items={notes} strategy={verticalListSortingStrategy}>
          {notes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}