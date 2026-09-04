# Content

Everything on the site is a file in this folder. No CMS, no dashboard — adding
content is a `git commit`, and a preview deploy shows up on the branch.

## `writing/`

Markdown posts. Filename is `YYYY-MM-DD-some-slug.md`; the date prefix is
stripped from the URL, so that file lives at `/writing/some-slug`.

```yaml
---
title: "Post title"          # required
description: "One line."     # optional — shows in listings, RSS and <meta>
pubDate: 2026-08-27          # required
updatedDate: 2026-09-01      # optional
tags: ["meta"]               # optional
draft: false                 # drafts render in `dev` only
---
```

## `work/`

Side projects and study cases share one folder and one section — to a reader
they are the same thing, something built and written up. A file lives at
`/work/<filename>`.

```yaml
---
title: "Project or case title" # required
tagline: "One line."           # required
description: "Longer blurb."   # optional
pubDate: 2026-08-27            # required — the listing sorts by it, newest first
role: "Software Engineer"      # optional — reads as a case
status: live                   # optional — live | wip | archived
stack: ["TypeScript"]          # optional — renders the "details" frame
tags: ["backend"]              # optional
repoUrl: "https://…"           # optional
liveUrl: "https://…"           # optional
draft: false
---
```

## `bookmarks/bookmarks.json`

Data, not prose — one file, so a sync script can rewrite it wholesale.

```json
{
  "lastUpdate": "2026-08-27T00:00:00.000Z",
  "data": [
    {
      "id": "unique-id",
      "title": "Title",
      "url": "https://…",
      "savedAt": "2026-08-20T12:00:00.000Z",
      "description": "Optional, may be null.",
      "tags": ["systems"]
    }
  ]
}
```

Every distinct tag gets its own page at `/bookmarks/tags/<tag>`.

The schemas are enforced at build time in `src/content.config.ts` — a typo in
frontmatter fails the build instead of shipping a broken page.

### Syncing from Shiori

`bookmarks.json` is generated, not hand-written:

```sh
SHIORI_API_KEY=shk_… pnpm sync:bookmarks
```

`scripts/sync-bookmarks.mjs` pulls `GET /api/links?tag=tech-articles` from
Shiori and rewrites the file wholesale. Only that one tag ships — the rest of
the library is not for the blog. The result is committed, so the build never
touches the network and a failed sync can't empty the page.
