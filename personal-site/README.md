# GPTechnologies Personal Site

A retro Y2K-themed personal site built with React, TypeScript, Tailwind CSS v4, and Vite. It includes a 3D-flipping business card, GPTechnologies service overview, AI chatbot, and Windows-style project showcase.

## Getting Started

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Chatbot Setup

The chatbot answers questions about GPTechnologies. It calls a server-side proxy at `/api/chat` so your API key never reaches the browser.

| Variable | Required | Default | Description |
|---|---|---|---|
| `OPENAI_API_KEY` | Yes | - | Your OpenAI or compatible API key |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | Model to use for chat completions |
| `OPENAI_BASE_URL` | No | `https://api.openai.com/v1` | Base URL for OpenAI-compatible providers |

For local development with the chatbot, use `vercel dev` instead of `npm run dev` to run both the Vite frontend and the `/api/chat` serverless function locally.

Without an API key, the site still renders normally; chatbot requests return a configuration error.

## Testing

```bash
npm run build
npm run preview
npm run lint
```

`npm run preview` starts a local server at `http://localhost:4173` serving the optimized bundle.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo at `vercel.com/new`.
3. Set the root directory to `personal-site`.
4. Add `OPENAI_API_KEY` and optionally `OPENAI_MODEL` in the Vercel project environment variables.
5. Deploy.

## Project Structure

```text
personal-site/
├── api/
│   └── chat.ts            # Vercel serverless function
├── src/
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # Business card, chatbot, and project grid
│   ├── data/
│   │   └── projects.tsx   # Project card data
│   └── index.css          # Tailwind imports and Y2K custom styles
├── .env.example
├── vercel.json
└── package.json
```
