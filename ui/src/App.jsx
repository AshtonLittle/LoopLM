import { useState } from "react";

function App() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const uploadedFiles = Array.from(e.dataTransfer.files);
    const validFiles = uploadedFiles.filter(
      (file) => file.type === "application/pdf" || file.type === "text/plain",
    );

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRunProgram = () => {
    console.log("Running analysis for:", prompt);
    //future logic will go here
  };

  return (
    <div className="min-h-screen bg-sky-950 flex flex-col items-center p-15">
      <header className="text-center">
        <h1 className="text-6xl font-bold tracking-tight text-amber-500">
          LoopLM
        </h1>
        <p className="mt-2 text-amber-600">Recursive Language Model</p>
      </header>

      <main className="mt-10 w-full max-w-5xl bg-white p-8 min-h-100">
        <div className="bg-slate-900 p-6 min-h-65 overflow-hidden">
          <p className="opacity-40 font-sans text-slate-400">
            // Upload file and type in a prompt below
          </p>
        </div>
        {files.length === 0 ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mt-10 h-48 border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer ${
              isDragging
                ? "border-amber-600 bg-amber-100"
                : "border-slate-300 bg-amber-50 hover:border-slate-500"
            }`}
          >
            <p
              className={`font-medium ${isDragging ? "text-amber-600" : "text-slate-500"}`}
            >
              {isDragging
                ? "Drag PDFs or TXT files here"
                : "Drag PDFs or TXT files here"}
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-3">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt..."
                className="w-full p-4 pr-32 border border-slate-200 focus:ring-2 focus:ring-amber-300 focus:border-transparent outline-none transition-all resize-none h-48 text-sm bg-amber-50"
              />
              <button
                onClick={() => setFiles([])}
                className="w-21 h-12 absolute bottom-10 right-7.5 bg-slate-500 text-white px-5 py-2.5 text-xs font-bold hover:bg-slate-600"
              >
                {" "}
                Back{" "}
              </button>
              <button
                onClick={handleRunProgram}
                disabled={!prompt.trim()}
                className="w-21 h-12 absolute top-10 right-7.5 bg-amber-600 text-white px-5 py-2.5 text-xs font-bold hover:bg-amber-700"
              >
                Run
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-auto pt-8 text-slate-300 text-sm text-center">
        <a
          href="https://ashtonlittle.ca"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-slate-300 hover:text-slate-500 font-medium transition-colors underline"
        >
          ashtonlittle.ca
        </a>
        <h1 className="text-center">© 2026 Ashton Little</h1>
      </footer>
    </div>
  );
}

export default App;
