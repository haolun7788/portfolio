// Smooth 3D value noise in [0, 1]. The third axis is used as time so the
// field drifts instead of jumping between frames.

const perm = new Uint8Array(512)
{
    const p = Array.from({ length: 256 }, (_, i) => i)
    for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[p[i], p[j]] = [p[j], p[i]]
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
}

const hash = (x: number, y: number, z: number) =>
    perm[perm[perm[x & 255] + (y & 255)] + (z & 255)] / 255

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export function noise3(x: number, y: number, z: number): number {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z)
    const u = fade(x - xi), v = fade(y - yi), w = fade(z - zi)

    const x00 = lerp(hash(xi, yi, zi), hash(xi + 1, yi, zi), u)
    const x10 = lerp(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u)
    const x01 = lerp(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u)
    const x11 = lerp(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u)

    return lerp(lerp(x00, x10, v), lerp(x01, x11, v), w)
}
