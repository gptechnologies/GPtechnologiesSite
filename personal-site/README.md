# GPTechnologies portfolio

A portfolio built with React, TypeScript, and Vite. The homepage pairs the GPTechnologies artwork with an introduction, followed by alternating project descriptions and animated SVG illustrations. On phones, each illustration stacks above its description.

## Edit projects

Project content lives in `src/data/projects.ts`. Each entry includes a stable ID, category, figure title, activity caption, accessible visual description, date, title, description, and optional links:

```ts
{
  id: 'project-id',
  category: 'Project category',
  figure: 'Illustration title',
  activity: 'Input → process → output',
  visualDescription: 'Describe what the illustration shows.',
  date: 'October 2026',
  title: 'Project title',
  description: 'A concise description of the project.',
  link: 'https://example.com',
}
```

Entries appear in the order listed, so place the newest project first.

Illustrations live in `src/components/ProjectScene.tsx` and are mapped to each project ID. Their CSS animation loops pause outside the viewport, when the tab is hidden, or through the page's Pause motion control. Reduced-motion preferences show still illustrations. Fonts are bundled locally under `public/fonts` with their license, and the hero uses an optimized transparent WebP cutout of the cartoon.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify a production build

```bash
npm run build
npm run preview
```
