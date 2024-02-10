import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/NewNoteCard'
import { NoteCard } from './components/NoteCard'

interface Note{
  id: string,
  date: Date,
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const arrayNotesLS = localStorage.getItem('notes')
    if(arrayNotesLS){
      return JSON.parse(arrayNotesLS)
    }
    return []
  })

  function onNewNoteCreated(content: string)
  {
    if(content == ''){
      return
    }
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    

    const arrayNotes = [newNote, ...notes]
    setNotes(arrayNotes)
    localStorage.setItem('notes', JSON.stringify(arrayNotes))
  }

  function onNoteDeleted(id: string){
    const notesArray = notes.filter(note =>{
      return note.id !== id})

      setNotes(notesArray)
      localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
    const query = event.target.value
    setSearch(query)
  }

  const filteredNotes = search !== '' ? notes.filter(notes => notes.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5 lg:px-0">
      <img src={logo} alt="NLW Expert"/>
      <form className="w-full">
        <input 
          type="text" 
          placeholder="Busque em suas notas"
          className="w-full bg-transparent text-3xl font-semibold outline-none tracking-tight placeholder: text-slate-500"
          onChange={handleSearch}/>
      </form>
      <div className="h-px bg-slate-700"/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNewNoteCreated={onNewNoteCreated}/>

        {filteredNotes.map((note) =>
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
        )}
      </div>
    </div>
  )
}

