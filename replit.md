# Workspace — AulaOS LMS Platform + Frecuencia Integral Academy

## AulaOS LMS Platform (`artifacts/lms-platform/`) — Editor Inline

### Arquitectura del editor
- **Activación**: URL param `?admin=aulaos-editor-2024` activa modo admin (key `lms_auth`)
- **Storage keys**: `lms_draft`, `lms_published`, `lms_auth`, `lms_blocks_<zone>`
- **Marca**: AulaOS · Gold `#BC9640` · Teal `#2b7d7a` · bg `#030306`

### Instrumentación Home.tsx (completa)
Todas las secciones tienen `data-fi-section` + `data-fi-label`. Los textos clave tienen `data-fi-key` + `cv()` helper:

| Sección | data-fi-section | Keys instrumentadas |
|---|---|---|
| Hero | home-hero | badge, title1, title2, subtitle |
| El Problema | home-problema | title, sub |
| La Solución | home-solucion | — (panel editor) |
| Experiencia Alumno | home-alumno | title, sub |
| White Label | home-wl | title, sub |
| Precios | home-precios | gestionado.name/price/period, template.name/price/period/desc |
| Cómo Funciona | home-como | title, label |
| Caso de Éxito | home-caso | name, desc |
| FAQ | home-faq | — (panel editor) |
| CTA Final | home-cta | title, sub, primary, secondary |

### Archivos clave LMS editor
- `src/components/EditorSidebar.tsx` — Sidebar completo (SECTION_PANELS con 10 secciones, Panel admin, PanelQuickEdit)
- `src/lib/content.ts` — `lms_draft`/`lms_published` storage
- `src/lib/auth.ts` — Auth simplificado sin Supabase
- `src/content-defaults.ts` — Todos los defaults de copy LMS
- `src/lib/blocks.ts` — Sistema de bloques `lms_blocks_<zone>`

---

## Quick Edit + Section Styles (Editor estilo Wix)

- **`src/components/SectionStyleApplier.tsx`** — Componente global (montado en App.tsx junto al router) que aplica `backgroundColor`/`backgroundImage` y `gridTemplateColumns` a todos los elementos `[data-fi-section]` leyendo claves `section.{id}.bg` y `section.{id}.col` del draft/published. Escucha eventos `fi:content`, `fi:published`, `fi:reset`.
- **`data-fi-section`** y **`data-fi-label`** — Atributos añadidos a todas las secciones de todas las páginas:
  - **Academy.tsx**: acad-hero, acad-cursos, acad-que-es (hasGrid), acad-presencia, acad-principios, acad-testimonios, acad-contacto (hasGrid)
  - **Landing.tsx** (`/metodo`): land-hero (hasGrid), land-puertas, land-libre, land-que-es (hasGrid), land-pilares, land-viaje, land-caminos, land-equipo, land-cta, land-testimonios, land-final
  - **Metodo.tsx** (`/metodo-tct`): met-hero, met-puertas, met-programa
  - **Deportista.tsx**: dep-hero, dep-para-quien, dep-metodologia (hasGrid), dep-equipo, dep-lista
  - **Área** (divs raíz): area-dashboard, area-semanas, area-diario, area-arteterapia, area-multimedia, area-progreso, area-comunidad
- **`data-fi-grid`** — Atributo añadido al contenedor grid dentro de cada sección `hasGrid`. Permite que `SectionStyleApplier` modifique `gridTemplateColumns`.
- **`SECTION_PANELS`** en EditorSidebar.tsx — Mapa actualizado con todas las secciones de todas las páginas (35 entradas) con `label`, `keys[]` y `hasGrid?`.
- **`PanelQuickEdit`** — Actualizado con dos nuevos bloques de control:
  - **Fondo de sección**: color picker + campo de texto (acepta hex o URL de imagen) + botón limpiar + preview en tiempo real.
  - **Proporción de columnas** (solo si `hasGrid`): 6 opciones pill-button con diagrama visual (50·50, 60·40, 40·60, 66·33, 33·66, 75·25) + botón restablecer.

