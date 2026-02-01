# Deploy en Cloudflare Pages

## Configuración en el dashboard

1. **Build command:** `npm run build:cloudflare`
2. **Build output directory:** `deploy`
3. **Deploy command (si aplica):** `npx wrangler pages deploy deploy --project-name=pupas`

O bien usa **Direct Upload**: ejecuta localmente `npm run deploy:cloudflare` (build + deploy).

## URLs

- App: `tudominio.com/crew/` (crear grupo)
- Pedido: `tudominio.com/crew/order`
- Resumen: `tudominio.com/crew/summary`

La app está bajo `/crew/` para poder usar luego `/business` u otras rutas en el mismo dominio.
