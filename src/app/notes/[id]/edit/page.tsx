import EditNoteForm from '@/components/edit-note-form'
import { getNoteById } from '@/lib/api'

export default async function EditNotePage({ params }: { params: { id: string } }) {
  const note = await getNoteById(params.id)

  if (!note) {
    return <div>Note not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <EditNoteForm note={note} />
    </div>
  )
}