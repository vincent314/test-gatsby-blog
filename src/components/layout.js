import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"
import { HomeIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { Helmet } from "react-helmet"
import Panel from "./panel"

const useLocalStorage = (key, initialValue) => {
  const isServer = typeof localStorage === "undefined"

  const [value, setValue] = useState(() => {
    const storedValue = (isServer) ? null : localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })
  useEffect(() => {
    const isServer = typeof localStorage === "undefined"
    if (!isServer) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key, value])

  return [value, setValue]
}

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let [dark, setDark] = useLocalStorage("dark", false)

  useEffect(() => {
    // document.body.style.background =
  }, [dark])

  const switchTheme = () => {
    setDark(!dark)
  }

  const header = (
    <header className="flex flex-row flex-nowrap justify-between mb-10 items-center">
      <Link to="/"><HomeIcon className="size-6"></HomeIcon></Link>
      <Link to="/" className="text-4xl font-cursive">Blog</Link>
      <div>
        <button onClick={switchTheme}>{dark ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}</button>
      </div>
    </header>
  )

  return (
    <div className={`${dark ? "dark" : ""} text-slate-700 dark:text-slate-100 py-5 px-5 sm:px-10 md:px-20 lg:px-30`}
         data-is-root-path={isRootPath}>
      <Helmet>
        <body className={`${dark ? "dark" : ""} bg-slate-100 dark:bg-slate-900`}></body>
      </Helmet>
      {header}
      <main>{children}</main>
      <footer>
        <Panel>
          <small>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </small>
        </Panel>
      </footer>
    </div>
  )
}

export default Layout
