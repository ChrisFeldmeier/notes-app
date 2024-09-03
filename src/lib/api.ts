import { Note, NoteInput, UpdateNoteInput, GetNotesParams, SortOption, StatusOption } from './types'

function getRandomImageUrl(): string {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/seed/${randomId}/300/200`;
}

// Static demo data
const demoNotes: Note[] = [
  { id: '1', title: 'Welcome Note', content: 'Welcome to the Notes App!', status: 'todo', imageUrl: getRandomImageUrl(), createdAt: new Date('2023-01-01'), updatedAt: new Date('2023-01-01') },
  { id: '2', title: 'Shopping List', content: 'Milk, Eggs, Bread', status: 'in-progress', imageUrl: getRandomImageUrl(), createdAt: new Date('2023-01-02'), updatedAt: new Date('2023-01-02') },
  { id: '3', title: 'Meeting Notes', content: 'Discuss project timeline', status: 'review', imageUrl: getRandomImageUrl(), createdAt: new Date('2023-01-03'), updatedAt: new Date('2023-01-03') },
  { id: '4', title: 'Ideas', content: 'New app features', status: 'done', imageUrl: getRandomImageUrl(), createdAt: new Date('2023-01-04'), updatedAt: new Date('2023-01-04') },
  { id: '5', title: 'Todo', content: 'Call dentist, buy groceries', status: 'todo', imageUrl: getRandomImageUrl(), createdAt: new Date('2023-01-05'), updatedAt: new Date('2023-01-05') },
]

export async function getNotes({ search, filter, sort, page }: GetNotesParams): Promise<Note[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  let filteredNotes = [...demoNotes]

  if (search) {
    filteredNotes = filteredNotes.filter(note => 
      note.title.toLowerCase().includes(search.toLowerCase()) || 
      note.content.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (filter) {
    // Simple filter implementation (you might want to add a 'category' field to Note type for proper filtering)
    filteredNotes = filteredNotes.filter(note => note.title.toLowerCase().includes(filter.toLowerCase()))
  }

  const sortOption = sort as SortOption
  if (sortOption === 'title') {
    filteredNotes.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortOption === 'createdAt' || sortOption === 'updatedAt') {
    filteredNotes.sort((a, b) => b[sortOption].getTime() - a[sortOption].getTime())
  }

  // Simple pagination
  const pageSize = 10
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return filteredNotes.slice(startIndex, endIndex)
}

export async function addNote(noteInput: NoteInput): Promise<Note> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const newNote: Note = {
    id: (demoNotes.length + 1).toString(),
    ...noteInput,
    imageUrl: getRandomImageUrl(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  demoNotes.push(newNote)
  return newNote
}

export async function updateNote(updateInput: UpdateNoteInput): Promise<Note> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = demoNotes.findIndex(note => note.id === updateInput.id)
  if (index === -1) throw new Error('Note not found')
  
  demoNotes[index] = {
    ...demoNotes[index],
    ...updateInput,
    updatedAt: new Date()
  }
  return demoNotes[index]
}

export async function deleteNote(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = demoNotes.findIndex(note => note.id === id)
  if (index === -1) throw new Error('Note not found')
  demoNotes.splice(index, 1)
}

export async function getNoteById(id: string): Promise<Note | null> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const note = demoNotes.find(note => note.id === id)
  return note || null
}

export async function updateNoteStatus(id: string, status: StatusOption): Promise<Note> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const noteIndex = demoNotes.findIndex(note => note.id === id)
  if (noteIndex === -1) throw new Error('Note not found')
  
  demoNotes[noteIndex] = {
    ...demoNotes[noteIndex],
    status,
    updatedAt: new Date()
  }
  return demoNotes[noteIndex]
}