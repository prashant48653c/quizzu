export function Legend() {
  return (
    <div className="w-fit rounded-xl  border border-slate-300 p-5 sm:p-8">
      <div className="flex flex-col h-full  w-full justify-evenly   px-4 gap-3">
        <div className="flex  items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-emerald-600" />
          <span className="text-2xl">Attempted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-blue-600" />
          <span className="text-2xl">Add for review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <span className="text-2xl">Unattempted</span>
        </div>
      </div>
    </div>
  )
}

