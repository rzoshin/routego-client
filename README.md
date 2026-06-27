# RouteGo Client

Next.js frontend for the RouteGo online ticket booking platform (Bus, Train, Launch, Flight).

## Local development

**Prerequisites:** MongoDB Atlas, `routego-server` running on port 8000.

```bash
cd routego-client
cp .env.example .env.local
# Fill in MONGODB_URI, BETTER_AUTH_SECRET, NEXT_PUBLIC_API_URL, etc.
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Dev uses webpack (`next dev --webpack`) to avoid Turbopack + React Compiler issues.

## Environment variables

See `.env.example`. Key values:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB for Better Auth |
| `BETTER_AUTH_SECRET` | Random secret for sessions |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL` | App URL (local or Vercel) |
| `NEXT_PUBLIC_API_URL` | Express API URL (`http://localhost:8000` or server Vercel URL) |

## Deploy to Vercel

1. Import `routego-client` as a Vercel project.
2. Add all env vars from `.env.example` in the Vercel dashboard.
3. Set `NEXT_PUBLIC_API_URL` to your deployed `routego-server` URL.
4. Deploy.

## Features

- Role-based dashboards (user, vendor, admin)
- Ticket search, filter, sort, and booking
- Mock payment flow (test card `4242 4242 4242 4242`)
- Admin ticket approval, user management, homepage ads (max 6)
- Dark / light theme with semantic design tokens
