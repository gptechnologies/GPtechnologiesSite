# GPTechnologies portfolio

A minimal two-section portfolio built with React, TypeScript, and Vite. The homepage contains the GPTechnologies artwork followed by a chronological project timeline.

## Edit projects

Project content lives in `src/data/projects.ts`. Each entry accepts a date, title, description, and optional link:

```ts
{
  date: '2026',
  title: 'Project title',
  description: 'A concise description of the project.',
  link: 'https://example.com',
}
```

Entries appear in the order listed, so place the newest project first.

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
