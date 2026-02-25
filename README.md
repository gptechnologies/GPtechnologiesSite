# Y2K Interactive Resume

A retro Y2K-themed interactive resume built with React, TypeScript, Tailwind CSS v4, and Vite. Features a 3D-flipping business card and a Windows-style project showcase.

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot-reloads on save)
npm run dev
```

Open **http://localhost:3000** in your browser. Any changes you make to files in `src/` will instantly reflect in the browser.

## Testing a Production Build

```bash
# Build the optimized bundle
npm run build

# Serve it locally to verify everything works before deploying
npm run preview
```

`npm run preview` starts a local server at **http://localhost:4173** serving the exact files that would be deployed.

## Type Checking

```bash
npm run lint
```

Runs the TypeScript compiler in check-only mode — no files are emitted, but all type errors are surfaced.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Vite — no extra config needed. Click **Deploy**.

Subsequent pushes to `main` will trigger automatic redeployments.

## Project Structure

```
src/
├── main.tsx            # React entry point
├── App.tsx             # Business card + project grid layout
├── data/
│   └── projects.tsx    # Project card data (edit here to add/remove cards)
└── index.css           # Tailwind imports + Y2K custom styles
```

## Tech Stack

- **React 19** + TypeScript (strict mode)
- **Tailwind CSS v4** (Vite plugin)
- **Vite 6**
- **Lucide React** icons