## Block System (Constructor de contenido)

- **`src/lib/blocks.ts`** — Motor de bloques en localStorage (`fi_blocks_<zone>`). Funciones: `getBlocks`, `addBlock`, `duplicateBlock`, `deleteBlock`, `moveBlock`, `updateBlockField`. Emite `fi:blocks` al cambiar.
- **`src/components/BlockRenderer.tsx`** — Renderiza bloques de una zona. Tipos: `text`, `heading`, `card`, `quote`, `text_image`, `steps`, `cards_row`, `divider`, `cta`.
- **Panel "Añadir" en EditorSidebar** — Constructor completo: selector de tipo, edición de campos en acordeón, reordenar (▲▼), duplicar, eliminar.
- **Zonas registradas**: `home` (Academy), `metodo` (Landing), `metodo-tct` (Metodo), `deportista`, `area-dashboard`, `area-comunidad`, `area-diario`, `area-progreso`, `area-arteterapia`, `area-multimedia`, `week_N` (cada semana 1-48).
- **Evento `fi:pagetitle`** — Semanas.tsx lo emite al abrir una semana para que el sidebar dirija los bloques a la zona `week_N` correcta.

## Stripe — PENDIENTE DE CONFIGURAR

El usuario quiere integrar pagos Stripe con dos planes:
- **Puerta Blanca** — `price_1T2dOo9g6L3yEuP8z4nhJh2N` (95€/mes)
- **Puerta Oro** — `price_1T2dsD9g6L3yEuP8jX1yHQ35` (890€ pago único)

El checkout existente en el código base original usaba un Supabase Edge Function `create-checkout` en `jtwbbyjspanirbsuoipa.supabase.co/functions/v1/create-checkout`.

**Acción pendiente:** El usuario descartó el flujo OAuth de Stripe en Replit. Para activar pagos necesitamos que el usuario proporcione:
1. Su `STRIPE_SECRET_KEY` (empieza por `sk_test_...`) → guardarla como secreto
2. O que autorice la integración de Stripe en Replit

Una vez tengamos la clave, implementar: webhook handler en api-server, ruta `/api/checkout`, y página de pago en el frontend.

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `artifacts/frecuencia-integral` (`@workspace/frecuencia-integral`)

Frecuencia Integral Academy — React + Vite + TypeScript + Tailwind CSS frontend. Spanish conscious development academy platform.

- **Design**: Apple-style light theme — bg white/off-white, text #1D1D1F, warm gold primary (#795901/#BC9640), card shadows, pill buttons, Inter + Playfair Display fonts
- **Routes** (wouter):
  - `/` → `Academy.tsx` (new multi-curso home — dark hero + mandala SVG rotating, two course cards, testimonios, contacto, footer)
  - `/metodo` → `Landing.tsx` (Método TCT detailed landing — 4 puertas + Oro pricing)
  - `/metodo-tct` → `Metodo.tsx` (puertas info page)
  - `/deportista` → `Deportista.tsx` (El Deportista Consciente landing)
  - `/equipo` → `Equipo.tsx` (team page — dark hero, per-course team blocs)
  - `/login` → `Login.tsx`
  - `/area` → `Area.tsx` (Student Area — 8 tabs)
