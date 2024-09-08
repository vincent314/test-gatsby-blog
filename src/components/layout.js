import * as React from "react"
import { useEffect, useState } from "react"
import { Link } from "gatsby"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(()=>{
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });
  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value));
  }, [key,value]);

  return [value, setValue];
}

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  let [dark, setDark] = useLocalStorage("dark", false)

  header = (
    <>
      <Link to={rootPath}>Accueil</Link>
      <div className="">Categories</div>
      <Link to={rootPath} className="text-4xl font-cursive">Blog</Link>
      <div className="">À propos</div>
      <div>
        <button onClick={() => setDark(!dark)}>{dark ? <SunIcon className="size-6"/> : <MoonIcon className="size-6"/>}</button>
      </div>
    </>
  )

  return (
    <div className={`${dark ? "dark" : ""} text-gray-700 dark:text-white bg-zinc-100 dark:bg-zinc-900 px-5 sm:px-10 md:px-20 lg:px-40`}
         data-is-root-path={isRootPath}>
      <header className="flex flex-row flex-nowrap justify-center space-x-2 mb-10 items-center">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
