# Deploy en Cloudflare Pages

## Configuración en el dashboard (obligatorio)

Cloudflare Pages usa **`wrangler pages deploy`**, no `wrangler deploy`. Configura:

1. **Build command:** `npm run build:cloudflare`
2. **Build output directory:** `deploy`
3. **Deploy command:** `npm run deploy`

   (o bien: `npx wrangler pages deploy deploy --project-name=pupas`)

   **Importante:** no uses `npx wrangler deploy` — es para Workers y falla en Pages.

## URLs

- App: `tudominio.com/crew/` (crear grupo)
- Pedido: `tudominio.com/crew/order`
- Resumen: `tudominio.com/crew/summary`

La app está bajo `/crew/` para poder usar luego `/business` u otras rutas en el mismo dominio.
