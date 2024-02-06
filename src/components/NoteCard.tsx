export function NoteCard(){
    return(
        <button className="rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 text-left outline-none focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className="text-small font-medium text-slate-300">há 2 dias</span>
          <p className="text-small leading-6 text-slate-400">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit sapiente molestias esse deleniti deserunt quibusdam. Ut est cumque voluptate similique deserunt nobis iure perferendis ipsum fuga asperiores, quis tenetur sint?</p>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"/>
        </button>
    )
}