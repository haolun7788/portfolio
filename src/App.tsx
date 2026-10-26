import { useCallback, useEffect, useState } from 'react'
import Field from './components/Field'
import Intro from './components/Intro'
import Panel from './components/Panel'
import { TABS, type Tab } from './data'

type Theme = 'light' | 'dark'

// The panel state lives in the URL hash so links like haolun.li/#projects work
function tabFromHash(): Tab | null {
  const hash = window.location.hash.slice(1)
  return (TABS as string[]).includes(hash) ? hash as Tab : null
}

function initialTheme(): Theme {
  const t = document.documentElement.dataset.theme
  return t === 'dark' ? 'dark' : 'light'
}

function App() {
  const [tab, setTab] = useState<Tab>(() => tabFromHash() ?? 'projects')
  const [open, setOpen] = useState(() => tabFromHash() !== null)
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    const onHash = () => {
      const t = tabFromHash()
      setOpen(t !== null)
      if (t) setTab(t)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* storage unavailable */ }
  }, [theme])

  const show = useCallback((t: Tab) => {
    setTab(t)
    setOpen(true)
    history.replaceState(null, '', `#${t}`)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    history.replaceState(null, '', window.location.pathname)
  }, [])

  return (
    <>
      <Field />
      <Intro
        open={open}
        onOpen={show}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <Panel open={open} tab={tab} onTab={show} onClose={close} />
    </>
  )
}

export default App
