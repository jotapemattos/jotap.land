import { defineCollection } from "astro:content";
import { z } from "zod";
import { file, glob } from "astro/loaders";

/**
 * Content lives in the repo as plain files — markdown for anything you write,
 * JSON for anything a script syncs. Adding a post is `git commit`, nothing else.
 */

/** `2026-08-27-hello-again.md` → `hello-again`. Date stays in the filename so
 *  the directory sorts chronologically; the URL stays clean. */
const stripDatePrefix = ({ entry }: { entry: string }) =>
  entry
    .replace(/\.mdx?$/, "")
    .replace(/^.*\//, "")
    .replace(/^\d{4}-\d{2}-\d{2}[-T]/, "");

const writing = defineCollection({
  loader: glob({
    base: "./src/content/writing",
    pattern: "**/*.{md,mdx}",
    generateId: stripDatePrefix,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

/**
 * `work/` is one collection on purpose: a side project and a study case are the
 * same thing to a reader — something built, written up. The optional fields let
 * a file lean either way without splitting the section in two.
 */
const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    role: z.string().optional(),
    status: z.enum(["live", "archived", "wip"]).optional(),
    stack: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    repoUrl: z.url().optional(),
    liveUrl: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Bookmarks are data, not prose — one JSON file, so a sync script can rewrite
 * it wholesale without touching anything else.
 */
const bookmarks = defineCollection({
  loader: file("./src/content/bookmarks/bookmarks.json", {
    parser: (text) => JSON.parse(text).data,
  }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    url: z.url(),
    savedAt: z.coerce.date(),
    description: z.string().nullable().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { writing, work, bookmarks };
