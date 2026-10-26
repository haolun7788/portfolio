import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { links, portrait, projects, stack, TABS, type Media, type Tab } from '../data'
import styles from './Panel.module.css'

interface PanelProps {
    open: boolean
    tab: Tab
    onTab: (tab: Tab) => void
    onClose: () => void
}

const stagger = (i: number) => ({ '--i': i }) as CSSProperties

const newTab = (href: string) =>
    href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' }

// Each placeholder gets its own "summit" so the cards don't look identical
const SUMMITS = [[115, 30], [45, 62], [96, 70], [56, 28], [128, 55], [77, 40], [35, 35], [106, 22]]

// Concentric wobbly rings around a summit, like a small topographic map
function contours(index: number) {
    const [cx, cy] = SUMMITS[index % SUMMITS.length]
    const phase = index * 1.7
    return Array.from({ length: 14 }, (_, ring) => {
        const r = 6 + ring * 9
        const pts = Array.from({ length: 48 }, (_, k) => {
            const t = (k / 48) * Math.PI * 2
            const wobble = 1 + 0.12 * Math.sin(2 * t + phase + ring * 0.15) + 0.06 * Math.sin(3 * t - phase)
            return `${(cx + r * 1.25 * wobble * Math.cos(t)).toFixed(1)},${(cy + r * wobble * Math.sin(t)).toFixed(1)}`
        })
        return { d: `M${pts.join('L')}Z`, major: ring % 4 === 0 }
    })
}

function MediaSlot({ media, index, className = '' }: { media?: Media | null, index: number, className?: string }) {
    const [cx, cy] = SUMMITS[index % SUMMITS.length]

    return (
        <div className={`${styles.media} ${className}`}>
            {media?.kind === 'video' && (
                <video src={media.src} aria-label={media.alt} autoPlay muted loop playsInline />
            )}
            {media && media.kind !== 'video' && <img src={media.src} alt={media.alt} loading="lazy" />}
            {!media && (
                <>
                    <svg className={styles.rings} viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                        {contours(index).map((c, i) => (
                            <path key={i} d={c.d} data-major={c.major || undefined} vectorEffect="non-scaling-stroke" />
                        ))}
                        <circle cx={cx} cy={cy} r="1.6" />
                    </svg>
                    <span className={styles.placeholder} aria-hidden="true">Preview coming soon</span>
                </>
            )}
        </div>
    )
}

function Projects() {
    return (
        <ol className={styles.grid}>
            {projects.map((p, i) => (
                <li key={p.title} className={styles.item} style={stagger(i)}>
                    <a href={p.link} className={styles.card} {...newTab(p.link)}>
                        <MediaSlot media={p.media} index={i} />
                        <div className={styles.cardBody}>
                            <div className={styles.meta}>
                                <span>{String(i + 1).padStart(2, '0')}</span>
                                <span>{p.date}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{p.title}</h3>
                            <p className={styles.desc}>{p.desc}</p>
                            <div className={styles.cardFoot}>
                                <ul className={styles.tags}>
                                    {p.stack.map(tech => <li key={tech}>{tech}</li>)}
                                </ul>
                                <span className={styles.cta}>
                                    {p.onRequest ? 'Request access ✉' : 'View ↗'}
                                </span>
                            </div>
                        </div>
                    </a>
                </li>
            ))}
        </ol>
    )
}

