# Y2K Interactive Resume

A retro Y2K-themed interactive resume built with React, TypeScript, Tailwind CSS v4, and Vite. Features a 3D-flipping business card, a "What Do I Do" service overview, an AI chatbot, and a Windows-style project showcase.

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and add your API key (for chatbot)
cp .env.example .env

# 3. Start the dev server (hot-reloads on save)
npm run dev
```

Open **http://localhost:3000** in your browser.

## Chatbot Setup

The site includes a retro chatbot that answers questions about GPTechnologies. It calls a server-side proxy at `/api/chat` so your API key never reaches the browser.

| Variable | Required | Default | Description |
|---|---|---|---|
| `OPENAI_API_KEY` | Yes | — | Your OpenAI (or compatible) API key |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | Model to use for chat completions |
| `OPENAI_BASE_URL` | No | `https://api.openai.com/v1` | Base URL for OpenAI-compatible providers |

**Local development with the chatbot:** Use `vercel dev` instead of `npm run dev` to run both the Vite frontend and the `/api/chat` serverless function locally. Install the Vercel CLI with `npm i -g vercel` if you don't have it.

**Without an API key:** The site works fine — the chatbot will show an error message when used, but everything else renders normally.

## Testing a Production Build

```bash
npm run build
npm run preview
```

`npm run preview` starts a local server at **http://localhost:4173** serving the optimized bundle.

## Type Checking

```bash
npm run lint
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Set the **Root Directory** to `personal-site` if deploying from the monorepo root.
4. Add `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) in the Vercel project environment variables.
5. Click **Deploy**.

Subsequent pushes to `main` trigger automatic redeployments.

## Project Structure

```
personal-site/
├── api/
│   └── chat.ts            # Vercel serverless function (LLM proxy)
├── src/
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # Business card + chatbot + project grid
│   ├── data/
│   │   └── projects.tsx    # Project card data
│   └── index.css           # Tailwind imports + Y2K custom styles
├── .env.example            # Environment variable template
├── vercel.json             # Vercel routing config
└── package.json
```

## Tech Stack

- **React 19** + TypeScript (strict mode)
- **Tailwind CSS v4** (Vite plugin)
- **Vite 6**
- **Lucide React** icons
- **Vercel Serverless Functions** (chatbot proxy)
