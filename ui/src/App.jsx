import { useState } from 'react'


function App() {

    return(
    <div className="min-h-screen bg-sky-950 flex flex-col items-center p-15">
        <header className="text-center">
            <h1 className="text-6xl font-bold tracking-tight text-amber-500">
                LoopLM
            </h1>
            <p className="mt-3 text-amber-600">
                Recursive Language Model
            </p>
        </header>
        

        <footer className="mt-auto pt-8 text-slate-300 text-sm">
            <a 
            href="https://ashtonlittle.ca" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-slate-500 font-medium transition-colors underline"
            >
                ashtonlittle.ca
            </a>

        </footer>
    </div>
    )
}

export default App
