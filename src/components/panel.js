import * as React from "react"
const Panel = ({children}) =>{
  return (
    <div className="bg-slate-300 dark:bg-slate-800 rounded-2xl px-6 py-4 my-2">
      {children}
    </div>
  )
}

export default Panel;
