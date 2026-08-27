import { defineCollection, z } from "astro:content";
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

const sideProjects = defineCollection({
  loader: glob({
    base: "./src/content/side-projects",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string().optional(),
    year: z.number().optional(),
    status: z.enum(["live", "archived", "wip"]).default("live"),
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const studyCases = defineCollection({
  loader: glob({ base: "./src/content/study-cases", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    role: z.string().optional(),
    tags: z.array(z.string()).default([]),
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
    url: z.string().url(),
    savedAt: z.coerce.date(),
    description: z.string().nullable().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { writing, sideProjects, studyCases, bookmarks };
