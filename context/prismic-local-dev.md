# Prismic Local Development

Read this before Prismic, Slice Machine, custom type, shared slice, preview, webhook, or content-model work.

---

## Current Setup

- Repository name: `discoverandgrow2025` in `slicemachine.config.json`.
- Slice library: `./src/slices`.
- Slice Simulator URL: `http://localhost:3000/slice-simulator`.
- Prismic client: `src/prismicio.ts`.
- Custom types: `customtypes/*/index.json`.
- Shared slices: `src/slices/*/model.json` and matching components.

---

## Commands

```bash
npm run dev
npm run slicemachine
npm run both
npx prismic --help
npx prismic slicemachine --help
```

Use `npm run both` when editing slices and visually testing the app and Slice Machine together.

The installed `prismic-cli` is `4.2.3`. Its help output currently lists `help`, `list`, `login`, `logout`, `new`, `signup`, `slicemachine`, `theme`, and `whoami`; `npx prismic docs list` is not available in this project and returns `command docs not found`.

---

## Model Change Rules

- Prefer Slice Machine or `npx prismic` workflows for custom type and slice model changes.
- Do not manually edit generated `src/slices/index.ts`.
- Do not manually edit `prismicio-types.d.ts`; regenerate types through the Prismic/Slice Machine workflow.
- If the CLI or Slice Machine cannot support the required operation, state the limitation and use an approved manual fallback only for the model JSON files that need it.

---

## Preview and Revalidation

- Preview entry route: `/api/preview`.
- Preview exit route: `/api/exit-preview`.
- `PrismicPreview` is always rendered in `src/app/(home)/layout.tsx`; it activates Next draft mode when an editor starts a Prismic preview.
- Production Prismic fetches use the `prismic` cache tag.
- `/api/revalidate` calls `revalidateTag("prismic")`.

Confirm webhook configuration before assuming Prismic publishes will revalidate production content.

---

## Local Environment

Prismic can use the repository name from `slicemachine.config.json`. `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` can override it when needed.

Do not commit real environment values.

---

## Verification

For Prismic work, use the narrowest relevant checks:

- Open Slice Machine and verify the model/slice.
- Run the app and inspect the affected route.
- Confirm Prismic preview for preview-specific work.
- Confirm generated types and generated slice map are updated by tooling, not manual edits.
