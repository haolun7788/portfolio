import { useEffect, useState, type CSSProperties } from 'react'
import { links, projects, type Tab } from '../data'
import styles from './Intro.module.css'

interface IntroProps {
    open: boolean
    onOpen: (tab: Tab) => void
    theme: 'light' | 'dark'
    onToggleTheme: () => void
}

const vancouverTime = () =>
    new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Vancouver', hour: '2-digit', minute: '2-digit', hour12: false,
    }).format(new Date())

const MENU: { tab: Tab, label: string, count?: number }[] = [
    { tab: 'projects', label: 'Projects', count: projects.length },
    { tab: 'about', label: 'About' },
    { tab: 'contact', label: 'Contact' },
]

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties

export default function Intro({ open, onOpen, theme, onToggleTheme }: IntroProps) {
    const [time, setTime] = useState(vancouverTime)

    useEffect(() => {
        const id = setInterval(() => setTime(vancouverTime()), 15000)
        return () => clearInterval(id)
    }, [])

    return (
        <main className={styles.stage} data-open={open || undefined} inert={open}>
            <header className={styles.top}>
                <span className={styles.reveal} style={delay(0.2)}>HL / Portfolio</span>
                <div className={`${styles.topRight} ${styles.reveal}`} style={delay(0.3)}>
                    <span>Vancouver {time}</span>
                    <button
                        className={styles.theme}
                        onClick={onToggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        <span className={styles.themeDot} />
                    </button>
                </div>
            </header>

            <section className={styles.hero}>
                <p className={`${styles.eyebrow} ${styles.reveal}`} style={delay(0.6)}>
                    Software developer · Computer Science at UBC
                </p>
                <h1 className={styles.name}>
                    <span className={styles.line}><span style={delay(0.8)}>Hao Lun</span></span>
                    <span className={styles.line}><span style={delay(1.0)}><em>Li</em></span></span>
                </h1>
                <p className={`${styles.lede} ${styles.reveal}`} style={delay(1.5)}>
                    Aspiring software engineer and AI researcher, building things to learn
                    how they work, from command-line tools to mobile apps.
                </p>

                <nav className={styles.menu} aria-label="Sections">
                    {MENU.map((item, i) => (
                        <button
                            key={item.tab}
                            className={`${styles.menuItem} ${styles.reveal}`}
                            style={delay(1.8 + i * 0.12)}
                            onClick={() => onOpen(item.tab)}
                        >
                            <span className={styles.menuNum}>0{i + 1}</span>
                            <span className={styles.menuLabel}>{item.label}</span>
                            {item.count && <sup className={styles.menuCount}>{item.count}</sup>}
                        </button>
                    ))}
                </nav>
            </section>

            <footer className={`${styles.bottom} ${styles.reveal}`} style={delay(2.3)}>
                <span>49.2606° N, 123.2460° W</span>
                <span className={styles.bottomLinks}>
                    <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                    <a href={links.resume} target="_blank" rel="noopener noreferrer">Resume ↗</a>
                </span>
            </footer>
        </main>
    )
}
