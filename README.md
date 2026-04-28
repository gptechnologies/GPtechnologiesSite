# GPTechnologies Personal Site

Retro Y2K-themed personal site for Jai Mangat and GPTechnologies. The app showcases AI agents, business automation services, selected projects, and a small chatbot.

## Repository Structure

```text
personal-site/
├── api/
│   └── chat.ts            # Vercel serverless function for the chatbot
├── src/
│   ├── main.tsx           # React entry point
│   ├── App.tsx            # Business card, chatbot, and project grid
│   ├── data/
│   │   └── projects.tsx   # Project card data
│   └── index.css          # Tailwind imports and Y2K custom styles
├── .env.example           # Chatbot environment variable template
├── vercel.json            # Vercel routing config
└── package.json
```

## Quick Start

```bash
cd personal-site
npm install
npm run dev
```

Open `http://localhost:3000`.

## Chatbot

The chatbot calls the server-side `/api/chat` proxy so the API key is not exposed in the browser.

```bash
cp .env.example .env
```

Set `OPENAI_API_KEY` in `.env`. For local development with the serverless function, use `vercel dev`.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```
