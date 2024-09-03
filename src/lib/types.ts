export interface Note {
  id: string;
  title: string;
  content: string;
  status: StatusOption;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteInput {
  title: string;
  content: string;
  status: StatusOption;
}

export interface UpdateNoteInput extends NoteInput {
  id: string;
}

export interface GetNotesParams {
  search: string;
  filter: string;
  sort: string;
  page: number;
}

export type SortOption = 'createdAt' | 'updatedAt' | 'title';

export type FilterOption = '' | 'personal' | 'work';

export type StatusOption = 'todo' | 'in-progress' | 'review' | 'done';