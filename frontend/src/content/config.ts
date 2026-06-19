import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'es']).default('en'),
    draft: z.boolean().default(false),
    youtubeUrl: z.string().url().optional(),
    canonical: z.string().url().optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog };
