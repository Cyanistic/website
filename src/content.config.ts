import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    icon: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    url: z.string().optional(),
    order: z.number().optional(),
  }),
});

const software = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/software" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    url: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { blog, projects, software };
