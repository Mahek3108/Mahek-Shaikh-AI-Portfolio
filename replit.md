# Mahek Shaikh — AI/ML Engineer Portfolio

A dynamic technical portfolio for Mahek Shaikh, an AI/ML Engineer and Applied AI Researcher, with interactive case studies, research architecture diagrams, and live GitHub project data.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/mahek-ai-portfolio run dev` — run the portfolio web app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/mahek-ai-portfolio/src/App.tsx` — single-page route shell
- `artifacts/mahek-ai-portfolio/src/components/portfolio-sections.tsx` — portfolio content, interactions, and live GitHub repository section
- `artifacts/mahek-ai-portfolio/src/index.css` — dark research-lab visual system and responsive styling
- `.local/conversation-workspace/files/attached_assets/` — source brief preserved from the initial request

## Architecture decisions

- The portfolio is frontend-first and uses the public GitHub API for live repository data; no credentialed integration is needed for the public profile.
- Project content is expressed as structured case studies with explicit status and evidence language to avoid overstating research or medical claims.
- Architecture diagrams and interaction states are implemented as lightweight React/CSS components so the page remains responsive and dependency-light.

## Product

Visitors can scan Mahek's positioning, inspect technical case studies, explore architecture stages and skill evidence, review experience and research, see live GitHub repositories, and contact him through verified external links.

## User preferences

The visual direction should remain technically precise and restrained: technical depth and information architecture should carry the impression instead of excessive visual effects.

## Gotchas

- The supplied two-page resume is bundled as a downloadable frontend asset and is linked from the hero and contact areas.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
