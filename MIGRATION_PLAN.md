# Next.js → Vite React SPA Migration Plan

## Step 1 — Analysis

### Next.js dependencies
- `package.json`: next, eslint-config-next
- `next.config.ts`, `next-env.d.ts` (generated)

### App Router files
- `src/app/layout.tsx` — root layout, next/font, Metadata
- `src/app/page.tsx` — async server component, renders OrdersPage
- `src/app/globals.scss`, `src/app/page.module.scss`

### API routes
- `src/app/api/orders/route.ts` — GET/POST, uses getOrdersRepository()
- `src/app/api/orders/[id]/route.ts` — not present in panna (only in parent src)

### Server components / fetch
- `src/components/orders/OrdersPage.tsx` — async, uses `headers()`, `fetch(\`${baseUrl}/api/orders\`)`

### Repository layer (preserve)
- `src/lib/orders/repository.ts` — interface getOrders, getOrder, createOrder, updateOrder, deleteOrder
- `src/lib/orders/fileRepository.ts` — Node fs; must switch to fetch in browser
- `src/lib/orders/supabaseRepository.ts` — process.env for Supabase
- `src/lib/orders/factory.ts` — process.env.ORDERS_DATA_PROVIDER
- `src/types/orders.ts` — Order, NewOrder

### Env
- Next: NEXT_PUBLIC_* or server env. Vite: VITE_* only in client; inject process.env in vite define for repo.

---

## Steps 2–15 (execution order)
2. Remove Next: delete src/app/api, app/layout.tsx, app/page.tsx; remove next, eslint-config-next; drop next scripts.
3. Install Vite + React: vite, @vitejs/plugin-react, react-router-dom; add dev/build/preview.
4. Create index.html, src/main.tsx, src/App.tsx with React Router (/, /search, /order/:id, /create).
5. Replace API: use getOrdersRepository() + TanStack Query in pages.
6. Supabase client (optional for auth; repo stays), move globals to src/styles/globals.scss, file repo → fetch + public/orders.json.
7. Pages: HomePage (list), SearchPage, OrderDetailsPage, CreateOrderPage; OrderList component; vitest.config.ts.
8. Validate build, dev, tests.
