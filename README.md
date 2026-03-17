# Resume Creator

A SaaS platform that generates deployable resume websites from uploaded resumes. Users pick a style template, describe how it should look, and receive a complete code repository pushed to a shared private GitHub repo.

## Repository Structure

```
├── personal-site/    # Jai's personal Y2K resume (standalone Vite app)
└── platform/         # Resume Creator SaaS (Next.js)
    ├── prisma/       # Database schema
    ├── src/
    │   ├── app/      # Next.js App Router (pages + API routes)
    │   ├── lib/      # Core services (auth, credits, stripe, github, codegen, etc.)
    │   └── templates/ # Style templates (Y2K is v1)
    └── .env.example  # All required environment variables
```

## Quick Start

### Personal Site

```bash
cd personal-site
npm install
npm run dev          # http://localhost:3000
```

### Platform

```bash
cd platform
npm install
cp .env.example .env # Fill in your values
npx prisma db push   # Create database tables
npm run dev          # http://localhost:3001
```

## Environment Variables

See `platform/.env.example` for the full list. Key services:

| Variable | Service | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection | Yes |
| `AUTH_SECRET` | NextAuth session encryption | Yes |
| `AUTH_GITHUB_ID/SECRET` | GitHub OAuth login | Yes |
| `STRIPE_SECRET_KEY` | Credit purchases | Yes |
| `STRIPE_WEBHOOK_SECRET` | Payment fulfillment | Yes |
| `OPENAI_API_KEY` | Code generation LLM | Yes |
| `GITHUB_PAT` | Private repo creation | Yes |
| `VERCEL_TOKEN` | One-click deploy | Optional |

## Architecture

1. User signs up (GitHub/Google OAuth) and receives 3 starter credits
2. User uploads resume PDF, picks a template (Y2K), writes a prompt
3. Platform parses resume, sends template + data + prompt to LLM
4. LLM generates a complete Vite project; platform validates the build
5. User can request AI edits (1 credit per edit)
6. User pushes code to a shared private GitHub repo
7. Optional one-click Vercel deployment

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Prisma** + PostgreSQL
- **NextAuth v5** (GitHub + Google)
- **Stripe** (credit purchases)
- **OpenAI** (code generation)
- **Octokit** (GitHub repo management)
- **Tailwind CSS v4**
