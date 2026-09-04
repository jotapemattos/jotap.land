/**
 * Pulls the `tech-articles` links out of Shiori and rewrites
 * src/content/bookmarks/bookmarks.json wholesale.
 *
 *   SHIORI_API_KEY=shk_… node scripts/sync-bookmarks.mjs
 *
 * Only that one tag ships — the rest of the library (wish-list, wear, …) is
 * not for the blog. The file is committed, so the build stays offline and a
 * failed sync can never empty the page.
 */
import { writeFile } from "node:fs/promises";

const API = "https://www.shiori.sh/api/links";
const TAG = "tech-articles";
const OUT = new URL("../src/content/bookmarks/bookmarks.json", import.meta.url);
const PAGE_SIZE = 100;

const key = process.env.SHIORI_API_KEY;
if (!key) throw new Error("SHIORI_API_KEY is not set");

/** Shiori pages at `limit`/`offset` and reports `total`; keep going until we
 *  have all of them, oldest-first ordering is imposed later anyway. */
async function fetchAll() {
  const links = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const url = `${API}?tag=${TAG}&limit=${PAGE_SIZE}&offset=${offset}&sort=newest`;
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
 *  tag is not on the payload — it is the filter we just queried by. */
const toBookmark = (link) => ({
  id: link.id,
  title: link.title,
  url: link.url,
  savedAt: link.created_at,
  description: link.summary ?? null,
  tags: [TAG],
});

const links = await fetchAll();
const data = links
  .map(toBookmark)
  .sort((a, b) => Date.parse(b.savedAt) - Date.parse(a.savedAt));

await writeFile(
  OUT,
  JSON.stringify({ lastUpdate: new Date().toISOString(), data }, null, 2) + "\n",
);

console.log(`Synced ${data.length} bookmarks from #${TAG}.`);
