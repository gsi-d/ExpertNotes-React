import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

interface NewNoteCardProps{
  onNewNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNewNoteCreated }: NewNoteCardProps){
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [value, setValue] = useState("")
    const [isRecording, setIsRecording] = useState<boolean>()

    function handleStartEditor(){
      setShouldShowOnboarding(false)
    }

    function handleOnChangeEditor(text: string){
      setValue(text)
      if(text === ""){
        setShouldShowOnboarding(true)
      }
    }

    const handleKeyDown = (event: any) => {
      console.log(event)
      if(event.key === "Backspace"){
        setShouldShowOnboarding(true)
      }
    };

    function handleSaveNote(event: FormEvent){
      event.preventDefault()
      onNewNoteCreated(value)
      setValue('')
      setShouldShowOnboarding(true)
      if(value == ''){
        return
      }
      toast.success("Nota criada com sucesso!")
    }

    function handleStartRecording(){
      const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
      
      if(!isSpeechRecognitionAPIAvailable){
        alert('Infelizmente seu navegador não suporta a API de gravação!')
        return
      }

      setIsRecording(true)
      setShouldShowOnboarding(false)
      
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
      speechRecognition = new SpeechRecognitionAPI()

      console.log(speechRecognition)

      speechRecognition.lang = 'pt-BR'
      speechRecognition.continuous = true
      speechRecognition.maxAlternatives = 1
      speechRecognition.interimResults = true

      speechRecognition.onresult = (event) => {
        const transcription = Array.from(event.results).reduce((text, result) => {
          return text.concat(result[0].transcript)
        }, '')
        setValue(transcription)
      }

      speechRecognition.onerror = (event) => {
        console.error(event)
      }

      console.log(speechRecognition)

      speechRecognition.start()
    }

    function handleStopRecording(){
      setIsRecording(false)
      if(speechRecognition !== null){
        speechRecognition.stop()
      }
    }

    return(
      <Dialog.Root>
        <Dialog.Trigger className="rounded-md bg-slate-700 p-5 flex flex-col gap-3 text-left overflow-hidden hover:ring-2 hover:ring-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className="text-small font-medium text-slate-200">Adicionar nota</span>
          <p className="text-small leading-6 text-slate-400">Grave uma nota em áudio que será convertida para texto automaticamente.</p>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="inset-0 fixed bg-black/50"/>
          <Dialog.Content className="z-10 fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5"/>
            </Dialog.Close>
            <form onSubmit={(e) => handleSaveNote(e)} className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-small font-medium text-slate-300">Adicionar nota</span>
                {shouldShowOnboarding ? (
                  <p className="text-small leading-6 text-slate-400">
                  Comece <button onClick={handleStartRecording} className="text-lime-400 font-medium hover:underline">gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} className="text-lime-400 font-medium hover:underline">utilize apenas texto.</button>
                </p>
                ) : (
                  <textarea onKeyDown={(e) => handleKeyDown(e)} value={value} onChange={(e) => handleOnChangeEditor(e.target.value)}
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"/>
                )}
                
              </div>

              {isRecording ?
                <button onClick={handleStopRecording} type="button" className="w-full flex items-center gap-3 justify-center bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-bold hover:text-slate-200">
                  <div className="size-3 rounded-full bg-red-500"/>
                  Gravando! (clique p/ interromper)
                </button>
              :
                <button onClick={(e) => handleSaveNote(e)} type="button" className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-bold hover:bg-lime-500">
                  Salvar nota
                </button>
              }
              
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )

}