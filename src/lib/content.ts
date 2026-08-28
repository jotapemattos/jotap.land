import { getCollection, type CollectionEntry } from "astro:content";

const isPublished = <T extends { data: { draft?: boolean } }>(entry: T) =>
  import.meta.env.DEV || !entry.data.draft;

const byDateDesc = (a: Date, b: Date) => b.valueOf() - a.valueOf();

export async function getWriting() {
  const posts = await getCollection("writing", isPublished);
  return posts.sort((a, b) => byDateDesc(a.data.pubDate, b.data.pubDate));
}

export async function getWork() {
  const entries = await getCollection("work", isPublished);
  return entries.sort((a, b) => byDateDesc(a.data.pubDate, b.data.pubDate));
}

export async function getBookmarks() {
  const bookmarks = await getCollection("bookmarks");
  return bookmarks.sort((a, b) => byDateDesc(a.data.savedAt, b.data.savedAt));
}

export type WritingEntry = CollectionEntry<"writing">;
export type WorkEntry = CollectionEntry<"work">;
export type BookmarkEntry = CollectionEntry<"bookmarks">;

/** 2026-08-27 — sorts and reads the same everywhere, no locale surprises. */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

export const longDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const hostOf = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};
