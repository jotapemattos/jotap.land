/**
 * Pulls the shipping tags' links out of Shiori and rewrites
 * src/content/bookmarks/bookmarks.json wholesale.
 *
 *   SHIORI_API_KEY=shk_… node scripts/sync-bookmarks.mjs
 *
 * Only the tags in TAGS ship — the rest of the library (wish-list, wear, …) is
 * not for the blog. The file is committed, so the build stays offline and a
 * failed sync can never empty the page.
 */
import { writeFile } from "node:fs/promises";

const API = "https://www.shiori.sh/api/links";
const TAGS = ["tech-articles", "resources", "talks"];
const OUT = new URL("../src/content/bookmarks/bookmarks.json", import.meta.url);
const PAGE_SIZE = 100;

const key = process.env.SHIORI_API_KEY;
if (!key) throw new Error("SHIORI_API_KEY is not set");

/** Shiori pages at `limit`/`offset` and reports `total`; keep going until we
 *  have all of them, oldest-first ordering is imposed later anyway. */
async function fetchTag(tag) {
  const links = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const url = `${API}?tag=${tag}&limit=${PAGE_SIZE}&offset=${offset}&sort=newest`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok)
      throw new Error(`GET ${url} → ${res.status} ${await res.text()}`);

    const { links: page = [], total } = await res.json();
    links.push(...page);
    if (links.length >= total || page.length === 0) return links;
  }
}

/** The API returns a link's whole lifecycle; the site needs six fields. The
 *  tag is not on the payload — it is the filter we just queried by, so a link
 *  carried by several tags is merged rather than duplicated. */
const byId = new Map();
for (const tag of TAGS) {
  for (const link of await fetchTag(tag)) {
    const seen = byId.get(link.id);
    if (seen) {
      seen.tags.push(tag);
      continue;
    }
    byId.set(link.id, {
      id: link.id,
      title: link.title,
      url: link.url,
      savedAt: link.created_at,
      description: link.summary ?? null,
      tags: [tag],
    });
  }
}

const data = [...byId.values()].sort(
  (a, b) => Date.parse(b.savedAt) - Date.parse(a.savedAt),
);

await writeFile(
  OUT,
  JSON.stringify({ lastUpdate: new Date().toISOString(), data }, null, 2) + "\n",
);

console.log(
  `Synced ${data.length} bookmarks from ${TAGS.map((t) => `#${t}`).join(", ")}.`,
);
