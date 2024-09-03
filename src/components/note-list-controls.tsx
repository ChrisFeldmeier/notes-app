'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { Button } from './ui/button'

export default function NoteListControls() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    params.set('search', e.target.value)
    router.push(`/?${params.toString()}`)
  }

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    params.set('filter', e.target.value)
    router.push(`/?${params.toString()}`)
  }

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', e.target.value)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex space-x-4 mb-4">
      <Input
        type="text"
        placeholder="Search notes..."
        onChange={handleSearch}
        defaultValue={searchParams.get('search') || ''}
      />
      <Select onValueChange={handleFilter} defaultValue={searchParams.get('filter') || ''}>
        <option value="">All</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
      </Select>
      <Select onValueChange={handleSort} defaultValue={searchParams.get('sort') || 'createdAt'}>
        <option value="createdAt">Date Created</option>
        <option value="updatedAt">Date Updated</option>
        <option value="title">Title</option>
      </Select>
    </div>
  )
}