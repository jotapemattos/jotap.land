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
