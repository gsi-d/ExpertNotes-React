import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

export function NewNoteCard(){
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [value, setValue] = useState("")

    function handleStartEditor(){
      setShouldShowOnboarding(false)
    }

    function handleOnChangeEditor(text: string){
      setValue(text)
      if(text === ""){
        setShouldShowOnboarding(true)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event)
      if(event.key === "Backspace"){
        setShouldShowOnboarding(true)
      }
    };

    function handleSaveNote(event: FormEvent){
      event.preventDefault()
      toast.success("Nota criada com sucesso!")
    }

    return(
      <Dialog.Root>
        <Dialog.Trigger className="rounded-md bg-slate-700 p-5 flex flex-col gap-3 text-left overflow-hidden hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className="text-small font-medium text-slate-200">Adicionar nota</span>
          <p className="text-small leading-6 text-slate-400">Grave uma nota em áudio que será convertida para texto automaticamente.</p>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
          <Dialog.Content className="z-10 fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5"/>
            </Dialog.Close>
            <form onSubmit={(e) => handleSaveNote(e)} className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-small font-medium text-slate-300">Adicionar nota</span>
                {shouldShowOnboarding ? (
                  <p className="text-small leading-6 text-slate-400">
                  Comece <button className="text-lime-400 font-medium hover:underline">gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} className="text-lime-400 font-medium hover:underline">utilize apenas texto.</button>
                </p>
                ) : (
                  <textarea onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => handleOnChangeEditor(e.target.value)}
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"/>
                )}
                
              </div>
              <button type="submit" className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-bold hover:bg-lime-500">
                Salvar nota
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )

}