- **Authentication**: localStorage-only, demo account: alumno@test.com / 1234
- **Student Area tabs** (sidebar order): 🏠 Inicio/Dashboard, 📚 Formaciones (Las 48 Semanas), 🎨 Arteterapia, 🎵 Multimedia, 📄 Materiales PDF, 📝 Diario, 💬 Comunidad, 📊 Progreso
- **Mobile tab bar**: Row 1 (always visible): Inicio, Formaciones, Multimedia, Arteterapia, ☰ Más | Row 2 (expandable via Más): Academia link, Materiales, Progreso, Diario, Comunidad, Salir
- **Section headers**: All use italic Playfair Display gold subtitle (#BC9640) + 2px gold gradient separator bar
- **Dashboard**: 3 stat cards with 3px colored top bars (gold gradient, teal, gold+teal), teal "Ver Formaciones" CTA, ghost buttons for Multimedia/Diario, gold left-border quote
- **Formaciones/Semanas**: Puertas legend bar (4-segment color strip with Blanca/Roja/Azul/Arcoíris labels)
- **Multimedia**: Cuencos tab active (teal), Meditación/Frecuencia/Teoría/Canalización show "Próx." badge (disabled)
- **Data** (`src/lib/data.ts`):
  - `WEEKS` — 48 WeekBasic entries (n, gate, title)
  - `ALL_WEEK_DETAILS` — 48 complete WeekDetail entries with real message, concepts, exerciseTitle, exerciseObjective, exerciseRef, exerciseSteps, artTitle, artDesc, artSteps (generated from HTML v204 WD data + thematic art therapy)
  - `MULTIMEDIA_ITEMS` (12 items, with real Supabase MP3 URLs)
  - `MATERIALES` (PDF data with real Supabase PDF URLs per puerta)
- **Free weeks**: 1 semana inicial; desbloqueo progresivo — al completar la semana N, se abre la N+1 (misma lógica para todos los planes). UpsellModal si intentan saltar adelante.
- **Puertas**: Blanca (sem 1-12), Roja (13-24), Azul (25-36), Arcoíris (37-48). Prices: €95/mes each; Oro pack €890 pago único
- **Semanas**: Week modal with 3 tabs (Contenido/Ejercicio/Arteterapia), real content for all 48 weeks
- **Multimedia**: Real audio from Supabase storage, category filter, actual HTML5 audio playback
- **Materiales PDF**: Real PDF URLs from Supabase, accordion by puerta with progressively unlocked access
- **Diario**: Journal entries saved in localStorage, sortable by date
- **Arteterapia**: Weekly AT exercises for all 48 weeks (thematic, generated)
- **Comunidad**: Embedded Jitsi Meet modal (4 sala rooms), inline chat with seeded messages
- **Academy Home** (`/`): Dark hero + SVG mandala (60s spin), stats (48/4/12), two course cards grid, ¿Qué es? section, equipo teaser, 4 principios (Despertar/Purificación/Integración/Expresión), testimonios (dark), contacto form, footer
- **Equipo page** (`/equipo`): Dark hero, TCT team block (Quico Esteban + Marga Pérez), Deportista team block (Javier Ruiz), "próximamente" section
- **Supabase base**: `https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/`
- **Visual editor / content system**: localStorage keys `fi_draft`/`fi_published`. Priority: draft > published > content-defaults.ts > hardcode. Events: `fi:content`, `fi:saved`, `fi:published`, `fi:reset`. Admin (role=admin) sees editor sidebar on any page.
- **Container layout system**: `useContainerStyle(prefix)` hook returns `{ style, justify, pos, maxW, padH, padB }`. Heading containers across all pages apply these for left/center/right positioning + maxWidth + paddingBottom. Keys: `{prefix}.cpos` / `{prefix}.cmaxW` / `{prefix}.cpadH` / `{prefix}.cpadB`. `cFields(prefix, label, dPos, dMaxW, dPadH, dPadB)` helper in EditorSidebar generates 4 FieldDef controls.
- **Container coverage**: Academy.tsx (all 7 sections), Landing.tsx (all 10 sections: hero/puertas/libre/que/pilares/viaje/caminos/equipo/testimonios/cta), Deportista.tsx (hero/paraquien/lista). Metodo.tsx uses different Tailwind/framer-motion architecture — not yet updated.
- **Line breaks**: Global CSS `[data-fi-key] { white-space: pre-wrap }` in `index.css`
- **Presencia section**: Cinematic full-viewport yoga image with Ken Burns animation + Flower of Life SVG with sequential gold glow. Container keys: `academy.presencia.c{pos,maxW,padH,padB}`.

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
