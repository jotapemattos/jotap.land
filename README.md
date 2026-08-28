# jotap.land

My corner of the web. Astro, statically generated, deployed on Cloudflare.

## Stack

- **Astro 5** — static output, zero client JS except view transitions
- **Tailwind CSS** — design tokens live in `tailwind.config.mjs`
- **Content collections** — everything publishable is a file in `src/content/`

## Adding content

See [`src/content/README.md`](./src/content/README.md) for the frontmatter
schema of each collection. Short version: drop a markdown file in the right
folder, commit, push.

Drafts (`draft: true`) render in `dev` and are excluded from the build.

## Design

| Token    | Value     | Role                                                                                   |
| -------- | --------- | -------------------------------------------------------------------------------------- |
| `cream`  | `#f3eadf` | Primary — the ink. `cream-200…600` is the same color blended down over the background. |
| `accent` | `#34A893` | Secondary — one accent, used sparingly.                                                |
| `ink`    | `#0d0d0d` | Background.                                                                            |

Type is monospace (JetBrains Mono) with Instrument Serif for display headings.

## Toolchain

Node and pnpm are pinned — `.node-version` for Node, `packageManager` in
`package.json` for pnpm. Cloudflare reads both, so CI and local run the same
versions and the lockfile is actually honoured. Use `corepack pnpm …` (or just
`pnpm`, if corepack is enabled) so the pin takes effect.

## Commands

```sh
pnpm dev      # local dev server on :4321
pnpm build    # astro check && astro build
pnpm preview  # serve the built site
pnpm lint     # prettier + eslint, both with --fix
```

## Deploys

`main` is production. Every other branch gets a Cloudflare preview deployment
on push — check the branch's build in the Cloudflare dashboard for its URL.
