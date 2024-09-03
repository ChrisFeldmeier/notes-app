import KanbanBoard from '@/components/kanban-board'
import AddNoteDialog from '@/components/add-note-dialog'

export default function Home() {
  return (
    <>
      <AddNoteDialog />
      <KanbanBoard />
    </>
  )
}
