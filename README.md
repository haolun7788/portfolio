# haolun.li

Personal portfolio site, built with React, TypeScript and Vite.

## Develop

```sh
npm install
npm run dev
```

## Edit content

Projects, stack and contact links all live in `src/data.ts`. Add a project to the
`projects` array (newest first) and it shows up on the page automatically.

### Adding images or video to a card

Every project card (and the About photo) has a media slot that shows a contour
placeholder until you fill it. Drop the file in `public/media/` and add a
`media` field to the project:

```ts
media: { src: "/media/calcli.png", alt: "calcli parsing an event in the terminal" },
// or a looping clip:
media: { src: "/media/brezi.mp4", alt: "Brezi home screen", kind: "video" },
```

Slots are 16:10, so images at 1600×1000 (or any 16:10 size) fit best. For the
About photo, set `portrait` in `src/data.ts` the same way (4:5 works best).

## Deploy

```sh
npm run deploy   # builds and publishes dist/ to the gh-pages branch
```
