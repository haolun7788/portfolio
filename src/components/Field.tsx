import { useEffect, useRef } from 'react'
import { noise3 } from '../lib/noise'
import styles from './Field.module.css'

// Animated topographic contour map, drawn with marching squares over a
// slowly drifting noise field. The cursor raises a soft hill in the terrain.

const CELL = 14          // grid spacing in CSS px
const SCALE = 0.0034     // noise frequency
const SPEED = 0.00004    // field drift per ms
const LEVELS = 20        // number of contour lines
const FRAME_MS = 33      // ~30fps is plenty for motion this slow
const HILL_RADIUS = 190

// Edges: 0 top, 1 right, 2 bottom, 3 left. Cases indexed by corner bits
// tl=8 tr=4 br=2 bl=1.
const SEGMENTS: number[][] = [
    [], [3, 2], [2, 1], [3, 1], [0, 1], [3, 0, 2, 1], [0, 2], [3, 0],
    [3, 0], [0, 2], [0, 1, 3, 2], [0, 1], [3, 1], [2, 1], [3, 2], [],
]

export default function Field() {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = ref.current!
        const ctx = canvas.getContext('2d')!
        const still = matchMedia('(prefers-reduced-motion: reduce)').matches

        let w = 0, h = 0, cols = 0, rows = 0
        let values = new Float32Array(0)
        let line = '', strong = ''
        let t = Math.random() * 100
        let raf = 0, last = 0, acc = 0
        const mouse = { x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0 }

        function readColors() {
            const cs = getComputedStyle(document.documentElement)
            line = cs.getPropertyValue('--contour').trim()
            strong = cs.getPropertyValue('--contour-strong').trim()
        }

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            cols = Math.ceil(w / CELL) + 1
            rows = Math.ceil(h / CELL) + 1
            values = new Float32Array(cols * rows)
        }

        function sample() {
            const r2 = 2 * HILL_RADIUS * HILL_RADIUS
            for (let j = 0; j < rows; j++) {
                const y = j * CELL
                for (let i = 0; i < cols; i++) {
                    const x = i * CELL
                    let v = noise3(x * SCALE, y * SCALE, t) * 0.7
                        + noise3(x * SCALE * 2.4 + 31, y * SCALE * 2.4 + 17, t * 1.3) * 0.3
                    if (mouse.s > 0.002) {
                        const dx = x - mouse.x, dy = y - mouse.y
                        v += mouse.s * 0.16 * Math.exp(-(dx * dx + dy * dy) / r2)
                    }
                    values[j * cols + i] = v
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, w, h)
            const px = [0, 0, 0, 0], py = [0, 0, 0, 0]

            for (let k = 0; k < LEVELS; k++) {
                const lvl = 0.3 + (k / LEVELS) * 0.45
                const major = k % 5 === 0
                ctx.beginPath()

                for (let j = 0; j < rows - 1; j++) {
                    const y0 = j * CELL
                    for (let i = 0; i < cols - 1; i++) {
                        const a = values[j * cols + i]
                        const b = values[j * cols + i + 1]
                        const c = values[(j + 1) * cols + i + 1]
                        const d = values[(j + 1) * cols + i]
                        const idx = (a > lvl ? 8 : 0) | (b > lvl ? 4 : 0) | (c > lvl ? 2 : 0) | (d > lvl ? 1 : 0)
                        if (idx === 0 || idx === 15) continue

                        const x0 = i * CELL
                        px[0] = x0 + CELL * (lvl - a) / (b - a); py[0] = y0
                        px[1] = x0 + CELL; py[1] = y0 + CELL * (lvl - b) / (c - b)
                        px[2] = x0 + CELL * (lvl - d) / (c - d); py[2] = y0 + CELL
                        px[3] = x0; py[3] = y0 + CELL * (lvl - a) / (d - a)

                        const seg = SEGMENTS[idx]
                        for (let s = 0; s < seg.length; s += 2) {
                            ctx.moveTo(px[seg[s]], py[seg[s]])
                            ctx.lineTo(px[seg[s + 1]], py[seg[s + 1]])
                        }
                    }
                }

                ctx.strokeStyle = major ? strong : line
                ctx.lineWidth = major ? 1 : 0.6
                ctx.stroke()
            }
        }

        function frame(now: number) {
            raf = requestAnimationFrame(frame)
            acc += Math.min(now - last, 100)
            last = now
            if (acc < FRAME_MS) return

            t += SPEED * acc
            acc = 0
            mouse.x += (mouse.tx - mouse.x) * 0.06
            mouse.y += (mouse.ty - mouse.y) * 0.06
            mouse.s += (mouse.ts - mouse.s) * 0.03
            sample()
            draw()
        }

        function start() {
            cancelAnimationFrame(raf)
            last = performance.now()
            raf = requestAnimationFrame(frame)
        }

        function render() {
            sample()
            draw()
        }

        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return
            if (mouse.ts === 0 && mouse.s < 0.01) {
                mouse.x = e.clientX
                mouse.y = e.clientY
            }
            mouse.tx = e.clientX
            mouse.ty = e.clientY
            mouse.ts = 1
        }
        const onLeave = () => { mouse.ts = 0 }
        const onResize = () => { resize(); render() }
        const onVisibility = () => {
            if (document.hidden) cancelAnimationFrame(raf)
            else if (!still) start()
        }

        const observer = new MutationObserver(() => { readColors(); render() })
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

        readColors()
        resize()
        render()

        window.addEventListener('resize', onResize)
        if (!still) {
            window.addEventListener('pointermove', onMove)
            document.documentElement.addEventListener('pointerleave', onLeave)
            document.addEventListener('visibilitychange', onVisibility)
            start()
        }

        return () => {
            cancelAnimationFrame(raf)
            observer.disconnect()
            window.removeEventListener('resize', onResize)
            window.removeEventListener('pointermove', onMove)
            document.documentElement.removeEventListener('pointerleave', onLeave)
            document.removeEventListener('visibilitychange', onVisibility)
        }
    }, [])

    return <canvas ref={ref} className={styles.field} aria-hidden="true" />
}
