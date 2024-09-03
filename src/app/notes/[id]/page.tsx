import { getNoteById } from '@/lib/api'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await getNoteById(params.id)

  if (!note) {
    return <div>Note not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <p className="mb-4">{note.content}</p>
      <Button asChild>
        <Link href={`/notes/${note.id}/edit`}>Edit</Link>
      </Button>
    </div>
  )
}