# Variables de entorno necesarias

Crea un archivo `.env` en la raíz o añade estas variables en tu plataforma de hosting:

```bash
# Supabase (autenticación de alumnos)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui

# Stripe (pagos) — solo necesario en el API server
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxx
```

## Configuración en 5 pasos

1. **Edita `src/config.ts`** — cambia nombre, colores, textos y precios
2. **Crea un proyecto en Supabase** — añade VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
3. **Crea tus productos en Stripe** — copia los Price IDs en config.ts
4. **Añade STRIPE_SECRET_KEY** en el servidor de API
5. **Despliega** — ¡listo!
