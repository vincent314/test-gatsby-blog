import * as React from "react"
import { useState } from "react"

const Page = () => {
  let [dark, setDark] = useState("dark", false)
  return (
    <div className={
      `p-10
     ${dark ? "dark" : ""}
     text-blue-950
     dark:text-white
     bg-white
     dark:bg-gray-900`}>
      <header className="
      flex
      flex-row
      flex-nowrap
      justify-center
      space-x-2
      mb-10
      items-center">
        <div className="">Accueil</div>
        <div className="">Categories</div>
        <div className="text-4xl font-cursive">Vincent's blog</div>
        <div className="">À propos</div>
        <div>
          <button onClick={() => setDark(!dark)}>Mode sombre</button>
        </div>
      </header>
      <main className="grid md:grid-cols-2 grid-cols-1 justify-items-stretch space-x-2 space-y-2">
        {[...Array(5)].map(() => (
          <article className="border border-gray-200 rounded-2xl px-4 py-2">
            <header className="text-gray-400 text-sm">Kotlin</header>
            <main>
              <h2 className="text-2xl font-bold">Kotlin multiplatform</h2>
              <p>Lorem ipsum dolor sit amet.</p>
            </main>
            <footer className="text-gray-400 text-sm">1er juillet 2024</footer>
          </article>
        ))}

      </main>
      <footer>

      </footer>
    </div>
  )
}


export default Page
