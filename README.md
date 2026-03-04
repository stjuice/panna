# Panna — Vite React SPA

Orders app built with Vite, React 19, TypeScript, Sass, and Supabase. Data access is abstracted via a repository pattern (file or Supabase).

## Scripts

- `npm run dev` — start dev server (Vite)
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run test` — run Vitest
- `npm run lint` — run ESLint

## Environment

Create `.env` or `.env.local` with `VITE_`-prefixed variables (Vite exposes only these to the client):

- `VITE_ORDERS_DATA_PROVIDER` — `file` (default) or `supabase`
- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_ANON_KEY` or `VITE_SUPABASE_SERVICE_ROLE_KEY` — Supabase key

For file provider, orders are read from `public/orders.json`. Writes in the browser require the Supabase provider.

## Structure

- `src/main.tsx` — entry, QueryClientProvider
- `src/App.tsx` — React Router (/, /search, /order/:id, /create)
- `src/pages/` — HomePage, SearchPage, OrderDetailsPage, CreateOrderPage
- `src/components/orders/OrderList.tsx`
- `src/lib/orders/` — repository, fileRepository, supabaseRepository, factory
- `src/lib/supabase/client.ts` — Supabase client for app use
- `src/types/orders.ts` — Order, NewOrder