function About() {
    return (
        <div className={`${styles.grid} ${styles.aboutGrid}`}>
            <section className={`${styles.card} ${styles.bio} ${styles.item}`} style={stagger(0)}>
                <MediaSlot media={portrait} index={5} className={styles.portrait} />
                <div className={`${styles.cardBody} ${styles.prose}`}>
                    <p className={styles.kicker}>About</p>
                    <p>
                        I'm a <strong>second-year Computer Science student</strong> at the <strong>University
                        of British Columbia</strong> with a passion for computers and anything tech related.
                    </p>
                    <p>
                        Right now I'm playing around with all sorts of ideas and projects to expose myself to
                        new technologies and concepts.
                    </p>
                    <p>
                        When I'm not coding, I'm probably tinkering with side projects, hiking trails in the
                        mountains, or travelling the world. More projects are in the works.
                    </p>
                </div>
            </section>

            {Object.entries(stack).map(([group, items], i) => (
                <section key={group} className={`${styles.card} ${styles.item}`} style={stagger(i + 1)}>
                    <div className={styles.cardBody}>
                        <p className={styles.kicker}>{group}</p>
                        <div className={styles.tags}>
                            {items.map(item => <span key={item}>{item}</span>)}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    )
}

function Contact() {
    const rows = [
        { label: 'Email', value: links.email, href: `mailto:${links.email}` },
        { label: 'GitHub', value: 'github.com/haolun7788', href: links.github },
        { label: 'Resume', value: 'PDF, 2026', href: links.resume },
    ]

    return (
        <div>
            <h3 className={`${styles.contactHeading} ${styles.item}`} style={stagger(0)}>
                Let's <em>talk.</em>
            </h3>
            <p className={`${styles.contactSub} ${styles.item}`} style={stagger(1)}>
                Have a project in mind, an opportunity, or just want to say hi? My inbox is always open.
            </p>
            <div className={`${styles.grid} ${styles.contactGrid}`}>
                {rows.map((row, i) => (
                    <a
                        key={row.label}
                        href={row.href}
                        className={`${styles.card} ${styles.contactCard} ${styles.item}`}
                        style={stagger(i + 2)}
                        {...newTab(row.href)}
                    >
                        <div className={styles.cardBody}>
                            <p className={styles.kicker}>{row.label}</p>
                            <p className={styles.contactValue}>{row.value}</p>
                            <span className={styles.cta}>{row.href.startsWith('mailto:') ? 'Write ✉' : 'Open ↗'}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

const CONTENT = { projects: Projects, about: About, contact: Contact }

export default function Panel({ open, tab, onTab, onClose }: PanelProps) {
    const ref = useRef<HTMLElement>(null)
    const returnFocus = useRef<HTMLElement | null>(null)
    const dragStart = useRef<number | null>(null)
    const [drag, setDrag] = useState(0)

    useEffect(() => {
        if (!open) return
        returnFocus.current = document.activeElement as HTMLElement | null
        ref.current?.focus({ preventScroll: true })

        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => {
            window.removeEventListener('keydown', onKey)
            returnFocus.current?.focus({ preventScroll: true })
        }
    }, [open, onClose])

    // Bottom-sheet drag to dismiss (only meaningful on narrow screens)
    const onDragStart = (e: PointerEvent<HTMLDivElement>) => {
        if (e.pointerType === 'mouse') return
        dragStart.current = e.clientY
        e.currentTarget.setPointerCapture(e.pointerId)
    }
    const onDragMove = (e: PointerEvent<HTMLDivElement>) => {
        if (dragStart.current !== null) setDrag(Math.max(0, e.clientY - dragStart.current))
    }
    const onDragEnd = () => {
        if (dragStart.current === null) return
        if (drag > 110) onClose()
        dragStart.current = null
        setDrag(0)
    }

    const Content = CONTENT[tab]

    return (
        <>
            <div className={styles.scrim} data-open={open || undefined} onClick={onClose} />
            <aside
                ref={ref}
                className={styles.panel}
                data-open={open || undefined}
                data-dragging={drag > 0 || undefined}
                style={{ '--drag': `${drag}px` } as CSSProperties}
                role="dialog"
                aria-modal="true"
                aria-label="Projects, about and contact"
                tabIndex={-1}
                inert={!open}
            >
                <div
                    className={styles.head}
                    onPointerDown={onDragStart}
                    onPointerMove={onDragMove}
                    onPointerUp={onDragEnd}
                    onPointerCancel={onDragEnd}
                >
                    <span className={styles.handle} aria-hidden="true" />
                    <div className={styles.tabs} role="tablist">
                        {TABS.map((t, i) => (
                            <button
                                key={t}
                                role="tab"
                                aria-selected={t === tab}
                                className={styles.tab}
                                onClick={() => onTab(t)}
                            >
                                <span className={styles.tabNum}>0{i + 1}</span>
                                {t[0].toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                    <button className={styles.close} onClick={onClose} aria-label="Close panel" />
                </div>

                <div className={styles.body} role="tabpanel">
                    <Content key={tab} />
                </div>
            </aside>
        </>
    )
}
