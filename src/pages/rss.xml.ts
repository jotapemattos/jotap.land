import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getWriting } from "../lib/content";

export async function GET(context: APIContext) {
  const posts = await getWriting();

  return rss({
    title: "João Pedro — Writing",
    description:
      "Notes, essays and half-formed thoughts on software and everything around it.",
    site: context.site ?? "https://jotap.land",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? "",
      pubDate: post.data.pubDate,
      link: `/writing/${post.id}/`,
    })),
    customData: "<language>en-us</language>",
  });
}
